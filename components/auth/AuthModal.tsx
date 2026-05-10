'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, KeySquare } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TechtrixLogo from '@/components/ui/TechtrixLogo'
import Button from '@/components/ui/button'
import DSInput from '@/components/ui/DSInput'
import { useHackathonStore } from '@/store/useHackathonStore'

interface AuthModalProps {
  open: boolean
  onClose: () => void
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const login = useHackathonStore(s => s.login)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email.')
      return
    }

    setLoading(true)
    // Simulate network delay for the aesthetic
    await new Promise(r => setTimeout(r, 600))
    
    login(email)
    setLoading(false)
    onClose()
    router.push('/dashboard')
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
            style={{ position: 'absolute', inset: 0, background: 'rgba(5,3,15,0.8)', backdropFilter: 'blur(8px)' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            style={{
              position: 'relative', width: '100%', maxWidth: '400px',
              background: 'var(--panel-bg)', backdropFilter: 'var(--blur-panel)',
              border: '1px solid var(--panel-border)', borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--panel-shadow)', overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '24px 24px 16px', borderBottom: '1px solid var(--void-mid)',
            }}>
              <TechtrixLogo size="sm" />
              <button
                onClick={onClose}
                aria-label="Close modal"
                style={{
                  background: 'none', border: 'none', color: 'var(--text-muted)',
                  cursor: 'pointer', padding: '4px', borderRadius: '4px',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div style={{ padding: '24px' }}>
              <h2 style={{
                fontFamily: 'Cinzel, serif', fontSize: '20px',
                color: 'var(--text-primary)', marginBottom: '8px',
              }}>
                Terminal Access
              </h2>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: '13px',
                color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.5,
              }}>
                Enter your team lead's email to access your mission profile. No password required for this local build.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <DSInput 
                  id="email" 
                  type="email" 
                  label="Team Lead Email" 
                  placeholder="stark@avengers.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError('') }}
                  error={error}
                  rightIcon={<KeySquare size={14} />}
                />

                <Button 
                  type="submit" 
                  variant="primary" 
                  size="md" 
                  loading={loading}
                  style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
                >
                  {loading ? 'Authenticating...' : 'Enter Dashboard'}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
