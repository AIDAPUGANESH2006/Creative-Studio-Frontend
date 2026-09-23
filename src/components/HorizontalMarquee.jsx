import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HorizontalMarquee = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Horizontal scrub driven by vertical scroll
      gsap.to(trackRef.current, {
        xPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const keywords = [
    'STRATEGY',
    'ARCHITECTURE',
    'INTERACTION',
    'MOTION SYSTEMS',
    '3D WEBGL',
    'EXPERIENCE',
    'TRANSCENDENCE',
    'AESTHETICS',
  ];

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        padding: 'clamp(2.5rem, 5vw, 4.5rem) 0',
        backgroundColor: '#0C0C0E',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        overflow: 'hidden',
        userSelect: 'none',
      }}
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(2rem, 4vw, 4rem)',
          whiteSpace: 'nowrap',
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        {/* Render duplicate arrays for infinite fluid look */}
        {[...keywords, ...keywords, ...keywords].map((word, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(2rem, 4vw, 4rem)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                color: i % 2 === 0 ? '#F8F8F6' : 'transparent',
                WebkitTextStroke: i % 2 === 0 ? 'none' : '1px rgba(255, 255, 255, 0.25)',
              }}
            >
              {word}
            </span>
            <span
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-primary)',
                display: 'inline-block',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
