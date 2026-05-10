'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SpiderModel from './SpiderModel'

interface IntroScreenProps {
  onEnter: () => void
}

export default function IntroScreen({ onEnter }: IntroScreenProps) {
  const [isExiting, setIsExiting] = useState(false)

  const handleEnter = () => {
    setIsExiting(true)
    setTimeout(onEnter, 1200)
  }

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="intro-screen"
          initial={{ opacity: 1 }}
          exit={{ y: '-100vh', opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
        >
          {/* Subtle red vignette */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(circle at center, transparent 30%, rgba(230, 25, 25, 0.08) 100%)'
          }} />

          {/* 3D Model Layer */}
          <div className="absolute inset-0 z-0">
            <SpiderModel 
              animationName="Armature|hero_spiderman01_S05@dash"
              animationSpeed={0.5}
              scale={2.5} 
              position={[0, -2.5, 0]} 
              autoRotate={true} 
            />
          </div>

          {/* UI Layer */}
          <div className="relative z-10 flex flex-col items-center justify-end h-full w-full pb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-center"
            >
              <h1 className="font-display text-[var(--void)] text-5xl md:text-7xl font-black tracking-widest mb-4 uppercase">
                CODE ENDGAME
              </h1>
              <p className="font-mono text-[var(--accent)] tracking-[0.3em] mb-12 uppercase text-sm">
                [ SECURE CONNECTION ESTABLISHED ]
              </p>

              <button
                onClick={handleEnter}
                className="group relative inline-flex items-center justify-center px-12 py-6 bg-transparent border-2 border-[var(--accent)] text-[var(--void)] overflow-hidden transition-colors"
              >
                <div className="absolute inset-0 bg-[var(--accent)] group-hover:h-0 transition-all duration-300 origin-bottom" />
                <span className="relative font-display text-2xl tracking-widest z-10 text-[var(--void)] group-hover:text-[var(--accent)] transition-colors duration-300">
                  INITIALIZE
                </span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
