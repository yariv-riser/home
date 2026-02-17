'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment, Float } from '@react-three/drei'

// 1. Debounce Utility
// Prevents the function from firing too many times while dragging
function useDebouncedResize(delay = 100) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Set initial size
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
  const { scene } = useGLTF('/logo.gltf')
  const meshRef = useRef()

  // We can access viewport here directly now, 
  // because the entire Canvas is getting refreshed on resize.
  const { viewport } = useThree()

  // Calculate scale based on the fresh viewport
  const responsiveScale = viewport.width < 5 ? 0.02 : 0.06

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 1
    }
  })

  return (
    <primitive
      object={scene}
      ref={meshRef}
      scale={responsiveScale}
    />
  )
}

export default function Hero3D({ className }) {
  // 2. Track Window Size in the Parent
  const { width } = useDebouncedResize(200) // 200ms delay

  return (
    <Canvas
      key={width}
      camera={{ position: [0, 0, 5], fov: 50 }}
      className={className}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} />
      <Environment preset="city" />

      <Model />
    </Canvas>
  )
}