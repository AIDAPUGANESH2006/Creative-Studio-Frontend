import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const FloatingGeometry = ({ mousePos, isMobile }) => {
  const meshRef = useRef(null);
  const wireframeRef = useRef(null);
  const innerRef = useRef(null);
  const particlesRef = useRef(null);
  const timeRef = useRef(0);

  // Smooth inertial rotation targets
  const targetRotation = useRef({ x: 0, y: 0 });

  // Generate background constellation particles
  const particleCount = isMobile ? 120 : 260;
  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const sc = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
      sc[i] = Math.random() * 0.8 + 0.2;
    }
    return [pos, sc];
  }, [particleCount]);

  useFrame((_, delta) => {
    // Accumulate smooth delta time (zero console warnings)
    timeRef.current += delta;
    const time = timeRef.current;

    // Inertial pointer reaction with damping
    targetRotation.current.x = mousePos.current.y * 0.35;
    targetRotation.current.y = mousePos.current.x * 0.45;

    if (meshRef.current) {
      meshRef.current.rotation.x = THREE.MathUtils.damp(
        meshRef.current.rotation.x,
        targetRotation.current.x + time * 0.12,
        2.2,
        delta
      );
      meshRef.current.rotation.y = THREE.MathUtils.damp(
        meshRef.current.rotation.y,
        targetRotation.current.y + time * 0.16,
        2.2,
        delta
      );
      meshRef.current.position.y = Math.sin(time * 0.7) * 0.08;
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = -time * 0.08;
      wireframeRef.current.rotation.z = time * 0.1;
    }

    if (innerRef.current) {
      innerRef.current.rotation.y = -time * 0.25;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.03 + mousePos.current.x * 0.05;
      particlesRef.current.rotation.x = time * 0.02 + mousePos.current.y * 0.05;
    }
  });

  const scale = isMobile ? 0.95 : 1.35;

  return (
    <group position={[0, 0, 0]}>
      {/* Central Spatial Geometry */}
      <group scale={scale}>
        {/* Outer Metallic Torus Knot Sculpture */}
        <mesh ref={meshRef} castShadow receiveShadow>
          <torusKnotGeometry args={[1.25, 0.36, 128, 32, 2, 3]} />
          <meshPhysicalMaterial
            color="#121214"
            roughness={0.2}
            metalness={0.94}
            clearcoat={0.85}
            clearcoatRoughness={0.15}
            reflectivity={0.9}
            wireframe={false}
          />
        </mesh>

        {/* Constellation Wireframe Orbit */}
        <mesh ref={wireframeRef}>
          <icosahedronGeometry args={[2.1, 2]} />
          <meshBasicMaterial
            color="#FF3E18"
            wireframe={true}
            transparent={true}
            opacity={0.09}
          />
        </mesh>

        {/* Inner Glowing Core */}
        <mesh ref={innerRef}>
          <octahedronGeometry args={[0.65, 0]} />
          <meshStandardMaterial
            color="#FF3E18"
            emissive="#FF3E18"
            emissiveIntensity={1.5}
            roughness={0.25}
            metalness={0.8}
          />
        </mesh>
      </group>

      {/* Floating Constellation Particle Field */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#FF3E18"
          transparent={true}
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};
