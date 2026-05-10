import { JUDGING_CRITERIA } from '@/lib/constants'
import Accordion from '@/components/ui/Accordion'

export default function JudgingCriteria() {
  return (
    <>
      <section id="judging" className="relative w-full py-24 md:py-32 px-4 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto border-t-8 border-[var(--panel-border)] pt-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <h2 className="font-display text-4xl md:text-6xl font-black max-w-lg leading-[0.9]">
              EVALUATION <br/>METRICS
            </h2>
            <div className="font-mono text-sm tracking-widest bg-[var(--accent)] text-[var(--void)] px-4 py-2">
              [ OFFICIAL CRITERIA ]
            </div>
          </div>

          <div className="blueprint-grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {JUDGING_CRITERIA.map((c, i) => (
              <div 
                key={c.label} 
                className="flex flex-col items-center justify-between p-6 bg-[var(--void)] hover:bg-[var(--text-primary)] hover:text-[var(--void)] transition-colors min-h-[160px]"
              >
                <div className="font-mono text-xs tracking-widest text-[var(--text-muted)] w-full text-left">
                  0{i + 1}
                </div>
                
                <div className="font-display text-4xl md:text-5xl font-black w-full text-center my-4">
                  {c.weight}<span className="text-xl">%</span>
                </div>
                
                <p className="font-mono text-xs text-center tracking-widest uppercase mt-auto">
                  {c.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section id="rules" className="relative w-full py-24 md:py-32 px-4 md:px-12 lg:px-24 bg-[var(--panel-border)] text-[var(--void)]">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-end border-b-2 border-[var(--void)] pb-4 mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-black">
              RULES OF ENGAGEMENT
            </h2>
            <span className="font-mono text-xs tracking-widest hidden md:block">
              [ MANDATORY COMPLIANCE ]
            </span>
          </div>
          
          <div className="bg-[var(--void)] text-[var(--text-primary)] p-1">
            <Accordion />
          </div>
        </div>
      </section>
    </>
  )
}
