import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Menu } from 'lucide-react';
import { useMagnetic } from '../hooks/useMagnetic';
import { MobileMenu } from './MobileMenu';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const ctaMagneticRef = useMagnetic(0.25);
  const logoRef = useRef(null);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Manifesto', href: '#manifesto' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoMouseMove = (e) => {
    if (!logoRef.current) return;
    const { left, top, width, height } = logoRef.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.15;
    const y = (e.clientY - (top + height / 2)) * 0.15;
    logoRef.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleLogoMouseLeave = () => {
    if (!logoRef.current) return;
    logoRef.current.style.transform = 'translate(0px, 0px)';
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          padding: isScrolled ? '1rem 0' : 'clamp(1.2rem, 3vw, 2.5rem) 0',
          transition: 'padding 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
        }}
      >
        <div className="container" style={{ pointerEvents: 'auto' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: isScrolled
                ? '0.65rem 1.25rem'
                : '0.4rem 0',
              borderRadius: isScrolled ? '9999px' : '0',
              backgroundColor: isScrolled ? 'rgba(10, 10, 12, 0.75)' : 'transparent',
              backdropFilter: isScrolled ? 'blur(16px)' : 'none',
              WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
              border: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
              boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.5)' : 'none',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Logo */}
            <a
              href="#"
              ref={logoRef}
              onMouseMove={handleLogoMouseMove}
              onMouseLeave={handleLogoMouseLeave}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'transform 0.2s ease-out',
              }}
              aria-label="AETHER STUDIO Home"
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: '1.5px solid rgba(255, 255, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-primary)',
                    boxShadow: '0 0 10px var(--accent-primary)',
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  color: '#F8F8F6',
                }}
              >
                AETHER
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2.5rem',
              }}
              className="desktop-nav"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--text-secondary)',
                    position: 'relative',
                    padding: '0.25rem 0',
                    transition: 'color 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#FFF';
                    const underline = e.currentTarget.querySelector('.nav-underline');
                    if (underline) underline.style.transform = 'scaleX(1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    const underline = e.currentTarget.querySelector('.nav-underline');
                    if (underline) underline.style.transform = 'scaleX(0)';
                  }}
                >
                  {link.name}
                  <span
                    className="nav-underline"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '1px',
                      backgroundColor: 'var(--accent-primary)',
                      transform: 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.3s var(--ease-out-expo)',
                    }}
                  />
                </a>
              ))}
            </nav>

            {/* Desktop CTA & Mobile Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div ref={ctaMagneticRef} className="desktop-cta">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="btn-primary"
                  style={{
                    padding: '0.65rem 1.35rem',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.08em',
                  }}
                >
                  <span>LET'S TALK</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="mobile-menu-btn"
                aria-label="Open mobile navigation menu"
                style={{
                  display: 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#F8F8F6',
                }}
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Responsive Media Query Fix in CSS */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav, .desktop-cta {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
};
