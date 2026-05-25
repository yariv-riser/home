'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Float, Environment } from '@react-three/drei'

import styles from './Rocket3D.module.css';

function Model({ onLoaded }) {
  const { scene } = useGLTF('/rocket.glb');
  const meshRef = useRef();

  // Track mouse coordinates independent of the canvas size
  const globalMouse = useRef({ x: 0, y: 0 });

  const clonedScene = useMemo(() => scene.clone(), [scene]);

  const debugMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#00FF7F',
      roughness: 0.3,
      metalness: 0.8,
    });
  }, []);

  useEffect(() => {
    let meshCount = 0;
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        meshCount++;
        child.material = debugMaterial;
      }
    });

    if (onLoaded) {
      onLoaded();
    }

  }, [clonedScene, debugMaterial, onLoaded]);

  // Normalize global pointer movement from -1 to 1 across the whole window
  useEffect(() => {
    const handleMouseMove = (event) => {
      globalMouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      globalMouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const targetX = globalMouse.current.x;
      const targetY = globalMouse.current.y;

      // Smoothly interpolate relative to the group's baseline rotation
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX * .5, delta * 1);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -targetY * .5, delta * 1);
    }
  })

  return (
    // The group holds the baseline position and slanted rotation
    <group position={[1, -1, 0]} rotation={[1.3, -1, 1.3]}>
      <primitive
        object={clonedScene}
        ref={meshRef}
        scale={0.00033}
      />
    </group>
  )
}

export default function Rocket3D() {
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  const handleModelLoaded = () => {
    setIsModelLoaded(true)
  }

  return (
    <div
      className={`${styles['canvas-container']} ${isModelLoaded ? styles['loaded'] : ''}`}
      role="region"
      aria-label="Interactive 3D Rocket"
    >
      <Canvas
        camera={{ position: [0, 0, -15], fov: 50 }}
      >
        <ambientLight intensity={1} />
        <Environment preset="city" />
        <Float floatingRange={[-0.3, 0.3]} speed={7} rotationIntensity={0} floatIntensity={1}>
          <Model onLoaded={handleModelLoaded} />
        </Float>
      </Canvas>
    </div>
  )
}