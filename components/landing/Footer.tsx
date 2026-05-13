import TechtrixLogo from '@/components/ui/TechtrixLogo'
import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#050505] text-white border-t border-white/5 overflow-hidden pt-16 pb-10">
      {/* ── BALANCED TACTICAL BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }} />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-12">
          
          {/* LEFT: Identity Block */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col space-y-1">
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 font-mono text-[9px] tracking-[0.4em] text-[var(--accent)] uppercase"
              >
                <span className="w-1.5 h-1.5 bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]" />
                End of Transmission
              </motion.div>
              <h2 className="font-display text-[8vw] lg:text-[4rem] font-black tracking-tighter leading-[0.9] text-white select-none">
                CODE
                <br />
                <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.1)' }}>ENDGAME</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-10 items-center border-l border-white/10 pl-6 py-1">
              <div className="bg-white p-2">
                <TechtrixLogo size="sm" on="light" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[8px] tracking-[0.3em] text-white/30 uppercase">Operational Hub</span>
                <span className="font-mono text-[11px] tracking-[0.1em] uppercase font-bold text-white">RCCIIT · Kolkata</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[8px] tracking-[0.3em] text-white/30 uppercase">Status</span>
                <span className="font-mono text-[11px] tracking-[0.1em] uppercase font-bold text-[var(--accent)]">2026_ACTIVE</span>
              </div>
            </div>
          </div>

          {/* RIGHT: System Metadata */}
          <div className="flex flex-col items-start lg:items-end gap-6 lg:text-right">
            <div className="flex items-center gap-3 text-white/40 group cursor-default">
              <span className="font-mono text-[10px] tracking-widest uppercase">Encryption: AES-256_ACTIVE</span>
              <ShieldCheck size={14} className="group-hover:text-[var(--accent)] transition-colors" />
            </div>
            <p className="font-mono text-[9px] tracking-[0.2em] text-white/20 uppercase max-w-[280px] leading-relaxed">
              Authorized access only. Architectural blueprints and system signatures are encrypted.
            </p>
          </div>
        </div>

        {/* BOTTOM BAR: Attribution & Legal */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <span className="font-mono text-[9px] tracking-[0.3em] text-white/20 uppercase">
              © 2026 TECHTRIX · RCCIIT
            </span>
            <div className="h-[1px] w-12 bg-white/5 hidden md:block" />
            <span className="font-mono text-[8px] tracking-[0.4em] text-white/10 uppercase">
              0x44B_STABLE_BLUEPRINT
            </span>
          </div>

          {/* THE SIGNATURE: Designed by Rajarshi */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-4 bg-white/[0.02] px-6 py-3 border border-white/5 hover:border-[var(--accent)]/30 transition-all cursor-default"
          >
            <div className="flex flex-col items-end">
              <span className="font-mono text-[7px] tracking-[0.4em] text-white/30 uppercase leading-none mb-1">Architectural Oversight</span>
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-white font-bold">
                Designed by <span className="text-[var(--accent)]">Rajarshi</span>
              </span>
            </div>
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center overflow-hidden bg-[#0a0a0a] relative">
               <div className="w-full h-[1px] bg-[var(--accent)] rotate-45" />
               <div className="absolute inset-0 flex items-center justify-center font-display text-[10px] font-black text-white/10">RJ</div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
