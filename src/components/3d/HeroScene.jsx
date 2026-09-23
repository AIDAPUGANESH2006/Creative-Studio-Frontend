import React, { useRef, useEffect, useState, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import { FloatingGeometry } from './FloatingGeometry';

class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export const HeroScene = () => {
  const mousePos = useRef({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }

    const mediaMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mediaMobile = window.matchMedia('(max-width: 768px)');

    setIsReducedMotion(mediaMotion.matches);
    setIsMobile(mediaMobile.matches);

    const handleMouseMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const fallbackView = (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '320px',
        height: '320px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 62, 24, 0.12) 0%, rgba(8, 8, 8, 0) 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );

  if (isReducedMotion || !webglSupported) {
    return fallbackView;
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
      <WebGLErrorBoundary fallback={fallbackView}>
        <Canvas
          camera={{ position: [0, 0, 5.2], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ pointerEvents: 'none' }}
        >
          {/* Subtle Ambient lighting */}
          <ambientLight intensity={0.35} />

          {/* Key Directional light */}
          <directionalLight position={[5, 8, 4]} intensity={1.2} color="#FFFFFF" />

          {/* Warm Amber Accent & Rim Lights */}
          <pointLight position={[-4, -2, -2]} intensity={2.0} color="#FF3E18" />
          <pointLight position={[3, -2, 2]} intensity={1.0} color="#FFA07A" />
          <pointLight position={[0, 4, -3]} intensity={0.8} color="#FFFFFF" />

          {/* 3D Spatial Geometry */}
          <FloatingGeometry mousePos={mousePos} isMobile={isMobile} />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
};
