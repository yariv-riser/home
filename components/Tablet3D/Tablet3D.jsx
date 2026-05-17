'use client'

import React, { useRef, useState, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Float, Environment, OrbitControls } from '@react-three/drei'

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

  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // 1. Define a dictionary of materials
  const materials = useMemo(() => {
    return {
      casing: new THREE.MeshStandardMaterial({
        color: '#e6e3d5',
        metalness: 0.1,        // Low metalness for glass.
        roughness: 0.05,       // 0 = perfectly smooth glass. Increase for frosted glass.
        ior: 1.5,              // Index of refraction. 1.5 is standard for glass.
        thickness: 0.5,        // Volume thickness for light refraction.
        envMapIntensity: 1.5,  // Boosts the reflections from the <Environment />.
      }),
      screen: new THREE.MeshPhysicalMaterial({
        color: '#6855FB',
        metalness: 0.1,        // Low metalness for glass.
        roughness: 0.05,       // 0 = perfectly smooth glass. Increase for frosted glass.
        ior: 1.5,              // Index of refraction. 1.5 is standard for glass.
        thickness: 0.5,        // Volume thickness for light refraction.
        envMapIntensity: 1.5,  // Boosts the reflections from the <Environment />.
      }),
      button: new THREE.MeshStandardMaterial({
        color: '#00FF7F',
        metalness: 0.1,        // Low metalness for glass.
        roughness: 0.05,       // 0 = perfectly smooth glass. Increase for frosted glass.
        ior: 1.5,              // Index of refraction. 1.5 is standard for glass.
        thickness: 0.5,        // Volume thickness for light refraction.
        envMapIntensity: 1.5,  // Boosts the reflections from the <Environment />.
      }),
      accent: new THREE.MeshStandardMaterial({
        color: '#6855FB',
        metalness: 0.1,        // Low metalness for glass.
        roughness: 0.05,       // 0 = perfectly smooth glass. Increase for frosted glass.
        ior: 1.5,              // Index of refraction. 1.5 is standard for glass.
        thickness: 0.5,        // Volume thickness for light refraction.
        envMapIntensity: 1.5,  // Boosts the reflections from the <Environment />.
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
          // Using .includes() is handy if you have multiple buttons (e.g., 'Power_Button', 'Volume_Button')
          child.material = materials.button;
        }
        else {
          // A fallback material for any other parts we didn't explicitly name
          child.material = materials.accent;
        }
      }
    });
  }, [clonedScene, materials]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // meshRef.current.rotation.z += delta * 0.5;
    }
  })

  return (
    <primitive
      object={clonedScene}
      ref={meshRef}
      scale={0.145}
      position={[0, -1, 0]}
      rotation={[1.4, 0, 1.1]}
    />
  )
}

export default function Tablet3D() {
  const { width } = useDebouncedResize(200)

  return (
    <div className={`${styles['canvas-container']}`}>
      <Canvas
        key={width}
        camera={{ position: [-15, 0, 0], fov: 50 }}
      >
        <ambientLight intensity={1} />
        <Environment preset="city" />
        <Float floatingRange={[-0.3, 0.3]} speed={7} rotationIntensity={0} floatIntensity={1}>
          <Model />
        </Float>
        {/* <OrbitControls makeDefault /> */}
      </Canvas>
    </div>
  )
}