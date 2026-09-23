import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { HeroScene } from './3d/HeroScene';
import { useMagnetic } from '../hooks/useMagnetic';

export const Hero = ({ isLoaded }) => {
  const containerRef = useRef(null);
  const headlineLinesRef = useRef([]);
  const eyebrowRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const magneticCtaRef = useMagnetic(0.3);

  const headlineLines = [
    'WE CRAFT DIGITAL',
    'EXPERIENCES PEOPLE',
    'REMEMBER.',
  ];

  useEffect(() => {
    if (!isLoaded) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Eyebrow entrance
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      );

      // Main Headline line-by-line staggered reveal
      tl.fromTo(
        headlineLinesRef.current,
        {
          yPercent: 120,
          opacity: 0,
          rotateX: 15,
          filter: 'blur(10px)',
        },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 1.1,
          stagger: 0.12,
          ease: 'power4.out',
        },
        '-=0.4'
      );

      // Subtext & CTA Entrance
      tl.fromTo(
        [subtextRef.current, ctaRef.current],
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.5'
      );

      // Scroll Indicator Fade In
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  const scrollToWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 'clamp(6.5rem, 12vh, 9.5rem)',
        paddingBottom: 'clamp(2rem, 5vh, 3.5rem)',
        overflow: 'hidden',
      }}
      aria-label="Hero Section"
    >
      {/* Interactive 3D WebGL Background Scene */}
      <HeroScene />

      {/* Atmospheric Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,62,24,0.12) 0%, rgba(8,8,8,0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      <div className="container" style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Eyebrow Studio Tag */}
        <div style={{ marginBottom: '1.75rem', overflow: 'hidden' }}>
          <div ref={eyebrowRef} className="eyebrow-badge">
            <span>INDEPENDENT CREATIVE STUDIO // 2026</span>
          </div>
        </div>

        {/* Big Display Headline */}
        <h1
          style={{
            perspective: '1000px',
            marginBottom: '2rem',
          }}
        >
          {headlineLines.map((line, idx) => (
            <div
              key={idx}
              style={{
                overflow: 'hidden',
                lineHeight: 0.94,
              }}
            >
              <div
                ref={(el) => (headlineLinesRef.current[idx] = el)}
                className="display-hero"
                style={{
                  color: idx === 2 ? '#FF3E18' : 'var(--text-primary)',
                  display: 'inline-block',
                  transformOrigin: 'bottom center',
                }}
              >
                {line}
              </div>
            </div>
          ))}
        </h1>

        {/* Supporting Narrative & Magnetic CTA */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
            alignItems: 'flex-start',
            maxWidth: '1000px',
            marginTop: '1rem',
          }}
        >
          <div ref={subtextRef}>
            <p
              className="body-lead"
              style={{
                maxWidth: '480px',
                color: 'var(--text-secondary)',
                lineHeight: 1.55,
              }}
            >
              We blend editorial art direction, spatial WebGL technologies, and kinetic interaction to build iconic digital platforms that captivate attention and define culture.
            </p>
          </div>

          <div
            ref={ctaRef}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '1.25rem',
            }}
          >
            <div ref={magneticCtaRef}>
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToWork();
                }}
                className="btn-primary"
                style={{
                  padding: '1.1rem 2.2rem',
                  fontSize: '0.88rem',
                }}
              >
                <span>EXPLORE WORK</span>
                <ArrowUpRight size={18} />
              </a>
            </div>

            <a
              href="#about"
              className="btn-pill-subtle"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Sparkles size={13} color="#FF3E18" />
              <span>STUDIO PHILOSOPHY</span>
            </a>
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar: Scroll Indicator & Real-Time Status */}
      <div className="container" style={{ position: 'relative', zIndex: 10, marginTop: '2rem' }}>
        <div
          ref={scrollIndicatorRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '1.5rem',
          }}
        >
          <button
            onClick={scrollToWork}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#F8F8F6')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            aria-label="Scroll to selected work"
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                border: '1px solid var(--border-medium)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'bounceSlow 2s infinite ease-in-out',
              }}
            >
              <ArrowDown size={12} color="#FF3E18" />
            </div>
            <span>SCROLL TO EXPLORE</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                display: 'none',
              }}
              className="hero-status-pill"
            >
              AVAILABLE Q2 // 2026
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
              }}
            >
              [ PARIS — 48.8566° N, 2.3522° E ]
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }
        @media (min-width: 640px) {
          .hero-status-pill {
            display: inline-block !important;
          }
        }
      `}</style>
    </section>
  );
};
