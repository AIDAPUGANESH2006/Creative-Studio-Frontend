import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const dotRef = useRef(null);
  const followerRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [cursorState, setCursorState] = useState('default'); // 'default' | 'link' | 'project'
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const dot = dotRef.current;
    const follower = followerRef.current;
    if (!dot || !follower) return;

    // High performance quickTo setters
    const xDot = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' });

    const xFollower = gsap.quickTo(follower, 'x', { duration: 0.35, ease: 'power3.out' });
    const yFollower = gsap.quickTo(follower, 'y', { duration: 0.35, ease: 'power3.out' });

    const onMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      xDot(e.clientX);
      yDot(e.clientY);
      xFollower(e.clientX);
      yFollower(e.clientY);
    };

    const onMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const projectCard = target.closest('[data-cursor="project"]');
      const interactiveEl = target.closest('a, button, [data-cursor="pointer"], input, textarea');

      if (projectCard) {
        setCursorState('project');
        setCursorText('VIEW');
      } else if (interactiveEl) {
        setCursorState('link');
        setCursorText('');
      } else {
        setCursorState('default');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeaveWindow);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          opacity: isVisible && cursorState !== 'project' ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
        aria-hidden="true"
      />
      <div
        ref={followerRef}
        className={`cursor-follower ${
          cursorState === 'link'
            ? 'is-hovering-link'
            : cursorState === 'project'
            ? 'is-hovering-project'
            : ''
        }`}
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease, width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, border-color 0.3s ease',
        }}
        aria-hidden="true"
      >
        {cursorState === 'project' && <span>{cursorText}</span>}
      </div>
    </>
  );
};
