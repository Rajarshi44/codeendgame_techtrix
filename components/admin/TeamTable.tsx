'use client'

import { format } from 'date-fns'
import { ExternalLink } from 'lucide-react'
import { TeamSubmission } from '@/types'
import DSBadge from '@/components/ui/DSBadge'

interface TeamTableProps {
  teams: TeamSubmission[]
  onSelectTeam: (team: TeamSubmission) => void
  searchQuery: string
  statusFilter: 'all' | 'complete' | 'partial' | 'pending'
}

export default function TeamTable({ teams, onSelectTeam, searchQuery, statusFilter }: TeamTableProps) {
  const filtered = teams.filter(t => {
    const q = searchQuery.toLowerCase()
    const matchSearch = !q || t.teamName.toLowerCase().includes(q) || t.leadName.toLowerCase().includes(q)
    const matchStatus = statusFilter === 'all' || t.status === statusFilter
    return matchSearch && matchStatus
  })

  if (filtered.length === 0) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '80px 24px', gap: '12px',
      }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
          <path d="M16 11c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4z" />
          <path d="M2 20c0-3.87 3.13-7 7-7h6c3.87 0 7 3.13 7 7" />
        </svg>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: 'var(--text-secondary)' }}>
          {teams.length === 0 ? 'No submissions yet.' : 'No teams match this filter.'}
        </p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--text-muted)' }}>
          {teams.length === 0
            ? 'Teams will appear here once they register.'
            : 'Try adjusting your search or filter.'}
        </p>
      </div>
    )
  }

  const borderMap: Record<string, string> = {
    complete: '#4ade80',
    partial: 'var(--stone-time)',
    pending: 'rgba(232,40,58,0.6)',
  }

  function LinkCell({ href }: { href?: string }) {
    if (!href) return <span style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', fontSize: '13px' }}>—</span>
    return (
      <a href={href} target="_blank" rel="noopener noreferrer"
        style={{ color: 'var(--stone-space)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
        onClick={e => e.stopPropagation()}>
        <ExternalLink size={13} />
      </a>
    )
  }

  return (
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
        <thead>
          <tr style={{
            background: 'var(--void-mid)',
            borderBottom: '1px solid var(--panel-border)',
          }}>
            {['#', 'Team Name', 'Lead Name', 'Email', 'Mobile', 'GitHub', 'Live', 'Video', 'Submitted', 'Status'].map(col => (
              <th key={col} style={{
                padding: '12px 16px', textAlign: 'left',
                fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 500,
                textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)',
                whiteSpace: 'nowrap',
              }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((team, i) => (
            <tr
              key={team.id}
              onClick={() => onSelectTeam(team)}
              style={{
                borderBottom: '1px solid var(--panel-border)',
                borderLeft: `4px solid ${borderMap[team.status] ?? 'transparent'}`,
                cursor: 'pointer',
                transition: 'background var(--duration-fast)',
                height: '52px',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-dim)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <td style={{ padding: '0 16px', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'var(--text-muted)' }}>{i + 1}</td>
              <td style={{ padding: '0 16px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--text-primary)', fontWeight: 600, whiteSpace: 'nowrap' }}>{team.teamName}</td>
              <td style={{ padding: '0 16px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{team.leadName}</td>
              <td style={{ padding: '0 16px', fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--text-muted)', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{team.leadEmail}</td>
              <td style={{ padding: '0 16px', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{team.leadMobile}</td>
              <td style={{ padding: '0 16px' }}><LinkCell href={team.githubLink} /></td>
              <td style={{ padding: '0 16px' }}><LinkCell href={team.liveLink} /></td>
              <td style={{ padding: '0 16px' }}><LinkCell href={team.videoLink} /></td>
              <td style={{ padding: '0 16px', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                {team.coreSubmittedAt ? format(new Date(team.coreSubmittedAt), "d MMM · hh:mm a") : '—'}
              </td>
              <td style={{ padding: '0 16px' }}>
                <DSBadge status={team.status}>{team.status}</DSBadge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
