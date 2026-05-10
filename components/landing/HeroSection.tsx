'use client'

import { useRef, useState, useEffect } from 'react'
import SpiderModel from './SpiderModel'

interface HeroSectionProps {
  onAssemble: () => void
  showModel?: boolean
}

export default function HeroSection({ onAssemble, showModel = true }: HeroSectionProps) {
  const container = useRef<HTMLElement>(null)
  const mouseRef = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 })
  const [aberration, setAberration] = useState({ x: 0, y: 0 })

  // Butter-smooth mouse parallax for the Holographic Chromatic Aberration
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize from -1 to 1 based on screen size
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.targetY = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', handleMouseMove)

    let animationFrameId: number
    const animate = () => {
      // Linear interpolation (lerp) for premium drag feel
      mouseRef.current.currentX += (mouseRef.current.targetX - mouseRef.current.currentX) * 0.08
      mouseRef.current.currentY += (mouseRef.current.targetY - mouseRef.current.currentY) * 0.08
      
      // Only update state if there's a meaningful change to save render cycles
      setAberration({
        x: mouseRef.current.currentX,
        y: mouseRef.current.currentY
      })
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const renderContent = (isOverlay: boolean) => (
    <div 
      className={`flex-1 w-full grid grid-cols-1 lg:grid-cols-12 relative pointer-events-none ${isOverlay ? 'z-10' : 'z-0'}`} 
      aria-hidden={isOverlay}
    >
      {/* Left Telemetry Column */}
      <div className="hidden lg:flex col-span-1 border-r-2 border-[var(--panel-border)] flex-col justify-end p-4 relative z-10">
        <div 
          className="font-mono text-[10px] flex flex-col gap-1 tracking-widest text-right rotate-180" 
          style={{ writingMode: 'vertical-rl', opacity: isOverlay ? 0 : 1 }}
        >
          <span>[ SYS.STATUS : NOMINAL ]</span>
          <span>[ PROTOCOL : INIT ]</span>
          <span className="text-[var(--accent)]">[ OVERRIDE : ACTIVE ]</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="col-span-1 lg:col-span-11 flex flex-col justify-between p-6 md:p-12 lg:p-24 relative z-10">
        
        <div className="flex justify-between items-start" style={{ opacity: isOverlay ? 0 : 1 }}>
          <span className="font-mono text-xs md:text-sm tracking-[0.3em] bg-[var(--text-primary)] text-[var(--void)] px-2 py-1">
            VOL. 26 // HACKATHON
          </span>
          <span className="font-mono text-xs md:text-sm tracking-widest text-[var(--accent)] border-b-2 border-[var(--accent)] pb-1">
            [ CLASSIFIED BRIEFING ]
          </span>
        </div>

        <div className="my-auto relative">
          
          <div className="relative">
            {/* Base Typography Layer */}
            <h1 
              className={`font-display relative z-20 ${isOverlay ? 'text-transparent' : 'text-[var(--text-primary)]'}`}
              style={{ 
                fontSize: 'clamp(5rem, 14vw, 15rem)', 
                marginLeft: '-0.05em',
                WebkitTextStroke: isOverlay ? '1px rgba(255,255,255,0.05)' : '0px'
              }}
            >
              CODE
              <br/>
              ENDGAME<span 
                className="align-top text-[0.2em] ml-2 font-mono" 
                style={{ 
                  color: isOverlay ? 'transparent' : 'var(--text-primary)',
                  WebkitTextStroke: isOverlay ? '1px rgba(255,255,255,0.05)' : '0px' 
                }}
              >™</span>
            </h1>

            {/* Interactive Holographic Aberration Layers (Only injected into foreground) */}
            {isOverlay && (
              <>
                <h1 
                  className="font-display absolute top-0 left-0 w-full h-full z-20 text-transparent mix-blend-screen pointer-events-none"
                  style={{ 
                    fontSize: 'clamp(5rem, 14vw, 15rem)', marginLeft: '-0.05em',
                    WebkitTextStroke: '2px #ff003c', 
                    transform: `translate(${aberration.x * 12}px, ${aberration.y * 12}px)`
                  }}
                >
                  CODE<br/>ENDGAME<span className="align-top text-[0.2em] ml-2 font-mono text-transparent" style={{ WebkitTextStroke: '1px #ff003c' }}>™</span>
                </h1>
                <h1 
                  className="font-display absolute top-0 left-0 w-full h-full z-20 text-transparent mix-blend-screen pointer-events-none"
                  style={{ 
                    fontSize: 'clamp(5rem, 14vw, 15rem)', marginLeft: '-0.05em',
                    WebkitTextStroke: '2px #00f0ff', 
                    transform: `translate(${aberration.x * -12}px, ${aberration.y * -12}px)`
                  }}
                >
                  CODE<br/>ENDGAME<span className="align-top text-[0.2em] ml-2 font-mono text-transparent" style={{ WebkitTextStroke: '1px #00f0ff' }}>™</span>
                </h1>
              </>
            )}
          </div>
          
          {/* Strike-through accent */}
          {!isOverlay && (
            <div className="absolute top-[45%] left-[-10vw] right-[-10vw] h-[10px] bg-[var(--accent)] mix-blend-multiply opacity-80 z-10 pointer-events-none" />
          )}
          
          {/* Paragraph Section (3D Sandwich) */}
          <div className="mt-12 flex relative z-20">
            <div className="w-2 shrink-0 bg-[var(--accent)]" style={{ opacity: isOverlay ? 0 : 1 }} />
            
            <div className="relative flex-1 max-w-3xl">
              <p 
                className={`font-body text-xl md:text-3xl pl-6 py-2 ${isOverlay ? 'text-transparent' : 'text-[var(--text-secondary)]'}`}
                style={{ WebkitTextStroke: isOverlay ? '1px var(--text-primary)' : '0px' }}
              >
                48 HOURS. ONE VULNERABILITY. <strong 
                  style={{ 
                    color: isOverlay ? 'transparent' : 'var(--text-primary)',
                    WebkitTextStroke: isOverlay ? '2px var(--text-primary)' : '0px' 
                  }}
                >NO MERCY.</strong> <br/>
                THE FLAGSHIP TECHNICAL CRUCIBLE OF TECHTRIX 2026.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mt-12" style={{ opacity: isOverlay ? 0 : 1 }}>
          <div className="flex gap-4 pointer-events-auto">
            <button 
              onClick={onAssemble} 
              className="bg-[var(--text-primary)] text-[var(--void)] font-display text-xl md:text-2xl px-12 py-6 hover:bg-[var(--accent)] hover:text-white transition-colors"
            >
              ACCESS PROTOCOL
            </button>
          </div>

          <div className="font-mono text-sm tracking-widest text-right flex flex-col gap-2 border-t-2 border-[var(--panel-border)] pt-4 w-full md:w-auto">
            <span>RCCIIT, KOLKATA</span>
            <span>LAT: 22.5567° N // LNG: 88.3986° E</span>
          </div>
        </div>

      </div>
    </div>
  )

  return (
    <section
      ref={container}
      className="relative w-full min-h-screen pt-16 flex flex-col border-b-2 border-[var(--panel-border)] overflow-hidden"
    >
      <div className="halftone-overlay z-0" />

      {/* Crosshairs & Borders */}
      <div className="absolute top-1/4 left-0 right-0 h-[2px] bg-[var(--panel-border)] opacity-20 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[var(--accent)] pointer-events-none z-0" />
      <div className="absolute top-0 bottom-0 left-[10%] w-[2px] bg-[var(--panel-border)] opacity-20 pointer-events-none z-0" />
      
      <div className="absolute top-1/2 left-[10%] -translate-x-1/2 -translate-y-1/2 text-[var(--accent)] text-2xl font-mono leading-none z-0">
        +
      </div>

      {/* Base Text Layer (Solid) -> z-0 */}
      {renderContent(false)}

      {/* 3D Holographic Projection (Between Text Layers) -> z-[5] */}
      <div className="absolute top-0 right-0 bottom-0 w-full lg:w-2/3 z-[5] pointer-events-none">
        {showModel && (
          <SpiderModel 
            animationName="Armature|hero_spiderman01_S05@dialog_angry" 
            nextAnimationName="Armature|hero_spiderman01_S05@dialog_speak"
            animationSpeed={0.3}
            playCount={3}
            position={[0, -2, 0]}
          />
        )}
      </div>

      {/* Overlay Text Layer (Interactive Hologram) -> z-10 */}
      <div className="absolute top-16 bottom-0 left-0 right-0 flex flex-col pointer-events-none z-10">
        {renderContent(true)}
      </div>

    </section>
  )
}
