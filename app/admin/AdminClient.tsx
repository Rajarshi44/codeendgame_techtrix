'use client'

import CommandCenter from '@/components/admin/CommandCenter'
import { useEffect, useState } from 'react'
import { TeamSubmission } from '@/types'
import { AlertCircle } from 'lucide-react'

export default function AdminClient({
  initialTeams,
  fetchError,
}: {
  initialTeams: TeamSubmission[]
  fetchError?: string
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {fetchError && (
        <div style={{
          margin: '16px 24px 0',
          padding: '12px 16px',
          background: 'rgba(232,40,58,0.08)',
          border: '1px solid var(--accent)',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '12px',
          color: 'var(--accent)',
        }}>
          <AlertCircle size={14} style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Submission fetch failed</div>
            <div>{fetchError}</div>
          </div>
        </div>
      )}
      <CommandCenter teams={initialTeams} />
    </>
  )
}
