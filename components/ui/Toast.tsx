'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export interface ToastData {
  id: string
  title: string
  body?: string
}

let toastListeners: Array<(t: ToastData) => void> = []
export function showToast(t: Omit<ToastData, 'id'>) {
  const toast = { ...t, id: Math.random().toString(36).slice(2) }
  toastListeners.forEach(fn => fn(toast))
}

export default function ToastProvider() {
  const [toasts, setToasts] = useState<ToastData[]>([])

  useEffect(() => {
    const handler = (t: ToastData) => {
      setToasts(prev => [...prev, t])
      setTimeout(() => setToasts(prev => prev.filter(x => x.id !== t.id)), 5000)
    }
    toastListeners.push(handler)
    return () => { toastListeners = toastListeners.filter(fn => fn !== handler) }
  }, [])

  return (
    <div style={{
      position: 'fixed', top: '24px', right: '24px',
      zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '12px',
    }}>
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 120 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 120 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'var(--void-surface)',
              border: '1px solid var(--stone-power)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px 20px',
              minWidth: '280px',
              maxWidth: '340px',
              display: 'flex', gap: '12px', alignItems: 'flex-start',
              boxShadow: '0 8px 32px rgba(5,3,15,0.6)',
              position: 'relative',
            }}
          >
            {/* Left stone-cycle bar */}
            <span style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: '4px',
              borderRadius: 'var(--radius-lg) 0 0 var(--radius-lg)',
              background: 'var(--stone-power)',
              animation: 'stone-cycle 2.4s linear 1 forwards',
            }} />
            <div style={{ paddingLeft: '8px', flex: 1 }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>
                ✦ {t.title}
              </p>
              {t.body && (
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {t.body}
                </p>
              )}
            </div>
            <button
              aria-label="Dismiss notification"
              onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px' }}
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
