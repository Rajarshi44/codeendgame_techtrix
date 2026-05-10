'use client'

import dynamic from 'next/dynamic'

const ParticleDust = dynamic(() => import('./ParticleDust'), { ssr: false })

interface CosmicBackgroundProps {
  tint?: 'default' | 'reality'
}

// Deterministic star positions using a seeded LCG
function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}

function CosmicStars() {
  const rand = seededRandom(42)
  const stars: Array<{
    cx: number; cy: number; r: number; opacity: number; twinkle: boolean; dur: number
  }> = []
  for (let i = 0; i < 300; i++) {
    const bucket = i < 240 ? 0 : i < 285 ? 1 : 2
    const r =
      bucket === 0 ? 0.5 + rand() * 0.5
      : bucket === 1 ? 1 + rand() * 1
      : 2 + rand() * 1
    const opacity =
      bucket === 0 ? 0.3 + rand() * 0.3
      : bucket === 1 ? 0.5 + rand() * 0.3
      : 0.8 + rand() * 0.2
    const twinkle = bucket === 2 && rand() > 0.3
    stars.push({
      cx: rand() * 1920,
      cy: rand() * 1080,
      r,
      opacity,
      twinkle,
      dur: 3 + rand() * 4,
    })
  }
  // Only 10-15 mid stars twinkle
  let twinkleCount = 0
  const brightIndices = new Set<number>()
  for (let i = 240; i < 285 && twinkleCount < 12; i++) {
    if (rand() > 0.5) { brightIndices.add(i); twinkleCount++ }
  }

  return (
    <svg
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    >
      <defs>
        {stars.filter((s, i) => s.twinkle || brightIndices.has(i)).map((_, i) => (
          <style key={i}>{``}</style>
        ))}
      </defs>
      {stars.map((s, i) => {
        const shouldTwinkle = s.twinkle || brightIndices.has(i)
        return (
          <circle
            key={i}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill="#ede9ff"
            opacity={s.opacity}
            style={shouldTwinkle ? {
              animation: `twinkle ${s.dur}s ease-in-out infinite`,
              animationDelay: `${(i * 0.23) % s.dur}s`,
            } : undefined}
          />
        )
      })}
    </svg>
  )
}

export default function CosmicBackground({ tint = 'default' }: CosmicBackgroundProps) {
  const blobA = tint === 'reality'
    ? 'radial-gradient(circle, rgba(232,40,58,0.08) 0%, transparent 70%)'
    : 'radial-gradient(circle, rgba(176,38,255,0.08) 0%, transparent 70%)'
  const blobB = tint === 'reality'
    ? 'radial-gradient(circle, rgba(255,123,0,0.06) 0%, transparent 70%)'
    : 'radial-gradient(circle, rgba(0,184,255,0.06) 0%, transparent 70%)'
  const blobC = tint === 'reality'
    ? 'radial-gradient(circle, rgba(255,78,0,0.05) 0%, transparent 70%)'
    : 'radial-gradient(circle, rgba(255,123,0,0.05) 0%, transparent 70%)'

  return (
    <div
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}
    >
      {/* Layer 1: Deep space base */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 120% 80% at 50% 0%, #1a0a3a 0%, #05030f 60%)',
      }} />

      {/* Layer 2: Nebula blobs */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <div style={{
          position: 'absolute',
          top: '-5%', left: '-8%',
          width: 800, height: 800,
          background: blobA,
          filter: 'blur(120px)',
          willChange: 'transform',
          animation: 'blob-drift-a 80s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-10%', right: '-5%',
          width: 600, height: 600,
          background: blobB,
          filter: 'blur(100px)',
          willChange: 'transform',
          animation: 'blob-drift-b 65s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          top: '30%', right: '10%',
          width: 500, height: 500,
          background: blobC,
          filter: 'blur(140px)',
          willChange: 'transform',
          animation: 'blob-drift-c 90s ease-in-out infinite',
        }} />
      </div>

      {/* Layer 3: Star field */}
      <CosmicStars />

      {/* Layer 4: Particle dust */}
      <ParticleDust tint={tint} />
    </div>
  )
}
