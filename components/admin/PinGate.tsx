'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Loader2 } from 'lucide-react'
import { useHackathonStore } from '@/store/useHackathonStore'
import { ADMIN_PIN } from '@/lib/constants'
import TechtrixLogo from '@/components/ui/TechtrixLogo'
import Button from '@/components/ui/button'

export default function PinGate() {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [cooldown, setCooldown] = useState(0)
  const [loading, setLoading] = useState(false)
  const [shake, setShake] = useState(false)
  const unlockAdmin = useHackathonStore(s => s.unlockAdmin)

  const triggerCooldown = () => {
    setCooldown(10)
    const id = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) { clearInterval(id); return 0 }
        return prev - 1
      })
    }, 1000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (cooldown > 0 || loading) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 400))
    setLoading(false)

    if (pin === ADMIN_PIN) {
      unlockAdmin()
    } else {
      const next = attempts + 1
      setAttempts(next)
      setError('ACCESS DENIED — Invalid PIN.')
      setPin('')
      setShake(true)
      setTimeout(() => setShake(false), 600)
      if (next >= 3) { triggerCooldown(); setAttempts(0) }
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', position: 'relative', zIndex: 1,
    }}>
      <AnimatePresence mode="wait">
        <motion.div
          key="pin-gate"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '100%', maxWidth: '380px',
            background: 'var(--panel-bg)',
            backdropFilter: 'var(--blur-panel)',
            border: '1px solid var(--panel-border)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--panel-shadow)',
            padding: '40px 32px',
            textAlign: 'center',
          }}
        >
          {/* Arc reactor */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              {/* Outer ring — rotates */}
              <circle cx="32" cy="32" r="29" stroke="#00b8ff" strokeWidth="1.5" strokeDasharray="4 6"
                style={{ animation: 'arc-spin 10s linear infinite', transformOrigin: '32px 32px' }} />
              {/* Mid ring */}
              <circle cx="32" cy="32" r="20" stroke="#00b8ff" strokeWidth="1.2" opacity="0.6"
                style={{ animation: 'arc-spin 6s linear infinite reverse', transformOrigin: '32px 32px' }} />
              {/* Inner ring */}
              <circle cx="32" cy="32" r="12" stroke="#00b8ff" strokeWidth="1" opacity="0.4" />
              {/* Core glow */}
              <circle cx="32" cy="32" r="4" fill="#00b8ff" opacity="0.9"
                style={{ filter: 'drop-shadow(0 0 8px #00b8ff)' }} />
            </svg>
          </div>

          <h1 style={{
            fontFamily: 'Cinzel, serif', fontSize: '18px',
            color: 'var(--text-primary)', letterSpacing: '0.15em', marginBottom: '6px',
          }}>
            STARK AUTHENTICATION
          </h1>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '12px',
            color: 'var(--text-muted)', marginBottom: '28px',
          }}>
            Authorized Personnel Only
          </p>

          <form onSubmit={handleSubmit}>
            <motion.div
              animate={shake ? { x: [0, -10, 10, -10, 10, -6, 6, -4, 4, 0] } : { x: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <input
                type="password"
                maxLength={12}
                value={pin}
                onChange={e => { setPin(e.target.value); setError('') }}
                placeholder="••••••••••"
                disabled={cooldown > 0}
                aria-label="Admin PIN"
                style={{
                  width: '100%',
                  background: 'var(--void-mid)',
                  border: `1px solid ${error ? 'var(--stone-reality)' : 'var(--panel-border)'}`,
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '20px',
                  textAlign: 'center',
                  letterSpacing: '0.5em',
                  padding: '12px 16px',
                  outline: 'none',
                  marginBottom: '16px',
                  transition: 'border-color 0.3s',
                  animation: error ? 'none' : undefined,
                }}
                onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-dim)' }}
                onBlur={e => { e.currentTarget.style.borderColor = error ? 'var(--stone-reality)' : 'var(--panel-border)'; e.currentTarget.style.boxShadow = '' }}
              />
            </motion.div>

            {error && (
              <p role="alert" style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--stone-reality)', marginBottom: '12px' }}>
                {error}
              </p>
            )}
            {cooldown > 0 && (
              <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'var(--stone-time)', marginBottom: '12px' }}>
                Cooldown: {cooldown}s
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={loading}
              disabled={cooldown > 0 || !pin}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {loading ? 'Verifying...' : 'AUTHENTICATE'}
            </Button>
          </form>

          <div style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <TechtrixLogo size="sm" />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
