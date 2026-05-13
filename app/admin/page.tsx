import { Suspense } from 'react'
import AdminClient from './AdminClient'
import AdminLogin from '@/components/admin/AdminLogin'
import { createAdminSupabaseClient } from '@/lib/supabase-admin'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { ADMIN_EMAILS } from '@/lib/constants'
import { Participant, TeamSubmission } from '@/types'

export const metadata = {
  title: 'Command Center — CODE ENDGAME · TECHTRIX 2026',
}

interface SubmissionRow {
  id: string
  team_id: string
  team_name: string
  lead_name: string
  lead_email: string
  lead_mobile: string
  github_link: string
  live_link: string | null
  video_link: string | null
  is_core_locked: boolean
  core_submitted_at: string
  last_updated_at: string
  status: 'pending' | 'partial' | 'complete'
}

interface ParticipantRow {
  team_id: string
  email: string
  name: string | null
  phone: string | null
}

async function fetchSubmissions(): Promise<{ teams: TeamSubmission[]; error?: string }> {
  try {
    const supabase = createAdminSupabaseClient()
    const { data, error } = await supabase
      .from('submissions')
      .select('id, team_id, team_name, lead_name, lead_email, lead_mobile, github_link, live_link, video_link, is_core_locked, core_submitted_at, last_updated_at, status')
      .order('last_updated_at', { ascending: false })

    if (error) {
      console.error('[admin] failed to load submissions:', error)
      return { teams: [], error: error.message }
    }

    const rows = (data ?? []) as SubmissionRow[]
    const teamIds = Array.from(new Set(rows.map(r => r.team_id)))

    let participantsByTeam = new Map<string, Participant[]>()
    if (teamIds.length > 0) {
      const { data: pData, error: pError } = await supabase
        .from('participants')
        .select('team_id, email, name, phone')
        .in('team_id', teamIds)

      if (pError) {
        console.error('[admin] failed to load participants:', pError)
      } else {
        participantsByTeam = (pData as ParticipantRow[]).reduce((acc, p) => {
          const list = acc.get(p.team_id) ?? []
          list.push({ email: p.email, name: p.name, phone: p.phone })
          acc.set(p.team_id, list)
          return acc
        }, new Map<string, Participant[]>())
      }
    }

    const teams = rows.map((r): TeamSubmission => ({
      id: r.id,
      teamId: r.team_id,
      teamName: r.team_name,
      leadName: r.lead_name,
      leadEmail: r.lead_email,
      leadMobile: r.lead_mobile,
      githubLink: r.github_link,
      liveLink: r.live_link ?? undefined,
      videoLink: r.video_link ?? undefined,
      coreSubmittedAt: r.core_submitted_at,
      lastUpdatedAt: r.last_updated_at,
      isCoreLocked: r.is_core_locked,
      status: r.status,
      participants: participantsByTeam.get(r.team_id) ?? [],
    }))
    return { teams }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[admin] service-role client error:', msg)
    return { teams: [], error: msg }
  }
}

async function AdminGate() {
  const supabase = await createServerSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()
  const email = session?.user?.email?.toLowerCase()

  if (!email) return <AdminLogin />
  if (!ADMIN_EMAILS.includes(email)) return <AdminLogin denied />

  const { teams, error } = await fetchSubmissions()
  return <AdminClient initialTeams={teams} fetchError={error} />
}

function AdminFallback() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
      Loading command center…
    </div>
  )
}

export default function AdminPage() {
  return (
    <Suspense fallback={<AdminFallback />}>
      <AdminGate />
    </Suspense>
  )
}
