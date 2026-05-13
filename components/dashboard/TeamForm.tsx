'use client'

import { useState } from 'react'
import { useHackathonStore } from '@/store/useHackathonStore'
import { usePhase } from '@/hooks/usePhase'
import { useCountdown } from '@/hooks/useCountdown'
import { PHASE_WINDOWS } from '@/lib/phases'
import { showToast } from '@/components/ui/Toast'
import DSInput from '@/components/ui/DSInput'
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
      <div className="relative group">
        <DSInput 
          label={label} 
          value={value} 
          disabled 
          id={`locked-${label}`}
          className="opacity-60 cursor-not-allowed border-white/5 text-white/50 bg-[#050505]" 
        />
        <div 
          className="absolute top-[34px] right-3 bg-[#050505] p-1.5 border border-white/10 group-hover:border-[var(--stone-time)]/50 transition-colors" 
          title="Core field locked"
        >
          <Lock size={12} className="text-[var(--stone-time)] opacity-80" />
        </div>
      </div>
    )
  }

  // ── Hackathon over overlay ──────────────────────────────
  if (isHackathonOver) {
    return (
      <div className="relative w-full bg-[#050505] border border-white/10 p-12 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center min-h-[400px] text-center">
        {/* Kinetic Background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/5 blur-[100px] pointer-events-none rounded-full" />
        
        <ShieldOff size={48} className="text-white/20 mb-6 relative z-10" />
        <h2 className="font-display text-2xl font-black text-white tracking-widest uppercase mb-2 relative z-10">
          The Endgame Has Ended
        </h2>
        <p className="font-mono text-xs text-white/40 tracking-[0.2em] uppercase relative z-10">
          All submission windows are now closed.
        </p>
      </div>
    )
  }

  return (
    <div className="relative w-full bg-[#050505] border border-white/10 p-6 md:p-8 lg:p-12 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)]">
      {/* Kinetic Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--accent)] opacity-[0.03] blur-[120px] pointer-events-none rounded-full" />
      
      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/20" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-white/20" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-white/20" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/20" />

      {/* Header Section */}
      <div className="relative z-10 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]" />
            <span className="font-mono text-[9px] tracking-[0.3em] text-white/50 uppercase">Secured Channel</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-black text-white tracking-tight uppercase mb-3">
            Mission Registration
          </h2>
          <p className="font-mono text-[10px] md:text-[11px] text-white/40 tracking-[0.2em] uppercase max-w-md leading-relaxed border-l-2 border-[var(--accent)]/50 pl-3">
            Complete core details within 15 minutes of hackathon start to authorize your squad.
          </p>
        </div>
        <div className="font-mono text-[9px] text-white/20 tracking-[0.3em] uppercase text-right hidden md:block leading-loose">
          FORM_ID // 0x44B<br/>
          STATUS // PENDING
        </div>
      </div>

      <div className="relative z-10">
        {/* Core window warning */}
        {isCoreWindowOpen && coreAlmostUp && (
          <motion.div
            animate={{ x: [0, -3, 3, -2, 2, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 60 }}
            className="flex items-start gap-4 p-4 mb-8 bg-[var(--stone-reality)]/10 border border-[var(--stone-reality)]/30 backdrop-blur-sm"
          >
            <AlertCircle size={16} className="text-[var(--stone-reality)] shrink-0 mt-0.5" />
            <span className="font-mono text-[10px] md:text-[11px] tracking-widest text-[var(--stone-reality)] uppercase leading-relaxed">
              Core submission window closes in {pad(coreCountdown.minutes)}:{pad(coreCountdown.seconds)}. Immediate submission required.
            </span>
          </motion.div>
        )}

        {/* Core missed warning */}
        {coreMissed && (
          <div className="flex flex-col gap-3 p-5 mb-8 bg-[var(--stone-reality)]/5 border border-[var(--stone-reality)]/20">
            <div className="flex items-center gap-3">
              <AlertTriangle size={16} className="text-[var(--stone-reality)]" />
              <h3 className="font-display text-lg font-black tracking-widest text-[var(--stone-reality)] uppercase">
                Core Window Missed
              </h3>
            </div>
            <p className="font-mono text-[10px] tracking-widest text-white/50 uppercase leading-relaxed">
              The 15-minute window for core team registration has closed. Contact an organizer immediately.
            </p>
            <div className="mt-2 pt-3 border-t border-[var(--stone-reality)]/10 font-mono text-[10px] tracking-[0.2em] text-white/40">
              PRATYUSH // 9330096004 &nbsp;&nbsp;&nbsp; PALAS // 9073743988
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* Core Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            {coreLocked && existingTeam ? (
              <>
                <div className="md:col-span-2"><LockedField label="Team Name" value={existingTeam.teamName} /></div>
                <LockedField label="Team Lead Full Name" value={existingTeam.leadName} />
                <LockedField label="Team Lead Email" value={existingTeam.leadEmail} />
                <LockedField label="Team Lead Mobile" value={existingTeam.leadMobile} />
                <div className="md:col-span-2"><LockedField label="GitHub Repository Link" value={existingTeam.githubLink} /></div>
              </>
            ) : (
              <>
                <div className="md:col-span-2">
                  <DSInput id="teamName" label="Team Name" required value={form.teamName} onChange={set('teamName')} error={errors.teamName} disabled={coreMissed} />
                </div>
                <DSInput id="leadName" label="Team Lead Full Name" required value={form.leadName} onChange={set('leadName')} error={errors.leadName} disabled={coreMissed} />
                <DSInput id="leadEmail" label="Team Lead Email" type="email" required value={form.leadEmail} onChange={set('leadEmail')} error={errors.leadEmail} disabled={coreMissed} />
                <DSInput id="leadMobile" label="Team Lead Mobile" type="tel" required placeholder="+91 XXXXXXXXXX" value={form.leadMobile} onChange={set('leadMobile')} error={errors.leadMobile} disabled={coreMissed} />
                <div className="md:col-span-2">
                  <DSInput id="githubLink" label="GitHub Repository Link" type="url" required value={form.githubLink} onChange={set('githubLink')} error={errors.githubLink} rightIcon={<Github size={14} />} note="Push incrementally throughout the hackathon" disabled={coreMissed} />
                </div>
              </>
            )}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6 opacity-80">
            <div className="flex-1 h-[1px] bg-[var(--accent)]/20" />
            <span className="font-mono text-[9px] tracking-[0.3em] text-[var(--accent)] uppercase px-4 py-1 border border-[var(--accent)]/20 bg-[var(--accent)]/5">
              Optional Deployment Intel // DUE MAY 15 23:59
            </span>
            <div className="flex-1 h-[1px] bg-[var(--accent)]/20" />
          </div>

          {/* Optional Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <DSInput id="liveLink" label="Live Deployment Link (Optional)" type="url" value={form.liveLink} onChange={set('liveLink')} rightIcon={<Globe size={14} />} />
            <DSInput id="videoLink" label="Video Demo Link (Optional)" type="url" value={form.videoLink} onChange={set('videoLink')} rightIcon={<Video size={14} />} />
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={!isHackathonLive || (coreMissed && !existingTeam)}
              className="w-full relative group overflow-hidden bg-white text-[#050505] font-display font-black text-lg md:text-xl tracking-widest uppercase py-5 disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-[0.99] border border-transparent"
            >
              <div className="absolute inset-0 bg-[var(--accent)] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 cubic-bezier(0.16, 1, 0.3, 1)" />
              <div className="absolute inset-0 border border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#050505] border-t-transparent group-hover:border-white group-hover:border-t-transparent rounded-full animate-spin" />
                    Channeling...
                  </>
                ) : 'Submit to the Gauntlet'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
