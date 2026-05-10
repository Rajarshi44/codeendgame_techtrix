'use client'

import { useState } from 'react'
import { useHackathonStore } from '@/store/useHackathonStore'
import { usePhase } from '@/hooks/usePhase'
import { useCountdown } from '@/hooks/useCountdown'
import { PHASE_WINDOWS } from '@/lib/phases'
import { showToast } from '@/components/ui/Toast'
import DSInput from '@/components/ui/DSInput'
import Button from '@/components/ui/button'
import { Github, Globe, Video, Lock, AlertCircle, ShieldOff, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'

interface FormData {
  teamName: string; leadName: string; leadEmail: string
  leadMobile: string; githubLink: string
  liveLink: string; videoLink: string
}

function pad(n: number) { return String(n).padStart(2, '0') }

export default function TeamForm({ userEmail }: { userEmail?: string }) {
  const { phase, isCoreWindowOpen, timeToCoreWindowEnd } = usePhase()
  const submitCore = useHackathonStore(s => s.submitCoreDetails)
  const submitOptional = useHackathonStore(s => s.submitOptionalLinks)
  const teams = useHackathonStore(s => s.teams)
  const existingTeam = teams.find(t => t.leadEmail === userEmail)

  const coreCountdown = useCountdown(PHASE_WINDOWS.CORE_WINDOW_END)
  const coreAlmostUp = timeToCoreWindowEnd < 5 * 60 * 1000 && timeToCoreWindowEnd > 0
  const isHackathonLive = phase === 'HACKATHON_LIVE' || phase === 'CORE_WINDOW_OPEN'
  const isHackathonOver = phase === 'RESULTS_PENDING' || phase === 'FINALE'
  const coreLocked = existingTeam?.isCoreLocked || (!isCoreWindowOpen && phase !== 'PRE_HACKATHON')
  const coreMissed = !isCoreWindowOpen && !existingTeam && isHackathonLive && phase !== 'CORE_WINDOW_OPEN'

  const [form, setForm] = useState<FormData>({
    teamName: existingTeam?.teamName ?? '',
    leadName: existingTeam?.leadName ?? '',
    leadEmail: existingTeam?.leadEmail ?? userEmail ?? '',
    leadMobile: existingTeam?.leadMobile ?? '',
    githubLink: existingTeam?.githubLink ?? '',
    liveLink: existingTeam?.liveLink ?? '',
    videoLink: existingTeam?.videoLink ?? '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [loading, setLoading] = useState(false)

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const e: Partial<FormData> = {}
    if (!form.teamName.trim()) e.teamName = 'Team name is required'
    if (!form.leadName.trim()) e.leadName = 'Lead name is required'
    if (!form.leadEmail.trim()) e.leadEmail = 'Email is required'
    if (!form.leadMobile.trim()) e.leadMobile = 'Mobile is required'
    if (!form.githubLink.trim()) e.githubLink = 'GitHub link is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))

    if (isCoreWindowOpen && !coreLocked) {
      submitCore({
        teamName: form.teamName, leadName: form.leadName,
        leadEmail: form.leadEmail, leadMobile: form.leadMobile, githubLink: form.githubLink,
      })
    }
    submitOptional(form.leadEmail, form.liveLink || undefined, form.videoLink || undefined)

    setLoading(false)
    showToast({ title: 'Team Registered', body: 'Your mission profile is on file, soldier.' })
  }

  // ── Locked field wrapper ────────────────────────────────
  function LockedField({ value, label }: { value: string; label: string }) {
    return (
      <div style={{ position: 'relative' }}>
        <DSInput label={label} value={value} disabled id={`locked-${label}`}
          style={{ opacity: 0.5, cursor: 'not-allowed' }} />
        <div style={{
          position: 'absolute', top: '26px', right: '12px',
          background: 'rgba(5,3,15,0.6)',
          display: 'flex', alignItems: 'center', gap: '4px',
        }} title="Core field locked">
          <Lock size={12} color="var(--stone-time)" />
        </div>
      </div>
    )
  }

  // ── Hackathon over overlay ──────────────────────────────
  if (isHackathonOver) {
    return (
      <div style={{
        background: 'var(--panel-bg)', backdropFilter: 'var(--blur-panel)',
        border: '1px solid var(--panel-border)', borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--panel-shadow)', padding: '40px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', minHeight: '360px', textAlign: 'center', gap: '16px',
        position: 'relative', overflow: 'hidden',
      }}>
        <ShieldOff size={48} color="var(--text-muted)" />
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '22px', color: 'var(--text-primary)' }}>
          The Endgame Has Ended
        </h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--text-secondary)' }}>
          All submission windows are now closed.
        </p>
      </div>
    )
  }

  return (
    <div style={{
      background: 'var(--panel-bg)', backdropFilter: 'var(--blur-panel)',
      border: '1px solid var(--panel-border)', borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--panel-shadow)', padding: '32px',
    }}>
      <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '20px', color: 'var(--text-primary)', marginBottom: '6px' }}>
        Mission Registration
      </h2>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>
        Complete core details within 15 minutes of hackathon start.
      </p>

      {/* Core window warning */}
      {isCoreWindowOpen && coreAlmostUp && (
        <motion.div
          animate={{ x: [0, -3, 3, -2, 2, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 60 }}
          style={{
            background: 'rgba(232,40,58,0.1)', border: '1px solid var(--stone-reality)',
            borderRadius: 'var(--radius-md)', padding: '12px 16px',
            display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '24px',
          }}
        >
          <AlertCircle size={15} color="var(--stone-reality)" style={{ flexShrink: 0, marginTop: '1px' }} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--stone-reality)' }}>
            Core submission window closes in {pad(coreCountdown.minutes)}:{pad(coreCountdown.seconds)}. Submit now.
          </span>
        </motion.div>
      )}

      {/* Core missed warning */}
      {coreMissed && (
        <div style={{
          background: 'rgba(232,40,58,0.08)', border: '1px solid var(--stone-reality)',
          borderRadius: 'var(--radius-md)', padding: '20px', marginBottom: '24px',
          display: 'flex', flexDirection: 'column', gap: '8px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={16} color="var(--stone-reality)" />
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '15px', color: 'var(--stone-reality)' }}>
              Core Submission Window Missed
            </h3>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            The 15-minute window for core team registration has closed. Contact an organizer immediately.
          </p>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'var(--text-muted)' }}>
            Pratyush Pal — 9330096004 · Palas Saha — 9073743988
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Core fields */}
        {coreLocked && existingTeam ? (
          <>
            <LockedField label="Team Name" value={existingTeam.teamName} />
            <LockedField label="Team Lead Full Name" value={existingTeam.leadName} />
            <LockedField label="Team Lead Email" value={existingTeam.leadEmail} />
            <LockedField label="Team Lead Mobile" value={existingTeam.leadMobile} />
            <LockedField label="GitHub Repository Link" value={existingTeam.githubLink} />
          </>
        ) : (
          <>
            <DSInput id="teamName" label="Team Name" required value={form.teamName}
              onChange={set('teamName')} error={errors.teamName} disabled={coreMissed} />
            <DSInput id="leadName" label="Team Lead Full Name" required value={form.leadName}
              onChange={set('leadName')} error={errors.leadName} disabled={coreMissed} />
            <DSInput id="leadEmail" label="Team Lead Email" type="email" required
              value={form.leadEmail} onChange={set('leadEmail')} error={errors.leadEmail} disabled={coreMissed} />
            <DSInput id="leadMobile" label="Team Lead Mobile" type="tel" required
              placeholder="+91 XXXXXXXXXX" value={form.leadMobile}
              onChange={set('leadMobile')} error={errors.leadMobile} disabled={coreMissed} />
            <DSInput id="githubLink" label="GitHub Repository Link" type="url" required
              value={form.githubLink} onChange={set('githubLink')} error={errors.githubLink}
              rightIcon={<Github size={14} />}
              note="Push incrementally throughout the hackathon"
              disabled={coreMissed} />
          </>
        )}

        {/* Divider */}
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--panel-border)' }} />
          </div>
          <span style={{
            position: 'relative', background: 'var(--void-surface)', padding: '0 12px',
            fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'var(--text-muted)',
            letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>
            Submit after deployment (before May 15 23:59)
          </span>
        </div>

        <DSInput id="liveLink" label="Live Deployment Link (optional)" type="url"
          value={form.liveLink} onChange={set('liveLink')} rightIcon={<Globe size={14} />} />
        <DSInput id="videoLink" label="Video Demo Link — YouTube or Drive (optional)" type="url"
          value={form.videoLink} onChange={set('videoLink')} rightIcon={<Video size={14} />} />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          disabled={!isHackathonLive || (coreMissed && !existingTeam)}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          {loading ? 'Channeling the Stones...' : 'Submit to the Gauntlet'}
        </Button>
      </form>
    </div>
  )
}
