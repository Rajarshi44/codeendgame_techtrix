'use client'

import React, { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  rightIcon?: React.ReactNode
  note?: string
}

const DSInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, rightIcon, note, id, style, ...rest }, ref) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {label && (
          <label
            htmlFor={id}
            style={{
              fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 500,
              textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)',
            }}
          >
            {label}
          </label>
        )}
        <div style={{ position: 'relative' }}>
          <input
            ref={ref}
            id={id}
            aria-invalid={!!error}
            style={{
              width: '100%',
              background: 'var(--void-mid)',
              border: `1px solid ${error ? 'var(--stone-reality)' : 'var(--panel-border)'}`,
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              padding: rightIcon ? '10px 40px 10px 14px' : '10px 14px',
              outline: 'none',
              transition: 'border-color var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out)',
              ...style,
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-dim)'
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = error ? 'var(--stone-reality)' : 'var(--panel-border)'
              e.currentTarget.style.boxShadow = ''
            }}
            {...rest}
          />
          {rightIcon && (
            <span style={{
              position: 'absolute', right: '12px', top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)', display: 'flex', alignItems: 'center',
            }}>
              {rightIcon}
            </span>
          )}
        </div>
        {note && !error && (
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'var(--text-muted)' }}>
            {note}
          </span>
        )}
        {error && (
          <span role="alert" style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'var(--stone-reality)' }}>
            {error}
          </span>
        )}
      </div>
    )
  }
)
DSInput.displayName = 'DSInput'
export default DSInput
