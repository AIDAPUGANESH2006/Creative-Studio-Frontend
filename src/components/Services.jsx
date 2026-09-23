import React, { useState, useRef } from 'react';
import { services } from '../data/services';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';

export const Services = () => {
  const [activeService, setActiveService] = useState(0);

  return (
    <section
      id="services"
      className="section"
      style={{
        backgroundColor: '#080808',
        borderTop: '1px solid var(--border-subtle)',
      }}
      aria-label="Studio Capabilities & Services"
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
              <span>03 // CAPABILITIES & CRAFT</span>
            </div>
            <h2 className="heading-1" style={{ color: '#F8F8F6' }}>
              WHAT WE ACCELERATE.
            </h2>
          </div>

          <div style={{ maxWidth: '380px' }}>
            <p className="body-regular" style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
              End-to-end creative direction and precision technology for visionary teams creating culture-defining products.
            </p>
          </div>
        </div>

        {/* Services Accordion List */}
        <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
          {services.map((service, index) => {
            const isActive = activeService === index;

            return (
              <div
                key={service.number}
                onClick={() => setActiveService(isActive ? -1 : index)}
                onMouseEnter={() => setActiveService(index)}
                style={{
                  borderBottom: '1px solid var(--border-subtle)',
                  padding: 'clamp(1.5rem, 3vw, 2.5rem) 0',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease, padding 0.3s ease',
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.015)' : 'transparent',
                }}
              >
                {/* Main Row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1.5rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1.5rem, 4vw, 3.5rem)' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1rem',
                        color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {service.number}
                    </span>

                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.5rem, 3.2vw, 2.75rem)',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                        transition: 'color 0.3s ease, transform 0.3s ease',
                        transform: isActive ? 'translateX(8px)' : 'translateX(0)',
                      }}
                    >
                      {service.title}
                    </h3>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--accent-primary)',
                        display: 'none',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                      className="service-accent-pill"
                    >
                      {service.accent}
                    </span>

                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        border: '1px solid',
                        borderColor: isActive ? 'var(--accent-primary)' : 'var(--border-subtle)',
                        backgroundColor: isActive ? 'var(--accent-primary)' : 'transparent',
                        color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {isActive ? <ArrowUpRight size={18} /> : <Plus size={18} />}
                    </div>
                  </div>
                </div>

                {/* Expandable Details Tray */}
                <div
                  style={{
                    maxHeight: isActive ? '400px' : '0px',
                    opacity: isActive ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
                    paddingLeft: 'clamp(2.5rem, 6vw, 5.5rem)',
                  }}
                >
                  <div
                    style={{
                      paddingTop: '1.5rem',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: '2rem',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1.05rem',
                        lineHeight: 1.6,
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {service.description}
                    </p>

                    <div>
                      <h4
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          color: 'var(--text-muted)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          marginBottom: '0.75rem',
                        }}
                      >
                        CORE DELIVERABLES
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {service.deliverables.map((item) => (
                          <span
                            key={item}
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.72rem',
                              padding: '0.3rem 0.75rem',
                              borderRadius: '9999px',
                              backgroundColor: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              color: '#F8F8F6',
                            }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .service-accent-pill {
            display: inline-block !important;
          }
        }
      `}</style>
    </section>
  );
};
