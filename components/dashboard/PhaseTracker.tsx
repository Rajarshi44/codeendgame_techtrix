'use client'

import { motion } from 'framer-motion'
import { usePhase } from '@/hooks/usePhase'
import { useCountdown } from '@/hooks/useCountdown'
import { getNextMilestone } from '@/lib/phases'
import { PHASE_WINDOWS } from '@/lib/phases'
import { Clock, Radio, Hourglass, Trophy, Lock } from 'lucide-react'
import { useHackathonStore } from '@/store/useHackathonStore'
import { useRouter } from 'next/navigation'

function pad(n: number) { return String(n).padStart(2, '0') }

const STONE_BORDER: Record<string, string> = {
  PRE_HACKATHON:     'var(--stone-time)',
  CORE_WINDOW_OPEN:  'var(--stone-reality)',
  HACKATHON_LIVE:    'var(--stone-reality)',
  RESULTS_PENDING:   'var(--stone-mind)',
  FINALE:            'var(--stone-soul)',
}

export default function PhaseTracker({ userEmail }: { userEmail?: string }) {
  const { phase, isCoreWindowOpen, timeToCoreWindowEnd } = usePhase()
  const nextMilestone = getNextMilestone(phase)
  const countdown = useCountdown(nextMilestone ?? new Date())
  const router = useRouter()
  const logout = useHackathonStore(s => s.logout)

  const borderColor = STONE_BORDER[phase] ?? 'var(--accent)'

  const coreMinutes = Math.floor(timeToCoreWindowEnd / 60000)
  const coreSeconds = Math.floor((timeToCoreWindowEnd % 60000) / 1000)
  const coreAlmostUp = timeToCoreWindowEnd < 5 * 60 * 1000

  const handleSignOut = () => {
    logout()
    router.push('/')
  }

  const PhaseContent = () => {
    switch (phase) {
      case 'PRE_HACKATHON':
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={14} color="var(--stone-time)" />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--text-muted)' }}>
              HACKATHON HAS NOT STARTED
            </span>
          </div>
        )
      case 'CORE_WINDOW_OPEN':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--stone-reality)', display: 'inline-block', animation: 'live-dot 1s ease-out infinite' }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--stone-reality)', fontWeight: 600 }}>
                CORE WINDOW OPEN
              </span>
            </div>
            {isCoreWindowOpen && (
              <span style={{
                fontFamily: 'Inter, sans-serif', fontSize: '11px',
                color: coreAlmostUp ? 'var(--stone-reality)' : 'var(--stone-time)',
                transition: 'color 1s',
              }}>
                Core submission window: {pad(coreMinutes)}:{pad(coreSeconds)} remaining
              </span>
            )}
          </div>
        )
      case 'HACKATHON_LIVE':
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Radio size={14} color="var(--stone-reality)" />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--stone-reality)', fontWeight: 600 }}>
              ENDGAME IS LIVE
            </span>
          </div>
        )
      case 'RESULTS_PENDING':
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Hourglass size={14} color="var(--stone-mind)" />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--stone-mind)' }}>
              AWAITING SHORTLIST
            </span>
          </div>
        )
      case 'FINALE':
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Trophy size={14} color="var(--stone-soul)" />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--stone-soul)', fontWeight: 600 }}>
              GRAND FINALE TODAY
            </span>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(13,8,32,0.9)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--panel-border)',
      borderLeft: `4px solid ${borderColor}`,
      padding: '12px 24px',
      display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px',
    }}>
      <div style={{ flex: 1 }}>
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <PhaseContent />
        </motion.div>
      </div>

      {/* Countdown to next milestone */}
      {!countdown.isExpired && nextMilestone && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'var(--text-muted)' }}>Next:</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '14px', color: 'var(--text-primary)' }}>
            {pad(countdown.days * 24 + countdown.hours)}:{pad(countdown.minutes)}:{pad(countdown.seconds)}
          </span>
        </div>
      )}

      {/* User + Sign out */}
      {userEmail && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--text-muted)' }}>
            {userEmail}
          </span>
          <button
            onClick={handleSignOut}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', fontSize: '12px',
              color: 'var(--text-muted)', textDecoration: 'underline',
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}
