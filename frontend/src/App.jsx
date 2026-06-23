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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ShareXpress",
    "url": "https://sharexpress.in",
    "logo": "https://sharexpress.in/logo.svg",
    "founder": {
      "@type": "Person",
      "name": "Santusht Kotai"
    },
    "description": "ShareXpress is an umbrella technology corporation building, incubating, and scaling production-ready developer systems and digital platforms.",
    "subOrganization": [
      {
        "@type": "Organization",
        "name": "Interleet",
        "url": "https://interleet.sharexpress.in"
      },
      {
        "@type": "Organization",
        "name": "Distribution Services",
        "url": "https://services.sharexpress.in"
      },
      {
        "@type": "Organization",
        "name": "Cloud Platform",
        "url": "https://cloud.sharexpress.in"
      }
    ]
  };

  return (
    <div className="relative w-full bg-black min-h-screen overflow-hidden">
      {/* Helmet SEO Management */}
      <Helmet>
        <title>ShareXpress — Autonomous Developer & Cloud Software Ecosystem</title>
        <link rel="canonical" href="https://sharexpress.in" />
        <meta name="description" content="ShareXpress is an umbrella technology corporation building and scaling a unified ecosystem of production-ready developer tools, cloud infrastructure, and software engines." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sharexpress.in" />
        <meta property="og:title" content="ShareXpress — Autonomous Developer & Cloud Software Ecosystem" />
        <meta property="og:description" content="Explore ShareXpress, an umbrella technology corporation hosting specialized systems training, cloud platforms, and enterprise hosting runtimes." />
        <meta property="og:image" content="https://sharexpress.in/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://sharexpress.in" />
        <meta property="twitter:title" content="ShareXpress — Autonomous Developer & Cloud Software Ecosystem" />
        <meta property="twitter:description" content="Explore ShareXpress, an umbrella technology corporation hosting specialized systems training, cloud platforms, and enterprise hosting runtimes." />
        <meta property="twitter:image" content="https://sharexpress.in/og-image.jpg" />

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
