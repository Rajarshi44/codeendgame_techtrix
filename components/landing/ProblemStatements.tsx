export default function ProblemStatements() {
  const STATEMENTS = [
    {
      id: 'OP-01',
      title: 'COGNITIVE SUBSYSTEM INFILTRATION',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      tag: 'AI/ML'
    },
    {
      id: 'OP-02',
      title: 'TEMPORAL SYNCHRONIZATION DRIFT',
      desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      tag: 'BACKEND'
    },
    {
      id: 'OP-03',
      title: 'DIMENSIONAL RUPTURE CONTAINMENT',
      desc: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.',
      tag: 'BLOCKCHAIN'
    },
    {
      id: 'OP-04',
      title: 'REALITY MATRIX CALIBRATION',
      desc: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate.',
      tag: 'WEB/UI'
    },
    {
      id: 'OP-05',
      title: 'CORE PROTOCOL EXTRACTION',
      desc: 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.',
      tag: 'SYSTEMS'
    }
  ]

  return (
    <section id="problem-statements" className="relative w-full py-24 md:py-32 px-4 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row border-4 border-[var(--panel-border)] bg-[var(--text-primary)] p-1 gap-1">
        
        {/* Left Column - Header Dossier */}
        <div className="w-full md:w-[35%] bg-[var(--void)] p-8 md:p-12 flex flex-col justify-between">
          <div>
            <div className="font-mono text-xs tracking-widest text-[var(--accent)] mb-8 flex justify-between border-b-2 border-[var(--accent)] pb-2">
              <span>REF // 904-B</span>
              <span>CLASSIFIED</span>
            </div>
            
            <h2 className="font-display text-4xl md:text-6xl font-black leading-none mb-6">
              MISSION <br/>
              <span className="text-[var(--text-muted)]">PARAMETERS</span>
            </h2>
            
            <p className="font-body text-[var(--text-secondary)] text-lg leading-relaxed mb-12">
              Five critical vulnerabilities detected in the mainframe. Target one subsystem. Execute protocol. Failure is fatal.
            </p>
          </div>

          <div className="border-t-2 border-[var(--panel-border)] pt-6">
            <samp className="font-mono text-sm block">
              AUTHORIZATION: GRANTED<br/>
              CLEARANCE: LEVEL 5<br/>
              ASSETS: DEPLOYED
            </samp>
          </div>
        </div>

        {/* Right Column - Tabular Data */}
        <div className="w-full md:w-[65%] bg-[var(--void)] p-8 md:p-12">
          <div className="flex flex-col gap-6">
            
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b-2 border-[var(--panel-border)] font-mono text-xs tracking-widest text-[var(--text-muted)]">
              <div className="col-span-2">UNIT ID</div>
              <div className="col-span-8">TARGET DESIGNATION</div>
              <div className="col-span-2 text-right">CLASS</div>
            </div>

            {/* Table Rows */}
            <div className="flex flex-col gap-6">
              {STATEMENTS.map((stmt) => (
                <div key={stmt.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start border-b border-[var(--panel-border)]/20 pb-6 group hover:border-[var(--accent)] transition-colors">
                  <div className="col-span-2 font-mono text-[var(--accent)] text-sm md:text-base font-bold">
                    {stmt.id}
                  </div>
                  
                  <div className="col-span-8 flex flex-col gap-2">
                    <h3 className="font-display text-xl md:text-2xl font-bold">
                      {stmt.title}
                    </h3>
                    <p className="font-body text-[var(--text-secondary)] text-sm">
                      {stmt.desc}
                    </p>
                  </div>

                  <div className="col-span-2 md:text-right font-mono text-xs tracking-widest mt-2 md:mt-0">
                    <span className="bg-[var(--text-primary)] text-[var(--void)] px-2 py-1">
                      {stmt.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
