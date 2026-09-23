import React, { useRef } from 'react';
import { projects } from '../data/projects';
import { WorkCard } from './WorkCard';
import { ArrowUpRight } from 'lucide-react';

export const Work = () => {
  const containerRef = useRef(null);

  return (
    <section
      id="work"
      ref={containerRef}
      className="section"
      aria-label="Selected Projects Showcase"
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '1.75rem',
            gap: '1.5rem',
          }}
        >
          <div>
            <div className="eyebrow-badge" style={{ marginBottom: '0.75rem' }}>
              <span>02 // SELECTED WORK</span>
            </div>
            <h2 className="heading-1" style={{ color: '#F8F8F6' }}>
              CRAFTED REALITIES.
            </h2>
          </div>

          <div style={{ maxWidth: '380px' }}>
            <p className="body-regular" style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
              A curated catalog of conceptual platforms, brand architectures, and spatial interfaces engineered with zero compromise.
            </p>
          </div>
        </div>

        {/* Project Asymmetrical Grid Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'var(--grid-gap)',
          }}
        >
          {/* Project 01 - ORBIT (Span 12) */}
          <div style={{ gridColumn: 'span 12 / span 12' }}>
            <WorkCard project={projects[0]} index={0} />
          </div>

          {/* Project 02 (MONUMENT) & 03 (AURA) - Asymmetric Split */}
          <div style={{ gridColumn: 'span 12 / span 12' }} className="project-split-col">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--grid-gap)' }}>
              <WorkCard project={projects[1]} index={1} />
              <WorkCard project={projects[2]} index={2} />
            </div>
          </div>

          {/* Project 04 - NOIR (Span 12) */}
          <div style={{ gridColumn: 'span 12 / span 12' }}>
            <WorkCard project={projects[3]} index={3} />
          </div>
        </div>

        {/* Bottom Commission Callout */}
        <div
          style={{
            marginTop: '1.5rem',
            padding: '2.25rem',
            borderRadius: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              LOOKING FOR BESPOKE COLLABORATION?
            </h4>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              We accept a strictly limited number of private client commissions per quarter.
            </p>
          </div>

          <a
            href="#contact"
            className="btn-pill-subtle"
            style={{
              padding: '0.75rem 1.4rem',
              fontSize: '0.78rem',
            }}
          >
            <span>INQUIRE COMMISSION</span>
            <ArrowUpRight size={14} color="#FF3E18" />
          </a>
        </div>
      </div>
    </section>
  );
};
