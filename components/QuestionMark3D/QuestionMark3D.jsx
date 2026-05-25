'use client'

import React, { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text3D, Center, Float, Environment } from '@react-three/drei'
import styles from './QuestionMark3D.module.css'

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

function QuestionModel() {
  const pointerRef = useRef();
  const spinRef = useRef();

  // Track global mouse coordinates
  const globalMouse = useRef({ x: 0, y: 0 });

  // Normalize global pointer movement from -1 to 1
  useEffect(() => {
    const handleMouseMove = (event) => {
      globalMouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      globalMouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    // 1. Pointer tracking interpolation
    if (pointerRef.current) {
      const targetX = globalMouse.current.x;
      const targetY = globalMouse.current.y;

      pointerRef.current.rotation.y = THREE.MathUtils.lerp(pointerRef.current.rotation.y, targetX * .5, delta * 1);
      pointerRef.current.rotation.x = THREE.MathUtils.lerp(pointerRef.current.rotation.x, -targetY * .5, delta * 1);
    }

    // 2. Constant spinning animation
    if (spinRef.current) {
      spinRef.current.rotation.y += 0.3 * delta;
    }
  })

  return (
    // Outer group holds the static baseline tilt
    <group rotation={[9.6, 0, 9.6]}>
      {/* Middle group handles the mouse pointer rotation */}
      <group ref={pointerRef}>
        {/* Inner group handles the constant spinning */}
        <group ref={spinRef}>
          <Center>
            <Text3D
              font="/Handjet_Regular_Facetype.json"
              size={6}
              height={0.4}
            >
              ?
              <meshStandardMaterial
                color="#6855FB" // Riser purple
              />
            </Text3D>
          </Center>
        </group>
      </group>
    </group>
  )
}

export default function QuestionMark3D() {
  const { width } = useDebouncedResize(200)

  return (
    <section className={styles['question-section']} aria-label="Interactive 3D question mark module">
      <div
        className={styles['canvas-container']}
        role="application"
        aria-label="Interactive 3D metallic question mark reacting to mouse movement"
      >
        <Canvas
          key={width}
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{ antialias: false, alpha: true }}
        >
          <ambientLight intensity={1} />
          <Environment preset="city" />
          <QuestionModel />
        </Canvas>
      </div>
    </section>
  )
}