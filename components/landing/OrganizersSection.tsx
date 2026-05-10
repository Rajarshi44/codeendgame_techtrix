import { ORGANIZERS } from '@/lib/constants'

type OrganizerEntry = { name: string; phone: string; year: string }

function OrgCard({ person, roleLabel }: { person: OrganizerEntry; roleLabel: string }) {
  return (
    <div className="p-4 border-2 border-[var(--panel-border)] bg-[var(--void)] hover:bg-[var(--text-primary)] hover:text-[var(--void)] transition-colors group flex flex-col justify-between min-h-[120px]">
      
      <div className="flex justify-between items-start mb-4">
        <span className="font-mono text-[10px] tracking-widest uppercase bg-[var(--text-primary)] text-[var(--void)] px-2 py-1 group-hover:bg-[var(--void)] group-hover:text-[var(--text-primary)]">
          {roleLabel}
        </span>
      </div>

      <div>
        <p className="font-display text-lg uppercase truncate mb-1">
          {person.name}
        </p>
        <p className="font-mono text-xs text-[var(--text-muted)] group-hover:text-[var(--void)] opacity-80">
          TEL: {person.phone}
        </p>
      </div>
    </div>
  )
}

export default function OrganizersSection() {
  return (
    <section id="organizers" className="relative w-full py-24 md:py-32 px-4 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto border-t-8 border-[var(--panel-border)] pt-12">
        
        <h2 className="font-display text-4xl md:text-6xl font-black mb-16 uppercase">
          COMMAND COUNCIL
        </h2>

        <div className="flex flex-col gap-16">
          <div>
            <h3 className="font-mono text-sm tracking-[0.2em] uppercase mb-4 border-b-2 border-[var(--panel-border)] pb-2 flex justify-between">
              <span>CONVENORS</span>
              <span className="text-[var(--text-muted)]">CLASS IV</span>
            </h3>
            <div className="blueprint-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {ORGANIZERS.convenors.map(p => (
                <OrgCard key={p.name} person={p} roleLabel="CONVENOR" />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-sm tracking-[0.2em] uppercase mb-4 border-b-2 border-[var(--panel-border)] pb-2 flex justify-between">
              <span>COORDINATORS</span>
              <span className="text-[var(--text-muted)]">CLASS III</span>
            </h3>
            <div className="blueprint-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {ORGANIZERS.coordinators.map(p => (
                <OrgCard key={p.name} person={p} roleLabel="COORDINATOR" />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-sm tracking-[0.2em] uppercase mb-4 border-b-2 border-[var(--panel-border)] pb-2 flex justify-between">
              <span>VOLUNTEERS</span>
              <span className="text-[var(--text-muted)]">CLASS II</span>
            </h3>
            <div className="blueprint-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {ORGANIZERS.volunteers.map(p => (
                <OrgCard key={p.name} person={p} roleLabel="VOLUNTEER" />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
