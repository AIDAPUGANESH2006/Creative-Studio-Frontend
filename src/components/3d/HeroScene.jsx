import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { FloatingGeometry } from './FloatingGeometry';

export const HeroScene = () => {
  const mousePos = useRef({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mediaMobile = window.matchMedia('(max-width: 768px)');

    setIsReducedMotion(mediaMotion.matches);
    setIsMobile(mediaMobile.matches);

    const handleMouseMove = (e) => {
      // Normalize mouse to -1 to +1
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isReducedMotion) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.15,
        }}
      >
        <div
          style={{
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            border: '2px solid var(--accent-primary)',
            boxShadow: '0 0 40px rgba(255, 62, 24, 0.3)',
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'none' }}
      >
        {/* Ambient lighting */}
        <ambientLight intensity={0.4} />

        {/* Key Directional light */}
        <directionalLight position={[5, 8, 4]} intensity={1.5} color="#FFFFFF" />

        {/* Warm Amber Rim & Accent Lights */}
        <pointLight position={[-4, -3, -2]} intensity={2.5} color="#FF3E18" />
        <pointLight position={[3, -2, 2]} intensity={1.2} color="#FFA07A" />
        <pointLight position={[0, 4, -3]} intensity={1.0} color="#FFFFFF" />

        {/* 3D Kinetic Object */}
        <FloatingGeometry mousePos={mousePos} isMobile={isMobile} />
      </Canvas>
    </div>
  );
};
