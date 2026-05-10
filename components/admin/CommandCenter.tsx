'use client'

import { useState } from 'react'
import { useHackathonStore } from '@/store/useHackathonStore'
import { usePhase } from '@/hooks/usePhase'
import { TeamSubmission } from '@/types'
import TechtrixLogo from '@/components/ui/TechtrixLogo'
import TeamTable from './TeamTable'
import TeamDetailDrawer from './TeamDetailDrawer'
import DSBadge from '@/components/ui/DSBadge'
import { Search, Download, Lock } from 'lucide-react'
import { format } from 'date-fns'
import Button from '@/components/ui/button'

export default function CommandCenter() {
  const teams = useHackathonStore(s => s.teams)
  const lockAdmin = useHackathonStore(s => s.lockAdmin)
  const { phase } = usePhase()

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'complete' | 'partial' | 'pending'>('all')
  const [selectedTeam, setSelectedTeam] = useState<TeamSubmission | null>(null)

  const complete = teams.filter(t => t.status === 'complete').length
  const partial = teams.filter(t => t.status === 'partial').length

  const handleExport = () => {
    const headers = ['Team Name', 'Lead Name', 'Email', 'Mobile', 'GitHub', 'Live Link', 'Video', 'Submitted At', 'Status']
    const rows = teams.map(t => [
      t.teamName, t.leadName, t.leadEmail, t.leadMobile,
      t.githubLink, t.liveLink ?? '', t.videoLink ?? '',
      t.coreSubmittedAt ? format(new Date(t.coreSubmittedAt), "yyyy-MM-dd HH:mm") : '',
      t.status,
    ])
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `code-endgame-submissions-${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const PHASE_LABEL: Record<string, string> = {
    PRE_HACKATHON: 'Pre-Hackathon',
    CORE_WINDOW_OPEN: 'Core Window Open',
    HACKATHON_LIVE: 'Hackathon Live',
    RESULTS_PENDING: 'Results Pending',
    FINALE: 'Grand Finale',
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      {/* Header bar */}
      <div style={{
        background: 'rgba(13,8,32,0.9)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--panel-border)',
        padding: '16px 24px',
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
          <TechtrixLogo size="sm" />
          <span style={{
            fontFamily: 'Cinzel, serif', fontSize: '14px',
            color: 'var(--stone-power)', letterSpacing: '0.15em',
          }}>COMMAND CENTER</span>
          <DSBadge color="var(--stone-power)">{PHASE_LABEL[phase] ?? phase}</DSBadge>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { label: `Total: ${teams.length}`, color: 'var(--stone-space)' },
            { label: `Complete: ${complete}`, color: '#4ade80' },
            { label: `Partial: ${partial}`, color: 'var(--stone-time)' },
          ].map(s => (
            <span key={s.label} style={{
              fontFamily: 'Inter, sans-serif', fontSize: '12px',
              color: s.color, background: s.color + '15',
              border: `1px solid ${s.color}30`,
              borderRadius: '9999px', padding: '4px 10px',
            }}>
              {s.label}
            </span>
          ))}
        </div>

        <button
          aria-label="Lock terminal"
          onClick={lockAdmin}
          style={{
            background: 'none', border: '1px solid var(--panel-border)',
            borderRadius: 'var(--radius-md)', padding: '6px 12px',
            cursor: 'pointer', color: 'var(--text-muted)',
            display: 'flex', alignItems: 'center', gap: '6px',
            fontFamily: 'Inter, sans-serif', fontSize: '12px',
            transition: 'color var(--duration-fast), border-color var(--duration-fast)',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--stone-reality)'; e.currentTarget.style.borderColor = 'var(--stone-reality)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--panel-border)' }}
        >
          <Lock size={12} /> Lock Terminal
        </button>
      </div>

      {/* Filter + Search */}
      <div style={{
        padding: '20px 24px',
        display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center',
        borderBottom: '1px solid var(--panel-border)',
      }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={14} style={{
            position: 'absolute', left: '12px', top: '50%',
            transform: 'translateY(-50%)', color: 'var(--text-muted)',
          }} />
          <input
            type="text"
            placeholder="Search teams..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', paddingLeft: '36px', paddingRight: '14px',
              paddingTop: '9px', paddingBottom: '9px',
              background: 'var(--void-mid)',
              border: '1px solid var(--panel-border)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontFamily: 'Inter, sans-serif', fontSize: '13px',
              outline: 'none',
            }}
          />
        </div>

        {/* Segmented control */}
        <div style={{
          display: 'flex', background: 'var(--void-mid)',
          border: '1px solid var(--panel-border)',
          borderRadius: 'var(--radius-md)', overflow: 'hidden',
        }}>
          {(['all', 'complete', 'partial', 'pending'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '8px 14px',
                fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 500,
                textTransform: 'capitalize', letterSpacing: '0.05em',
                border: 'none', cursor: 'pointer',
                background: filter === f ? 'var(--accent)' : 'transparent',
                color: filter === f ? '#fff' : 'var(--text-muted)',
                transition: 'background var(--duration-fast), color var(--duration-fast)',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <Button variant="ghost" size="sm" onClick={handleExport}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Download size={13} /> Export CSV
        </Button>
      </div>

      {/* Table */}
      <div style={{ padding: '0' }}>
        <TeamTable
          teams={teams}
          onSelectTeam={setSelectedTeam}
          searchQuery={search}
          statusFilter={filter}
        />
      </div>

      <TeamDetailDrawer team={selectedTeam} onClose={() => setSelectedTeam(null)} />
    </div>
  )
}
