'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CreditCard, ShieldX, ArrowLeft, AlertTriangle } from 'lucide-react'
import { Suspense } from 'react'
import TechtrixLogo from '@/components/ui/TechtrixLogo'

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const reason = searchParams.get('reason')
  const isNotPaid = reason === 'not_paid'

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--void)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'Inter, sans-serif',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%',
          maxWidth: '480px',
          background: 'var(--void)',
          border: '2px solid var(--text-primary)',
          overflow: 'hidden',
        }}
      >
        {/* Accent top bar — red for not_paid, dark for other errors */}
        <div style={{
          height: '4px',
          background: isNotPaid ? 'var(--accent)' : 'var(--text-primary)',
        }} />

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 20px 14px',
          borderBottom: '2px solid var(--text-primary)',
        }}>
          <TechtrixLogo size="sm" on="light" />
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            border: '1px solid var(--text-primary)',
            background: isNotPaid ? '#fdecea' : 'var(--void-surface, #EAE8E3)',
          }}>
            <AlertTriangle size={11} color={isNotPaid ? 'var(--accent)' : 'var(--text-primary)'} />
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: isNotPaid ? 'var(--accent)' : 'var(--text-primary)',
            }}>
              {isNotPaid ? 'Access Denied' : 'Auth Error'}
            </span>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '32px 28px 28px' }}>

          {/* Icon */}
          <div style={{
            width: '56px',
            height: '56px',
            border: `2px solid ${isNotPaid ? 'var(--accent)' : 'var(--text-primary)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            background: isNotPaid ? '#fdecea' : 'var(--void-surface, #EAE8E3)',
          }}>
            {isNotPaid
              ? <CreditCard size={24} color="var(--accent)" />
              : <ShieldX size={24} color="var(--text-primary)" />
            }
          </div>

          {/* Title */}
          <h1 style={{
            fontWeight: 900,
            fontSize: '26px',
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            color: 'var(--text-primary)',
            lineHeight: 1,
            marginBottom: '14px',
          }}>
            {isNotPaid ? 'Payment Not\nVerified' : 'Authentication\nFailed'}
          </h1>

          {/* Description */}
          <p style={{
            fontSize: '14px',
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            marginBottom: '16px',
          }}>
            {isNotPaid
              ? 'Your Google account is not linked to any paid registration for Code Endgame 2026. Payment via Razorpay or SWC is required before accessing the dashboard.'
              : 'We could not complete Google sign-in. The link may have expired, or the login was cancelled. Please try again.'}
          </p>

          {/* Hint box */}
          <div style={{
            padding: '12px 14px',
            background: 'var(--void-surface, #EAE8E3)',
            border: '1px solid var(--text-primary)',
            marginBottom: '28px',
          }}>
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              color: 'var(--text-muted)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              lineHeight: 1.6,
            }}>
              {isNotPaid
                ? 'Make sure you are signing in with the same email used during registration. If you believe this is a mistake, contact the event organizers.'
                : 'If this error persists, please contact the event organizers.'}
            </p>
          </div>

          {/* Divider */}
          <div style={{ borderTop: '1px solid var(--text-primary)', marginBottom: '20px', opacity: 0.15 }} />

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => router.push('/')}
              id="back-to-home-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '13px 20px',
                background: 'var(--text-primary)',
                border: '2px solid var(--text-primary)',
                color: 'var(--void)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              <ArrowLeft size={15} />
              Back to Home
            </motion.button>

            {isNotPaid && (
              <motion.a
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                href="https://techtrix.rcciit.org.in"
                target="_blank"
                rel="noopener noreferrer"
                id="register-pay-link"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '13px 20px',
                  background: 'var(--void)',
                  border: '2px solid var(--accent)',
                  color: 'var(--accent)',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                <CreditCard size={15} />
                Complete Payment
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: 'var(--void)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Loading…
        </div>
      </div>
    }>
      <AuthErrorContent />
    </Suspense>
  )
}
