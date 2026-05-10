'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Shield, Layers, CheckSquare, AlertTriangle } from 'lucide-react'

const RULES = [
  {
    id: 'eligibility',
    icon: Shield,
    title: 'Participation & Eligibility',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p>Open to all students enrolled in any recognized institution. No branch or year restrictions apply.</p>
        <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <li>Teams must have 2–4 members. Solo participation is not permitted.</li>
          <li>Cross-institutional teams are allowed and encouraged.</li>
          <li>Each individual may only participate in one team. Concurrent participation results in disqualification of both teams.</li>
          <li>Registration fee: ₹150 per team (non-refundable).</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'structure',
    icon: Layers,
    title: 'Competition Structure',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p>The hackathon runs in two phases:</p>
        <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <li><strong>Phase 1 — Online (48 hours):</strong> May 14, 12:01 AM to May 15, 11:59 PM IST. Remote, asynchronous development.</li>
          <li><strong>Phase 2 — Offline Finale (8 hours):</strong> May 17, 10:30 AM at RCCIIT campus. Shortlisted teams present to the judging panel.</li>
          <li>Shortlist results will be announced on May 16 evening.</li>
          <li>There are no predefined tracks. Teams are free to solve any real-world problem.</li>
          <li>Accepted tech stacks: Web, Mobile, AI/ML, Blockchain, or any combination.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'submission',
    icon: CheckSquare,
    title: 'Submission Requirements',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p>All submissions must be made through this dashboard before the deadline.</p>
        <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <li><strong>Core registration</strong> (team name, lead details, GitHub repo) must be submitted within 15 minutes of hackathon start.</li>
          <li>GitHub repository must be pushed to incrementally — no last-minute bulk commits.</li>
          <li>A live deployment link is required before the final submission deadline.</li>
          <li>A video demo (YouTube or Google Drive) must be submitted. Max 5 minutes.</li>
          <li>All work must be original and created during the hackathon window. Pre-built templates are not allowed.</li>
          <li>Open-source libraries and APIs are permitted with proper attribution.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'conduct',
    icon: AlertTriangle,
    title: 'Code of Conduct',
    accentColor: 'var(--stone-reality)',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p>Participants are expected to maintain a respectful and professional environment throughout the event.</p>
        <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <li>Any form of plagiarism, cheating, or misrepresentation will result in immediate disqualification.</li>
          <li>Harassment or discriminatory behavior will not be tolerated under any circumstances.</li>
          <li>The organizing team reserves the right to disqualify any team found violating these rules.</li>
          <li>Organizer decisions are final and binding in all matters.</li>
          <li>By registering, all team members agree to abide by this code of conduct.</li>
        </ul>
      </div>
    ),
  },
]

export default function Accordion() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {RULES.map(item => {
        const Icon = item.icon
        const isOpen = open === item.id
        const accent = (item as {accentColor?: string}).accentColor ?? 'var(--accent)'

        return (
          <div
            key={item.id}
            style={{
              background: 'var(--panel-bg)',
              backdropFilter: 'var(--blur-panel)',
              border: `1px solid ${isOpen ? 'var(--panel-border-active)' : 'var(--panel-border)'}`,
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              transition: 'border-color var(--duration-mid) var(--ease-out)',
            }}
          >
            <button
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : item.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '14px',
                padding: '16px 20px', background: 'transparent', border: 'none',
                cursor: 'pointer', textAlign: 'left',
                color: 'var(--text-primary)',
                transition: 'background var(--duration-fast)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-dim)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <Icon size={16} color={accent} style={{ flexShrink: 0 }} />
              <span style={{
                fontFamily: 'Cinzel, serif', fontSize: '14px', fontWeight: 400,
                letterSpacing: '0.05em', flex: 1,
              }}>
                {item.title}
              </span>
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                <ChevronDown size={16} color="var(--text-muted)" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{
                    padding: '20px 20px 24px',
                    borderTop: '1px solid var(--panel-border)',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                  }}>
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
