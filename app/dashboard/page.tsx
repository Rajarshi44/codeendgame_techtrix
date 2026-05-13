'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import PhaseTracker from '@/components/dashboard/PhaseTracker'
import DashboardClient from './DashboardClient'
import { Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase'

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)

    // TEMPORARY BYPASS — Supabase not connected
    setUserEmail('dev@example.com')

    /*
    const supabase = createClient()

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user?.email) {
        router.push('/')
      } else {
        setUserEmail(session.user.email)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user?.email) {
        router.push('/')
      } else {
        setUserEmail(session.user.email)
      }
    })

    return () => subscription.unsubscribe()
    */
  }, [router])

  if (!mounted || !userEmail) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 size={32} className="animate-spin" color="var(--stone-space)" />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <PhaseTracker userEmail={userEmail} />
      <DashboardClient userEmail={userEmail} />
    </div>
  )
}
