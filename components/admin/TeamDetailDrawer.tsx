'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, ExternalLink, CheckCheck } from 'lucide-react'
import { TeamSubmission } from '@/types'
import { format } from 'date-fns'
import DSBadge from '@/components/ui/DSBadge'
import { useState } from 'react'

interface TeamDetailDrawerProps {
  team: TeamSubmission | null
  onClose: () => void
}

function CopyableLink({ href, label }: { href?: string; label: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (!href) return
    navigator.clipboard.writeText(href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ marginBottom: '16px' }}>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
        {label}
      </p>
      {href ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'var(--text-secondary)', wordBreak: 'break-all', flex: 1 }}>
            {href}
          </p>
          <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
            <a href={href} target="_blank" rel="noopener noreferrer"
              style={{ background: 'none', border: '1px solid var(--panel-border)', borderRadius: 'var(--radius-sm)', padding: '4px', color: 'var(--text-muted)', display: 'flex', cursor: 'pointer' }}>
              <ExternalLink size={12} />
            </a>
            <button onClick={handleCopy}
              style={{ background: 'none', border: '1px solid var(--panel-border)', borderRadius: 'var(--radius-sm)', padding: '4px', color: copied ? '#4ade80' : 'var(--text-muted)', display: 'flex', cursor: 'pointer' }}>
              {copied ? <CheckCheck size={12} /> : <Copy size={12} />}
            </button>
          </div>
        </div>
      ) : (
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--text-muted)' }}>—</p>
      )}
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>{label}</p>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--text-primary)' }}>{value}</p>
    </div>
  )
}

export default function TeamDetailDrawer({ team, onClose }: TeamDetailDrawerProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640

  return (
    <AnimatePresence>
      {team && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 500,
              background: 'rgba(5,3,15,0.5)', backdropFilter: 'blur(4px)',
            }}
          />
          {/* Drawer */}
          <motion.div
            initial={isMobile ? { y: '100%' } : { x: '100%' }}
            animate={isMobile ? { y: 0 } : { x: 0 }}
            exit={isMobile ? { y: '100%' } : { x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            style={{
              position: 'fixed', zIndex: 501,
              background: 'var(--void-surface)',
              borderLeft: isMobile ? 'none' : '1px solid var(--panel-border)',
              borderTop: isMobile ? '1px solid var(--panel-border)' : 'none',
              boxShadow: '-8px 0 32px rgba(5,3,15,0.6)',
              overflowY: 'auto',
              ...(isMobile
                ? { left: 0, right: 0, bottom: 0, height: '85vh', borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0' }
                : { top: 0, right: 0, bottom: 0, width: '400px' }),
            }}
          >
            {/* Header */}
            <div style={{
              position: 'sticky', top: 0, zIndex: 1,
              background: 'var(--void-surface)',
              borderBottom: '1px solid var(--panel-border)',
              padding: '20px 24px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '16px', color: 'var(--text-primary)' }}>
                  {team.teamName}
                </h3>
                <DSBadge status={team.status} size="sm">{team.status}</DSBadge>
              </div>
              <button aria-label="Close drawer" onClick={onClose} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--text-muted)', padding: '4px', borderRadius: 'var(--radius-sm)',
              }}>
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div style={{ padding: '24px' }}>
              <Field label="Team Name" value={team.teamName} />
              <Field label="Lead Name" value={team.leadName} />
              <Field label="Lead Email" value={team.leadEmail} />
              <Field label="Lead Mobile" value={team.leadMobile} />

              <div style={{ borderTop: '1px solid var(--panel-border)', margin: '20px 0' }} />

              <CopyableLink href={team.githubLink} label="GitHub Repository" />
              <CopyableLink href={team.liveLink} label="Live Deployment" />
              <CopyableLink href={team.videoLink} label="Video Demo" />

              <div style={{ borderTop: '1px solid var(--panel-border)', margin: '20px 0' }} />

              {team.coreSubmittedAt && (
                <Field label="Submitted At"
                  value={format(new Date(team.coreSubmittedAt), "d MMMM yyyy · hh:mm a")} />
              )}

              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: '9px',
                color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '24px',
              }}>
                DATA SOURCE: Client Store (Zustand + localStorage)
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
