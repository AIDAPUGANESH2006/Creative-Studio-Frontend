import React, { useState } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { PageLoader } from './components/PageLoader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { Work } from './components/Work';
import { HorizontalMarquee } from './components/HorizontalMarquee';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Manifesto } from './components/Manifesto';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';

export function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize Lenis Smooth Scroll with GSAP ScrollTrigger
  useSmoothScroll();

  return (
    <div className="site-wrapper">
      {/* Editorial Curtain Page Loader */}
      <PageLoader onComplete={() => setIsLoaded(true)} />

      {/* Context-Aware Custom Cursor */}
      <CustomCursor />

      {/* Subtle Noise Texture Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Fixed Sticky Header Navigation */}
      <Navbar />

      {/* Main Semantic Landmark */}
      <main id="main-content">
        <Hero isLoaded={isLoaded} />
        <Intro />
        <Work />
        <HorizontalMarquee />
        <Services />
        <Process />
        <Manifesto />
        <CTA />
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}

export default App;
