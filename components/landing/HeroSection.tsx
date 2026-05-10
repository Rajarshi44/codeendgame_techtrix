'use client'

import { useRef } from 'react'
import SpiderModel from './SpiderModel'

interface HeroSectionProps {
  onAssemble: () => void
  showModel?: boolean
}

export default function HeroSection({ onAssemble, showModel = true }: HeroSectionProps) {
  const container = useRef<HTMLElement>(null)

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

      {/* 3D Holographic Projection (Fully Colored) */}
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

      <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12 relative z-10 pointer-events-none">
        
        {/* Left Telemetry Column */}
        <div className="hidden lg:flex col-span-1 border-r-2 border-[var(--panel-border)] flex-col justify-end p-4">
          <div className="font-mono text-[10px] flex flex-col gap-1 tracking-widest text-right rotate-180" style={{ writingMode: 'vertical-rl' }}>
            <span>[ SYS.STATUS : NOMINAL ]</span>
            <span>[ PROTOCOL : INIT ]</span>
            <span className="text-[var(--accent)]">[ OVERRIDE : ACTIVE ]</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="col-span-1 lg:col-span-11 flex flex-col justify-between p-6 md:p-12 lg:p-24">
          
          <div className="flex justify-between items-start">
            <span className="font-mono text-xs md:text-sm tracking-[0.3em] bg-[var(--text-primary)] text-[var(--void)] px-2 py-1">
              VOL. 26 // HACKATHON
            </span>
            <span className="font-mono text-xs md:text-sm tracking-widest text-[var(--accent)] border-b-2 border-[var(--accent)] pb-1">
              [ CLASSIFIED BRIEFING ]
            </span>
          </div>

          <div className="my-auto relative">
            <h1 
              className="font-display text-[var(--text-primary)] relative z-10"
              style={{ fontSize: 'clamp(5rem, 14vw, 15rem)', marginLeft: '-0.05em' }}
            >
              CODE
              <br/>
              ENDGAME<span className="text-[var(--accent)] align-top text-[0.2em] ml-2 font-mono">™</span>
            </h1>
            
            {/* Strike-through accent */}
            <div className="absolute top-[45%] left-[-10vw] right-[-10vw] h-[10px] bg-[var(--accent)] mix-blend-multiply opacity-80" />
            
            <p className="font-body text-[var(--text-secondary)] text-xl md:text-3xl max-w-3xl mt-12 border-l-8 border-[var(--accent)] pl-6 py-2">
              48 HOURS. ONE VULNERABILITY. <strong>NO MERCY.</strong> <br/>
              THE FLAGSHIP TECHNICAL CRUCIBLE OF TECHTRIX 2026.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mt-12">
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
    </section>
  )
}
