'use client'

import React from 'react'

interface DSBadgeProps {
  children: React.ReactNode
  color?: string  // CSS color value
  size?: 'sm' | 'md'
  status?: 'complete' | 'partial' | 'pending' | 'live' | 'offline'
}

const STATUS_MAP: Record<string, { bg: string; text: string; dot?: string }> = {
  complete: { bg: 'rgba(74,222,128,0.15)', text: '#4ade80' },
  partial:  { bg: 'rgba(255,123,0,0.15)',  text: 'var(--stone-time)' },
  pending:  { bg: 'rgba(232,40,58,0.15)',  text: 'var(--stone-reality)' },
  live:     { bg: 'rgba(232,40,58,0.15)',  text: 'var(--stone-reality)', dot: 'var(--stone-reality)' },
  offline:  { bg: 'rgba(255,123,0,0.12)',  text: 'var(--stone-time)' },
}

export default function DSBadge({ children, color, size = 'sm', status }: DSBadgeProps) {
  const preset = status ? STATUS_MAP[status] : null
  const bg = preset?.bg ?? (color ? color + '20' : 'var(--accent-dim)')
  const textColor = preset?.text ?? (color ?? 'var(--text-secondary)')

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      background: bg,
      color: textColor,
      border: `1px solid ${textColor}40`,
      borderRadius: '9999px',
      fontFamily: 'Inter, sans-serif',
      fontSize: size === 'sm' ? '10px' : '12px',
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      padding: size === 'sm' ? '3px 8px' : '5px 12px',
      whiteSpace: 'nowrap',
    }}>
      {preset?.dot && (
        <span style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: preset.dot,
          flexShrink: 0,
          animation: status === 'live' ? 'live-dot 1s ease-out infinite' : undefined,
        }} />
      )}
      {children}
    </span>
  )
}
