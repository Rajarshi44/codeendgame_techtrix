'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Circle, Clock } from 'lucide-react'
import { useHackathonStore } from '@/store/useHackathonStore'
import { usePhase } from '@/hooks/usePhase'

export default function SubmissionStatus({ userEmail }: { userEmail?: string }) {
  const teams = useHackathonStore(s => s.teams)
  const team = teams.find(t => t.leadEmail === userEmail)
  const { phase, isCoreWindowOpen } = usePhase()
  const isHackathonOver = phase === 'RESULTS_PENDING' || phase === 'FINALE'

  const checks = [
    { label: 'Core Details', done: !!team?.teamName },
    { label: 'GitHub Link', done: !!team?.githubLink },
    { label: 'Live Link', done: !!team?.liveLink, optional: true },
    { label: 'Video Demo', done: !!team?.videoLink, optional: true },
  ]
  const completedCount = checks.filter(c => c.done).length
  const pct = Math.round((completedCount / checks.length) * 100)

  const statusMessage = () => {
    if (isHackathonOver) return 'Submission period over. Await shortlist on May 16 evening.'
    if (!team) {
      if (isCoreWindowOpen) return 'Submit your core details now — window closes soon.'
      return 'Register your team to begin.'
    }
    if (team.githubLink && team.liveLink && team.videoLink) return "You're in the fight. Good luck, soldier."
    if (isCoreWindowOpen) return 'Core registered. Finalize your deployment.'
    return 'Core registered. Submit your deployment and video when ready.'
  }

  return (
    <div style={{
      background: 'var(--panel-bg)',
      backdropFilter: 'var(--blur-panel)',
      border: '1px solid var(--panel-border)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--panel-shadow)',
      padding: '24px',
      position: 'sticky', top: '80px',
    }}>
      <h3 style={{
        fontFamily: 'Cinzel, serif', fontSize: '15px',
        color: 'var(--text-primary)', marginBottom: '20px', letterSpacing: '0.08em',
      }}>
        Mission Status
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
        {checks.map(c => {
          const isOptionalPending = c.optional && !c.done
          return (
            <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {c.done
                ? <CheckCircle2 size={16} color="#4ade80" style={{ flexShrink: 0 }} />
                : isOptionalPending
                  ? <Clock size={16} color="var(--stone-time)" style={{ flexShrink: 0 }} />
                  : <Circle size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />
              }
              <span style={{
                fontFamily: 'Inter, sans-serif', fontSize: '13px',
                color: c.done ? 'var(--text-primary)' : 'var(--text-muted)',
              }}>
                {c.label}
                {isOptionalPending && (
                  <span style={{ fontSize: '11px', color: 'var(--stone-time)', marginLeft: '6px' }}>
                    (after deployment)
                  </span>
                )}
              </span>
            </div>
          )
        })}
      </div>

      {/* Progress bar */}
      <div style={{
        height: '4px', borderRadius: '2px',
        background: 'var(--void-mid)', overflow: 'hidden', marginBottom: '16px',
      }}>
        <motion.div
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          style={{
            height: '100%',
            background: 'linear-gradient(to right, var(--stone-space), var(--stone-power))',
            borderRadius: '2px',
          }}
        />
      </div>

      <p style={{
        fontFamily: 'Inter, sans-serif', fontSize: '12px',
        color: 'var(--text-muted)', lineHeight: 1.6,
      }}>
        {statusMessage()}
      </p>
    </div>
  )
}
