'use client'

import { FileText, ExternalLink, Sparkles } from 'lucide-react'

const PROBLEM_STATEMENT_URL =
  'https://docs.google.com/document/d/1uP1XmnELvIBr9EoRHZSi5BWBIbbMVYDUluwzb3KZU60'

export default function ProblemStatementCard() {
  return (
    <a
      href={PROBLEM_STATEMENT_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'block',
        position: 'relative',
        marginTop: '20px',
        background: 'var(--panel-bg)',
        backdropFilter: 'var(--blur-panel)',
        border: '1px solid var(--panel-border)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--panel-shadow)',
        padding: '20px',
        textDecoration: 'none',
        overflow: 'hidden',
        transition: 'border-color 0.25s ease, transform 0.25s ease',
      }}
      className="group"
    >
      <div
        style={{
          position: 'absolute', inset: 0,
          background:
            'radial-gradient(circle at 100% 0%, rgba(255,176,32,0.10), transparent 55%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute', top: 0, left: 0,
          width: '14px', height: '14px',
          borderTop: '1px solid rgba(255,176,32,0.45)',
          borderLeft: '1px solid rgba(255,176,32,0.45)',
        }}
      />
      <div
        style={{
          position: 'absolute', bottom: 0, right: 0,
          width: '14px', height: '14px',
          borderBottom: '1px solid rgba(255,176,32,0.45)',
          borderRight: '1px solid rgba(255,176,32,0.45)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              display: 'inline-block',
              width: '6px', height: '6px',
              background: 'var(--stone-time, #ffb020)',
              boxShadow: '0 0 8px var(--stone-time, #ffb020)',
            }}
          />
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '9px',
              letterSpacing: '0.3em',
              color: 'var(--stone-time, #ffb020)',
              textTransform: 'uppercase',
            }}
          >
            Mission Briefing
          </span>
          <Sparkles size={10} color="var(--stone-time, #ffb020)" />
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div
            style={{
              flexShrink: 0,
              width: '36px', height: '36px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(255,176,32,0.35)',
              background: 'rgba(255,176,32,0.06)',
            }}
          >
            <FileText size={16} color="var(--stone-time, #ffb020)" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
            <h4
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '14px',
                color: 'var(--text-primary)',
                margin: 0,
                letterSpacing: '0.08em',
              }}
            >
              Problem Statements
            </h4>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                color: 'var(--text-muted)',
                lineHeight: 1.5,
              }}
            >
              Classified ops dossier. Open the brief for the full mandate.
            </span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '10px',
            borderTop: '1px solid var(--panel-border)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}
        >
          <span>Open Brief</span>
          <ExternalLink
            size={12}
            color="var(--stone-time, #ffb020)"
            style={{ transition: 'transform 0.25s ease' }}
            className="group-hover:translate-x-0.5"
          />
        </div>
      </div>
    </a>
  )
}
