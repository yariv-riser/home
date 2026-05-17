'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Float, Environment, OrbitControls } from '@react-three/drei'

import styles from './Rocket3D.module.css';

function Model({ onLoaded }) {
  const { scene } = useGLTF('/rocket.glb');
  const meshRef = useRef();
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

  useFrame((state, delta) => {
    if (meshRef.current) {
      // meshRef.current.rotation.z += delta * 0.1;
      // meshRef.current.rotation.y += delta * 0.1;
    }
  })

  return (
    <primitive
      object={clonedScene}
      ref={meshRef}
      scale={0.00033}
      position={[1, -1, 0]}
      rotation={[1.3, -1, 1.3]}
    />
  )
}

export default function Rocket3D() {
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  const handleModelLoaded = () => {
    console.log('rocket loaded');
    setIsModelLoaded(true)
  }

  return (
    <div className={`${styles['canvas-container']} ${isModelLoaded ? styles['loaded'] : ''}`}>
      <Canvas
        camera={{ position: [0, 0, -15], fov: 50 }}
      >
        <ambientLight intensity={1} />
        <Environment preset="city" />
        <Float floatingRange={[-0.3, 0.3]} speed={7} rotationIntensity={0} floatIntensity={1}>
          <Model onLoaded={handleModelLoaded} />
        </Float>
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  )
}