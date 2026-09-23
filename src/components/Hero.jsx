import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { HeroScene } from './3d/HeroScene';
import { useMagnetic } from '../hooks/useMagnetic';

gsap.registerPlugin(ScrollTrigger);

export const Hero = ({ isLoaded }) => {
  const sectionRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const headlineLinesRef = useRef([]);
  const eyebrowRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const sceneWrapperRef = useRef(null);
  const magneticCtaRef = useMagnetic(0.25);

  const headlineLines = [
    'WE CRAFT',
    'DIGITAL',
    'EXPERIENCES',
    'PEOPLE',
    'REMEMBER.',
  ];

  useEffect(() => {
    if (!isLoaded) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Cinematic Fast Entrance Timeline (< 1.6s total)
      const tl = gsap.timeline({ delay: 0.1 });

      // Step 2: Eyebrow badge entrance
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }
      );

      // Step 3: Sequential Masked Line-by-Line Headline Reveal
      tl.fromTo(
        headlineLinesRef.current,
        {
          y: 75,
          opacity: 0,
          filter: 'blur(8px)',
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 0.85,
          stagger: 0.09,
          ease: 'power4.out',
        },
        '-=0.3'
      );

      // Step 4: Supporting narrative & CTA entrance
      tl.fromTo(
        [subtextRef.current, ctaRef.current],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.45'
      );

      // Step 5: 3D Scene settles & Scroll indicator appears
      tl.fromTo(
        sceneWrapperRef.current,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 1.0, ease: 'power3.out' },
        '-=0.7'
      );

      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );

      // 2. ScrollTrigger Hero Exit Choreography (subtle shift as user scrolls away)
      gsap.to(contentWrapperRef.current, {
        yPercent: -12,
        opacity: 0.25,
        scale: 0.97,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      gsap.to(sceneWrapperRef.current, {
        yPercent: 15,
        rotation: 8,
        scale: 0.9,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
    }, sectionRef);

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
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 'clamp(5.5rem, 11vh, 8.5rem)',
        paddingBottom: 'clamp(1.5rem, 4vh, 3rem)',
        overflow: 'hidden',
      }}
      aria-label="Hero Section"
    >
      {/* Interactive 3D WebGL Background Scene */}
      <div ref={sceneWrapperRef} style={{ position: 'absolute', inset: 0, zIndex: 1, willChange: 'transform' }}>
        <HeroScene />
      </div>

      {/* Atmospheric Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          right: '18%',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,62,24,0.11) 0%, rgba(8,8,8,0) 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Main Content Area */}
      <div
        ref={contentWrapperRef}
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          willChange: 'transform, opacity',
        }}
      >
        {/* Eyebrow Studio Tag */}
        <div style={{ marginBottom: '1.25rem', overflow: 'hidden' }}>
          <div ref={eyebrowRef} className="eyebrow-badge">
            <span>INDEPENDENT CREATIVE STUDIO // 2026</span>
          </div>
        </div>

        {/* 5-Line Display Headline */}
        <h1
          style={{
            marginBottom: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.1rem',
          }}
        >
          {headlineLines.map((line, idx) => {
            const isRemember = line === 'REMEMBER.';
            return (
              <div
                key={idx}
                style={{
                  overflow: 'hidden',
                  lineHeight: 0.93,
                }}
              >
                <div
                  ref={(el) => (headlineLinesRef.current[idx] = el)}
                  className="display-hero"
                  style={{
                    color: isRemember ? 'var(--accent-primary)' : 'var(--text-primary)',
                    display: 'inline-block',
                    transformOrigin: 'bottom left',
                  }}
                >
                  {line}
                </div>
              </div>
            );
          })}
        </h1>

        {/* Supporting Narrative & Magnetic CTA */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem',
            alignItems: 'center',
            maxWidth: '960px',
            marginTop: '0.5rem',
          }}
        >
          <div ref={subtextRef}>
            <p
              className="body-lead"
              style={{
                maxWidth: '460px',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
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
                  padding: '1rem 2rem',
                  fontSize: '0.85rem',
                }}
              >
                <span>EXPLORE WORK</span>
                <ArrowUpRight size={17} data-magnetic-child="true" />
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

      {/* Hero Bottom Bar: Scroll Indicator & Coordinates */}
      <div className="container" style={{ position: 'relative', zIndex: 10, marginTop: '1.5rem' }}>
        <div
          ref={scrollIndicatorRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '1.25rem',
          }}
        >
          <button
            onClick={scrollToWork}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#F8F8F6')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            aria-label="Scroll to explore work"
          >
            <span>SCROLL</span>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                animation: 'infiniteScrollBob 2.2s infinite ease-in-out',
              }}
            >
              <ArrowDown size={14} color="#FF3E18" />
            </div>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
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
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
              }}
            >
              [ PARIS — 48.8566° N, 2.3522° E ]
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes infiniteScrollBob {
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
