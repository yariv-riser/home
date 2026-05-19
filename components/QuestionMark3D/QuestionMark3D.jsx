'use client'

import React, { useRef, useState, useEffect } from 'react'
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
  const groupRef = useRef();
  const spinRef = useRef() // 1. Create a new ref for the spinning axis

  useFrame((state, delta) => {
    groupRef.current.rotation.z = 9.6;
    groupRef.current.rotation.x = 9.6;
    // 2. Apply the rotation to the wrapper group, NOT the text mesh directly
    if (spinRef.current) {
      spinRef.current.rotation.y += 0.3 * delta;
    }
  })

  return (
    <group ref={groupRef}>
      {/* 3. Wrap the <Center> component in our spinning group */}
      <group ref={spinRef}>
        <Center>
          <Text3D
            font="/Handjet_Regular_Facetype.json"
            size={6}
            height={0.4}
          >
            ?
            <meshStandardMaterial
              color="#6855FB"
            />
          </Text3D>
        </Center>
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