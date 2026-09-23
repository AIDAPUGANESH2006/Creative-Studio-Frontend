import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Compass, Cpu, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Intro = () => {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);
  const statsRef = useRef([]);

  const statementText = "We turn strategy, design and technology into digital experiences that move people.";
  const words = statementText.split(' ');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Progressive word-by-word reveal scrubbed to scroll
      gsap.fromTo(
        wordsRef.current,
        {
          opacity: 0.15,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'center 40%',
            scrub: 0.8,
          },
        }
      );

      // Stats reveal
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'center 60%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: "Design Accolades", value: "14+", icon: Award, detail: "FWA, Awwwards & CSSDA Honors" },
    { label: "Core Web Vitals", value: "99.8%", icon: Zap, detail: "Flawless Performance Score" },
    { label: "Shipped Realities", value: "40+", icon: Cpu, detail: "Spatial & Web Platforms" },
    { label: "Global Reach", value: "12", icon: Compass, detail: "Countries & Timezones" },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="section"
      style={{
        backgroundColor: '#0A0A0C',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
      aria-label="About AETHER Studio"
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
          <div className="eyebrow-badge">
            <span>01 // THE MANIFESTO & PHILOSOPHY</span>
          </div>
        </div>

        {/* Large Editorial Kinetic Typography Statement */}
        <div style={{ maxWidth: '1280px', marginBottom: 'clamp(4rem, 8vw, 7rem)' }}>
          <p
            className="display-manifesto"
            style={{
              lineHeight: 1.15,
              color: 'var(--text-primary)',
            }}
          >
            {words.map((word, index) => {
              const isHighlight = ['strategy,', 'design', 'technology', 'move', 'people.'].includes(word.toLowerCase());
              return (
                <span
                  key={index}
                  ref={(el) => (wordsRef.current[index] = el)}
                  style={{
                    display: 'inline-block',
                    marginRight: '0.3em',
                    color: isHighlight ? '#F8F8F6' : '#A6A6A0',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {word}
                </span>
              );
            })}
          </p>
        </div>

        {/* Secondary Asymmetrical Narrative & Metrics */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'var(--grid-gap)',
            alignItems: 'start',
          }}
        >
          {/* Narrative Column */}
          <div style={{ gridColumn: 'span 12 / span 12' }} className="intro-narrative-col">
            <h3
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--accent-primary)',
                marginBottom: '1.25rem',
              }}
            >
              CRAFT OVER CONFORMITY
            </h3>
            <p
              className="body-regular"
              style={{
                fontSize: 'clamp(1rem, 1.1vw, 1.25rem)',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                marginBottom: '1.5rem',
              }}
            >
              In an era overflowing with homogenized digital templates and disposable attention, we practice radical visual intentionality. Every interaction is calculated, every millisecond of motion is purposeful, and every typographic weight is calibrated to elevate human emotion.
            </p>
            <p
              className="body-regular"
              style={{
                fontSize: 'clamp(0.9rem, 0.95vw, 1.05rem)',
                lineHeight: 1.65,
                color: 'var(--text-muted)',
              }}
            >
              We operate as a high-density, boutique design and engineering unit, collaborating exclusively with forward-looking brands who demand an indelible digital footprint.
            </p>
          </div>

          {/* Metrics Grid */}
          <div style={{ gridColumn: 'span 12 / span 12' }} className="intro-stats-col">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {stats.map((stat, idx) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={stat.label}
                    ref={(el) => (statsRef.current[idx] = el)}
                    style={{
                      padding: '1.75rem 1.5rem',
                      borderRadius: '16px',
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--border-subtle)',
                      transition: 'border-color 0.3s ease, transform 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 62, 24, 0.3)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(2rem, 3vw, 2.75rem)',
                          fontWeight: 800,
                          color: '#F8F8F6',
                          lineHeight: 1,
                        }}
                      >
                        {stat.value}
                      </span>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255, 62, 24, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--accent-primary)',
                        }}
                      >
                        <IconComponent size={18} />
                      </div>
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--text-primary)',
                        marginBottom: '0.35rem',
                      }}
                    >
                      {stat.label}
                    </p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {stat.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .intro-narrative-col {
            grid-column: span 5 / span 5 !important;
          }
          .intro-stats-col {
            grid-column: span 7 / span 7 !important;
          }
        }
      `}</style>
    </section>
  );
};
