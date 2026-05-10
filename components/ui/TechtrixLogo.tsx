'use client'

import React from 'react'

interface TechtrixLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  /** Whether to show the "TECHTRIX" wordmark below the logo */
  showWordmark?: boolean
  /**
   * Background context the logo sits on:
   * - 'light' → navbar / light panels → dark logo lines
   * - 'dark'  → footer / intro screen → bright glowing logo lines
   */
  on?: 'light' | 'dark'
}

const sizes = { xs: 40, sm: 56, md: 120, lg: 180, xl: 280 }

export default function TechtrixLogo({ size = 'md', className, showWordmark = false, on = 'light' }: TechtrixLogoProps) {
  const h = sizes[size]
  const w = Math.round(h * 0.83)

  const stroke = on === 'dark' ? '#ffffff' : 'var(--text-primary, #050505)'
  const nodeFill = on === 'dark' ? 'rgba(0,0,0,0.8)' : 'var(--void, #F4F4F0)'
  const coreFill = stroke
  const innerFill = on === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(5,5,5,0.03)'
  const glow = on === 'dark' ? 'drop-shadow(0 0 6px rgba(255,255,255,0.35))' : 'none'

  return (
    <div
      style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: size === 'xs' || size === 'sm' ? 2 : 6, verticalAlign: 'middle' }}
      className={className}
    >
      <svg
        width={w}
        height={h}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: glow }}
      >
        <g stroke={stroke} strokeWidth="0.7" fill="none">
          {/* Main Dodecagon outer shell */}
          <polygon
            points="50,8 67.5,12.69 80.31,25.5 85,43 80.31,60.5 67.5,73.31 50,78 32.5,73.31 19.69,60.5 15,43 19.69,25.5 32.5,12.69"
          />

          {/* Triangulated inner structure — connecting alternate vertices */}
          <line x1="50" y1="8" x2="80.31" y2="25.5" />
          <line x1="50" y1="8" x2="19.69" y2="25.5" />
          <line x1="67.5" y1="12.69" x2="80.31" y2="60.5" />
          <line x1="32.5" y1="12.69" x2="19.69" y2="60.5" />
          <line x1="85" y1="43" x2="67.5" y2="73.31" />
          <line x1="15" y1="43" x2="32.5" y2="73.31" />
          <line x1="80.31" y1="25.5" x2="50" y2="78" />
          <line x1="19.69" y1="25.5" x2="50" y2="78" />
          <line x1="67.5" y1="12.69" x2="32.5" y2="73.31" />
          <line x1="32.5" y1="12.69" x2="67.5" y2="73.31" />

          {/* Inner hexagon */}
          <polygon
            points="50,25 65,34 65,52 50,61 35,52 35,34"
            fill={innerFill}
          />

          {/* Central "T" glyph */}
          <line x1="38" y1="36" x2="62" y2="36" strokeWidth="1.2" />
          <line x1="50" y1="36" x2="50" y2="56" strokeWidth="1.2" />
          {/* T serifs */}
          <circle cx="38" cy="36" r="1.5" fill={coreFill} />
          <circle cx="62" cy="36" r="1.5" fill={coreFill} />
          <circle cx="50" cy="56" r="1.5" fill={coreFill} />

          {/* Outer data nodes */}
          <g fill={nodeFill} stroke={stroke} strokeWidth="0.7">
            <circle cx="50" cy="8" r="2.2" />
            <circle cx="67.5" cy="12.69" r="2.2" />
            <circle cx="80.31" cy="25.5" r="2.2" />
            <circle cx="85" cy="43" r="2.2" />
            <circle cx="80.31" cy="60.5" r="2.2" />
            <circle cx="67.5" cy="73.31" r="2.2" />
            <circle cx="50" cy="78" r="2.2" />
            <circle cx="32.5" cy="73.31" r="2.2" />
            <circle cx="19.69" cy="60.5" r="2.2" />
            <circle cx="15" cy="43" r="2.2" />
            <circle cx="19.69" cy="25.5" r="2.2" />
            <circle cx="32.5" cy="12.69" r="2.2" />
          </g>
        </g>

        {/* TECHTRIX wordmark - shown when showWordmark is false (built into SVG) */}
        {showWordmark && (
          <text
            x="50"
            y="95"
            textAnchor="middle"
            style={{ fontSize: '12px', fontWeight: 900, fill: stroke, letterSpacing: '0.15em', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase' as const }}
          >
            TECHTRIX
          </text>
        )}
      </svg>
    </div>
  )
}
