'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import SpiderGwenModel from './SpiderGwenModel'
import GridScan from './GridScan'

interface IntroScreenProps {
  onEnter: () => void
}

export default function IntroScreen({ onEnter }: IntroScreenProps) {
  const [isExiting, setIsExiting] = useState(false)

  // Smart Autofocus Bracket Tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  // Fast inner bracket (Snappy)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 15, mass: 0.5 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 15, mass: 0.5 })

  // Slow outer trailing bracket (Parallax depth)
  const slowSpringX = useSpring(mouseX, { stiffness: 30, damping: 30, mass: 1.5 })
  const slowSpringY = useSpring(mouseY, { stiffness: 30, damping: 30, mass: 1.5 })

  // Dynamic Telemetry Data generated from mouse position
  const azimuth = useTransform(springX, x => `AZM: ${(x / 10).toFixed(2)}°`)
  const elevation = useTransform(springY, y => `ELV: ${(y / -10).toFixed(2)}°`)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2)
      mouseY.set(e.clientY - window.innerHeight / 2)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

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
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden bg-[#100b1a]"
        >
          {/* GridScan WebGL Background */}
          <div className="absolute inset-0 z-0">
            <GridScan
              sensitivity={0.55}
              lineThickness={1}
              linesColor="#FF0055" // Pink grid lines
              gridScale={0.1}
              scanColor="#FF9FFC"
              scanOpacity={0.4}
              enablePost={true}
              bloomIntensity={0.6}
              chromaticAberration={0.003} // Blue/red split
              noiseIntensity={0.01}
              className="opacity-60" // Tone down the grid slightly so Spider-Gwen stands out
            />
          </div>

          {/* 3D Model Layer */}
          <div className="absolute inset-0 z-[1]">
            <SpiderGwenModel
              animationSequence={[
                'Armature|hero_spidergwen01_S03@succ_cam',
                'Armature|hero_spidergwen01_S03@skill02',
                'Armature|hero_spidergwen01_S03@skill03-02',
                'Armature|hero_spidergwen01_S03@skill04-02',
                'Armature|hero_spidergwen01_S03@walk'
              ]}
              playCounts={[1, 1, 1, 1]}
              animationSpeed={0.5}
              scale={2.5}
              position={[0, -2.5, 0]}
              rotation={[0, 0, 0]}
              autoRotate={true}
              interactive={true}
            />
          </div>

          {/* UI Layer - Industrial Brutalist Targeter */}
          <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 md:p-10 font-mono overflow-hidden">
            
            {/* Top Bar - Military Telemetry */}
            <div className="flex justify-between items-start w-full mix-blend-screen text-white">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="flex flex-col gap-1.5 text-[10px] md:text-xs tracking-[0.3em] font-bold"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-[#FF0055] text-black px-3 py-1 font-black">SYS.V.26</span>
                  <span className="text-[#FF0055] border border-[#FF0055] px-2 py-1">TECHTRIX</span>
                </div>
                <span>COORD: 34.0522° N, 118.2437° W</span>
                <span className="flex items-center gap-2 text-[#00e5ff]">
                  <span className="w-2 h-2 bg-[#00e5ff] rounded-full animate-[ping_2s_infinite]" />
                  STATUS: OMEGA_LEVEL_THREAT
                </span>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-[10px] md:text-xs tracking-[0.2em] text-white/50 text-right flex flex-col gap-1"
              >
                <div className="text-white">{`[ GRID_RENDER: ACTIVE ]`}</div>
                <div>{`[ SENSORS: ONLINE ]`}</div>
                <div>{`[ OVERRIDE: PENDING ]`}</div>
              </motion.div>
            </div>

            {/* Subtle CRT Scanlines & Vignette instead of Flashbang */}
            <div className="absolute inset-0 z-[100] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMCwgMCwgMCwgMC4yKSIvPjwvc3ZnPg==')] opacity-50 mix-blend-overlay" />
            <div className="absolute inset-0 z-[100] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(5,0,15,0.7)_100%)]" />

            {/* Smart Tracking Autofocus Bracket */}
            <motion.div 
              style={{ x: springX, y: springY }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 pointer-events-none z-10 mix-blend-screen opacity-60"
            >
              {/* Corner Brackets */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-[#00e5ff] opacity-70" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-[1.5px] border-r-[1.5px] border-[#00e5ff] opacity-70" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-[1.5px] border-l-[1.5px] border-[#00e5ff] opacity-70" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-[#00e5ff] opacity-70" />
              
              {/* Center Dot & Tracking Text */}
              <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#FF0055] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#FF0055]" />
              
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[8px] font-mono tracking-widest text-[#00e5ff] opacity-80">
                <span className="w-1.5 h-1.5 bg-[#FF0055] animate-pulse rounded-full" />
                TRGT_LOCKED
              </div>
            </motion.div>

            {/* Bottom Interaction - Raw Brutalist Interface */}
            <motion.div 
              animate={{ x: [0, -3, 3, -1, 1, 0, 0], y: [0, 1, -1, 2, -2, 0, 0] }}
              transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 6 }}
              className="mt-auto pointer-events-auto flex flex-col md:flex-row justify-between items-end gap-8 w-full z-20"
            >
              
              {/* Left Side Title - Extreme Type Contrast & Glitch Engine */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex flex-col relative group cursor-crosshair"
              >
                {/* Horizontal Glitch Strips - Reveals on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-75 pointer-events-none z-20 mix-blend-screen flex flex-col justify-center gap-4">
                   <div className="w-[120%] -ml-[10%] h-[2px] bg-white animate-[pulse_0.1s_infinite]" />
                   <div className="w-[150%] -ml-[25%] h-[8px] bg-[#FF0055] opacity-50 animate-[pulse_0.05s_infinite]" />
                </div>

                {/* Animated Audio Waveform / Scanner */}
                <div className="flex items-end gap-[2px] mb-4 h-6 opacity-80 pl-1">
                  {[...Array(16)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: ['20%', '100%', '30%', '80%', '10%'] }}
                      transition={{ 
                        duration: 0.4 + ((i * 3) % 8) * 0.1, 
                        repeat: Infinity, 
                        repeatType: "mirror",
                        ease: "circInOut"
                      }}
                      className="w-1.5 bg-[#FF0055]"
                      style={{ originY: 1 }}
                    />
                  ))}
                  <span className="ml-4 text-[10px] font-mono tracking-widest text-[#FF0055] uppercase animate-pulse">
                    FRQ_7.83_Hz
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-display tracking-tighter text-white uppercase leading-[0.85] mix-blend-screen drop-shadow-lg relative">
                  {/* Chromatic Split Shadows - Active on Hover */}
                  <span className="absolute inset-0 text-[#00e5ff] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 group-hover:-translate-y-1 transition-all duration-75 select-none">
                    CODE<br/><span className="text-transparent border-text">ENDGAME</span>
                  </span>
                  <span className="absolute inset-0 text-[#FF0055] opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 group-hover:translate-y-1 transition-all duration-75 select-none">
                    CODE<br/><span className="text-transparent border-text">ENDGAME</span>
                  </span>
                  
                  {/* Main Text */}
                  <span className="relative z-10 select-none">
                    CODE<br/>
                    <span className="text-transparent border-text">ENDGAME</span>
                  </span>
                </h1>

                {/* Cyberpunk Barcode / Metadata */}
                <div className="flex items-center gap-4 mt-6">
                  <div className="h-1 w-12 bg-[#FF0055] shadow-[0_0_10px_#FF0055]" />
                  <div className="flex gap-[2px] h-6 opacity-50">
                    {[1,3,1,2,5,1,2,1,4,1,2,3,1,1].map((w, i) => (
                      <div key={i} className="bg-white h-full" style={{ width: `${w * 2}px` }} />
                    ))}
                  </div>
                  <div className="flex flex-col text-[8px] font-mono tracking-widest text-white/50 leading-none">
                    <span>ID_94A-0X</span>
                    <span>AUTHORIZATION_REQ</span>
                  </div>
                </div>
              </motion.div>

              {/* Right Side - Interactive Dive Button */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="w-full md:w-auto"
              >
                <button
                  onClick={handleEnter}
                  className="group relative bg-black/40 backdrop-blur-md border-2 border-[#FF0055] text-[#FF0055] overflow-hidden px-8 py-5 w-full md:w-auto md:min-w-[320px] transition-all duration-300 hover:scale-[0.98] active:scale-95 shadow-[0_0_20px_rgba(255,0,85,0.15)]"
                >
                  {/* Background Fill Sweep */}
                  <div className="absolute inset-0 bg-[#FF0055] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
                  
                  {/* Content */}
                  <div className="relative z-10 flex items-center justify-between gap-12">
                    <div className="flex flex-col items-start text-left">
                      <span className="text-[10px] tracking-[0.4em] font-bold group-hover:text-black/70 transition-colors duration-300">
                        SYSTEM_READY
                      </span>
                      <span className="text-xl md:text-2xl font-black tracking-widest uppercase group-hover:text-black transition-colors duration-300">
                        INITIATE
                      </span>
                    </div>
                    <div className="text-3xl font-light group-hover:text-black transition-all duration-300 transform group-hover:translate-x-3">
                      →
                    </div>
                  </div>

                  {/* Analog Degradation Overlay on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.15] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiLz48cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjMDAwIi8+PC9zdmc+')] z-20 pointer-events-none mix-blend-overlay" />
                </button>
              </motion.div>

            </motion.div>
          
          {/* Add global CSS for the stroke-text effect locally */}
          <style dangerouslySetInnerHTML={{__html: `
            .border-text {
              -webkit-text-stroke: 2px white;
              color: transparent;
            }
          `}} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
