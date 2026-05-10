import TechtrixLogo from '@/components/ui/TechtrixLogo'

export default function Footer() {
  return (
    <footer className="relative w-full py-12 px-4 md:px-12 lg:px-24 bg-[var(--text-primary)] text-[var(--void)] border-t-8 border-[var(--accent)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
        
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-6">
            <div className="bg-[var(--void)] p-3">
              <TechtrixLogo size="sm" on="light" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl tracking-widest leading-none">CODE ENDGAME</span>
              <span className="font-mono text-[var(--accent)] text-xs tracking-widest mt-1">
                VOL 26.
              </span>
            </div>
          </div>
          <p className="font-mono text-xs max-w-sm tracking-widest opacity-80 uppercase">
            FLAGSHIP TECHNICAL CRUCIBLE OF TECHTRIX 2026.
          </p>
        </div>

        <div className="text-left md:text-right flex flex-col gap-2">
          <p className="font-mono text-sm tracking-widest uppercase">
            RCC Institute of Information Technology
          </p>
          <p className="font-mono text-xs tracking-widest uppercase opacity-80">
            KOLKATA, WEST BENGAL
          </p>
          <p className="font-mono text-[10px] tracking-widest uppercase mt-4 text-[var(--accent)]">
            © 2026 TECHTRIX · ALL RIGHTS RESERVED
          </p>
        </div>

      </div>
    </footer>
  )
}
