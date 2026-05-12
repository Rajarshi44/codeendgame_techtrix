'use client'

import React, { useEffect, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { useGLTF, useAnimations, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { SkeletonUtils } from 'three-stdlib'

interface GhostSpiderProps {
  animationName?: string
  animationSpeed?: number
  autoRotate?: boolean
}

function Model({ 
  animationName = "ST_Ent_GhostSpider|Anim_GhostSpider_Shell_Fidget|Base Layer", 
  animationSpeed = 1, 
}: GhostSpiderProps) {
  const group = useRef<THREE.Group>(null)
  const { scene: gltfScene, animations } = useGLTF('/models/ghost-spider_-_marvel_strike_force.glb')
  const { camera } = useThree()
  
  const scene = React.useMemo(() => {
    const clonedScene = SkeletonUtils.clone(gltfScene)
    
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh || (child as THREE.SkinnedMesh).isSkinnedMesh) {
        const mesh = child as THREE.Mesh
        mesh.frustumCulled = false
      }
    })

    return clonedScene
  }, [gltfScene])

  const { actions, mixer } = useAnimations(animations, group)

  // Auto-center + fit camera
  useEffect(() => {
    if (!group.current) return

    const box = new THREE.Box3().setFromObject(group.current)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())

    group.current.position.x = -center.x
    group.current.position.y = -center.y
    group.current.position.z = -center.z

    const modelHeight = size.y
    const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180)
    let cameraZ = (modelHeight / 2) / Math.tan(fov / 2)
    cameraZ *= 1.5
    
    camera.position.set(0, 0, cameraZ)
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  }, [scene, camera])

  // Animation
  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0) return

    if (animationName && !actions[animationName]) {
      console.warn(`[GhostSpider] Animation '${animationName}' not found. Available:`, Object.keys(actions))
    }

    Object.values(actions).forEach(a => a?.stop())

    const primary = (animationName && actions[animationName]) 
      ? actions[animationName] 
      : actions[Object.keys(actions)[0]]

    if (!primary) return
    primary.reset()
    primary.setEffectiveTimeScale(animationSpeed)
    primary.setLoop(THREE.LoopRepeat, Infinity)
    primary.play()
  }, [actions, mixer, animationName, animationSpeed])

  return <primitive ref={group} object={scene} />
}

export default function GhostSpiderModel({ 
  animationName = "ST_Ent_GhostSpider|Anim_GhostSpider_Shell_Fidget|Base Layer", 
  animationSpeed = 1,
  autoRotate = true,
}: GhostSpiderProps) {
  return (
    <div className="w-full h-full relative z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 8, 5]} intensity={3} color="#ffffff" />
        <directionalLight position={[-5, 3, -5]} intensity={1.2} color="#b8c8ff" />
        <directionalLight position={[0, -3, 5]} intensity={0.5} color="#ffeedd" />
        
        <React.Suspense fallback={null}>
          <Model animationName={animationName} animationSpeed={animationSpeed} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate={autoRotate}
            autoRotateSpeed={1.5}
            enableDamping
            minPolarAngle={Math.PI / 2 - 0.3}
            maxPolarAngle={Math.PI / 2 + 0.15}
          />
        </React.Suspense>
      </Canvas>
    </div>
  )
}

useGLTF.preload('/models/ghost-spider_-_marvel_strike_force.glb')


