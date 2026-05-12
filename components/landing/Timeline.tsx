'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const GhostSpiderModel = dynamic(() => import('./GhostSpiderModel'), { ssr: false })

const NODES = [
  {
    id: 'T-01',
    seq: '01',
    date: '13 MAY 2026',
    time: '23:59 HRS',
    title: 'REGISTRATION CLOSES',
    subtitle: 'Portal access revoked. No late entries. The roster is sealed.',
    status: 'DEADLINE',
  },
  {
    id: 'T-02',
    seq: '02',
    date: '14 – 15 MAY',
    time: '48 HRS',
    title: 'THE CRUCIBLE',
    subtitle: 'Online hackathon. 48 uninterrupted hours to architect, build, and deploy.',
    status: 'ACTIVE',
  },
  {
    id: 'T-03',
    seq: '03',
    date: '16 MAY 2026',
    time: 'EVENING',
    title: 'ROUND 1 RESULTS',
    subtitle: 'Intelligence declassified. The shortlist drops. Only the worthy advance.',
    status: 'INTEL',
  },
  {
    id: 'T-04',
    seq: '04',
    date: '17 MAY 2026',
    time: '10:30 HRS',
    title: 'THE FINAL STAND',
    subtitle: 'Grand finale at RCCIIT. Present your build to the command council.',
    status: 'FINALE',
  },
]

export default function Timeline() {
  // Height of the visible tab when stacked
  const TAB_HEIGHT = 64; 

  return (
    <section id="timeline" className="relative w-full bg-[var(--void)] py-24 md:py-32 px-4 md:px-12 lg:px-24 border-y border-[var(--panel-border)]/10 overflow-hidden">
      
      {/* Background blueprint grid */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex justify-between items-end border-b-4 border-[var(--panel-border)] pb-6 mb-16 relative">
          <div className="absolute -left-4 bottom-0 w-2 h-8 bg-[var(--accent)]" />
          <h2 className="font-display text-4xl md:text-6xl font-black pl-4">TIMEFRAME</h2>
          <div className="font-mono text-sm tracking-widest hidden md:block text-[var(--accent)] bg-[var(--accent)]/10 px-4 py-1 border border-[var(--accent)]/30 backdrop-blur-sm">
            [ SCHEDULE.LOG ]
          </div>
        </div>

        {/* Split Screen Layout — Locked to 600px */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          {/* LEFT: 3D Model Box */}
          <div className="w-full h-[500px] lg:h-[600px] bg-white border border-[var(--text-primary)]/10 shadow-2xl group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-12 h-12 border-t-[3px] border-l-[3px] border-[var(--text-primary)] m-3 z-10 pointer-events-none transition-all duration-700 group-hover:w-16 group-hover:h-16" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-[3px] border-r-[3px] border-[var(--text-primary)] m-3 z-10 pointer-events-none transition-all duration-700 group-hover:w-16 group-hover:h-16" />

            <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.04] flex items-center justify-center">
              <div className="w-full h-[1px] bg-black" />
              <div className="absolute h-full w-[1px] bg-black" />
            </div>

            <div className="absolute top-6 left-6 font-mono text-[10px] tracking-widest text-[var(--text-muted)] rotate-90 origin-top-left translate-x-3 z-10 bg-white/80 px-1 backdrop-blur-sm">
              GHOST_SPIDER // G-65
            </div>
            
            <div className="absolute inset-0 z-0">
              <GhostSpiderModel />
            </div>
          </div>

          {/* RIGHT: File-Folder Rolodex Timeline */}
          <div className="w-full h-[500px] lg:h-[600px] overflow-y-auto no-scrollbar relative bg-white/50 backdrop-blur-sm">
            
            <style jsx>{`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>

            <div className="flex flex-col pt-4 px-2">
              {NODES.map((node, index) => {
                const isLast = index === NODES.length - 1;
                // Precise math: each card sticks exactly below the previous tab header
                const stickyOffset = index * TAB_HEIGHT; 
                
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    key={node.id} 
                    className="sticky"
                    style={{ top: `${stickyOffset}px`, zIndex: 10 + index }}
                  >
                    {/* The Card - Clean solid background with Cast Shadow for depth */}
                    <div className="relative border border-[var(--text-primary)]/10 bg-[#fafafa] shadow-[0_-12px_40px_rgba(0,0,0,0.06)] transition-all duration-500 overflow-hidden group">
                      
                      {/* Active / Hover Top Accent Line */}
                      <div className={`absolute top-0 left-0 w-full h-[3px] transition-colors duration-500 ${
                        node.status === 'ACTIVE' ? 'bg-[var(--accent)]' : 'bg-transparent group-hover:bg-[var(--text-primary)]/10'
                      }`} />

                      {/* --- THE TAB HEADER (Remains visible when stacked) --- */}
                      <div 
                        className={`flex items-center justify-between px-6 border-b transition-colors duration-300 cursor-default ${
                          node.status === 'ACTIVE' ? 'border-[var(--accent)]/10 bg-white' : 'border-[var(--text-primary)]/10 bg-[#fafafa] group-hover:bg-white'
                        }`}
                        style={{ height: `${TAB_HEIGHT}px` }}
                      >
                        <div className="flex items-center gap-4 md:gap-6">
                          <span className={`font-mono text-xs md:text-sm tracking-[0.2em] font-black ${
                            node.status === 'ACTIVE' ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
                          }`}>
                            {node.seq}
                          </span>
                          <span className={`font-display text-sm md:text-base tracking-widest font-black uppercase truncate ${
                            node.status === 'ACTIVE' ? 'text-[var(--text-primary)]' : 'text-[var(--text-primary)]/80 group-hover:text-[var(--text-primary)]'
                          }`}>
                            {node.title}
                          </span>
                        </div>
                        <div className="font-mono text-[10px] md:text-xs tracking-widest text-[var(--text-muted)] whitespace-nowrap pl-4">
                          {node.date}
                        </div>
                      </div>

                      {/* --- THE CARD BODY (Covered when stacked) --- */}
                      {/* Mathematical exact heights ensure the final card fills the container perfectly with zero overscroll */}
                      <div className={`relative p-6 md:p-8 flex flex-col justify-between ${
                        isLast ? 'h-[244px] lg:h-[344px]' : 'h-[220px] lg:h-[280px]'
                      }`}>
                        
                        {/* Massive background watermark */}
                        <div className="absolute top-4 right-4 font-display text-[6rem] md:text-[8rem] leading-none text-[var(--text-primary)] opacity-[0.03] pointer-events-none select-none">
                          {node.seq}
                        </div>

                        <div className="relative z-10 flex flex-col h-full">
                          
                          <div>
                            <div className="flex items-center gap-3 mb-6">
                              <span className={`font-mono text-[10px] tracking-[0.2em] px-2 py-0.5 border ${
                                node.status === 'ACTIVE' 
                                  ? 'border-[var(--accent)]/30 text-[var(--accent)] bg-[var(--accent)]/5' 
                                  : 'border-[var(--text-primary)]/20 text-[var(--text-muted)]'
                              }`}>
                                {node.status}
                              </span>
                            </div>

                            <p className="font-mono text-sm tracking-widest text-[var(--text-primary)] leading-relaxed max-w-sm mb-8 uppercase">
                              {node.subtitle}
                            </p>
                          </div>

                          <div className="mt-auto">
                            <div className={`font-mono text-xs font-bold px-3 py-1 inline-block ${
                              node.status === 'ACTIVE' ? 'bg-[var(--accent)] text-white' : 'bg-black text-white'
                            }`}>
                              {node.time}
                            </div>
                          </div>

                        </div>
                      </div>

                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
