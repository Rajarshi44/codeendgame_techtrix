'use client'

import { useEffect, useRef } from 'react'

/**
 * Real-time Canvas-rendered animated background.
 * Creates organic, flowing color blobs (mesh gradient) with
 * a Spider-Verse aesthetic — magenta, cyan, deep violet.
 * Fully GPU-composited via a fixed canvas layer.
 */
export default function MultiverseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    // Blob definitions — each is a moving color orb
    const blobs = [
      { x: 0.25, y: 0.3, vx: 0.0003, vy: 0.0002, radius: 0.4, color: [180, 30, 80] },   // deep magenta
      { x: 0.75, y: 0.7, vx: -0.0002, vy: 0.0003, radius: 0.45, color: [0, 180, 220] },  // cyan
      { x: 0.5, y: 0.2, vx: 0.00015, vy: -0.00025, radius: 0.35, color: [100, 20, 160] }, // violet
      { x: 0.3, y: 0.8, vx: -0.00025, vy: -0.00015, radius: 0.3, color: [220, 50, 80] },  // rose
      { x: 0.7, y: 0.4, vx: 0.00018, vy: 0.00022, radius: 0.32, color: [20, 100, 180] },  // deep blue
    ]

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }

    const draw = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      time += 1

      // Deep space base
      ctx.fillStyle = '#07040e'
      ctx.fillRect(0, 0, w, h)

      // Draw each blob with sinusoidal movement
      for (const blob of blobs) {
        // Organic movement — Lissajous-like curves
        const bx = blob.x * w + Math.sin(time * blob.vx * 10 + blob.radius * 20) * w * 0.12
        const by = blob.y * h + Math.cos(time * blob.vy * 10 + blob.radius * 15) * h * 0.12
        const r = blob.radius * Math.min(w, h)

        const gradient = ctx.createRadialGradient(bx, by, 0, bx, by, r)
        const [cr, cg, cb] = blob.color
        gradient.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, 0.35)`)
        gradient.addColorStop(0.4, `rgba(${cr}, ${cg}, ${cb}, 0.12)`)
        gradient.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`)

        ctx.globalCompositeOperation = 'screen'
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, w, h)
      }

      // Reset composite
      ctx.globalCompositeOperation = 'source-over'

      // Animated grid lines — subtle web/neural network
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)'
      ctx.lineWidth = 1

      const gridSpacing = 60
      const gridOffset = (time * 0.15) % gridSpacing

      // Horizontal lines
      for (let y = -gridSpacing + gridOffset; y < h + gridSpacing; y += gridSpacing) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        for (let x = 0; x < w; x += 20) {
          const wave = Math.sin((x + time * 0.5) * 0.008) * 4
          ctx.lineTo(x, y + wave)
        }
        ctx.stroke()
      }

      // Vertical lines
      for (let x = -gridSpacing + gridOffset; x < w + gridSpacing; x += gridSpacing) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        for (let y = 0; y < h; y += 20) {
          const wave = Math.sin((y + time * 0.5) * 0.008) * 4
          ctx.lineTo(x + wave, y)
        }
        ctx.stroke()
      }

      // Floating particles — tiny specks of light
      ctx.globalCompositeOperation = 'screen'
      for (let i = 0; i < 60; i++) {
        const seed = i * 137.508 // golden angle
        const px = ((Math.sin(seed + time * 0.001 * (i % 3 + 1)) + 1) / 2) * w
        const py = ((Math.cos(seed * 0.7 + time * 0.0008 * (i % 4 + 1)) + 1) / 2) * h
        const opacity = 0.15 + Math.sin(time * 0.02 + i) * 0.1
        const size = 1 + Math.sin(time * 0.015 + i * 2) * 0.8

        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, opacity)})`
        ctx.beginPath()
        ctx.arc(px, py, size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalCompositeOperation = 'source-over'

      // Heavy vignette — painted in canvas for true darkness at edges
      const vignetteGrad = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h / 2, w * 0.75)
      vignetteGrad.addColorStop(0, 'rgba(7, 4, 14, 0)')
      vignetteGrad.addColorStop(0.6, 'rgba(7, 4, 14, 0.4)')
      vignetteGrad.addColorStop(1, 'rgba(7, 4, 14, 0.92)')
      ctx.fillStyle = vignetteGrad
      ctx.fillRect(0, 0, w, h)

      animationId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
