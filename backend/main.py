import os
import json
from datetime import datetime
from typing import Optional
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

app = FastAPI(
    title="ShareXpress API Hub",
    description="Backend services for ShareXpress parent brand website.",
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
        "service": "ShareXpress Hub API"
    }

@app.post("/api/contact", status_code=status.HTTP_201_CREATED)
async def submit_contact(inquiry: ContactInquiry):
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

        return {"success": True, "message": "Inquiry successfully logged."}

    except Exception as e:
        print(f"Error saving inquiry: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while saving inquiry details."
        )
