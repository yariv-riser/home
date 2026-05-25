'use client'

import React, { useRef, useState, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Float, Environment } from '@react-three/drei'

import styles from './Tablet3D.module.css';

function useDebouncedResize(delay = 100) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })

    let timeoutId
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      }, delay)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [delay])

  return windowSize
}

function Model() {
  const { scene } = useGLTF('/tablet.glb');
  const meshRef = useRef();

  // Track mouse coordinates independent of the canvas size
  const globalMouse = useRef({ x: 0, y: 0 });

  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Define a dictionary of materials
  const materials = useMemo(() => {
    return {
      casing: new THREE.MeshStandardMaterial({
        color: '#f5f5f5',      // Riser light grey
        metalness: 0.1,
        roughness: 0.05,
        ior: 1.5,
        thickness: 0.5,
        envMapIntensity: 1.5,
      }),
      screen: new THREE.MeshPhysicalMaterial({
        color: '#6855FB',      // Riser purple
        metalness: 0.1,
        roughness: 0.05,
        ior: 1.5,
        thickness: 0.5,
        envMapIntensity: 1.5,
      }),
      button: new THREE.MeshStandardMaterial({
        color: '#00FF7F',      // Riser neon green
        metalness: 0.1,
        roughness: 0.05,
        ior: 1.5,
        thickness: 0.5,
        envMapIntensity: 1.5,
      }),
      accent: new THREE.MeshStandardMaterial({
        color: '#111111',      // Riser dark 
        metalness: 0.1,
        roughness: 0.05,
        ior: 1.5,
        thickness: 0.5,
        envMapIntensity: 1.5,
      })
    };
  }, []);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        if (child.name === 'ChamferBox001_1_1') {
          child.material = materials.casing;
        }
        else if (child.name === 'ChamferBox001_1') {
          child.material = materials.screen;
        }
        else if (child.name.includes('Button')) {
          child.material = materials.button;
        }
        else {
          child.material = materials.accent;
        }
      }
    });
  }, [clonedScene, materials]);

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
    <group position={[0, -1, 0]} rotation={[1.4, 0, 1.1]}>
      <primitive
        object={clonedScene}
        ref={meshRef}
        scale={0.145}
      />
    </group>
  )
}

export default function Tablet3D() {
  const { width } = useDebouncedResize(200)

  return (
    <div
      className={styles['canvas-container']}
      role="region"
      aria-label="Interactive 3D Tablet"
    >
      <Canvas
        key={width}
        camera={{ position: [-15, 0, 0], fov: 50 }}
      >
        <ambientLight intensity={1} />
        <Environment preset="city" />
        <Float floatingRange={[-0.3, 0.3]} speed={7} rotationIntensity={0} floatIntensity={1}>
          <Model />
        </Float>
      </Canvas>
    </div>
  )
}