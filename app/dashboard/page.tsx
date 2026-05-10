'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import PhaseTracker from '@/components/dashboard/PhaseTracker'
import DashboardClient from './DashboardClient'
import { Loader2 } from 'lucide-react'
import { useHackathonStore } from '@/store/useHackathonStore'

export default function DashboardPage() {
  const currentUserEmail = useHackathonStore(s => s.currentUserEmail)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    if (!currentUserEmail) {
      router.push('/')
    }
  }, [currentUserEmail, router])

  if (!mounted || !currentUserEmail) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 size={32} className="animate-spin" color="var(--stone-space)" />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <PhaseTracker userEmail={currentUserEmail} />
      <DashboardClient userEmail={currentUserEmail} />
    </div>
  )
}
