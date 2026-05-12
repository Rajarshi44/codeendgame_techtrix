'use client'

import React, { useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'

interface AssetModelProps {
  modelPath: string
  scale?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
  autoRotate?: boolean
  autoRotateSpeed?: number
  interactive?: boolean
  environment?: "city" | "warehouse" | "studio" | "apartment" | "park" | "forest" | "dawn" | "sunset"
}

function Model({ 
  modelPath, 
  scale = 1, 
  position = [0, 0, 0], 
  autoRotate = false,
  autoRotateSpeed = 1.0 
}: { 
  modelPath: string
  scale?: number
  position?: [number, number, number]
  autoRotate?: boolean
  autoRotateSpeed?: number
}) {
  const outerGroup = useRef<THREE.Group>(null)
  const innerGroup = useRef<THREE.Group>(null)
  const { scene } = useGLTF(modelPath)
  
  // Center the model so it rotates on its own geometric center
  const centerOffset = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const center = new THREE.Vector3()
    box.getCenter(center)
    return center
  }, [scene])

  // Enhance materials
  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.castShadow = true
        mesh.receiveShadow = true
        if (modelPath.includes('award') && mesh.material && (mesh.material as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
          const mat = mesh.material as THREE.MeshStandardMaterial
          mat.metalness = Math.max(mat.metalness, 0.8)
          mat.roughness = Math.min(mat.roughness, 0.2)
        }
      }
    })
  }, [scene, modelPath])

  // Turntable spin on the model's own Y-axis
  useFrame((_, delta) => {
    if (autoRotate && outerGroup.current) {
      outerGroup.current.rotation.y += delta * autoRotateSpeed
    }
  })

  return (
    <group ref={outerGroup} position={position} scale={scale}>
      {/* Inner group offsets the model so its center is at origin, enabling true center-axis rotation */}
      <group ref={innerGroup} position={[-centerOffset.x, -centerOffset.y, -centerOffset.z]}>
        <primitive object={scene} />
      </group>
    </group>
  )
}

export default function AssetModel({ 
  modelPath,
  scale = 1, 
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoRotate = false,
  autoRotateSpeed = 1.0,
  interactive = false,
  environment = "city"
}: AssetModelProps) {
  
  useEffect(() => {
    useGLTF.preload(modelPath)
  }, [modelPath])

  return (
    <div className={`w-full h-full relative ${interactive ? 'z-[999] pointer-events-auto' : 'z-0 pointer-events-none'}`}>
      <Canvas
        camera={{ position: [0, 1, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        shadows
        style={{ background: 'transparent' }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0)
          scene.background = null
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow shadow-mapSize={1024} />
        <directionalLight position={[-5, 5, -5]} intensity={1} color="#ffffff" />
        
        <Environment preset={environment} background={false} />
        
        <React.Suspense fallback={null}>
          <Model 
            modelPath={modelPath}
            scale={scale} 
            position={position}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
          />
        </React.Suspense>
      </Canvas>
    </div>
  )
}
