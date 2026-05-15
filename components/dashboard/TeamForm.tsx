'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePhase } from '@/hooks/usePhase'
import { useCountdown } from '@/hooks/useCountdown'
import { PHASE_WINDOWS } from '@/lib/phases'
import { showToast } from '@/components/ui/Toast'
import DSInput from '@/components/ui/DSInput'
import {
  Github, Globe, Video, Lock, AlertCircle, ShieldOff, AlertTriangle,
  ShieldCheck, Sparkles,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase'
import { mapSubmission, useSubmission } from '@/hooks/useSubmission'
import { useTeamPrefill, TeamPrefill } from '@/hooks/useTeamPrefill'
import { Submission, SUBMISSION_ERROR_COPY } from '@/types'

interface FormData {
  teamName: string; leadName: string; leadEmail: string
  leadMobile: string; githubLink: string
  liveLink: string; videoLink: string
}

type Stage = 'prelaunch' | 'level0' | 'complete'

function pad(n: number) { return String(n).padStart(2, '0') }

function decodeRpcError(message: string | undefined): string {
  if (!message) return 'Submission failed. Try again.'
  for (const code of Object.keys(SUBMISSION_ERROR_COPY)) {
    if (message.includes(code)) return SUBMISSION_ERROR_COPY[code]
  }
  return message
}

function resolveStage(submission: Submission | null): Stage {
  if (!submission) return 'prelaunch'
  if (submission.videoLink && submission.videoLink.trim()) return 'complete'
  if (submission.githubLink && submission.githubLink.trim()) return 'level0'
  return 'prelaunch'
}

export default function TeamForm({ userEmail }: { userEmail?: string }) {
  const { phase, isCoreWindowOpen, timeToCoreWindowEnd } = usePhase()
  const { submission, loading: submissionLoading, setSubmission, refetch } = useSubmission()
  const { prefill, loading: prefillLoading } = useTeamPrefill(userEmail)

  const coreCountdown = useCountdown(PHASE_WINDOWS.CORE_WINDOW_END)
  const coreAlmostUp = timeToCoreWindowEnd < 5 * 60 * 1000 && timeToCoreWindowEnd > 0
  const isHackathonLive = phase === 'HACKATHON_LIVE' || phase === 'CORE_WINDOW_OPEN'
  const isHackathonOver = phase === 'RESULTS_PENDING' || phase === 'FINALE'

  const stage: Stage = useMemo(() => resolveStage(submission), [submission])

  const [form, setForm] = useState<FormData>({
    teamName: '',
    leadName: '',
    leadEmail: userEmail ?? '',
    leadMobile: '',
    githubLink: '',
    liveLink: '',
    videoLink: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!submission) return
    setForm(f => ({
      ...f,
      teamName: submission.teamName ?? f.teamName,
      leadName: submission.leadName ?? f.leadName,
      leadEmail: submission.leadEmail ?? userEmail ?? f.leadEmail,
      leadMobile: submission.leadMobile ?? f.leadMobile,
      githubLink: submission.githubLink ?? f.githubLink,
      liveLink: submission.liveLink ?? f.liveLink ?? '',
      videoLink: submission.videoLink ?? f.videoLink ?? '',
    }))
  }, [submission, userEmail])

  useEffect(() => {
    if (submission || !prefill) return
    setForm(f => ({
      ...f,
      teamName: f.teamName || prefill.teamName,
      leadName: f.leadName || prefill.leadName,
      leadEmail: f.leadEmail || prefill.leadEmail || userEmail || '',
      leadMobile: f.leadMobile || prefill.leadPhone,
    }))
  }, [prefill, submission, userEmail])

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const e: Partial<FormData> = {}
    if (!form.teamName.trim()) e.teamName = 'Team name missing from registration record'
    if (!form.leadName.trim()) e.leadName = 'Lead name missing from registration record'
    if (!form.leadEmail.trim()) e.leadEmail = 'Lead email missing'
    if (!form.leadMobile.trim()) e.leadMobile = 'Lead mobile missing'
    if (stage === 'prelaunch' && !form.githubLink.trim()) e.githubLink = 'GitHub link is required'
    if (form.githubLink.trim() && !/^https?:\/\//i.test(form.githubLink.trim())) e.githubLink = 'Must start with http(s)://'
    if (form.liveLink.trim()  && !/^https?:\/\//i.test(form.liveLink.trim()))  e.liveLink  = 'Must start with http(s)://'
    if (form.videoLink.trim() && !/^https?:\/\//i.test(form.videoLink.trim())) e.videoLink = 'Must start with http(s)://'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)

    const supabase = createClient()
    const { data, error: rpcError } = await supabase.rpc('submit_team', {
      p_team_name:   form.teamName.trim(),
      p_lead_name:   form.leadName.trim(),
      p_lead_mobile: form.leadMobile.trim(),
      p_github_link: form.githubLink.trim(),
      p_live_link:   form.liveLink.trim()  || null,
      p_video_link:  form.videoLink.trim() || null,
    })

    setLoading(false)

    if (rpcError) {
      showToast({ title: 'Submission Rejected', body: decodeRpcError(rpcError.message) })
      return
    }

    const raw = Array.isArray(data) ? data[0] : data
    const updated = mapSubmission(raw as Parameters<typeof mapSubmission>[0])
    if (updated) setSubmission(updated as Submission)
    else refetch()
    const nextStage = resolveStage(updated as Submission)
    const toastBody =
      nextStage === 'complete' ? 'Final transmission received. Endgame complete.' :
      nextStage === 'level0'   ? 'Level 0 cleared. Repository broadcast secured.' :
                                 'Submission stored on the secure channel.'
    showToast({ title: 'Mission Locked In', body: toastBody })
  }

  if (isHackathonOver) {
    return (
      <div className="relative w-full bg-[#050505] border border-white/10 p-12 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center min-h-[400px] text-center">
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

  if (stage === 'complete' && submission) {
    return <CompleteScreen submission={submission} />
  }

  return (
    <div className="relative w-full bg-[#050505] border border-white/10 p-6 md:p-8 lg:p-12 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)]">
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--accent)] opacity-[0.03] blur-[120px] pointer-events-none rounded-full" />

      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/20" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-white/20" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-white/20" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/20" />

      <div className="relative z-10 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]" />
            <span className="font-mono text-[9px] tracking-[0.3em] text-white/50 uppercase">Secured Channel</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-black text-white tracking-tight uppercase mb-3">
            {stage === 'level0' ? 'Deployment Drop' : 'Mission Registration'}
          </h2>
          <p className="font-mono text-[10px] md:text-[11px] text-white/40 tracking-[0.2em] uppercase max-w-md leading-relaxed border-l-2 border-[var(--accent)]/50 pl-3">
            {stage === 'level0'
              ? 'Repository broadcast confirmed. Lock the deployment intel before the gauntlet closes.'
              : isCoreWindowOpen 
                ? 'Registration dossier pulled from S.H.I.E.L.D. archives. Submit your repo to clear Level 0.'
                : 'Core window closed. Level 0 clearance no longer available.'}
          </p>
        </div>
        <div className="font-mono text-[9px] text-white/20 tracking-[0.3em] uppercase text-right hidden md:block leading-loose">
          FORM_ID // 0x44B<br/>
          STATUS // {submissionLoading ? 'SYNCING' : submission ? submission.status.toUpperCase() : 'PENDING'}
        </div>
      </div>

      <div className="relative z-10">
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {stage === 'level0'
            ? <Level0PassedHeader teamName={form.teamName || submission?.teamName || ''} />
            : <PrelaunchDossier prefill={prefill} loading={prefillLoading} form={form} errors={errors} setGithub={set('githubLink')} isCoreWindowOpen={isCoreWindowOpen} />
          }

          <div className="flex items-center gap-4 my-6 opacity-80">
            <div className="flex-1 h-[1px] bg-[var(--accent)]/20" />
            <span className="font-mono text-[9px] tracking-[0.3em] text-[var(--accent)] uppercase px-4 py-1 border border-[var(--accent)]/20 bg-[var(--accent)]/5">
              Deployment Intel // VIDEO DUE MAY 16 06:00
            </span>
            <div className="flex-1 h-[1px] bg-[var(--accent)]/20" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <DSInput id="liveLink" label="Live Deployment Link" type="url" value={form.liveLink} onChange={set('liveLink')} rightIcon={<Globe size={14} />} error={errors.liveLink} note="Optional" />
            <DSInput id="videoLink" label="Video Demo Link" type="url" value={form.videoLink} onChange={set('videoLink')} rightIcon={<Video size={14} />} error={errors.videoLink} note="Mandatory by hackathon end" />
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={!isHackathonLive || loading || submissionLoading}
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
                ) : stage === 'level0' ? 'Lock the Endgame' : 'Submit to the Gauntlet'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function PrelaunchDossier({
  prefill, loading, form, errors, setGithub, isCoreWindowOpen,
}: {
  prefill: TeamPrefill | null
  loading: boolean
  form: FormData
  errors: Partial<FormData>
  setGithub: (e: React.ChangeEvent<HTMLInputElement>) => void
  isCoreWindowOpen: boolean
}) {
  const hasPrefill = !!prefill || !!form.teamName
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[9px] tracking-[0.3em] text-[var(--stone-time)] uppercase">S.H.I.E.L.D. Dossier</span>
        <div className="flex-1 h-[1px] bg-white/10" />
        <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase">
          <Lock size={10} className="text-[var(--stone-time)]" /> Locked
        </span>
      </div>

      {hasPrefill ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <DossierField className="md:col-span-2" label="Team Name" value={form.teamName} />
          <DossierField label="Team Lead" value={form.leadName} />
          <DossierField label="Lead Email" value={form.leadEmail} mono />
          <DossierField label="Lead Mobile" value={form.leadMobile} mono />
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="md:col-span-2 h-[58px] bg-white/[0.03] border border-white/10 animate-pulse" />
          <div className="h-[58px] bg-white/[0.03] border border-white/10 animate-pulse" />
          <div className="h-[58px] bg-white/[0.03] border border-white/10 animate-pulse" />
          <div className="h-[58px] bg-white/[0.03] border border-white/10 animate-pulse" />
        </div>
      ) : (
        <div className="p-4 border border-[var(--stone-reality)]/30 bg-[var(--stone-reality)]/5 flex items-start gap-3">
          <AlertTriangle size={16} className="text-[var(--stone-reality)] shrink-0 mt-0.5" />
          <span className="font-mono text-[10px] tracking-widest text-[var(--stone-reality)] uppercase leading-relaxed">
            No registration record found for this email. Contact an organizer to resync your team data.
          </span>
        </div>
      )}

      <div className="pt-2">
        <DSInput
          id="githubLink"
          label="GitHub Repository Link"
          type="url"
          required
          value={form.githubLink}
          onChange={setGithub}
          error={errors.githubLink}
          rightIcon={<Github size={14} />}
          note={isCoreWindowOpen ? "Push incrementally throughout the hackathon" : "Core window ended. Repository locked."}
          highlight={!form.githubLink && isCoreWindowOpen}
          disabled={!isCoreWindowOpen}
        />
      </div>
    </div>
  )
}

function DossierField({
  label, value, className, mono,
}: { label: string; value: string; className?: string; mono?: boolean }) {
  return (
    <div className={`relative border border-white/10 bg-[#080808] px-4 py-3 ${className ?? ''}`}>
      <div className="font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase mb-1.5">{label}</div>
      <div className={`${mono ? 'font-mono text-[12px]' : 'font-display text-base'} text-white/90 truncate`}>
        {value || <span className="text-white/30">—</span>}
      </div>
      <Lock size={10} className="absolute top-3 right-3 text-[var(--stone-time)]/60" />
    </div>
  )
}

function Level0PassedHeader({ teamName }: { teamName: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative p-5 md:p-6 border border-[#22c55e]/40 bg-gradient-to-br from-[#22c55e]/10 via-[#22c55e]/5 to-transparent overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#22c55e] opacity-10 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center border border-[#22c55e]/40 bg-[#22c55e]/10">
            <ShieldCheck size={22} className="text-[#22c55e]" />
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#22c55e] uppercase">Clearance Granted</span>
              <Sparkles size={10} className="text-[#22c55e]" />
            </div>
            <span className="font-display text-xl md:text-2xl font-black text-white tracking-wide uppercase truncate">
              Level 0 Passed
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase truncate">
              {`${teamName || 'Operative'} // Repository locked in`}
            </span>
          </div>
        </div>
        <div className="font-mono text-[9px] tracking-[0.3em] text-[#22c55e]/80 uppercase px-3 py-2 border border-[#22c55e]/30 bg-[#22c55e]/5 self-start md:self-auto">
          Next Stage // Deploy + Demo
        </div>
      </div>
    </motion.div>
  )
}

function CompleteScreen({ submission }: { submission: Submission }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full bg-[#050505] border border-[#22c55e]/30 p-8 md:p-12 lg:p-16 overflow-hidden shadow-[0_0_60px_rgba(34,197,94,0.08)] flex flex-col items-center justify-center text-center min-h-[480px]"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-[#22c55e] opacity-[0.07] blur-[120px] pointer-events-none rounded-full" />

      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#22c55e]/60" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#22c55e]/60" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#22c55e]/60" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#22c55e]/60" />

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 160, damping: 16 }}
        className="relative z-10 mb-6 w-20 h-20 flex items-center justify-center border border-[#22c55e]/50 bg-[#22c55e]/10"
      >
        <ShieldCheck size={40} className="text-[#22c55e]" />
        <Sparkles size={14} className="absolute -top-2 -right-2 text-[#22c55e]" />
      </motion.div>

      <div className="relative z-10 flex items-center gap-3 mb-4">
        <span className="w-1.5 h-1.5 bg-[#22c55e] animate-pulse shadow-[0_0_8px_#22c55e]" />
        <span className="font-mono text-[9px] tracking-[0.3em] text-[#22c55e] uppercase">Endgame Complete</span>
        <span className="w-1.5 h-1.5 bg-[#22c55e] animate-pulse shadow-[0_0_8px_#22c55e]" />
      </div>

      <h2 className="relative z-10 font-display text-3xl md:text-4xl font-black text-white tracking-tight uppercase mb-3">
        Successfully Submitted
      </h2>
      <p className="relative z-10 font-mono text-[11px] md:text-[12px] text-white/60 tracking-[0.18em] uppercase max-w-md leading-relaxed mb-8">
        Thank you for the effort, Avenger. Final transmission locked into the Stone.
      </p>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-2xl">
        <ResultPill label="Team" value={submission.teamName} />
        <ResultPill label="Repo" value={submission.githubLink} link mono />
        <ResultPill label="Demo" value={submission.videoLink ?? ''} link mono />
      </div>

      <div className="relative z-10 mt-8 font-mono text-[9px] tracking-[0.3em] text-white/30 uppercase">
        Standby for shortlist // May 16 18:00 IST
      </div>
    </motion.div>
  )
}

function ResultPill({ label, value, link, mono }: { label: string; value: string; link?: boolean; mono?: boolean }) {
  const content = value && link
    ? <a href={value} target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-[#22c55e] underline decoration-white/20 hover:decoration-[#22c55e]/60 transition-colors truncate block">{value}</a>
    : <span className="text-white/90 truncate block">{value || '—'}</span>
  return (
    <div className="border border-white/10 bg-[#080808] px-3 py-3 text-left overflow-hidden">
      <div className="font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase mb-1.5">{label}</div>
      <div className={mono ? 'font-mono text-[11px]' : 'font-display text-sm'}>
        {content}
      </div>
    </div>
  )
}
