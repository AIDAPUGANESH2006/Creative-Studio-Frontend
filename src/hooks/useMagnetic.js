import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useMagnetic = (strength = 0.25) => {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Do not apply on touch devices or reduced motion
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const child = node.querySelector('[data-magnetic-child="true"]');

    const xTo = gsap.quickTo(node, 'x', { duration: 0.8, ease: 'power3.out' });
    const yTo = gsap.quickTo(node, 'y', { duration: 0.8, ease: 'power3.out' });

    let xToChild = null;
    let yToChild = null;
    if (child) {
      xToChild = gsap.quickTo(child, 'x', { duration: 0.6, ease: 'power3.out' });
      yToChild = gsap.quickTo(child, 'y', { duration: 0.6, ease: 'power3.out' });
    }

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = node.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      xTo(x * strength);
      yTo(y * strength);

      if (xToChild && yToChild) {
        xToChild(x * (strength * 1.6));
        yToChild(y * (strength * 1.6));
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      if (xToChild && yToChild) {
        xToChild(0);
        yToChild(0);
      }
    };

    node.addEventListener('mousemove', handleMouseMove);
    node.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      node.removeEventListener('mousemove', handleMouseMove);
      node.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return ref;
};
