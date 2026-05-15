'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const RULES = [
  {
    id: 'eligibility',
    title: 'Eligibility',
    content: (
      <div className="pt-8 pb-12">
        <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-[#050505] mb-8 lg:mb-12 max-w-2xl leading-[0.9] break-words">
          NO BORDERS.<br/>NO RESTRICTIONS.<br/>PURE MERIT.
        </h3>
        
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.5fr] gap-8 lg:gap-16">
          <div className="flex flex-col gap-6">
            <div className="pb-4 border-b border-[#050505]/10">
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#050505]/40 uppercase block mb-1">Target Audience</span>
              <span className="font-sans text-sm font-bold text-[#050505]">All enrolled students.</span>
            </div>
            <div className="pb-4 border-b border-[#050505]/10">
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#050505]/40 uppercase block mb-1">Squad Size</span>
              <span className="font-sans text-sm font-bold text-[#050505]">2–4 Operatives.</span>
            </div>
            <div className="pb-4 border-b border-[#050505]/10">
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#050505]/40 uppercase block mb-1">Access Fee</span>
              <span className="font-sans text-sm font-bold text-[#050505]">₹150 / Team.</span>
            </div>
          </div>
          
          <div className="font-mono text-[10px] md:text-[11px] text-[#050505]/60 leading-[2] uppercase tracking-[0.1em] text-balance">
            Cross-institutional alliances are highly encouraged. We seek the best combinations of talent, regardless of origin. 
            <br/><br/>
            <span className="text-[var(--accent)] font-bold">NOTE:</span> Singular participation is prohibited. Every operative must be part of a unit. Concurrent deployment across multiple teams will trigger immediate system-wide disqualification.
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'structure',
    title: 'Structure',
    content: (
      <div className="pt-8 pb-12">
        <div className="relative">
          {/* Architectural Connecting Line */}
          <div className="absolute top-[28px] left-[28px] right-[28px] h-[1px] bg-[#050505]/10 hidden md:block" />
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-16">
            {/* Phase 1 */}
            <div className="relative pt-12">
              <div className="absolute top-0 left-0 w-12 h-12 bg-white rounded-full border border-[#050505]/10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] flex items-center justify-center font-display font-black text-xl text-[#050505]">1</div>
              <h4 className="font-display text-3xl lg:text-4xl font-black tracking-tighter text-[#050505] mb-4">THE SPRINT</h4>
              <div className="inline-block px-3 py-1.5 bg-[#050505] text-white font-mono text-[10px] tracking-widest mb-4">54-HOUR REMOTE</div>
              <p className="font-sans text-sm text-[#050505]/60 leading-relaxed mb-4 lg:pr-4">
                Asynchronous development phase. Teams architect and build their core prototypes.
              </p>
              <div className="font-mono text-[9px] tracking-[0.2em] text-[#050505]/40 uppercase">May 14, 12:01 AM — May 16, 6:00 AM</div>
            </div>

            {/* Phase 2 */}
            <div className="relative pt-12">
              <div className="absolute top-0 left-0 w-12 h-12 bg-[#050505] text-[#F4F4F0] rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.2)] flex items-center justify-center font-display font-black text-xl">2</div>
              <h4 className="font-display text-3xl lg:text-4xl font-black tracking-tighter text-[#050505] mb-4">THE FINALE</h4>
              <div className="inline-block px-3 py-1.5 bg-[var(--accent)] text-[#050505] font-bold font-mono text-[10px] tracking-widest mb-4">8-HOUR CAMPUS SHOWDOWN</div>
              <p className="font-sans text-sm text-[#050505]/60 leading-relaxed mb-4 lg:pr-4">
                Shortlisted teams deploy and present live. No predefined tracks. Open tech stack. Hardware integrations permitted.
              </p>
              <div className="font-mono text-[9px] tracking-[0.2em] text-[#050505]/40 uppercase">May 17, 10:30 AM @ RCCIIT</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'submission',
    title: 'Deliverables',
    content: (
      <div className="pt-8 pb-12">
        <h3 className="font-display text-3xl md:text-4xl font-black tracking-tighter text-[#050505] mb-8 lg:mb-12 break-words">
          MANDATORY ASSETS.
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-12 lg:gap-y-16">
          {[
            { t: "CORE REGISTRATION", d: "Team name, lead details, & empty repo within 15 mins of start." },
            { t: "COMMIT HISTORY", d: "Incremental progress is mandatory. Bulk commits trigger audits." },
            { t: "LIVE DEPLOYMENT", d: "Publicly accessible link required before the absolute deadline." },
            { t: "VIDEO DEMONSTRATION", d: "Max 5-minute pitch explaining architecture & UI (YouTube/Drive)." },
            { t: "ORIGINALITY", d: "Zero pre-built templates. Open source libraries require attribution." },
            { t: "DASHBOARD UPLOAD", d: "All assets must be synchronized via the official hackathon portal." }
          ].map((req, i) => (
            <div key={i} className="group cursor-default relative">
              <div className="w-8 h-[2px] bg-[#050505]/20 mb-6 group-hover:w-full group-hover:bg-[var(--accent)] transition-all duration-700 ease-out" />
              <div className="font-mono text-[10px] tracking-[0.3em] text-[#050505]/40 mb-3 transition-colors group-hover:text-[var(--accent)]">0{i+1}</div>
              <h4 className="font-sans font-bold text-sm text-[#050505] mb-3 uppercase tracking-wide">{req.t}</h4>
              <p className="font-sans text-xs text-[#050505]/60 leading-relaxed">{req.d}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'conduct',
    title: 'Conduct',
    content: (
      <div className="pt-8 pb-4">
        <div className="p-6 md:p-12 bg-[#050505] text-[#F4F4F0] rounded-2xl md:rounded-3xl relative overflow-hidden group">
          {/* Subtle hover gradient bloom inside the black box */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[var(--accent)]/10 blur-[80px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2 group-hover:bg-[var(--accent)]/20 transition-colors duration-1000" />
          
          <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter mb-8 md:mb-12 relative z-10 text-white break-words">
            ZERO TOLERANCE.
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 font-mono text-[10px] md:text-[11px] leading-[2] tracking-[0.1em] md:tracking-[0.15em] text-[#F4F4F0]/50 uppercase relative z-10">
            <div>
              <span className="text-[var(--accent)] font-bold">1.</span> Plagiarism, cheating, or misrepresentation results in immediate disqualification and permanent ban.
              <br/><br/>
              <span className="text-[var(--accent)] font-bold">2.</span> Harassment or discriminatory behavior will not be tolerated under any circumstances.
            </div>
            <div>
              <span className="text-[var(--accent)] font-bold">3.</span> The organizing committee reserves the right to disqualify any team found violating protocols.
              <br/><br/>
              <span className="text-[var(--accent)] font-bold">4.</span> Organizer decisions are final. Registration implies implicit agreement to all terms.
            </div>
          </div>
        </div>
      </div>
    ),
  },
]

export default function Accordion() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="flex flex-col w-full">
      {RULES.map((item, index) => {
        const isOpen = open === item.id

        return (
          <div
            key={item.id}
            className="group flex flex-col border-b border-[#050505]/10 last:border-b-0"
          >
            <button
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : item.id)}
              className="w-full flex items-center justify-between py-6 md:py-8 bg-transparent border-none cursor-pointer text-left transition-all hover:pl-2 duration-500"
            >
              <div className="flex items-center gap-4 lg:gap-8 overflow-hidden pr-4">
                <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-[#050505]/30 group-hover:text-[var(--accent)] transition-colors shrink-0">
                  0{index + 1}
                </span>
                <span className="font-display text-2xl sm:text-3xl lg:text-4xl font-black tracking-tighter text-[#050505] uppercase group-hover:opacity-80 transition-opacity truncate">
                  {item.title}
                </span>
              </div>
              
              <motion.div 
                animate={{ rotate: isOpen ? 45 : 0 }} 
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#050505]/10 flex items-center justify-center shrink-0 transition-colors duration-500 ${isOpen ? 'bg-[#050505] text-[#F4F4F0]' : 'text-[#050505] group-hover:border-[#050505]'}`}
              >
                <div className="relative w-4 h-4 md:w-5 md:h-5">
                  <div className="absolute top-1/2 left-0 w-full h-[2px] bg-current -translate-y-1/2 rounded-full" />
                  <div className="absolute left-1/2 top-0 w-[2px] h-full bg-current -translate-x-1/2 rounded-full" />
                </div>
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="w-full pl-0 md:pl-12 lg:pl-16">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
