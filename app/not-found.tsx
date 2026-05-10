'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import TechtrixLogo from '@/components/ui/TechtrixLogo'
import Button from '@/components/ui/button'
import { AlertOctagon } from 'lucide-react'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', position: 'relative', zIndex: 1, textAlign: 'center',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        style={{
          background: 'var(--panel-bg)', backdropFilter: 'var(--blur-panel)',
          border: '1px solid var(--panel-border)', borderRadius: 'var(--radius-xl)',
          padding: '48px', maxWidth: '440px', width: '100%',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <TechtrixLogo size="sm" />
        </div>

        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [0, -5, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ display: 'inline-block', marginBottom: '16px' }}
        >
          <AlertOctagon size={48} color="var(--stone-reality)" />
        </motion.div>

        <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '32px', fontWeight: 700, color: 'var(--stone-reality)', marginBottom: '8px' }}>
          404 ERROR
        </h1>
        <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'var(--text-primary)', marginBottom: '16px', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Sector Not Found
        </h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.6 }}>
          The coordinates you entered lead to empty space. The portal has closed or never existed.
        </p>

        <Link href="/" passHref legacyBehavior>
          <Button variant="outline-pill" style={{ textDecoration: 'none' }}>
            Return to Base
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
