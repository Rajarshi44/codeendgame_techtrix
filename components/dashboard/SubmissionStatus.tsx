'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Circle, Clock, ShieldCheck } from 'lucide-react'
import { usePhase } from '@/hooks/usePhase'
import { useSubmission } from '@/hooks/useSubmission'

export default function SubmissionStatus({ userEmail }: { userEmail?: string }) {
  void userEmail
  const { submission, loading } = useSubmission()
  const { phase, isCoreWindowOpen } = usePhase()
  const isHackathonOver = phase === 'RESULTS_PENDING' || phase === 'FINALE'

  const checks = [
    { label: 'Core Details', done: !!submission?.teamName },
    { label: 'GitHub Link', done: !!submission?.githubLink },
    { label: 'Live Link', done: !!submission?.liveLink, optional: true },
    { label: 'Video Demo', done: !!submission?.videoLink },
  ]
  const completedCount = checks.filter(c => c.done).length
  const pct = Math.round((completedCount / checks.length) * 100)
  const isFullyComplete = !!submission && (!!submission.liveLink || !!submission.videoLink)

  const statusMessage = () => {
    if (loading) return 'Syncing with secure channel…'
    if (isHackathonOver) return 'Submission period over. Await shortlist on May 16 evening.'
    if (!submission) {
      if (isCoreWindowOpen) return 'Submit your core details now — window closes soon.'
      return 'Register your team to begin.'
    }
    if (submission.githubLink && submission.liveLink && submission.videoLink) return "You're in the fight. Good luck, soldier."
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

      {isFullyComplete ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: '14px', padding: '24px 16px',
            background: 'linear-gradient(180deg, rgba(74,222,128,0.08), rgba(74,222,128,0.02))',
            border: '1px solid rgba(74,222,128,0.35)',
            borderRadius: 'var(--radius-md, 8px)',
            textAlign: 'center',
          }}
        >
          <ShieldCheck size={36} color="#4ade80" />
          <div style={{
            fontFamily: 'Cinzel, serif', fontSize: '14px',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: '#4ade80', fontWeight: 700,
          }}>
            Mission Successfully Completed
          </div>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '12px',
            color: 'var(--text-muted)', lineHeight: 1.6, margin: 0,
          }}>
            Submission locked in. You can still update your deployment links before the deadline.
          </p>
        </motion.div>
      ) : (
        <>
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
        </>
      )}
    </div>
  )
}
