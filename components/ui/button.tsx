'use client'

import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline-pill'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'Cinzel, serif',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    border: 'none',
    outline: 'none',
    transition: 'all var(--duration-fast) var(--ease-out)',
    willChange: 'transform',
    position: 'relative',
    overflow: 'hidden',
  }

  const sizeMap: Record<string, React.CSSProperties> = {
    sm: { fontSize: '11px', padding: '8px 16px', borderRadius: 'var(--radius-md)' },
    md: { fontSize: '13px', padding: '11px 24px', borderRadius: 'var(--radius-md)' },
    lg: { fontSize: '14px', padding: '14px 32px', borderRadius: 'var(--radius-lg)' },
  }

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: { background: 'var(--accent)', color: '#fff' },
    ghost: {
      background: 'transparent',
      color: 'var(--text-secondary)',
      border: '1px solid var(--panel-border)',
    },
    'outline-pill': {
      background: 'transparent',
      color: 'var(--text-primary)',
      border: '1px solid var(--stone-power)',
      borderRadius: '9999px',
    },
  }

  const combined: React.CSSProperties = { ...base, ...sizeMap[size], ...variantStyles[variant], ...style }

  return (
    <button
      disabled={disabled || loading}
      className={className}
      style={combined}
      onMouseEnter={e => {
        if (disabled || loading) return
        const el = e.currentTarget
        if (variant === 'primary') {
          el.style.filter = 'brightness(1.15)'
          el.style.transform = 'translateY(-1px)'
        } else if (variant === 'outline-pill') {
          el.style.background = 'var(--accent-dim)'
          el.style.borderColor = 'var(--accent)'
          el.style.boxShadow = '0 0 20px var(--accent-glow)'
        } else {
          el.style.background = 'var(--accent-dim)'
        }
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.filter = ''
        el.style.transform = ''
        if (variant === 'primary') el.style.background = 'var(--accent)'
        else if (variant === 'outline-pill') {
          el.style.background = 'transparent'
          el.style.borderColor = 'var(--stone-power)'
          el.style.boxShadow = ''
        } else el.style.background = 'transparent'
      }}
      {...rest}
    >
      {loading ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            style={{ animation: 'spin-conic 1s linear infinite' }}>
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          {children}
        </>
      ) : children}
    </button>
  )
}

export { Button }
