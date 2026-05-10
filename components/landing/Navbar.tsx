'use client'

import { useState } from 'react'
import TechtrixLogo from '@/components/ui/TechtrixLogo'
import { Menu, X } from 'lucide-react'

interface NavbarProps {
  onAssemble: () => void
}

export default function Navbar({ onAssemble }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const navLinks = [
    { label: 'OP. PROTOCOLS', id: 'event-details' },
    { label: 'TIMEFRAME', id: 'timeline' },
    { label: 'GAUNTLET', id: 'prizes' },
    { label: 'COMMAND', id: 'organizers' },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-[var(--void)] border-b-2 border-[var(--panel-border)] flex items-stretch h-16">
        
        {/* Logo Compartment */}
        <div className="flex items-center px-6 border-r-2 border-[var(--panel-border)]">
          <TechtrixLogo size="sm" />
        </div>

        {/* Desktop Links Compartment */}
        <div className="hidden md:flex flex-1 items-stretch">
          {navLinks.map((l, index) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="flex-1 flex items-center justify-center border-r-2 border-[var(--panel-border)] hover:bg-[var(--text-primary)] hover:text-[var(--void)] transition-none"
            >
              <span className="font-mono text-sm tracking-widest">{l.label}</span>
            </button>
          ))}
        </div>

        {/* Action Button Compartment */}
        <button 
          onClick={onAssemble}
          className="hidden md:flex px-8 items-center justify-center bg-[var(--accent)] text-white hover:bg-[#c21515] transition-none"
        >
          <span className="font-display tracking-widest">INITIALIZE</span>
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex-1 flex justify-end items-center px-6 text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--void)] transition-none"
          onClick={() => setMenuOpen(true)}
        >
          <span className="font-mono mr-2">MENU</span>
          <Menu size={20} />
        </button>
      </nav>

      {/* Mobile Menu (Brutalist Overlay) */}
      {menuOpen && (
        <div className="fixed inset-0 z-[200] bg-[var(--void)] flex flex-col pt-16">
          <div className="absolute top-0 left-0 right-0 h-16 border-b-2 border-[var(--panel-border)] flex items-stretch">
            <div className="flex items-center px-6 border-r-2 border-[var(--panel-border)]">
              <TechtrixLogo size="sm" />
            </div>
            <button 
              className="flex-1 flex justify-end items-center px-6 hover:bg-[var(--text-primary)] hover:text-[var(--void)]"
              onClick={() => setMenuOpen(false)}
            >
              <span className="font-mono mr-2">CLOSE</span>
              <X size={20} />
            </button>
          </div>
          
          <div className="flex flex-col flex-1 divide-y-2 divide-[var(--panel-border)] border-b-2 border-[var(--panel-border)]">
            {navLinks.map(l => (
              <button 
                key={l.id} 
                onClick={() => scrollTo(l.id)} 
                className="flex-1 flex items-center justify-center hover:bg-[var(--text-primary)] hover:text-[var(--void)]"
              >
                <span className="font-mono text-xl tracking-widest">{l.label}</span>
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => { setMenuOpen(false); onAssemble(); }}
            className="h-24 bg-[var(--accent)] text-white flex items-center justify-center"
          >
            <span className="font-display text-2xl tracking-widest">INITIALIZE</span>
          </button>
        </div>
      )}
    </>
  )
}
