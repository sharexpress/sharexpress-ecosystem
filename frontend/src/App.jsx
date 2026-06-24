import React, { useEffect, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import Lenis from 'lenis';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InteractiveBackground from './components/InteractiveBackground';

// Lazy load landing page below-the-fold components
const EcosystemTree = lazy(() => import('./components/EcosystemTree'));
const Products = lazy(() => import('./components/Products'));
const WhyShareXpress = lazy(() => import('./components/WhyShareXpress'));
const TechStackMarquee = lazy(() => import('./components/TechStackMarquee'));
const FounderVision = lazy(() => import('./components/FounderVision'));
const FutureEcosystem = lazy(() => import('./components/FutureEcosystem'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// Minimal loading placeholder
function SectionLoader() {
  return (
    <div className="w-full h-24 flex items-center justify-center bg-black">
      <div className="w-6 h-[1px] bg-white/[0.06] animate-pulse"></div>
    </div>
  );
}

export default function App() {
  // Initialize Lenis smooth scroll for landing page
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Structured Data Schema for search engines (JSON-LD)
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://sharexpress.in/#organization",
      "name": "sharexpress",
      "url": "https://sharexpress.in",
      "logo": "https://sharexpress.in/logo.png",
      "image": "https://sharexpress.in/logo.png",
      "description": "sharexpress is an umbrella technology corporation building and scaling a unified ecosystem of production-ready developer tools, cloud infrastructure, and software engines.",
      "founder": {
        "@type": "Person",
        "name": "Santusht Kotai",
        "jobTitle": "Founder & Chief Systems Architect"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "contact@sharexpress.in",
        "contactType": "customer support"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://sharexpress.in/#website",
      "name": "sharexpress",
      "url": "https://sharexpress.in",
      "publisher": {
        "@id": "https://sharexpress.in/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "sharexpress Digital Ecosystem Products",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "SoftwareApplication",
            "name": "Interleet",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Linux, macOS, Windows",
            "url": "https://interleet.sharexpress.in",
            "description": "Advanced training sandboxes for engineers. Master distributed systems, fault-tolerant architectures, and core DevOps operations under load."
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Service",
            "name": "Distribution Services",
            "serviceType": "Systems Engineering & Infrastructure Consulting",
            "url": "https://distribution.sharexpress.in/",
            "description": "Enterprise product engineering and systems consulting. Designing secure APIs, database clusters, and specialized server implementations."
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "SoftwareApplication",
            "name": "Cloud Platform",
            "applicationCategory": "VirtualizationRuntime",
            "operatingSystem": "Cloud Edge Runtimes",
            "url": "https://cloud.sharexpress.in",
            "description": "A high-performance virtualized runtime. Host and run applications on a secure, globally distributed edge compute cluster."
          }
        },
        {
          "@type": "ListItem",
          "position": 4,
          "item": {
            "@type": "SoftwareApplication",
            "name": "Files Sharing",
            "applicationCategory": "SecureStorageApplication",
            "operatingSystem": "Linux, macOS, Windows, iOS, Android",
            "url": "https://files.sharexpress.in",
            "description": "Secure, lightning-fast peer-to-peer and cloud file sharing platform. Zero-knowledge encrypted storage, user auth, and real-time distribution."
          }
        }
      ]
    }
  ];

  return (
    <div className="relative w-full bg-black min-h-screen overflow-hidden">
      {/* Helmet SEO Management */}
      <Helmet>
        <title>sharexpress — Autonomous Developer & Cloud Software Ecosystem</title>
        <link rel="canonical" href="https://sharexpress.in" />
        <meta name="description" content="sharexpress is an umbrella technology corporation building and scaling a unified ecosystem of production-ready developer tools, cloud infrastructure, and software engines." />
        <meta name="keywords" content="sharexpress, Interleet, Distribution, Cloud Platform, Files Sharing, autonomous software engines, systems engineering, developer tools, distributed databases, private cloud hosting, edge compute virtualization, tech stack, Santusht Kotai" />
        <meta name="author" content="sharexpress Systems" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sharexpress.in" />
        <meta property="og:title" content="sharexpress — Autonomous Developer & Cloud Software Ecosystem" />
        <meta property="og:description" content="Explore sharexpress, an umbrella technology corporation hosting specialized systems training, cloud platforms, and enterprise hosting runtimes." />
        <meta property="og:image" content="https://sharexpress.in/logo.png" />
        <meta property="og:site_name" content="sharexpress" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://sharexpress.in" />
        <meta property="twitter:title" content="sharexpress — Autonomous Developer & Cloud Software Ecosystem" />
        <meta property="twitter:description" content="Explore sharexpress, an umbrella technology corporation hosting specialized systems training, cloud platforms, and enterprise hosting runtimes." />
        <meta property="twitter:image" content="https://sharexpress.in/logo.png" />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Global Background Layer */}
      <InteractiveBackground />

      {/* Landing page layout */}
      <Suspense fallback={<SectionLoader />}>
        <Navbar />
        <Hero />
        <EcosystemTree />
        <Products />
        <WhyShareXpress />
        <TechStackMarquee />
        <FounderVision />
        <FutureEcosystem />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
}
