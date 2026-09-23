import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { useMagnetic } from '../hooks/useMagnetic';

export const CTA = () => {
  const [copied, setCopied] = useState(false);
  const magneticButtonRef = useMagnetic(0.28);
  const email = "hello@aetherstudio.design";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section
      id="contact"
      className="section"
      style={{
        position: 'relative',
        backgroundColor: '#080808',
        paddingTop: 'clamp(5rem, 11vw, 10rem)',
        paddingBottom: 'clamp(5rem, 11vw, 10rem)',
        overflow: 'hidden',
      }}
      aria-label="Contact and Collaboration Inquiry"
    >
      {/* Background Radial Glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '75vw',
          maxWidth: '850px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 62, 24, 0.14) 0%, rgba(8, 8, 8, 0) 70%)',
          filter: 'blur(75px)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <div className="eyebrow-badge">
            <span>INITIATE COLLABORATION</span>
          </div>
        </div>

        {/* Large Headline */}
        <h2
          className="display-hero"
          style={{
            maxWidth: '1100px',
            margin: '0 auto 2rem',
            lineHeight: 0.95,
          }}
        >
          LET'S MAKE <br />
          <span style={{ color: 'var(--accent-primary)' }}>SOMETHING</span> <br />
          MEMORABLE.
        </h2>

        <p
          className="body-lead"
          style={{
            maxWidth: '540px',
            margin: '0 auto 3rem',
            color: 'var(--text-secondary)',
          }}
        >
          Whether you're redefining an entire industry or building a category-defining flagship platform, our studio is ready.
        </p>

        {/* Magnetic CTA Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.25rem',
          }}
        >
          <div ref={magneticButtonRef}>
            <a
              href={`mailto:${email}?subject=Project%20Inquiry%20%E2%80%94%20AETHER%20Studio`}
              className="btn-primary"
              style={{
                padding: '1.15rem 2.5rem',
                fontSize: '0.92rem',
              }}
            >
              <span>START A PROJECT</span>
              <ArrowUpRight size={19} data-magnetic-child="true" />
            </a>
          </div>

          <button
            onClick={handleCopyEmail}
            className="btn-pill-subtle"
            style={{
              padding: '1rem 1.6rem',
              fontSize: '0.82rem',
              cursor: 'pointer',
            }}
            aria-label="Copy studio email address"
          >
            {copied ? <Check size={15} color="#FF3E18" /> : <Copy size={15} />}
            <span>{copied ? 'EMAIL COPIED TO CLIPBOARD' : email}</span>
          </button>
        </div>

        {/* Studio Status Notification */}
        <div style={{ marginTop: '3.5rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.08em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#4ADE80' }} />
            CURRENTLY ACCEPTING COMMISSIONS FOR Q2 / Q3 2026
          </span>
        </div>
      </div>
    </section>
  );
};
