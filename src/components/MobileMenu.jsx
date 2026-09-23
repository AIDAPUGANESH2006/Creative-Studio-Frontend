import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, X } from 'lucide-react';

export const MobileMenu = ({ isOpen, onClose, navLinks }) => {
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const footerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const ctx = gsap.context(() => {
        gsap.to(menuRef.current, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 0.6,
          ease: 'power3.inOut',
        });

        gsap.fromTo(
          linksRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            delay: 0.2,
          }
        );

        gsap.fromTo(
          footerRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.4, ease: 'power2.out' }
        );
      }, menuRef);

      return () => ctx.revert();
    } else {
      document.body.style.overflow = '';
      gsap.to(menuRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 0.5,
        ease: 'power3.inOut',
      });
    }
  }, [isOpen]);

  const handleLinkClick = (href) => {
    onClose();
    const target = document.querySelector(href);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  };

  return (
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#080808',
        zIndex: 990,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(2rem, 6vw, 4rem) clamp(1.5rem, 5vw, 3rem)',
        color: '#F8F8F6',
      }}
      aria-hidden={!isOpen}
    >
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#FF3E18' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.15em' }}>
            AETHER STUDIO
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close navigation menu"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 44,
            height: 44,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#FFF',
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Nav Links */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', margin: 'auto 0' }}>
        {navLinks.map((link, i) => (
          <div key={link.name} style={{ overflow: 'hidden' }}>
            <a
              ref={(el) => (linksRef.current[i] = el)}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '1rem',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 9vw, 4.5rem)',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                color: '#F8F8F6',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FF3E18')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#F8F8F6')}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#FF3E18', fontWeight: 400 }}>
                0{i + 1}
              </span>
              <span>{link.name}</span>
            </a>
          </div>
        ))}
      </nav>

      {/* Footer Info */}
      <div
        ref={footerRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#666660' }}>
              DIRECT INQUIRIES
            </p>
            <a
              href="mailto:hello@aetherstudio.design"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                color: '#F8F8F6',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                marginTop: '0.2rem',
              }}
            >
              hello@aetherstudio.design <ArrowUpRight size={14} color="#FF3E18" />
            </a>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#666660' }}>
              LOCATION
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#A6A6A0', marginTop: '0.2rem' }}>
              PARIS // TOKYO
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
