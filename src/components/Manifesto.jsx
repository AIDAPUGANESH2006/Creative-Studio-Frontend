import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Manifesto = () => {
  const containerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const line4Ref = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Differential multi-speed parallax lines
      gsap.to(line1Ref.current, {
        xPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      gsap.to(line2Ref.current, {
        xPercent: 7,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      gsap.to(line3Ref.current, {
        xPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.7,
        },
      });

      gsap.to(line4Ref.current, {
        xPercent: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.9,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="manifesto"
      ref={containerRef}
      className="section"
      style={{
        position: 'relative',
        backgroundColor: '#070709',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        overflow: 'hidden',
        paddingTop: 'clamp(4.5rem, 8vw, 8rem)',
        paddingBottom: 'clamp(4.5rem, 8vw, 8rem)',
      }}
      aria-label="Studio Manifesto"
    >
      {/* Ambient background light */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 62, 24, 0.08) 0%, rgba(0, 0, 0, 0) 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      <div className="container-fluid" style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '1.75rem' }}>
          <span className="eyebrow-badge">
            <span>05 // THE AXIOM</span>
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {/* Line 1 */}
          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <h2
              ref={line1Ref}
              className="display-manifesto"
              style={{
                color: '#F8F8F6',
                display: 'inline-block',
                willChange: 'transform',
              }}
            >
              GOOD DESIGN
            </h2>
          </div>

          {/* Line 2 */}
          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <h2
              ref={line2Ref}
              className="display-manifesto"
              style={{
                color: 'transparent',
                WebkitTextStroke: '1px rgba(255, 255, 255, 0.35)',
                display: 'inline-block',
                willChange: 'transform',
              }}
            >
              GETS ATTENTION.
            </h2>
          </div>

          {/* Line 3 */}
          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <h2
              ref={line3Ref}
              className="display-manifesto"
              style={{
                color: 'var(--accent-primary)',
                display: 'inline-block',
                willChange: 'transform',
              }}
            >
              GREAT EXPERIENCE
            </h2>
          </div>

          {/* Line 4 */}
          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <h2
              ref={line4Ref}
              className="display-manifesto"
              style={{
                color: '#F8F8F6',
                display: 'inline-block',
                willChange: 'transform',
              }}
            >
              KEEPS IT.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};
