import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { processSteps } from '../data/process';
import { CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Process = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const stepsRef = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Animate vertical progress line growth
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 0.5,
          },
        }
      );

      // Stagger and highlight process steps
      stepsRef.current.forEach((stepEl, i) => {
        gsap.fromTo(
          stepEl,
          { opacity: 0.2, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stepEl,
              start: 'top 75%',
              end: 'bottom 60%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="section"
      style={{
        backgroundColor: '#0A0A0C',
        borderTop: '1px solid var(--border-subtle)',
      }}
      aria-label="Design and Engineering Process"
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 'clamp(3rem, 6vw, 5.5rem)',
            gap: '1.5rem',
          }}
        >
          <div>
            <div className="eyebrow-badge" style={{ marginBottom: '0.75rem' }}>
              <span>04 // METHODOLOGY</span>
            </div>
            <h2 className="heading-1" style={{ color: '#F8F8F6' }}>
              HOW WE DELIVER.
            </h2>
          </div>

          <div style={{ maxWidth: '380px' }}>
            <p className="body-regular" style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
              A disciplined, four-stage protocol combining rigorous strategic discovery with obsessive visual execution.
            </p>
          </div>
        </div>

        {/* Process Timeline Grid */}
        <div style={{ position: 'relative', maxWidth: '1080px', margin: '0 auto' }}>
          {/* Vertical Dynamic Progress Line */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              bottom: '40px',
              left: 'clamp(20px, 4vw, 40px)',
              width: '2px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              zIndex: 1,
            }}
          >
            <div
              ref={lineRef}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'var(--accent-primary)',
                transformOrigin: 'top center',
                boxShadow: '0 0 12px var(--accent-primary)',
              }}
            />
          </div>

          {/* Process Step Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(3rem, 6vw, 5rem)' }}>
            {processSteps.map((step, idx) => (
              <div
                key={step.step}
                ref={(el) => (stepsRef.current[idx] = el)}
                style={{
                  position: 'relative',
                  display: 'flex',
                  gap: 'clamp(2rem, 5vw, 4.5rem)',
                  zIndex: 2,
                }}
              >
                {/* Step Node Dot */}
                <div
                  style={{
                    width: 'clamp(40px, 8vw, 80px)',
                    display: 'flex',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      backgroundColor: '#111114',
                      border: '2px solid var(--accent-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: '#F8F8F6',
                      boxShadow: '0 0 20px rgba(255, 62, 24, 0.2)',
                    }}
                  >
                    {step.step}
                  </div>
                </div>

                {/* Step Content Card */}
                <div
                  style={{
                    flex: 1,
                    padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                    borderRadius: '16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem', gap: '0.5rem' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                        fontWeight: 800,
                        letterSpacing: '-0.02em',
                        color: '#F8F8F6',
                      }}
                    >
                      {step.title}
                    </h3>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        color: 'var(--accent-primary)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {step.subtitle}
                    </span>
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      color: 'var(--text-secondary)',
                      marginBottom: '1.5rem',
                      maxWidth: '720px',
                    }}
                  >
                    {step.description}
                  </p>

                  {/* Step Activities */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                    {step.details.map((detail) => (
                      <div
                        key={detail}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        <CheckCircle2 size={13} color="#FF3E18" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
