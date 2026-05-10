'use client'

import React from 'react'

interface TechtrixLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizes = { sm: 46, md: 100, lg: 150, xl: 250 }

export default function TechtrixLogo({ size = 'md', className }: TechtrixLogoProps) {

  return (
    <div style={{ display: 'inline-block', verticalAlign: 'middle', height: `${sizes[size]}px` }} className={className}>
      <svg
        width={sizes[size] * 0.83} // Keep aspect ratio
        height={sizes[size]}
        viewBox="0 0 100 120"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[var(--accent)] drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
      >
        <g stroke="currentColor" strokeWidth="0.6" fill="none">
          {/* Main Dodecagon (12-sided) outer shell */}
          <polygon
            points="50,13 67.5,17.69 80.31,30.5 85,48 80.31,65.5 67.5,78.31 50,83 32.5,78.31 19.69,65.5 15,48 19.69,30.5 32.5,17.69"
          />

          {/* Internal structural crossbeams (simplified nodes) */}
          <line x1="50" y1="13" x2="50" y2="83" /> {/* Vertical split */}
          <line x1="15" y1="48" x2="85" y2="48" /> {/* Horizontal split */}
          
          <line x1="19.69" y1="30.5" x2="80.31" y2="65.5" />
          <line x1="19.69" y1="65.5" x2="80.31" y2="30.5" />
          
          <line x1="32.5" y1="17.69" x2="67.5" y2="78.31" />
          <line x1="67.5" y1="17.69" x2="32.5" y2="78.31" />

          <line x1="11.89" y1="26" x2="32.5" y2="17.69" />
          <line x1="28" y1="9.89" x2="32.5" y2="17.69" />

          {/* Inner Hexagon Core */}
          <polygon
            points="50,30 65,39 65,57 50,66 35,57 35,39"
            fill="rgba(255, 255, 255, 0.05)"
          />

          {/* Glowing Data Nodes (Hollow circles for UI sleekness) */}
          <g fill="var(--void)" stroke="currentColor" strokeWidth="0.6">
            <circle cx="50" cy="13" r="1.8" />
            <circle cx="67.5" cy="17.69" r="1.8" />
            <circle cx="80.31" cy="30.5" r="1.8" />
            <circle cx="85" cy="48" r="1.8" />
            <circle cx="80.31" cy="65.5" r="1.8" />
            <circle cx="67.5" cy="78.31" r="1.8" />
            <circle cx="50" cy="83" r="1.8" />
            <circle cx="32.5" cy="78.31" r="1.8" />
            <circle cx="19.69" cy="65.5" r="1.8" />
            <circle cx="15" cy="48" r="1.8" />
            <circle cx="19.69" cy="30.5" r="1.8" />
            <circle cx="32.5" cy="17.69" r="1.8" />
            <circle cx="50" cy="48" r="2.5" fill="currentColor" />
          </g>
        </g>

        {/* TECHTRIX Wordmark */}
        <text
          x="50"
          y="110"
          textAnchor="middle"
          className="font-display"
          style={{ fontSize: '15px', fontWeight: 900, fill: 'currentColor', letterSpacing: '0.15em' }}
        >
          TECHTRIX
        </text>
      </svg>
    </div>
  )
}
