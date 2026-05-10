'use client'

import React, { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { SkeletonUtils } from 'three-stdlib'

interface SpiderModelProps {
  animationName?: string
  nextAnimationName?: string
  animationSpeed?: number
  playCount?: number
  scale?: number
  position?: [number, number, number]
  autoRotate?: boolean
  interactive?: boolean
}

function Model({ 
  animationName, 
  nextAnimationName, 
  animationSpeed = 1, 
  playCount = 1, 
  scale = 2, 
  position = [0, -2, 0] 
}: SpiderModelProps) {
  const group = useRef<THREE.Group>(null)
  const { scene: gltfScene, animations } = useGLTF('/models/iron_spider.glb')
  
  // Clone the scene so we can safely mutate the hierarchy without WebGL crashes
  const scene = React.useMemo(() => {
    const clonedScene = SkeletonUtils.clone(gltfScene)
    
    // Fix visibility and frustum culling
    clonedScene.traverse((child) => {
      const name = child.name.toLowerCase()
      
      if ((child as THREE.Mesh).isMesh || (child as THREE.SkinnedMesh).isSkinnedMesh) {
        const mesh = child as THREE.Mesh
        mesh.frustumCulled = false
        
        const meshName = ((mesh as THREE.SkinnedMesh).geometry?.name || '').toLowerCase()
        const matName = ((mesh.material as THREE.Material)?.name || '').toLowerCase()
        const objName = mesh.name.toLowerCase()
        
        // Hide environment props (rocks, webs) AND the tentacle meshes.
        // The original 3D artist explicitly placed the tentacle meshes 136 units away 
        // to hide them during this specific dialog animation. Attempting to force them 
        // back using skeleton.bind() corrupts the shared skeleton, causing the hands to stretch.
        if (
          name.includes('object_124') || name.includes('object_126') ||
          name.includes('spider_wp') || name.includes('web02') ||
          meshName.includes('spider_wp') || meshName.includes('web02') ||
          matName.includes('web') || matName.includes('spider_wp') ||
          name.includes('kingpin_wp') || meshName.includes('kingpin_wp') || matName.includes('kingpin_wp') ||
          name.includes('ironspiderman02') || meshName.includes('ironspiderman02')
        ) {
          mesh.visible = false
        }
      }
    })

    return clonedScene
  }, [gltfScene])

  const { actions, mixer } = useAnimations(animations, group)

  // Animation controller
  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0) return

    // Stop everything
    Object.values(actions).forEach(a => a?.stop())

    // Find the requested animation or fall back to the first one
    const primary = (animationName && actions[animationName]) 
      ? actions[animationName] 
      : actions[Object.keys(actions)[0]]

    if (!primary) return

    primary.reset()
    primary.setEffectiveTimeScale(animationSpeed)

    // If we have a follow-up animation, play the primary a fixed number of times then crossfade
    if (nextAnimationName && actions[nextAnimationName]) {
      primary.setLoop(THREE.LoopRepeat, playCount)
      primary.clampWhenFinished = true
      primary.play()

      const onFinish = (e: { action: THREE.AnimationAction }) => {
        if (e.action === primary) {
          const next = actions[nextAnimationName]!
          next.reset()
          next.setEffectiveTimeScale(animationSpeed)
          next.setLoop(THREE.LoopRepeat, Infinity)
          next.play()
          next.crossFadeFrom(primary, 0.5, true)
        }
      }

      mixer.addEventListener('finished', onFinish)
      return () => { mixer.removeEventListener('finished', onFinish) }
    } else {
      primary.setLoop(THREE.LoopRepeat, Infinity)
      primary.play()
    }
  }, [actions, mixer, animationName, nextAnimationName, animationSpeed, playCount])

  return (
    <primitive ref={group} object={scene} scale={scale} position={position} />
  )
}

export default function SpiderModel({ 
  animationName, 
  nextAnimationName,
  animationSpeed = 1,
  playCount = 1,
  scale = 2, 
  position = [0, -2, 0],
  autoRotate = false,
  interactive = false
}: SpiderModelProps) {
  return (
    <div className={`w-full h-full relative ${interactive ? 'z-10' : 'z-0 pointer-events-none'}`}>
      <Canvas
        camera={{ position: [0, 1, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, 10, -5]} intensity={0.5} />
        
        <Environment preset="studio" />
        
        <React.Suspense fallback={null}>
          <Model 
            animationName={animationName} 
            nextAnimationName={nextAnimationName}
            animationSpeed={animationSpeed} 
            playCount={playCount}
            scale={scale} 
            position={position} 
          />
          
          <ContactShadows 
            position={[0, position[1], 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={4} 
          />
          
          <OrbitControls 
            enableZoom={interactive} 
            enablePan={interactive}
            autoRotate={autoRotate}
            autoRotateSpeed={1.5}
            enableDamping
          />
        </React.Suspense>
      </Canvas>
    </div>
  )
}

useGLTF.preload('/models/iron_spider.glb')
