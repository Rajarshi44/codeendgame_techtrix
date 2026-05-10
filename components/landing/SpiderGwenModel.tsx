'use client'

import React, { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, useAnimations, Environment, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { SkeletonUtils } from 'three-stdlib'

interface SpiderGwenModelProps {
  animationSequence?: string[]
  playCounts?: number[]
  animationSpeed?: number
  scale?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
  autoRotate?: boolean
  interactive?: boolean
}

function Model({ 
  animationSequence = [], 
  playCounts = [],
  animationSpeed = 1, 
  scale = 2, 
  position = [0, -2, 0]
}: Omit<SpiderGwenModelProps, 'autoRotate' | 'interactive' | 'rotation'>) {
  const group = useRef<THREE.Group>(null)
  const { scene: gltfScene, animations } = useGLTF('/models/spider_gwen.glb')
  
  // Clone the scene so we can safely mutate the hierarchy without WebGL crashes
  const scene = React.useMemo(() => {
    const clonedScene = SkeletonUtils.clone(gltfScene)
    
    // Fix visibility and frustum culling
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh || (child as THREE.SkinnedMesh).isSkinnedMesh) {
        const mesh = child as THREE.Mesh
        mesh.frustumCulled = false
      }
    })

    return clonedScene
  }, [gltfScene])

  const { actions, mixer } = useAnimations(animations, group)

  // Animation controller
  useEffect(() => {
    if (!actions || !mixer || animationSequence.length === 0) return

    mixer.timeScale = animationSpeed
    mixer.stopAllAction()

    let currentAnimIndex = 0

    const playNext = (index: number, crossfadeFrom?: THREE.AnimationAction) => {
      if (index >= animationSequence.length) return
      
      const animName = animationSequence[index]
      const action = actions[animName]
      if (!action) return

      action.reset()

      // If this is the last animation, loop infinitely. Otherwise, loop playCounts[index] times.
      if (index === animationSequence.length - 1) {
        action.setLoop(THREE.LoopRepeat, Infinity)
        action.clampWhenFinished = false
      } else {
        const reps = playCounts[index] || 1
        action.setLoop(THREE.LoopRepeat, reps)
        action.clampWhenFinished = true
      }

      action.play()
      if (crossfadeFrom) {
        action.crossFadeFrom(crossfadeFrom, 0.3, true)
      }
    }

    const handleFinished = (e: any) => {
      const currentAnimName = animationSequence[currentAnimIndex]
      if (e.action === actions[currentAnimName] && currentAnimIndex < animationSequence.length - 1) {
        const finishedAction = e.action
        currentAnimIndex++
        playNext(currentAnimIndex, finishedAction)
      }
    }

    mixer.addEventListener('finished', handleFinished)
    
    // Start the first animation
    playNext(0)

    return () => {
      mixer.removeEventListener('finished', handleFinished)
      mixer.stopAllAction()
    }
  }, [animationSequence, playCounts, animationSpeed, actions, mixer])

  // Pre-load the model
  useEffect(() => {
    useGLTF.preload('/models/spider_gwen.glb')
  }, [])

  // Allow the parent to pass in a specific rotation, otherwise default to 0
  return (
    <group ref={group} dispose={null} position={position} scale={scale}>
      <primitive object={scene} />
      {/* Dynamic rim lighting for the suit */}
      <pointLight position={[-3, 2, -3]} intensity={4} color="#ff3366" distance={10} />
      <pointLight position={[3, 2, -3]} intensity={4} color="#00e5ff" distance={10} />
    </group>
  )
}

export default function SpiderGwenModel({ 
  animationSequence, 
  playCounts,
  animationSpeed = 1,
  scale = 2, 
  position = [0, -2, 0],
  rotation = [0, 0, 0],
  autoRotate = false,
  interactive = false
}: SpiderGwenModelProps) {
  return (
    <div className={`w-full h-full relative ${interactive ? 'z-[999] pointer-events-auto' : 'z-0 pointer-events-none'}`}>
      <Canvas
        camera={{ position: [0, 1, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.5 }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 10, 5]} intensity={2.5} castShadow />
        <directionalLight position={[-5, 10, -5]} intensity={1.5} color="#aaccff" />
        <directionalLight position={[0, -5, 5]} intensity={1} color="#ffccaa" />
        
        {/* Use a better environment for glossy suit reflections */}
        <Environment preset="city" />
        
        {/* OrbitControls for interactivity and auto-rotation */}
        {(interactive || autoRotate) && (
          <OrbitControls 
            enablePan={false}
            enableZoom={false}
            autoRotate={autoRotate}
            autoRotateSpeed={1.5}
            minPolarAngle={Math.PI / 3} // Restrict looking from top down (60 degrees)
            maxPolarAngle={Math.PI / 1.8} // Restrict looking from bottom up (100 degrees)
          />
        )}
        
        <React.Suspense fallback={null}>
          {/* We apply the rotation wrapper here */}
          <group rotation={rotation}>
            <Model 
              animationSequence={animationSequence} 
              playCounts={playCounts}
              animationSpeed={animationSpeed} 
              scale={scale} 
              position={position} 
            />
          </group>
        </React.Suspense>
      </Canvas>
    </div>
  )
}
