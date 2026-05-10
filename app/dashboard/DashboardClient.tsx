'use client'

import { usePhase } from '@/hooks/usePhase'
import PreHackathonGate from '@/components/dashboard/PreHackathonGate'
import TeamForm from '@/components/dashboard/TeamForm'
import SubmissionStatus from '@/components/dashboard/SubmissionStatus'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function DashboardClient({ userEmail }: { userEmail: string }) {
  const { phase } = usePhase()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 24px' }}>
      <AnimatePresence mode="wait">
        {phase === 'PRE_HACKATHON' ? (
          <motion.div
            key="gate"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <PreHackathonGate />
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '24px',
              alignItems: 'start',
            }}
          >
            {/* Desktop layout: 1fr 320px, Mobile: 1fr */}
            <style>{`
              @media (min-width: 800px) {
                #team-grid { grid-template-columns: 1fr 320px !important; }
              }
            `}</style>
            <div id="team-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
              <TeamForm userEmail={userEmail} />
              <div style={{ position: 'relative' }}>
                <SubmissionStatus userEmail={userEmail} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
