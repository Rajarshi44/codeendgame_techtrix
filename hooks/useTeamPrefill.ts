'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { EVENT_ID } from '@/lib/constants'

export interface TeamPrefill {
  teamId: string
  teamName: string
  leadName: string
  leadEmail: string
  leadPhone: string
}

export function useTeamPrefill(email: string | undefined) {
  const [prefill, setPrefill] = useState<TeamPrefill | null>(null)
  const [loading, setLoading] = useState<boolean>(!!email)

  useEffect(() => {
    if (!email) {
      setLoading(false)
      return
    }
    let cancelled = false

    async function run() {
      setLoading(true)
      const supabase = createClient()

      const [{ data: swcTeams }, { data: rzpPayments }] = await Promise.all([
        supabase
          .from('teams')
          .select('team_id')
          .eq('event_id', EVENT_ID)
          .eq('payment_mode', 'SWC_PAID'),
        supabase
          .from('payments')
          .select('team_id')
          .eq('event_id', EVENT_ID)
          .eq('status', 'paid'),
      ])

      if (cancelled) return

      const okTeamIds = Array.from(
        new Set([
          ...((swcTeams ?? []).map((t: { team_id: string }) => t.team_id)),
          ...((rzpPayments ?? []).map((p: { team_id: string }) => p.team_id)),
        ])
      )

      if (okTeamIds.length === 0) {
        setPrefill(null)
        setLoading(false)
        return
      }

      const { data: me, error: meErr } = await supabase
        .from('participants')
        .select('team_id')
        .eq('email', email)
        .in('team_id', okTeamIds)
        .maybeSingle()

      if (cancelled) return
      if (meErr || !me) {
        setPrefill(null)
        setLoading(false)
        return
      }

      const { data: team, error: teamErr } = await supabase
        .from('teams')
        .select('team_id, team_name, team_lead_email')
        .eq('team_id', me.team_id)
        .maybeSingle()

      if (cancelled) return
      if (teamErr || !team || !team.team_lead_email) {
        setPrefill(null)
        setLoading(false)
        return
      }

      const { data: lead, error: leadErr } = await supabase
        .from('participants')
        .select('name, phone')
        .eq('team_id', team.team_id)
        .eq('email', team.team_lead_email)
        .maybeSingle()

      if (cancelled) return
      if (leadErr) {
        setPrefill(null)
        setLoading(false)
        return
      }

      setPrefill({
        teamId: team.team_id,
        teamName: team.team_name ?? '',
        leadName: lead?.name ?? '',
        leadEmail: team.team_lead_email,
        leadPhone: lead?.phone ?? '',
      })
      setLoading(false)
    }

    run()
    return () => { cancelled = true }
  }, [email])

  return { prefill, loading }
}
