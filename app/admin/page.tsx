import { redirect } from 'next/navigation'
import AdminClient from './AdminClient'
import { createAdminSupabaseClient } from '@/lib/supabase-admin'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { ADMIN_EMAILS } from '@/lib/constants'
import { TeamSubmission } from '@/types'

export const metadata = {
  title: 'Command Center — CODE ENDGAME · TECHTRIX 2026',
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface SubmissionRow {
  id: string
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

async function assertAdmin(): Promise<void> {
  const supabase = await createServerSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()
  const email = session?.user?.email
  if (!email || !ADMIN_EMAILS.includes(email.toLowerCase())) {
    redirect('/')
  }
}

async function fetchSubmissions(): Promise<TeamSubmission[]> {
  try {
    const supabase = createAdminSupabaseClient()
    const { data, error } = await supabase
      .from('submissions')
      .select('id, team_name, lead_name, lead_email, lead_mobile, github_link, live_link, video_link, is_core_locked, core_submitted_at, last_updated_at, status')
      .order('last_updated_at', { ascending: false })

    if (error) {
      console.error('[admin] failed to load submissions:', error)
      return []
    }

    return (data as SubmissionRow[]).map((r): TeamSubmission => ({
      id: r.id,
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
    }))
  } catch (e) {
    console.error('[admin] service-role client error:', e)
    return []
  }
}

export default async function AdminPage() {
  await assertAdmin()
  const teams = await fetchSubmissions()
  return <AdminClient initialTeams={teams} />
}
