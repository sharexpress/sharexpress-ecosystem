import os
import json
from datetime import datetime
from typing import Optional
from fastapi import FastAPI, HTTPException, status, BackgroundTasks
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from mailer import send_inquiry_email, send_acknowledgement_email

app = FastAPI(
    title="sharexpress API Hub",
    description="Backend services for sharexpress parent brand website.",
    version="1.0.0"
)

# CORS Policy configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production settings if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Persistent JSON storage configuration
INQUIRIES_FILE = os.path.join(os.path.dirname(__file__), "inquiries.json")

# Inbound validation schema
class ContactInquiry(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: str

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "service": "sharexpress Hub API"
    }

@app.get("/api/status")
async def get_system_status():
    import urllib.request
    import urllib.error
    
    files_status = "Operational"
    try:
        req = urllib.request.Request(
            "http://127.0.0.1",
            headers={"Host": "files.sharexpress.in"}
        )
        with urllib.request.urlopen(req, timeout=3) as response:
            if response.getcode() == 200:
                files_status = "Operational"
            else:
                files_status = "Maintenance"
    except urllib.error.HTTPError as e:
        if e.code == 503:
            files_status = "Maintenance"
        else:
            files_status = "Degraded"
    except Exception:
        files_status = "Offline"
        
    return {
        "files": files_status
    }

@app.post("/api/contact", status_code=status.HTTP_201_CREATED)
async def submit_contact(inquiry: ContactInquiry, background_tasks: BackgroundTasks):
    try:
        # Create submission record
        submission = {
            "id": datetime.utcnow().timestamp(),
            "timestamp": datetime.utcnow().isoformat(),
            "name": inquiry.name,
            "email": inquiry.email,
            "company": inquiry.company or "N/A",
            "message": inquiry.message
        }

        # Save to local JSON database safely
        data = []
        if os.path.exists(INQUIRIES_FILE):
            try:
                with open(INQUIRIES_FILE, "r") as f:
                    content = f.read().strip()
                    if content:
                        data = json.loads(content)
            except json.JSONDecodeError:
                # Handle corrupted file
                data = []

        data.append(submission)

        with open(INQUIRIES_FILE, "w") as f:
            json.dump(data, f, indent=2)

        # Log submission to stdout for cloud visibility
        print(f"\n[INBOUND INQUIRY] Received contact submission:")
        print(f"  Name: {submission['name']}")
        print(f"  Email: {submission['email']}")
        print(f"  Company: {submission['company']}")
        print(f"  Message: {submission['message']}\n")

        # Register background email sending task
        background_tasks.add_task(
            send_inquiry_email, 
            inquiry.name, 
            inquiry.email, 
            inquiry.company or "N/A", 
            inquiry.message
        )
        background_tasks.add_task(
            send_acknowledgement_email,
            inquiry.name,
            inquiry.email,
            inquiry.company or "N/A",
            inquiry.message
        )

        return {"success": True, "message": "Inquiry successfully logged."}

    except Exception as e:
        print(f"Error saving inquiry: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while saving inquiry details."
        )

# --- Hybrid SSR / SPA Page Router ---
DIST_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "dist"))
INDEX_PATH = os.path.join(DIST_DIR, "index.html")

async def render_ssr_html():
    if not os.path.exists(INDEX_PATH):
        # Return fallback SEO index if not built yet
        fallback_html = """<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>sharexpress — Autonomous Developer & Cloud Software Ecosystem</title>
    <meta name="description" content="sharexpress is an umbrella technology corporation building and scaling a unified ecosystem of production-ready developer tools, cloud infrastructure, and software engines." />
</head>
<body style="background: black; color: white; font-family: sans-serif; padding: 40px;">
    <h1>sharexpress</h1>
    <p>Loading application...</p>
</body>
</html>"""
        return HTMLResponse(content=fallback_html, status_code=200)

    try:
        with open(INDEX_PATH, "r", encoding="utf-8") as f:
            html_content = f.read()

        # Build semantic HTML fallback inside index.html's crawler areas
        # (This guarantees crawlers get clean indexable text content for all products)
        ssr_main_content = """
      <header style="display:none;">
        <nav>
          <a href="/">sharexpress</a>
          <a href="#ecosystem">Ecosystem Visualizer</a>
          <a href="#products">Ecosystem Products</a>
          <a href="#why-sharexpress">Our Methodology</a>
          <a href="#tech-stack">Technology Stack</a>
          <a href="#vision">Founder Manifesto</a>
          <a href="#contact">Contact Us</a>
        </nav>
      </header>

      <main>
        <section id="hero-fallback">
          <h1>A Foundation for Autonomous Systems.</h1>
          <p>sharexpress is an umbrella technology corporation. We design, deploy, and scale high-performance developer systems, cloud infrastructure, and software engines under a single, unified namespace.</p>
          <a href="#ecosystem">Explore Ecosystem</a>
          <a href="#products">Review Specifications</a>
        </section>

        <section id="ecosystem-fallback">
          <h2>sharexpress System Architecture</h2>
          <p>A root organization company managing multiple specialized digital nodes:</p>
          <ul>
            <li><strong>Interleet:</strong> Advanced training sandboxes for engineers. Master distributed systems, fault-tolerant architectures, and DevOps operations under load. <a href="https://interleet.sharexpress.in">Initialize Interleet Sandbox</a></li>
            <li><strong>Distribution Services:</strong> Enterprise product engineering and systems consulting. Designing secure APIs, database clusters, and specialized server implementations. <a href="https://distribution.sharexpress.in/">Request Distribution Consulting Access</a></li>
            <li><strong>Cloud Platform:</strong> A high-performance virtualized runtime. Host and run applications on a secure, globally distributed edge compute cluster. <a href="https://cloud.sharexpress.in">Access Cloud Platform Preview</a></li>
            <li><strong>Files Sharing:</strong> Secure, high-performance peer-to-peer and cloud-based object storage. Transfer files with end-to-end encryption. <a href="https://files.sharexpress.in">Launch Files Sharing Platform</a></li>
          </ul>
        </section>

        <section id="products-fallback">
          <h2>Product Suite</h2>
          <article>
            <h3>Interleet</h3>
            <p>Systems topology sandbox environment designed for technical rigor. Practice distributed fault injection, local sandboxes, and DevOps simulations.</p>
            <a href="https://interleet.sharexpress.in">Initialize Sandbox</a>
          </article>
          <article>
            <h3>Distribution Services</h3>
            <p>Enterprise system engineering, protocol designs, database virtualization, and infrastructure consulting.</p>
            <a href="https://distribution.sharexpress.in/">Request Consulting Access</a>
          </article>
          <article>
            <h3>Files Sharing</h3>
            <p>A high-performance peer-to-peer and cloud-based object storage and transfer platform. Transfer files securely with end-to-end encryption, guest sandboxes, and instant global distribution.</p>
            <a href="https://files.sharexpress.in">Open Files Platform</a>
          </article>
          <article>
            <h3>Cloud Platform</h3>
            <p>Edge runtime platform and serverless virtualization compute. Coming soon.</p>
            <a href="https://cloud.sharexpress.in">Request Early Alpha</a>
          </article>
        </section>

        <section id="why-sharexpress-fallback">
          <h2>Our Methodology — Principles</h2>
          <ul>
            <li><strong>Systemic Innovation:</strong> Abstractions to remove operational complexity. We model the future of computation.</li>
            <li><strong>Horizontal Scaling:</strong> Predictable performance characteristics under extreme global traffic.</li>
            <li><strong>Engineering Rigor:</strong> Pure type-safety, automated test coverage, and optimized binary footprints.</li>
            <li><strong>Developer Experience:</strong> Clean APIs, fast CLIs, and exhaustive documentation.</li>
            <li><strong>Infrastructure Sovereignty:</strong> Lightweight virtualization to run code closer to user requests.</li>
          </ul>
        </section>

        <section id="tech-stack-fallback">
          <h2>Core Engineering Stack</h2>
          <p>Frontend Frameworks: React, Vite, JSX, GSAP, Framer Motion, TailwindCSS</p>
          <p>Backend Systems: FastAPI, Python, Redis, PostgreSQL</p>
          <p>Infrastructure Protocols: Docker, Kubernetes, AWS, Nginx, Cloudflare</p>
          <p>Operational Delivery: GitHub Actions, CI/CD, Prometheus, Grafana</p>
        </section>

        <section id="founder-vision-fallback">
          <h2>Founder Manifesto</h2>
          <blockquote>
            "We believe software is the core infrastructure of modern society. Building for the long term requires moving past short-term hacks to build an ecosystem where engineering rigor and logical purity are the core priorities."
          </blockquote>
          <p>— Santusht Kotai, Founder & Chief Systems Architect, sharexpress</p>
        </section>

        <section id="roadmap-fallback">
          <h2>Corporate Roadmap</h2>
          <p>Phase 01: Foundational Platforms (Interleet, Distribution Services)</p>
          <p>Phase 02: Platform Virtualization (Cloud Platform runtime hosting)</p>
          <p>Phase 03: Unified Developer Suite (Developer CLIs, enterprise cells, data sovereignty)</p>
        </section>

        <section id="contact-fallback">
          <h2>Initiate Connection</h2>
          <p>Contact our systems engineering team to discuss custom product integration, infrastructure consultation, or enterprise partnership opportunities. Email contact@sharexpress.in or schedule a technical review session.</p>
        </section>
      </main>

      <footer>
        <p>&copy; 2026 sharexpress. All systems operational. interleet.sharexpress.in | distribution.sharexpress.in | files.sharexpress.in | cloud.sharexpress.in</p>
      </footer>
"""

        # Replace static placeholder tags inside the template if present
        root_start = html_content.find('<div id="root">')
        if root_start != -1:
            root_end = html_content.find('</div>', root_start)
            if root_end != -1:
                prefix = html_content[:root_start + len('<div id="root">')]
                suffix = html_content[root_end:]
                html_content = prefix + ssr_main_content + suffix

        return HTMLResponse(content=html_content, status_code=200)

    except Exception as e:
        print(f"Error serving SSR index: {str(e)}")
        if os.path.exists(INDEX_PATH):
            with open(INDEX_PATH, "r", encoding="utf-8") as f:
                return HTMLResponse(content=f.read(), status_code=200)
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/", response_class=HTMLResponse)
async def serve_ssr_index():
    return await render_ssr_html()

@app.get("/{path:path}", response_class=HTMLResponse)
async def serve_ssr_fallback(path: str):
    if path.startswith("api/") or path.startswith("docs") or path.startswith("redoc") or path.startswith("openapi.json"):
        raise HTTPException(status_code=404, detail="Not Found")
    return await render_ssr_html()
