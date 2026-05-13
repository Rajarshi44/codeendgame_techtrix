'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { JUDGING_CRITERIA, STONE_HEX } from '@/lib/constants'
import Accordion from '@/components/ui/Accordion'

const AssetModel = dynamic(() => import('./AssetModel'), { ssr: false })

const CRITERIA_DETAILS = [
  "Originality of the concept, creative approach to the problem space, and the uniqueness of the executed solution against existing paradigms.",
  "Depth of engineering, architecture robustness, difficulty of the tech stack, and overall code quality.",
  "Intuitive user flows, frictionless interaction design, aesthetic polish, and accessibility considerations.",
  "Real-world viability, performance optimization, architectural scalability, and potential for future expansion.",
  "Measurable value proposition, business logic validity, and the magnitude of the problem being solved.",
  "Clarity of the pitch, effectiveness of the live demonstration, and the team's ability to communicate technical concepts."
]

/* ── Animated SVG Gauge Ring ── */
function GaugeRing({
  weight,
  color,
  active,
  size = 100,
}: {
  weight: number
  color: string
  active: boolean
  size?: number
}) {
  const r = (size - 10) / 2
  const C = 2 * Math.PI * r
  const fill = weight / 20
  const offset = C - fill * C

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
      {/* Background ring */}
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="2" />
      {/* Tick marks */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * 360 - 90
        const rad = (angle * Math.PI) / 180
        const x1 = size / 2 + (r - 3) * Math.cos(rad)
        const y1 = size / 2 + (r - 3) * Math.sin(rad)
        const x2 = size / 2 + (r + 1) * Math.cos(rad)
        const y2 = size / 2 + (r + 1) * Math.sin(rad)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
      })}
      {/* Filled arc */}
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="3"
        strokeDasharray={C} strokeDashoffset={active ? offset : C} strokeLinecap="butt"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
      />
      {/* Center number */}
      <text x={size / 2} y={size / 2 - 2} textAnchor="middle" dominantBaseline="central"
        fill="#050505" fontSize={size > 70 ? '24' : '16'} fontFamily="'Inter', sans-serif" fontWeight="900" letterSpacing="-0.03em">
        {weight}
      </text>
      <text x={size / 2} y={size / 2 + (size > 70 ? 15 : 10)} textAnchor="middle" dominantBaseline="central"
        fill="rgba(0,0,0,0.4)" fontSize={size > 70 ? '8' : '6'} fontFamily="'JetBrains Mono', monospace" letterSpacing="0.2em">
        WEIGHT
      </text>
    </svg>
  )
}

export default function JudgingCriteria() {
  const [isVisible, setIsVisible] = useState(false)
  const [mobileOpen, setMobileOpen] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setIsVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          EVALUATION MATRIX — Tactical Blueprint Light Theme
          ═══════════════════════════════════════════════════════════ */}
      <section ref={sectionRef} id="judging" className="relative w-full bg-[var(--void)] pt-24 md:pt-32 pb-16 md:pb-20 px-4 md:px-8 lg:px-12 xl:px-16 overflow-hidden border-t border-[#050505]/10">

        {/* ── HIGH-END CREATIVE BACKGROUND: Tactical Blueprint & Glitch ── */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          
          {/* Base Blueprint Grid matching the Timeline */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: 'linear-gradient(#050505 1px, transparent 1px), linear-gradient(90deg, #050505 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }} />

          {/* Animated Web/Polygon Radar (Light Theme) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[120vw] md:h-[120vw] opacity-[0.03]">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="absolute inset-0 border-[2px] border-[#050505] rounded-[35%] animate-[spin_60s_linear_infinite]"
                style={{ transform: `scale(${0.1 * (i + 1)}) rotate(${i * 15}deg)`, animationDirection: i % 2 === 0 ? 'normal' : 'reverse' }} />
            ))}
          </div>

          {/* Tactical Data Rings */}
          <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] border border-dashed border-[#050505] opacity-5 rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="absolute top-[10%] right-[-5%] w-[600px] h-[600px] border-4 border-dotted border-[var(--accent)] opacity-5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />

          {/* Tactical HUD Data Streams (Left & Right) */}
          
          {/* LEFT: Downward Hex Stream */}
          <div className="absolute top-0 left-[2%] bottom-0 w-[40px] hidden md:flex flex-col items-center justify-center overflow-hidden opacity-15 pointer-events-none z-0">
            <div className="flex flex-col items-center gap-12 animate-[evalScanV_25s_linear_infinite]">
              <div className="w-[2px] h-[150px] bg-[repeating-linear-gradient(to_bottom,#050505,#050505_4px,transparent_4px,transparent_8px)]" />
              <div className="font-mono text-[10px] tracking-[0.3em] text-[#050505] whitespace-nowrap" style={{ writingMode: 'vertical-rl' }}>
                [ 0x9A 0x1B 0x44 0x22 ] — ROOT_ACCESS
              </div>
              <div className="w-[2px] h-[150px] bg-[repeating-linear-gradient(to_bottom,#050505,#050505_4px,transparent_4px,transparent_8px)]" />
              <div className="font-mono text-[10px] tracking-[0.3em] text-[#050505] whitespace-nowrap" style={{ writingMode: 'vertical-rl' }}>
                [ 0xFF 0x01 0x8C 0xAA ] — SYS_EVAL_ROUTINE
              </div>
            </div>
          </div>

          {/* RIGHT: Upward Tactical Stream (Redesigned) */}
          <div className="absolute top-0 right-[2%] bottom-0 w-[40px] hidden md:flex flex-col items-center justify-center overflow-hidden opacity-40 pointer-events-none z-0">
            <div className="flex flex-col items-center gap-12 animate-[evalScanV_20s_linear_infinite_reverse]">
              <div className="w-[2px] h-[100px] bg-[repeating-linear-gradient(to_bottom,var(--accent),var(--accent)_2px,transparent_2px,transparent_6px)]" />
              <div className="font-mono text-[11px] font-bold tracking-[0.4em] text-[var(--accent)] whitespace-nowrap" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                /// OMEGA_PROTOCOL_ACTIVE /// EVAL_SYSTEM_ONLINE ///
              </div>
              <div className="w-[2px] h-[100px] bg-[repeating-linear-gradient(to_bottom,var(--accent),var(--accent)_2px,transparent_2px,transparent_6px)]" />
              <div className="font-mono text-[11px] font-bold tracking-[0.4em] text-[var(--accent)] whitespace-nowrap" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                /// ANOMALY_DETECTED /// OVERRIDE_ENGAGED ///
              </div>
              <div className="w-[2px] h-[100px] bg-[repeating-linear-gradient(to_bottom,var(--accent),var(--accent)_2px,transparent_2px,transparent_6px)]" />
            </div>
          </div>

          {/* 3D Chromatic Glitch Typography (CMYK on Light) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0 mix-blend-multiply">
            <div className="absolute top-0 left-1/2 -translate-x-[50.3%] font-display font-black text-[18vw] leading-none tracking-tighter text-[#00FFFF] opacity-20 animate-[evalGlitch1_3s_infinite_linear] whitespace-nowrap">
              EVALUATION MATRIX
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-[49.7%] font-display font-black text-[18vw] leading-none tracking-tighter text-[#FF00FF] opacity-20 animate-[evalGlitch2_4s_infinite_linear] whitespace-nowrap">
              EVALUATION MATRIX
            </div>
            <div className="relative font-display font-black text-[18vw] leading-none tracking-tighter text-transparent whitespace-nowrap opacity-[0.03]" style={{ WebkitTextStroke: '2px #050505' }}>
              EVALUATION MATRIX
            </div>
          </div>

          {/* Scanning Accent Laser */}
          <div className="absolute left-0 w-full h-[1px] opacity-40 z-10" style={{
            background: 'linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%)',
            boxShadow: '0 0 20px 2px var(--accent)',
            animation: 'evalScanV 8s ease-in-out infinite alternate',
          }} />
        </div>

        {/* EDITORIAL HEADER REMOVED: Moved inside the left container to compact layout */}

        {/* ── PREMIUM LIGHT GLASSMORPHISM CONTAINER ── */}
        <div className="flex flex-col lg:flex-row w-full max-w-[1800px] mx-auto relative z-10 lg:min-h-[720px] xl:min-h-[760px] bg-white/60 backdrop-blur-2xl border border-white shadow-[0_40px_100px_rgba(0,0,0,0.08),inset_0_0_0_1px_rgba(255,255,255,0.8)] rounded-2xl md:rounded-[2rem] overflow-hidden"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.98)', transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s' }}>

          {/* ═════════════ LEFT: THE REACTOR CORE ═════════════ */}
          <div className="w-full lg:w-[420px] xl:w-[480px] shrink-0 relative min-h-[400px] lg:min-h-full flex flex-col justify-between p-8 md:p-10 lg:p-12 bg-white/40 border-b lg:border-b-0 lg:border-r border-[#050505]/5 z-20">

            {/* Radar background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              <div className="absolute inset-0 opacity-[0.2]" style={{
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }} />
              {/* Concentric radar rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] border border-[var(--accent)]/10 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] border border-black/5 border-dashed rounded-full" />
              {/* Radar sweep */}
              <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 animate-[spin_6s_linear_infinite]"
                style={{ background: 'conic-gradient(from 0deg, transparent 80%, rgba(230,25,25,0.015) 92%, rgba(230,25,25,0.1) 100%)' }} />
              {/* Vignette */}
              <div className="absolute inset-0 z-[2]" style={{
                boxShadow: 'inset 0 0 100px rgba(255,255,255,0.8), inset 0 0 40px rgba(255,255,255,0.5)',
              }} />
            </div>

            {/* ── Header Text (Moved Inside) ── */}
            <div className="relative z-20 mb-8 lg:mb-12">
              <div className="flex items-center gap-3 font-mono text-[9px] tracking-[0.3em] text-[var(--accent)] mb-4">
                <span className="w-1.5 h-1.5 bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]" />
                SYS.EVAL_ROUTINE
              </div>
              <h2 className="font-display text-4xl md:text-5xl xl:text-6xl font-black tracking-tighter leading-[0.85] text-[#050505] mb-4">
                EVALUATION<br/>MATRIX
              </h2>
              <p className="font-mono text-[9px] tracking-[0.2em] text-[#050505]/50 uppercase leading-relaxed max-w-[300px]">
                Systematic breakdown of project assessment vectors.
              </p>
            </div>

            {/* ── 3D Arc Reactor Model ── */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 mt-20 lg:mt-12 w-[260px] h-[260px] md:w-[320px] md:h-[320px] lg:w-[360px] lg:h-[360px] z-10 pointer-events-auto cursor-grab active:cursor-grabbing mix-blend-multiply"
              style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1.2s ease 0.5s' }}>
              <AssetModel
                modelPath="/models/iron-man_2_arc_reactor__free.glb"
                scale={0.55}
                position={[0.2, -1.5, 0]}
                autoRotate={true}
                autoRotateSpeed={0.5}
                interactive={true}
              />
            </div>

            {/* ── Bottom tech decals ── */}
            <div className="relative z-20 mt-auto pt-16 font-mono text-[8px] text-[#050505]/40 tracking-widest hidden lg:block pointer-events-none">
              <div className="flex justify-between w-full border-t border-[#050505]/10 pt-3">
                <span>STARK_IND // DB-04</span>
                <span>OP_CODE: 0x99A</span>
              </div>
            </div>

            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[var(--accent)] z-20 opacity-40" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[var(--accent)] z-20 opacity-40" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[var(--accent)] z-20 opacity-40" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[var(--accent)] z-20 opacity-40" />
          </div>

          {/* ═════════════ RIGHT: DIAGNOSTIC BLADE ARRAY ═════════════ */}

          {/* Desktop: 6 vertical expanding columns */}
          <div className="hidden lg:flex flex-1 bg-black/[0.04] gap-[1px]">
            {JUDGING_CRITERIA.map((crit, index) => {
              const stoneColor = STONE_HEX[crit.stone] || '#050505'
              return (
                <div
                  key={crit.label}
                  className="evalColumn group relative flex-1 hover:flex-[4.5] bg-white/20 overflow-hidden cursor-crosshair"
                  style={{
                    transition: 'flex 0.7s cubic-bezier(0.32, 0.72, 0, 1)',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transitionDelay: `${0.2 + index * 0.08}s`,
                    transitionProperty: 'flex, opacity, transform',
                  }}
                >
                  {/* Liquid gradient fill from bottom on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-full opacity-0 group-hover:opacity-100 pointer-events-none z-0"
                    style={{
                      background: `linear-gradient(to top, ${stoneColor}25 0%, ${stoneColor}0a 40%, transparent 80%)`,
                      transition: 'opacity 0.6s ease',
                    }} />

                  {/* Bottom stone accent bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-[4px] z-20 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                      backgroundColor: stoneColor,
                      boxShadow: `0 0 20px ${stoneColor}, 0 0 40px ${stoneColor}80`,
                      transition: 'opacity 0.5s ease',
                    }} />

                  {/* ── COLLAPSED STATE ── */}
                  <div className="absolute inset-0 flex flex-col items-center justify-between py-8 px-2 opacity-100 group-hover:opacity-0 pointer-events-none z-10"
                    style={{ transition: 'opacity 0.25s ease' }}>
                    {/* Top: Index number */}
                    <div className="font-mono text-[11px] tracking-[0.25em] font-bold" style={{ color: stoneColor }}>
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Middle: Vertical criterion name */}
                    <div className="font-display text-lg xl:text-xl uppercase tracking-[0.12em] text-[#050505]/40 whitespace-nowrap select-none"
                      style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                      {crit.label}
                    </div>

                    {/* Bottom: Weight + mini ring */}
                    <div className="flex flex-col items-center gap-3">
                      <GaugeRing weight={crit.weight} color={stoneColor} active={isVisible} size={50} />
                      <span className="font-mono text-[9px] tracking-[0.2em] text-[#050505]/40">{crit.weight}%</span>
                    </div>
                  </div>

                  {/* Ghost watermark */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[160px] xl:text-[200px] font-black leading-none text-[#050505]/[0.02] pointer-events-none select-none opacity-100 group-hover:opacity-0"
                    style={{ transition: 'opacity 0.3s ease' }}>
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* ── EXPANDED STATE ── */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 xl:p-8 opacity-0 group-hover:opacity-100 pointer-events-none z-10 bg-white/80 backdrop-blur-md shadow-[-30px_0_50px_rgba(0,0,0,0.05)] border-l border-white/40"
                    style={{ transition: 'opacity 0.4s ease 0.12s' }}>
                    {/* Top identifiers */}
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                      <div className="font-mono text-[9px] tracking-[0.3em]" style={{ color: stoneColor }}>
                        [ VEC_{String(index + 1).padStart(2, '0')} ]
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2" style={{ backgroundColor: stoneColor }} />
                        <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-[#050505]/50">{crit.stone}</span>
                      </div>
                    </div>

                    {/* Large gauge ring */}
                    <div className="mb-4">
                      <GaugeRing weight={crit.weight} color={stoneColor} active={isVisible} size={88} />
                    </div>

                    {/* Criterion title */}
                    <h3 className="font-display text-base xl:text-lg font-black uppercase tracking-tight leading-[1.1] mb-2"
                      style={{ color: '#050505' }}>
                      {crit.label}
                    </h3>

                    {/* Description */}
                    <p className="font-mono text-[8px] xl:text-[9px] text-[#050505]/60 leading-relaxed uppercase max-w-[280px] line-clamp-4">
                      {CRITERIA_DETAILS[index]}
                    </p>

                    {/* Bottom readout */}
                    <div className="flex items-center gap-3 mt-5 pt-3 border-t border-[#050505]/10">
                      <div className="w-1.5 h-1.5" style={{ backgroundColor: stoneColor }} />
                      <span className="font-mono text-[7px] xl:text-[8px] tracking-[0.25em] uppercase text-[#050505]/40">
                        {crit.stone}_NODE // ACTIVE
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* ═════════════ MOBILE: Stacked diagnostic rows ═════════════ */}
          <div className="lg:hidden flex flex-col gap-[1px] bg-black/[0.05]">
            {JUDGING_CRITERIA.map((crit, index) => {
              const stoneColor = STONE_HEX[crit.stone] || '#050505'
              const isOpen = mobileOpen === index
              return (
                <div key={crit.label} className="bg-white/60 backdrop-blur-md relative overflow-hidden"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
                    transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.06}s`,
                  }}>
                  {/* Stone accent left edge */}
                  <div className="absolute left-0 top-0 bottom-0 w-[4px]" style={{ backgroundColor: stoneColor, opacity: isOpen ? 1 : 0.2 }} />

                  <button className="w-full flex items-center gap-4 p-5 pl-6 text-left"
                    onClick={() => setMobileOpen(isOpen ? null : index)} aria-expanded={isOpen}>
                    <GaugeRing weight={crit.weight} color={stoneColor} active={isVisible} size={44} />
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-[8px] tracking-[0.3em] mb-1" style={{ color: stoneColor }}>
                        VEC_{String(index + 1).padStart(2, '0')} // {crit.stone.toUpperCase()}
                      </div>
                      <div className="font-display text-sm uppercase tracking-tight text-[#050505] truncate">{crit.label}</div>
                    </div>
                    <div className="font-display text-xl text-[#050505]/70 shrink-0">
                      {crit.weight}<span className="font-mono text-[10px] text-[#050505]/40">%</span>
                    </div>
                    <div className="text-[#050505]/40 shrink-0" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s ease' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" /></svg>
                    </div>
                  </button>

                  <div className="overflow-hidden" style={{
                    maxHeight: isOpen ? '180px' : '0', opacity: isOpen ? 1 : 0,
                    transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
                  }}>
                    <div className="px-5 pb-5 pl-[76px]">
                      <p className="font-mono text-[10px] text-[#050505]/60 leading-relaxed uppercase">{CRITERIA_DETAILS[index]}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Aggregate Power Distribution Bar ── */}
        <div className="relative z-10 px-6 md:px-12 lg:px-16 pb-12 pt-8"
          style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease 0.8s' }}>
          <div className="flex items-center gap-4 mb-3">
            <span className="font-mono text-[8px] md:text-[9px] tracking-[0.3em] text-[#050505]/40 uppercase">Power Distribution</span>
            <div className="flex-1 h-[1px] bg-[#050505]/10" />
            <span className="font-mono text-[8px] md:text-[9px] tracking-[0.3em] text-[#050505]/40">100%</span>
          </div>
          <div className="flex h-[6px] gap-[1px] overflow-hidden">
            {JUDGING_CRITERIA.map((crit, i) => {
              const stoneColor = STONE_HEX[crit.stone] || '#050505'
              return (
                <div key={i} className="relative group/bar cursor-default" style={{
                  flex: crit.weight, backgroundColor: stoneColor,
                  opacity: isVisible ? 1 : 0, transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.9 + i * 0.1}s`,
                }}>
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[7px] tracking-[0.15em] text-[#050505]/60 whitespace-nowrap opacity-0 group-hover/bar:opacity-100 pointer-events-none"
                    style={{ transition: 'opacity 0.2s ease' }}>
                    {crit.weight}%
                  </div>
                </div>
              )
            })}
          </div>
          <div className="hidden md:flex justify-between mt-2">
            {JUDGING_CRITERIA.map((crit, i) => (
              <div key={i} className="font-mono text-[7px] tracking-[0.1em] text-[#050505]/40 uppercase text-center" style={{ flex: crit.weight }}>
                {crit.stone}
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* RULES OF ENGAGEMENT - Impeccable Blueprint */}
      {/* ═══════════════════════════════════════════ */}
      <section id="rules" className="relative w-full pt-16 md:pt-20 pb-24 md:pb-32 xl:pb-40 bg-[var(--void)] border-b border-[#050505]/10 overflow-hidden">
        
        {/* Subtle architectural grid background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(#050505 1px, transparent 1px), linear-gradient(90deg, #050505 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }} />

        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] xl:grid-cols-[1fr_2fr] gap-12 lg:gap-24 items-start">
            
            {/* Left Column: Typography & Context */}
            <div className="lg:sticky lg:top-32 flex flex-col">
              <div className="inline-flex items-center gap-3 mb-8">
                <span className="w-1.5 h-1.5 bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-[#050505]/50 uppercase">
                  Operation Guidelines
                </span>
              </div>
              
              <h2 className="font-display text-5xl md:text-6xl xl:text-[6rem] font-black tracking-tighter leading-[0.85] text-[#050505] mb-6">
                RULES OF
                <br />
                <span className="text-[#050505]/30">ENGAGEMENT</span>
              </h2>
              
              <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] leading-relaxed text-[#050505]/50 uppercase max-w-sm mb-12 text-balance">
                Strict adherence to these parameters is mandatory. Deviation from protocol will trigger automated system override.
              </p>

              {/* Decorative tactical data block */}
              <div className="hidden lg:flex flex-col gap-3 font-mono text-[9px] tracking-[0.25em] text-[#050505]/30 w-full max-w-[280px]">
                <div className="flex justify-between border-b border-[#050505]/10 pb-2">
                  <span>SECURITY_LEVEL</span>
                  <span className="text-[#050505]/60 font-bold">MAXIMUM</span>
                </div>
                <div className="flex justify-between border-b border-[#050505]/10 pb-2">
                  <span>ENFORCEMENT</span>
                  <span className="text-[#050505]/60 font-bold">AUTOMATED</span>
                </div>
                <div className="flex justify-between border-b border-[#050505]/10 pb-2">
                  <span>SYS_UPDATE</span>
                  <span className="text-[#050505]/60 font-bold">CURRENT</span>
                </div>
              </div>
            </div>

            {/* Right Column: Impeccable Accordion Container */}
            <div className="relative">
              {/* Premium Light Glassmorphism Framing */}
              <div className="relative w-full bg-white/60 backdrop-blur-2xl border border-white shadow-[0_40px_100px_rgba(0,0,0,0.06),inset_0_0_0_1px_rgba(255,255,255,0.8)] rounded-2xl md:rounded-[2rem] overflow-hidden p-2 md:p-4">
                
                {/* Corner brackets for structural feel */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#050505]/20" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#050505]/20" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#050505]/20" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#050505]/20" />

                <div className="bg-[#050505]/[0.02] rounded-[1.5rem] p-6 md:p-8 xl:p-12 border border-[#050505]/5">
                  <Accordion />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Keyframes ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes evalScanV {
          0% { transform: translateY(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        @keyframes evalMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes evalGlitch1 {
          0%, 100% { clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%); transform: translate(-50.5%, 0); }
          20% { clip-path: polygon(0 15%, 100% 15%, 100% 55%, 0 55%); transform: translate(-51%, 2px); }
          40% { clip-path: polygon(0 45%, 100% 45%, 100% 80%, 0 80%); transform: translate(-49.5%, -2px); }
          60% { clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%); transform: translate(-50%, 0); }
          80% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); transform: translate(-50.5%, -1px); }
        }
        @keyframes evalGlitch2 {
          0%, 100% { clip-path: polygon(0 30%, 100% 30%, 100% 70%, 0 70%); transform: translate(-49.5%, 0); }
          25% { clip-path: polygon(0 0, 100% 0, 100% 40%, 0 40%); transform: translate(-50%, -2px); }
          50% { clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%); transform: translate(-51%, 2px); }
          75% { clip-path: polygon(0 20%, 100% 20%, 100% 80%, 0 80%); transform: translate(-50.5%, 1px); }
        }
      `}} />
    </>
  )
}
