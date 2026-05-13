'use client'

import { useHackathonStore } from '@/store/useHackathonStore'
import PinGate from '@/components/admin/PinGate'
import CommandCenter from '@/components/admin/CommandCenter'
import { useEffect, useState } from 'react'
import { TeamSubmission } from '@/types'

export default function AdminClient({ initialTeams }: { initialTeams: TeamSubmission[] }) {
  const adminUnlocked = useHackathonStore(s => s.adminUnlocked)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return adminUnlocked ? <CommandCenter teams={initialTeams} /> : <PinGate />
}
