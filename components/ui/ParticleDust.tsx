'use client'

import { useEffect, useRef } from 'react'

interface ParticleDustProps {
  tint?: 'default' | 'reality'
}

export default function ParticleDust({ tint = 'default' }: ParticleDustProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.innerWidth < 768
    const COUNT = isMobile ? 60 : 120

    const stoneColors =
      tint === 'reality'
        ? ['#e8283a', '#ff7b00', '#ff4e00', '#b026ff']
        : ['#00b8ff', '#b026ff', '#ff7b00', '#ff4e00', '#f0d93a', '#e8283a']

    let w = canvas.offsetWidth
    let h = canvas.offsetHeight
    canvas.width = w
    canvas.height = h

    type Particle = {
      x: number; y: number; vy: number; vx: number
      size: number; opacity: number; color: string
    }

    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vy: -(0.2 + Math.random() * 0.5),
      vx: (Math.random() - 0.5) * 0.3,
      size: 1 + Math.random() * 2,
      opacity: 0.1 + Math.random() * 0.3,
      color: stoneColors[Math.floor(Math.random() * stoneColors.length)],
    }))

    let lastTime = 0
    let animId: number
    let paused = false

    function draw(now: number) {
      if (paused) return
      animId = requestAnimationFrame(draw)

      const delta = now - lastTime
      if (delta < 33) return // ~30fps throttle
      lastTime = now

      ctx!.clearRect(0, 0, w, h)
      for (const p of particles) {
        p.y += p.vy
        p.x += p.vx + Math.sin(p.y * 0.01) * 0.2
        if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w }
        if (p.x < -4) p.x = w + 4
        if (p.x > w + 4) p.x = -4

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx!.fillStyle =
          p.color + Math.round(p.opacity * 255).toString(16).padStart(2, '0')
        ctx!.fill()
      }
    }

    animId = requestAnimationFrame(draw)

    const onResize = () => {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w
      canvas.height = h
    }
    window.addEventListener('resize', onResize)

    const onVisibility = () => {
      paused = document.hidden
      if (!paused) { lastTime = 0; animId = requestAnimationFrame(draw) }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [tint])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
