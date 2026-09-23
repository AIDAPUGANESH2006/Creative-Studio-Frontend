import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const PageLoader = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (onComplete) onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const counterObj = { val: 0 };

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.9,
            ease: 'power4.inOut',
            onComplete: () => {
              if (onComplete) onComplete();
            },
          });
        },
      });

      tl.to(counterObj, {
        val: 100,
        duration: 1.1,
        ease: 'power2.inOut',
        onUpdate: () => {
          setCount(Math.floor(counterObj.val));
        },
      });

      tl.to(
        textRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: 'power2.in',
        },
        '-=0.3'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#050505',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(1.5rem, 5vw, 4rem)',
        color: '#F8F8F6',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#FF3E18' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.15em' }}>
            AETHER STUDIO
          </span>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#666660' }}>
          EDITION 2026
        </span>
      </div>

      <div ref={textRef} style={{ maxWidth: '600px' }}>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
          }}
        >
          DIGITAL EXPERIENCES THAT TURN ATTENTION INTO MEANINGFUL ACTION.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: '120px',
              height: '2px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              ref={progressRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: `${count}%`,
                backgroundColor: '#FF3E18',
                transition: 'width 0.05s linear',
              }}
            />
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#FF3E18' }}>
            {count.toString().padStart(3, '0')}%
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#666660' }}>
          INITIALIZING MOTION SYSTEMS & SHADERS
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#666660' }}>
          [01 // 05]
        </span>
      </div>
    </div>
  );
};
