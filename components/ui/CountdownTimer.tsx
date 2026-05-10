'use client'

import { useState, useEffect } from 'react'
import { useCountdown } from '@/hooks/useCountdown'
import { PHASE_WINDOWS } from '@/lib/phases'

const HACKATHON_START = PHASE_WINDOWS.HACKATHON_START
const HACKATHON_END   = PHASE_WINDOWS.HACKATHON_END

const STONE_CONFIG = [
  { key: 'days',    label: 'DAYS',  color: '#00b8ff', glow: 'rgba(0,184,255,0.35)'  },
  { key: 'hours',   label: 'HRS',   color: '#b026ff', glow: 'rgba(176,38,255,0.35)' },
  { key: 'minutes', label: 'MINS',  color: '#ff7b00', glow: 'rgba(255,123,0,0.35)'  },
  { key: 'seconds', label: 'SECS',  color: '#e8283a', glow: 'rgba(232,40,58,0.35)'  },
]

interface CountdownTimerProps {
  targetDate?: Date
  compact?: boolean
}

function pad(n: number) { return String(n).padStart(2, '0') }

export default function CountdownTimer({ targetDate, compact = false }: CountdownTimerProps) {
  const [now, setNow] = useState<Date | null>(null)
  
  useEffect(() => {
    setNow(new Date())
  }, [])

  const isLive = now ? now >= HACKATHON_START && now < HACKATHON_END : false
  const isEnded = now ? now >= HACKATHON_END : false

  const target = targetDate ?? (isLive ? HACKATHON_END : HACKATHON_START)
  const { days, hours, minutes, seconds, isExpired } = useCountdown(target)

  if (!now) return <div style={{ height: '80px' }} /> // Placeholder during SSR


  if (isEnded && !targetDate) {
    return (
      <div style={{
        fontFamily: 'Cinzel, serif', fontSize: compact ? '14px' : '20px',
        color: 'var(--stone-reality)', letterSpacing: '0.2em', textAlign: 'center',
      }}>
        SUBMISSIONS CLOSED
      </div>
    )
  }

  if (isExpired) {
    return (
      <div style={{
        fontFamily: 'Cinzel, serif', fontSize: compact ? '14px' : '20px',
        color: 'var(--stone-reality)', letterSpacing: '0.2em', textAlign: 'center',
      }}>
        {isLive ? 'HACKATHON LIVE' : 'TIME\'S UP'}
      </div>
    )
  }

  const vals: Record<string, number> = { days, hours, minutes, seconds }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: compact ? '8px' : '12px',
      justifyContent: 'center',
    }}>
      {STONE_CONFIG.map((s, i) => (
        <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: compact ? '8px' : '12px' }}>
          {/* Cracked panel */}
          <div
            className="cracked-panel"
            style={{
              background: 'var(--void-surface)',
              border: `1px solid ${s.color}80`,
              boxShadow: `inset 0 0 20px ${s.glow}, 0 0 12px ${s.glow}40`,
              padding: compact ? '8px 10px' : '16px 20px',
              textAlign: 'center',
              minWidth: compact ? '52px' : '80px',
              transition: 'transform 80ms var(--ease-out)',
              ...(s.key === 'seconds' ? {
                animation: 'none',
              } : {}),
            }}
            id={`countdown-${s.key}`}
          >
            <div style={{
              fontFamily: 'Cinzel, serif',
              fontSize: compact ? '22px' : '48px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1,
              minWidth: compact ? '2ch' : '2ch',
            }}>
              {pad(vals[s.key])}
            </div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: compact ? '8px' : '10px',
              fontWeight: 500,
              color: 'var(--text-muted)',
              letterSpacing: '0.3em',
              marginTop: '4px',
            }}>
              {s.label}
            </div>
          </div>

          {/* Colon separator — hidden after last */}
          {i < 3 && (
            <span style={{
              fontFamily: 'Cinzel, serif',
              fontSize: compact ? '20px' : '36px',
              color: 'var(--text-muted)',
              animation: 'blink 1s ease-in-out infinite',
              lineHeight: 1,
              alignSelf: 'center',
            }}>:</span>
          )}
        </div>
      ))}
    </div>
  )
}
