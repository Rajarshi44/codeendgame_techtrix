const NODES = [
  {
    id: 'T-01',
    date: '09.05.2026',
    time: '2359 HRS',
    title: 'PORTALS CLOSE',
    subtitle: 'REGISTRATION CLOSES — ACCESS DENIED POST-DEADLINE',
  },
  {
    id: 'T-02',
    date: '10.05.2026',
    time: '0001 HRS',
    title: 'ENDGAME BEGINS',
    subtitle: 'PHASE 1 ONLINE HACKATHON STARTS — 48 HOURS REMAINING',
    active: true
  },
  {
    id: 'T-03',
    date: '12.05.2026',
    time: '2359 HRS',
    title: 'FINAL SUBMISSION',
    subtitle: 'PHASE 1 CONCLUDES — SUBMIT OR BE TERMINATED',
  },
  {
    id: 'T-04',
    date: '14.05.2026',
    time: '1800 HRS',
    title: 'THE CHOSEN ONES',
    subtitle: 'SHORTLIST REVEALED — ONLY THE WORTHY PROCEED',
  },
  {
    id: 'T-05',
    date: '15.05.2026',
    time: '1030 HRS',
    title: 'THE FINAL STAND',
    subtitle: 'GRAND FINALE AT RCCIIT — PRESENT TO THE COMMAND COUNCIL',
  },
]

export default function Timeline() {
  return (
    <section id="timeline" className="relative w-full py-24 md:py-32 px-4 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex justify-between items-end border-b-4 border-[var(--panel-border)] pb-6 mb-12">
          <h2 className="font-display text-4xl md:text-6xl font-black">
            TIMEFRAME
          </h2>
          <div className="font-mono text-sm tracking-widest hidden md:block text-[var(--accent)]">
            [ SCHEDULE.LOG ]
          </div>
        </div>

        <div className="flex flex-col border-2 border-[var(--panel-border)] bg-[var(--text-primary)] p-[2px] gap-[2px]">
          
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-1 font-mono text-xs tracking-widest text-[var(--void)] bg-[var(--text-primary)] px-6 py-3 uppercase">
            <div className="col-span-1">SEQ</div>
            <div className="col-span-2">DATE</div>
            <div className="col-span-2">TIME</div>
            <div className="col-span-7">OPERATION</div>
          </div>

          {/* Table Rows */}
          {NODES.map((node) => (
            <div 
              key={node.id} 
              className={`grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-1 p-6 items-center transition-colors ${node.active ? 'bg-[var(--accent)] text-white' : 'bg-[var(--void)] hover:bg-[#e0ded8]'}`}
            >
              <div className="col-span-1 font-mono text-xs md:text-sm tracking-widest font-bold">
                {node.id}
              </div>
              
              <div className="col-span-2 font-mono text-lg md:text-xl font-bold">
                {node.date}
              </div>

              <div className="col-span-2 font-mono text-sm md:text-base tracking-widest">
                {node.time}
              </div>

              <div className="col-span-7 flex flex-col">
                <h3 className={`font-display text-2xl font-bold uppercase ${node.active ? 'text-white' : 'text-[var(--text-primary)]'}`}>
                  {node.title}
                </h3>
                <p className={`font-mono text-xs tracking-wider mt-1 ${node.active ? 'text-white/80' : 'text-[var(--text-muted)]'}`}>
                  {node.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
