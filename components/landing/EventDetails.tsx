export default function EventDetails() {
  return (
    <section id="event-details" className="relative w-full py-24 md:py-32 px-4 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex items-center gap-6 mb-12">
          <div className="font-mono text-xs tracking-widest text-[var(--accent)] border-b-2 border-[var(--accent)] pb-1">
            [ OP. PROTOCOLS ]
          </div>
          <div className="h-[2px] bg-[var(--panel-border)] flex-1" />
        </div>

        <div className="blueprint-grid grid-cols-1 lg:grid-cols-3">
          
          {/* Cell 1: The Mission */}
          <div className="p-8 md:p-12 lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="font-mono text-sm tracking-widest text-[var(--text-muted)] mb-4">
                01 // THE MISSION
              </div>
              <h3 className="font-display text-3xl md:text-5xl font-black mb-6">
                48 HOURS OF <br/>ABSOLUTE WARFARE
              </h3>
              <p className="font-body text-lg max-w-2xl text-[var(--text-secondary)]">
                A 48-hour online crucible followed by an 8-hour offline grand finale at RCCIIT. 
                No track restrictions. You have absolute freedom to architect solutions for any critical real-world vulnerability.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-4 font-mono text-xs tracking-widest uppercase">
              <span className="border-2 border-[var(--panel-border)] px-4 py-2">WEB</span>
              <span className="border-2 border-[var(--panel-border)] px-4 py-2">MOBILE</span>
              <span className="border-2 border-[var(--panel-border)] px-4 py-2 text-[var(--void)] bg-[var(--text-primary)]">AI/ML</span>
              <span className="border-2 border-[var(--panel-border)] px-4 py-2">BLOCKCHAIN</span>
            </div>
          </div>

          {/* Cell 2: Entry Protocol */}
          <div className="p-8 md:p-12 flex flex-col justify-between">
            <div>
              <div className="font-mono text-sm tracking-widest text-[var(--text-muted)] mb-4">
                02 // ENTRY PROTOCOL
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-black mb-8">
                REQUIREMENTS
              </h3>
              <ul className="flex flex-col gap-6 font-mono text-sm uppercase tracking-wider">
                <li className="flex justify-between border-b-2 border-dotted border-[var(--panel-border)] pb-2">
                  <span className="text-[var(--text-muted)]">TEAM SIZE</span>
                  <span className="font-bold">2 - 4 OP.</span>
                </li>
                <li className="flex justify-between border-b-2 border-dotted border-[var(--panel-border)] pb-2">
                  <span className="text-[var(--text-muted)]">ACCESS FEE</span>
                  <span className="font-bold">₹150/TEAM</span>
                </li>
                <li className="flex justify-between border-b-2 border-dotted border-[var(--panel-border)] pb-2">
                  <span className="text-[var(--text-muted)]">CROSS-DISC.</span>
                  <span className="font-bold text-[var(--accent)]">ALLOWED</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Cell 3: The Gauntlet */}
          <div className="p-8 md:p-12 lg:col-span-3 flex flex-col md:flex-row gap-12 justify-between items-center">
            <div className="flex-1 w-full">
              <div className="font-mono text-sm tracking-widest text-[var(--text-muted)] mb-4">
                03 // THE GAUNTLET
              </div>
              <h3 className="font-display text-4xl md:text-6xl font-black text-[var(--accent)]">
                ₹5,000
              </h3>
              <p className="font-mono text-sm mt-2 tracking-widest">TOTAL BOUNTY SECURED</p>
            </div>

            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="border-2 border-[var(--panel-border)] p-6 text-center hover:bg-[var(--text-primary)] hover:text-[var(--void)] transition-colors">
                <div className="font-mono text-xs tracking-widest mb-4">1ST RANK</div>
                <div className="font-display text-3xl font-black">₹2,500</div>
              </div>
              <div className="border-2 border-[var(--panel-border)] p-6 text-center hover:bg-[var(--text-primary)] hover:text-[var(--void)] transition-colors">
                <div className="font-mono text-xs tracking-widest mb-4">2ND RANK</div>
                <div className="font-display text-3xl font-black">₹1,500</div>
              </div>
              <div className="border-2 border-[var(--panel-border)] p-6 text-center hover:bg-[var(--text-primary)] hover:text-[var(--void)] transition-colors">
                <div className="font-mono text-xs tracking-widest mb-4">3RD RANK</div>
                <div className="font-display text-3xl font-black">₹1,000</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
