import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowUpRight, Globe } from 'lucide-react';

export const Footer = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in 24-hr format with seconds
      const timeString = now.toLocaleTimeString('en-US', {
        timeZone: 'Europe/Paris',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Selected Work', href: '#work' },
    { label: 'Studio Philosophy', href: '#about' },
    { label: 'Capabilities', href: '#services' },
    { label: 'Methodology', href: '#process' },
    { label: 'Manifesto', href: '#manifesto' },
  ];

  const socialLinks = [
    { label: 'Awwwards', href: 'https://awwwards.com' },
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'X / Twitter', href: 'https://twitter.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'GitHub', href: 'https://github.com' },
  ];

  return (
    <footer
      style={{
        backgroundColor: '#050506',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: 'clamp(4rem, 8vw, 6rem)',
        paddingBottom: '2.5rem',
        color: '#F8F8F6',
        position: 'relative',
      }}
      aria-label="Site Footer"
    >
      <div className="container">
        {/* Top Tier: Studio Identity & Live Clocks */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            paddingBottom: '3.5rem',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          {/* Brand & Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#FF3E18' }} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, letterSpacing: '0.05em' }}>
                AETHER STUDIO
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '300px' }}>
              Turning attention into meaningful action through radical visual design and high-performance engineering.
            </p>
          </div>

          {/* Studio Navigation */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '1.2rem' }}>
              NAVIGATION
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      color: 'var(--text-secondary)',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FF3E18')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Index */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '1.2rem' }}>
              INDEX & SOCIALS
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      color: 'var(--text-secondary)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight size={12} color="#FF3E18" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Live Studio Time & Coordinates */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '1.2rem' }}>
              STUDIO TIME
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 700, color: '#F8F8F6' }}>
                {time || '12:00:00'} <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)' }}>CET</span>
              </span>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                PARIS HQ // LAT: 48.8566, LON: 2.3522
              </p>
            </div>

            {/* Back to Top */}
            <div style={{ marginTop: '1.75rem' }}>
              <button
                onClick={scrollToTop}
                className="btn-pill-subtle"
                style={{ cursor: 'pointer' }}
                aria-label="Scroll to top of page"
              >
                <ArrowUp size={13} color="#FF3E18" />
                <span>BACK TO TOP</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Legal */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '2rem',
            gap: '1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>© {new Date().getFullYear()} AETHER STUDIO. ALL RIGHTS RESERVED.</span>
          </div>

          <div>
            <span>INSPIRED BY MODERN CREATIVE ADAPTATION // SIXJULY ASSESSMENT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
