import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const WorkCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);
  const infoRef = useRef(null);
  const titleRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Image reveal: clip-path inset(0 100% 0 0) -> inset(0 0 0 0) + scale 1.1 -> 1.0 + opacity 0 -> 1
      gsap.fromTo(
        imageWrapperRef.current,
        {
          clipPath: 'inset(0% 100% 0% 0%)',
          opacity: 0,
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.1,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        {
          scale: 1.12,
        },
        {
          scale: 1,
          duration: 1.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
          },
        }
      );

      // 2. Metadata Information Entrance
      gsap.fromTo(
        infoRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  // High performance pointer parallax
  const handleMouseMove = (e) => {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    gsap.to(imageRef.current, {
      x: x * 0.035,
      y: y * 0.035,
      scale: 1.05,
      duration: 0.5,
      ease: 'power2.out',
    });

    gsap.to(titleRef.current, {
      x: x * 0.015,
      duration: 0.4,
      ease: 'power2.out',
    });

    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        x: x * 0.05,
        y: y * 0.05,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

    gsap.to(imageRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power3.out',
    });

    gsap.to(titleRef.current, {
      x: 0,
      duration: 0.5,
      ease: 'power3.out',
    });

    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  return (
    <article
      ref={cardRef}
      data-cursor="project"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
        cursor: 'pointer',
      }}
      aria-label={`${project.title} - ${project.category}`}
    >
      {/* Visual Container */}
      <div
        ref={imageWrapperRef}
        style={{
          position: 'relative',
          width: '100%',
          borderRadius: '14px',
          overflow: 'hidden',
          backgroundColor: '#111114',
          aspectRatio: project.aspectRatio === '16/9' ? '16 / 9' : '4 / 3',
        }}
      >
        <img
          ref={imageRef}
          src={project.image}
          alt={`${project.title} project visual`}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            willChange: 'transform',
          }}
        />

        {/* Ambient Bottom Gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(8,8,8,0.65) 0%, rgba(8,8,8,0) 40%)',
            pointerEvents: 'none',
          }}
        />

        {/* Floating Top Bar */}
        <div
          style={{
            position: 'absolute',
            top: '1.25rem',
            left: '1.25rem',
            right: '1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(8, 8, 8, 0.75)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: '#F8F8F6',
              letterSpacing: '0.05em',
            }}
          >
            {project.stats.awards}
          </div>

          <div
            ref={arrowRef}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              backgroundColor: 'rgba(8, 8, 8, 0.75)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F8F8F6',
              transition: 'background-color 0.25s ease, border-color 0.25s ease',
            }}
          >
            <ArrowUpRight size={16} />
          </div>
        </div>
      </div>

      {/* Metadata & Description */}
      <div ref={infoRef} style={{ marginTop: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                color: 'var(--accent-primary)',
                fontWeight: 700,
              }}
            >
              {project.number}
            </span>
            <h3
              ref={titleRef}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#F8F8F6',
                transition: 'color 0.2s ease',
              }}
            >
              {project.title}
            </h3>
          </div>

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
            }}
          >
            {project.year}
          </span>
        </div>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.92rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.55,
            marginBottom: '0.75rem',
            maxWidth: '620px',
          }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.04em',
                padding: '0.2rem 0.55rem',
                borderRadius: '4px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                color: 'var(--text-muted)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};
