import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './Ball3D.module.css';

export default function WireframeSphere() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = null;

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 4;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // 4. Model & Group Setup
    // We use a group to handle the mouse rotation independently from the sphere's tilt/spin
    const group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.SphereGeometry(2.4, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: '#158d51',
      wireframe: true,
    });
    const sphere = new THREE.Mesh(geometry, material);

    // Tilt the model exactly 90 degrees on its side (using your updated angles)
    sphere.rotation.z = Math.PI / 1.7;
    sphere.rotation.y = Math.PI / -3;
    group.add(sphere);

    // 5. Mouse Tracking Setup
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onMouseMove = (event) => {
      // Calculate mouse position relative to the center of the screen
      mouseX = (event.clientX - windowHalfX);
      mouseY = (event.clientY - windowHalfY);
    };
    window.addEventListener('mousemove', onMouseMove);

    // 6. Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate on the local axis, respecting the Z-axis tilt
      sphere.rotateY(0.0005);

      // Determine the target rotation based on mouse position (scale factor: 0.001)
      targetX = mouseY * 0.001;
      targetY = mouseX * 0.001;

      // Smoothly interpolate the group's rotation towards the target rotation
      group.rotation.x += 0.05 * (targetX - group.rotation.x);
      group.rotation.y += 0.05 * (targetY - group.rotation.y);

      renderer.render(scene, camera);
    };
    animate();

    // 7. Responsive Handling
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;

      renderer.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // 8. Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles['canvas-container']}
      role="application"
      aria-label="3D wireframe sphere model reacting to mouse movement"
    />
  );
}