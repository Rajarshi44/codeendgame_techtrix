'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { ShieldOff, ShieldCheck, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

function GoogleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

export default function AdminLogin({ denied }: { denied?: boolean }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/admin`,
        queryParams: { access_type: 'offline', prompt: 'select_account' },
      },
    })
    if (oauthError) {
      setError('Google sign-in failed. Try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: 'var(--void)',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'var(--panel-bg)',
          backdropFilter: 'var(--blur-panel)',
          border: '1px solid var(--panel-border)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--panel-shadow)',
          padding: '40px 32px',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          {denied
            ? <ShieldOff size={40} color="var(--stone-reality)" />
            : <ShieldCheck size={40} color="var(--stone-space)" />}
        </div>

        <h1 style={{
          fontFamily: 'Cinzel, serif', fontSize: '20px',
          color: 'var(--text-primary)', letterSpacing: '0.15em', marginBottom: '8px',
        }}>
          {denied ? 'ACCESS DENIED' : 'COMMAND CENTER'}
        </h1>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '13px',
          color: 'var(--text-muted)', marginBottom: '28px', lineHeight: 1.6,
        }}>
          {denied
            ? 'This Google account is not authorized for admin access.'
            : 'Sign in with an authorized Google account to continue.'}
        </p>

        {error && (
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: '8px',
            padding: '10px 12px', marginBottom: '16px',
            background: 'rgba(232,40,58,0.08)',
            border: '1px solid var(--accent)',
            borderRadius: 'var(--radius-sm)',
          }}>
            <AlertCircle size={14} color="var(--accent)" />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--accent)' }}>
              {error}
            </span>
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '12px 16px',
            background: '#ffffff',
            color: '#050505',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          <GoogleIcon />
          {loading ? 'Redirecting…' : denied ? 'Switch Account' : 'Continue with Google'}
        </button>
      </motion.div>
    </div>
  )
}
