import { ORGANIZERS } from '@/lib/constants'

type OrganizerEntry = { name: string; phone: string; year: string }

function OrgCard({ person, roleLabel, hierarchy }: { person: OrganizerEntry; roleLabel: string, hierarchy: string }) {
  return (
    <div className="group relative bg-white border border-[#050505]/10 p-5 hover:bg-[#050505] transition-all duration-500 overflow-hidden cursor-crosshair">
      {/* Cinematic Glitch Background */}
      <div className="absolute inset-0 bg-[var(--accent)] opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700" />
      
      {/* Corner crosshairs */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#050505]/20 group-hover:border-white/20 transition-colors" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#050505]/20 group-hover:border-white/20 transition-colors" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#050505]/20 group-hover:border-white/20 transition-colors" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#050505]/20 group-hover:border-white/20 transition-colors" />
      
      <div className="flex justify-between items-start mb-10 relative z-10">
        <span className="font-mono text-[9px] tracking-[0.3em] text-[#050505]/40 group-hover:text-white/40 uppercase transition-colors">
          {roleLabel} // {hierarchy}
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]/50 group-hover:bg-[var(--accent)] group-hover:shadow-[0_0_10px_var(--accent)] transition-all" />
      </div>

      <div className="relative z-10">
        <p className="font-display text-xl lg:text-2xl font-black uppercase text-[#050505] group-hover:text-white transition-colors mb-2 tracking-tight">
          {person.name}
        </p>
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 bg-[#050505]/5 group-hover:bg-white/10 transition-colors font-mono text-[9px] text-[#050505]/50 group-hover:text-white/50 tracking-widest">
            COMMS
          </span>
          <span className="font-mono text-[11px] tracking-widest text-[#050505] group-hover:text-[var(--accent)] transition-colors">
            {person.phone}
          </span>
        </div>
      </div>
    </div>
  )
}

function VolunteerCard({ person }: { person: OrganizerEntry }) {
  return (
    <div className="group flex justify-between items-center py-2.5 border-b border-[#050505]/5 last:border-b-0 hover:bg-[#050505]/[0.02] transition-colors px-2 -mx-2 rounded-sm cursor-default break-inside-avoid">
      <span className="font-mono text-[10px] md:text-[11px] font-bold text-[#050505] uppercase tracking-widest">
        {person.name}
      </span>
      <span className="font-mono text-[9px] tracking-[0.2em] text-[#050505]/40 group-hover:text-[var(--accent)] transition-colors">
        {person.phone}
      </span>
    </div>
  )
}

export default function OrganizersSection() {
  return (
    <section id="organizers" className="relative w-full py-16 md:py-24 xl:py-28 bg-[var(--void)] border-y border-[#050505]/10 overflow-hidden">
      
      {/* Kinetic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at center, #050505 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px'
      }} />

      <div className="max-w-[1500px] mx-auto px-4 md:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Massive Sticky Header */}
          <div className="lg:sticky lg:top-32 flex flex-col">
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="w-1.5 h-1.5 bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#050505]/50 uppercase">
                Personnel Roster
              </span>
            </div>
            
            <h2 className="font-display text-5xl md:text-6xl xl:text-[6rem] font-black tracking-tighter leading-[0.85] text-[#050505] mb-6">
              COMMAND<br/>COUNCIL
            </h2>
            
            <p className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] leading-relaxed text-[#050505]/50 uppercase max-w-sm text-balance mb-8 border-l-2 border-[#050505]/10 pl-4">
              Authorized personnel index. Direct all communications through designated secure channels listed below.
            </p>

            {/* Decorative hierarchy block */}
            <div className="hidden lg:flex flex-col gap-3 font-mono text-[9px] tracking-[0.25em] text-[#050505]/30 w-full max-w-[280px]">
              <div className="flex justify-between border-b border-[#050505]/10 pb-2">
                <span>CONVENORS</span>
                <span className="text-[#050505]/60 font-bold">CLASS_IV</span>
              </div>
              <div className="flex justify-between border-b border-[#050505]/10 pb-2">
                <span>COORDINATORS</span>
                <span className="text-[#050505]/60 font-bold">CLASS_III</span>
              </div>
              <div className="flex justify-between border-b border-[#050505]/10 pb-2">
                <span>VOLUNTEERS</span>
                <span className="text-[#050505]/60 font-bold">CLASS_II</span>
              </div>
            </div>
          </div>

          {/* Right Column: The Hierarchy */}
          <div className="flex flex-col gap-12 lg:gap-16">
            
            {/* CONVENORS */}
            <div className="relative">
              <div className="absolute -left-4 md:-left-8 top-0 bottom-0 w-[2px] bg-[var(--accent)] hidden lg:block" />
              <h3 className="font-mono text-xs tracking-[0.3em] uppercase mb-6 flex items-center justify-between border-b border-[#050505]/10 pb-3">
                <span className="font-bold text-[#050505]">CONVENORS</span>
                <span className="text-[9px] text-[#050505]/40 bg-[#050505]/5 px-2 py-1">CLEARANCE: CLASS IV</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ORGANIZERS.convenors.map(p => (
                  <OrgCard key={p.name} person={p} roleLabel="CONVENOR" hierarchy="CL-IV" />
                ))}
              </div>
            </div>

            {/* COORDINATORS */}
            <div className="relative">
              <div className="absolute -left-4 md:-left-8 top-0 bottom-0 w-[2px] bg-[#050505]/20 hidden lg:block" />
              <h3 className="font-mono text-xs tracking-[0.3em] uppercase mb-6 flex items-center justify-between border-b border-[#050505]/10 pb-3">
                <span className="font-bold text-[#050505]">COORDINATORS</span>
                <span className="text-[9px] text-[#050505]/40 bg-[#050505]/5 px-2 py-1">CLEARANCE: CLASS III</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ORGANIZERS.coordinators.map(p => (
                  <OrgCard key={p.name} person={p} roleLabel="COORDINATOR" hierarchy="CL-III" />
                ))}
              </div>
            </div>

            {/* VOLUNTEERS */}
            <div className="relative">
              <div className="absolute -left-4 md:-left-8 top-0 bottom-0 w-[2px] bg-[#050505]/10 hidden lg:block" />
              <h3 className="font-mono text-xs tracking-[0.3em] uppercase mb-6 flex items-center justify-between border-b border-[#050505]/10 pb-3">
                <span className="font-bold text-[#050505]">VOLUNTEERS</span>
                <span className="text-[9px] text-[#050505]/40 bg-[#050505]/5 px-2 py-1">CLEARANCE: CLASS II</span>
              </h3>
              <div className="bg-white border border-[#050505]/10 p-5 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
                <div className="columns-1 md:columns-2 gap-x-12 lg:gap-x-16">
                  {ORGANIZERS.volunteers.map(p => (
                    <VolunteerCard key={p.name} person={p} />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
