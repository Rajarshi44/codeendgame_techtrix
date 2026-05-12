'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertCircle, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import TechtrixLogo from '@/components/ui/TechtrixLogo'
import { createClient } from '@/lib/supabase'

interface AuthModalProps {
  open: boolean
  onClose: () => void
}

function GoogleIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: { access_type: 'offline', prompt: 'select_account' },
      },
    })
    if (oauthError) {
      setError('Failed to initiate Google sign-in. Please try again.')
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px',
        }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, background: 'rgba(5,5,5,0.65)' }}
          />

          {/* Modal — uses the same brutalist panel style as the rest of the site */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '420px',
              background: 'var(--void)',           /* matches site bg: #F4F4F0 */
              border: '2px solid var(--text-primary)',
              overflow: 'hidden',
            }}
          >
            {/* Red accent top bar */}
            <div style={{ height: '4px', background: 'var(--accent)' }} />

            {/* Header row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '18px 20px 14px',
              borderBottom: '2px solid var(--text-primary)',
            }}>
              <TechtrixLogo size="sm" on="light" />
              <button
                onClick={onClose}
                id="auth-modal-close"
                aria-label="Close"
                style={{
                  background: 'none', border: '1px solid var(--text-primary)',
                  cursor: 'pointer', padding: '4px 6px', display: 'flex', alignItems: 'center',
                  color: 'var(--text-primary)',
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '28px 24px 28px' }}>

              {/* Title */}
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 900,
                fontSize: '22px',
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
                marginBottom: '6px',
              }}>
                Terminal Access
              </div>

              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '20px',
              }}>
                Sign in with Google to access your mission profile.
              </p>

              {/* Payment notice box */}
              <div style={{
                display: 'flex',
                gap: '10px',
                padding: '12px 14px',
                background: 'var(--void-surface, #EAE8E3)',
                border: '1px solid var(--text-primary)',
                marginBottom: '24px',
              }}>
                <ShieldCheck size={15} style={{ flexShrink: 0, marginTop: '1px' }} color="var(--text-primary)" />
                <p style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.55,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}>
                  Only registered teams who have completed payment (Razorpay or SWC) can access the dashboard.
                </p>
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                      display: 'flex', gap: '8px', alignItems: 'flex-start',
                      padding: '10px 12px',
                      background: '#fdecea',
                      border: '1px solid var(--accent)',
                      marginBottom: '16px',
                    }}
                  >
                    <AlertCircle size={14} color="var(--accent)" style={{ flexShrink: 0, marginTop: '1px' }} />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--accent)', lineHeight: 1.5 }}>
                      {error}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Google button */}
              <motion.button
                id="google-signin-btn"
                whileHover={{ scale: loading ? 1 : 1.01 }}
                whileTap={{ scale: loading ? 1 : 0.99 }}
                onClick={handleGoogleLogin}
                disabled={loading}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  padding: '14px 20px',
                  background: loading ? 'var(--void-surface, #EAE8E3)' : '#ffffff',
                  border: '2px solid var(--text-primary)',
                  color: 'var(--text-primary)',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  transition: 'background 0.15s',
                }}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.75, ease: 'linear' }}
                      style={{
                        width: '18px', height: '18px',
                        border: '2px solid #ccc',
                        borderTopColor: 'var(--accent)',
                        borderRadius: '50%',
                      }}
                    />
                    Redirecting to Google…
                  </>
                ) : (
                  <>
                    <GoogleIcon size={20} />
                    Continue with Google
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
