'use client'

import { useEffect } from 'react'
import { create } from 'zustand'
import { createClient } from '@/lib/supabase'
import { Submission } from '@/types'

interface RawSubmissionRow {
  id: string
  event_id: string
  team_id: string
  lead_email: string
  team_name: string
  lead_name: string
  lead_mobile: string
  github_link: string
  live_link: string | null
  video_link: string | null
  is_core_locked: boolean
  core_submitted_at: string
  last_updated_at: string
  status: 'pending' | 'partial' | 'complete'
}

export function mapSubmission(row: RawSubmissionRow | null | undefined): Submission | null {
  if (!row || !row.id) return null
  return {
    id: row.id,
    eventId: row.event_id,
    teamId: row.team_id,
    leadEmail: row.lead_email,
    teamName: row.team_name,
    leadName: row.lead_name,
    leadMobile: row.lead_mobile,
    githubLink: row.github_link,
    liveLink: row.live_link,
    videoLink: row.video_link,
    isCoreLocked: row.is_core_locked,
    coreSubmittedAt: row.core_submitted_at,
    lastUpdatedAt: row.last_updated_at,
    status: row.status,
  }
}

interface SubmissionStore {
  submission: Submission | null
  loading: boolean
  error: string | null
  fetched: boolean
  inflight: Promise<void> | null
  setSubmission: (s: Submission | null) => void
  fetchSubmission: () => Promise<void>
}

const useSubmissionStore = create<SubmissionStore>((set, get) => ({
  submission: null,
  loading: true,
  error: null,
  fetched: false,
  inflight: null,
  setSubmission: (s) => set({ submission: s }),
  fetchSubmission: async () => {
    const current = get().inflight
    if (current) return current
    const p = (async () => {
      set({ loading: true, error: null })
      const supabase = createClient()
      const { data, error: rpcError } = await supabase.rpc('get_my_submission')
      if (rpcError) {
        set({ error: rpcError.message, submission: null, loading: false, fetched: true, inflight: null })
      } else {
        const raw = Array.isArray(data) ? data[0] : data
        set({ submission: mapSubmission(raw as RawSubmissionRow | null), loading: false, fetched: true, inflight: null })
      }
    })()
    set({ inflight: p })
    return p
  },
}))

export function useSubmission() {
  const submission = useSubmissionStore(s => s.submission)
  const loading = useSubmissionStore(s => s.loading)
  const error = useSubmissionStore(s => s.error)
  const fetched = useSubmissionStore(s => s.fetched)
  const setSubmission = useSubmissionStore(s => s.setSubmission)
  const fetchSubmission = useSubmissionStore(s => s.fetchSubmission)

  useEffect(() => {
    if (!fetched) fetchSubmission()
  }, [fetched, fetchSubmission])

  return { submission, loading, error, refetch: fetchSubmission, setSubmission }
}
