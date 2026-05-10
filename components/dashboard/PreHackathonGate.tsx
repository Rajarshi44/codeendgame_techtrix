'use client'

import TechtrixLogo from '@/components/ui/TechtrixLogo'
import CountdownTimer from '@/components/ui/CountdownTimer'
import { PHASE_WINDOWS } from '@/lib/phases'

export default function PreHackathonGate() {
  return (
    <div style={{
      minHeight: 'calc(100vh - 120px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 24px', position: 'relative', zIndex: 1,
    }}>
      <div
        style={{
          background: 'var(--panel-bg)',
          backdropFilter: 'var(--blur-panel)',
          border: '1px solid var(--panel-border)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--panel-shadow)',
          padding: 'clamp(32px, 5vw, 56px)',
          maxWidth: '600px', width: '100%',
          textAlign: 'center',
          animation: 'float-y 4s ease-in-out infinite',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
          <TechtrixLogo size="lg" />
        </div>

        <h2 style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 'clamp(20px, 3vw, 28px)',
          color: 'var(--text-primary)',
          marginBottom: '16px', letterSpacing: '0.05em',
        }}>
          Your Mission Briefing Awaits
        </h2>

        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '14px',
          color: 'var(--text-secondary)', lineHeight: 1.7,
          marginBottom: '40px', maxWidth: '440px', margin: '0 auto 40px',
        }}>
          The hackathon begins on May 14, 2026 at 12:01 AM IST. Return then to submit your team details and receive your challenge.
        </p>

        <CountdownTimer targetDate={PHASE_WINDOWS.HACKATHON_START} />

        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '13px',
          color: 'var(--text-muted)', marginTop: '32px', lineHeight: 1.6,
        }}>
          Make sure your team is assembled and your GitHub account is ready.
        </p>

        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '12px',
          color: 'var(--text-muted)', marginTop: '16px',
        }}>
          Questions? Contact{' '}
          <span style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-secondary)' }}>Pratyush Pal (9330096004)</span>
          {' '}or{' '}
          <span style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-secondary)' }}>Palas Saha (9073743988)</span>
        </p>
      </div>
    </div>
  )
}
