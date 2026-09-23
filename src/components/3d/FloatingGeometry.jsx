import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const FloatingGeometry = ({ mousePos, isMobile }) => {
  const meshRef = useRef(null);
  const wireframeRef = useRef(null);
  const innerRef = useRef(null);

  // Smooth inertial rotation targets
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Time-based idle organic rotation
    const time = state.clock.getElapsedTime();
    
    // Inertial pointer reaction
    targetRotation.current.x = mousePos.current.y * 0.45;
    targetRotation.current.y = mousePos.current.x * 0.55;

    // Smooth interpolation (dampening)
    meshRef.current.rotation.x = THREE.MathUtils.damp(
      meshRef.current.rotation.x,
      targetRotation.current.x + time * 0.15,
      2.5,
      delta
    );
    meshRef.current.rotation.y = THREE.MathUtils.damp(
      meshRef.current.rotation.y,
      targetRotation.current.y + time * 0.2,
      2.5,
      delta
    );

    // Subtle breathing float
    meshRef.current.position.y = Math.sin(time * 0.8) * 0.12;

    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = -time * 0.1;
      wireframeRef.current.rotation.z = time * 0.15;
    }

    if (innerRef.current) {
      innerRef.current.rotation.y = -time * 0.3;
    }
  });

  const scale = isMobile ? 1.05 : 1.45;

  return (
    <group position={[0, 0, 0]} scale={scale}>
      {/* Outer Metallic Torus Knot Sculpture */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <torusKnotGeometry args={[1.3, 0.38, 128, 32, 2, 3]} />
        <meshPhysicalMaterial
          color="#161618"
          roughness={0.15}
          metalness={0.92}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
          wireframe={false}
        />
      </mesh>

      {/* Atmospheric Outer Wireframe Orbit */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[2.2, 2]} />
        <meshBasicMaterial
          color="#FF3E18"
          wireframe={true}
          transparent={true}
          opacity={0.12}
        />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#FF3E18"
          emissive="#FF3E18"
          emissiveIntensity={1.8}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
};
