'use client'

import { useHackathonStore } from '@/store/useHackathonStore'
import PinGate from '@/components/admin/PinGate'
import CommandCenter from '@/components/admin/CommandCenter'
import { useEffect, useState } from 'react'

export default function AdminClient() {
  const adminUnlocked = useHackathonStore(s => s.adminUnlocked)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return adminUnlocked ? <CommandCenter /> : <PinGate />
}
