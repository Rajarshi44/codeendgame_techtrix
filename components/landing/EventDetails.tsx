'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const AssetModel = dynamic(() => import('./AssetModel'), { ssr: false })

export default function EventDetails() {
  const [hoveredPrize, setHoveredPrize] = useState<number | null>(null)

  return (
    <section id="event-details" className="relative w-full py-24 md:py-32 px-4 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* ─── Section Header ─── */}
        <div className="flex items-center gap-6 mb-16">
          <div className="font-mono text-xs tracking-widest text-[var(--accent)] border-b-2 border-[var(--accent)] pb-1">
            [ OP. PROTOCOLS ]
          </div>
          <div className="h-[2px] bg-[var(--panel-border)] flex-1" />
        </div>

        {/* ═══════════════════════════════════════════════════ */}
        {/* ROW 1: THE CRUCIBLE — Duration + Mission Briefing  */}
        {/* ═══════════════════════════════════════════════════ */}
        <div className="blueprint-grid grid-cols-1 lg:grid-cols-12 mb-[2px]">
          
          {/* Cell 1: The Crucible Timer — spans 5 cols */}
          <div className="lg:col-span-5 p-8 md:p-12 relative overflow-hidden bg-[var(--void-surface)] group">
            {/* Swiss Graphic: Industrial Diagonal Hatching */}
            <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, var(--text-primary), var(--text-primary) 1px, transparent 1px, transparent 10px)' }}></div>
            {/* Hollow Typography Watermark */}
            <div className="absolute -bottom-12 -right-4 font-display text-[20rem] text-transparent leading-none pointer-events-none select-none opacity-10 group-hover:opacity-20 transition-all duration-700 group-hover:scale-105" style={{ WebkitTextStroke: '3px var(--text-primary)' }}>01</div>
            
            <div className="relative z-10">
              <div className="font-mono text-sm tracking-widest text-[var(--text-muted)] mb-4">
                01 // THE CRUCIBLE
              </div>

              {/* Massive Duration Display */}
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-display text-[clamp(5rem,10vw,9rem)] leading-none tracking-tighter">56</span>
                <span className="font-mono text-sm tracking-widest text-[var(--text-muted)] self-end pb-4">HRS<br/>TOTAL</span>
              </div>

              {/* Phase Breakdown */}
              <div className="flex gap-[2px] mt-6">
                <div className="flex-[6] bg-[var(--text-primary)] text-[var(--void)] p-4 relative">
                  <div className="font-mono text-[10px] tracking-widest opacity-60 mb-1">PHASE 01 — ONLINE</div>
                  <div className="font-display text-2xl md:text-3xl">48H</div>
                  <div className="absolute top-2 right-3 font-mono text-[9px] tracking-widest text-[var(--accent)] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-pulse"></span> LIVE
                  </div>
                </div>
                <div className="flex-[1] bg-white border-2 border-[var(--text-primary)] p-4">
                  <div className="font-mono text-[10px] tracking-widest text-[var(--text-muted)] mb-1">PHASE 02 — OFFLINE</div>
                  <div className="font-display text-2xl md:text-3xl">8H</div>
                </div>
              </div>
            </div>
          </div>

          {/* Cell 2: Mission Brief — spans 4 cols */}
          <div className="lg:col-span-4 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden bg-white group border-x border-[var(--text-primary)]/10">
            {/* Swiss Graphic: Engineering Red Grid */}
            <div className="absolute inset-0 opacity-10 group-hover:opacity-[0.15] transition-opacity duration-500 pointer-events-none" style={{ backgroundImage: 'linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
            {/* Hollow Typography Watermark */}
            <div className="absolute -top-12 -right-8 font-display text-[22rem] text-transparent leading-none pointer-events-none select-none opacity-[0.07] group-hover:opacity-[0.15] transition-all duration-700 group-hover:scale-105" style={{ WebkitTextStroke: '3px var(--text-primary)' }}>02</div>

            <div className="relative z-10">
              <div className="font-mono text-sm tracking-widest text-[var(--text-muted)] mb-4">
                02 // THE MISSION
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-black mb-6 group-hover:text-[var(--accent)] transition-colors duration-500">
                ABSOLUTE<br/>WARFARE
              </h3>
              <p className="font-body text-base text-[var(--text-secondary)] leading-relaxed bg-white/80 p-4 border-l-4 border-[var(--text-primary)] backdrop-blur-sm">
                A 48-hour online crucible followed by an 8-hour offline grand finale at RCCIIT. 
                No track restrictions. Absolute freedom to architect solutions for any critical real-world vulnerability.
              </p>
            </div>
          </div>

          {/* Cell 3: Entry Protocol — spans 3 cols */}
          <div className="lg:col-span-3 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden bg-[var(--void-surface)] group">
            {/* Swiss Graphic: Technical Barcode Strip */}
            <div className="absolute inset-y-0 right-0 w-2/3 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(90deg, var(--text-primary), var(--text-primary) 2px, transparent 2px, transparent 6px, var(--text-primary) 6px, var(--text-primary) 7px, transparent 7px, transparent 12px)' }}></div>
            {/* Hollow Typography Watermark */}
            <div className="absolute -bottom-16 -left-12 font-display text-[24rem] text-transparent leading-none pointer-events-none select-none opacity-10 group-hover:opacity-20 transition-all duration-700 group-hover:scale-105" style={{ WebkitTextStroke: '3px var(--text-primary)' }}>03</div>

            <div className="relative z-10">
              <div className="font-mono text-sm tracking-widest text-[var(--text-muted)] mb-4">
                03 // ENTRY PROTOCOL
              </div>
              <h3 className="font-display text-2xl font-black mb-8">
                REQUIREMENTS
              </h3>
              <ul className="flex flex-col gap-5 font-mono text-sm uppercase tracking-wider bg-[var(--void-surface)]/80 p-4 border border-[var(--text-primary)]/10 backdrop-blur-sm">
                <li className="flex justify-between border-b border-dotted border-[var(--panel-border)] pb-2 group/item">
                  <span className="text-[var(--text-muted)] group-hover/item:text-[var(--text-primary)] transition-colors">TEAM SIZE</span>
                  <span className="font-bold">2 – 4 OP.</span>
                </li>
                <li className="flex justify-between border-b border-dotted border-[var(--panel-border)] pb-2 group/item">
                  <span className="text-[var(--text-muted)] group-hover/item:text-[var(--text-primary)] transition-colors">ACCESS FEE</span>
                  <span className="font-bold">₹150/TEAM</span>
                </li>
                <li className="flex justify-between border-b border-dotted border-[var(--panel-border)] pb-2 group/item">
                  <span className="text-[var(--text-muted)] group-hover/item:text-[var(--accent)] transition-colors">CROSS-DISC.</span>
                  <span className="font-bold text-[var(--accent)]">ALLOWED</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════ */}
        {/* ROW 2: THE VAULT — Prize Pool + 3D Trophy          */}
        {/* ═══════════════════════════════════════════════════ */}
        <div className="blueprint-grid grid-cols-1 lg:grid-cols-12">

          {/* LEFT: The Trophy Display — spans 5 cols */}
          <div className="lg:col-span-5 relative min-h-[450px] md:min-h-[500px] overflow-hidden bg-[#020202]">
            
            {/* --- RADAR SCANNER BACKGROUND --- */}
            {/* Base Grid */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            
            {/* Crosshairs */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[var(--accent)] opacity-30 -translate-x-1/2"></div>
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[var(--accent)] opacity-30 -translate-y-1/2"></div>
            
            {/* Concentric Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-[var(--accent)] opacity-20"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-[var(--accent)] border-dashed opacity-20"></div>
            
            {/* Active Radar Sweep */}
            <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] pointer-events-none" 
                 style={{ background: 'conic-gradient(from 0deg, transparent 75%, rgba(220, 38, 38, 0.05) 90%, rgba(220, 38, 38, 0.4) 100%)' }}></div>

            {/* Inner Shadow Vignette */}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] pointer-events-none z-[2]"></div>

            {/* --- 3D MODEL --- */}
            <div className="absolute inset-0 z-[5]">
              <AssetModel 
                modelPath="/models/the_academy_award.glb" 
                scale={0.055} 
                position={[0, -0.45, 0]} 
                autoRotate={true}
                autoRotateSpeed={1.2}
                interactive={false}
                environment="studio"
              />
            </div>

            {/* --- FOREGROUND HUD --- */}
            <div className="absolute top-6 right-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 text-right z-10">
              <span className="text-[var(--accent)] animate-pulse inline-block mr-1">●</span>
              Sensors Active
            </div>
            
            {/* Total Prize Overlay */}
            <div className="absolute bottom-6 left-6 z-10">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] mb-1">[ REWARD_POOL ]</div>
              <div className="font-display text-5xl md:text-6xl text-white tracking-tighter" style={{ textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>₹6,000</div>
            </div>
            
            {/* Brutalist Corner Brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--accent)] z-10 opacity-50"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--accent)] z-10 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--accent)] z-10 opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--accent)] z-10 opacity-50"></div>
          </div>

          {/* RIGHT: Prize Distribution + Goodies — spans 7 cols */}
          <div className="lg:col-span-7 flex flex-col">

            {/* Bounty Header - Dark Inverted */}
            <div className="p-8 md:p-10 border-b-2 border-[var(--text-primary)] bg-[#050505] text-white relative overflow-hidden">
              {/* Subtle animated scanline background */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)' }}></div>
              <div className="relative z-10">
                <div className="font-mono text-sm tracking-widest text-white/50 mb-2 flex items-center gap-3">
                  <span className="w-2 h-2 bg-[var(--accent)] animate-pulse inline-block"></span>
                  04 // THE GAUNTLET
                </div>
                <h3 className="font-display text-4xl md:text-5xl font-black">
                  BOUNTY<br/>DISTRIBUTION
                </h3>
              </div>
            </div>

            {/* Prize Cards */}
            <div className="flex flex-col">
              
              {/* 1st Place - Premium Styling */}
              <div 
                className="group flex items-stretch border-b-2 border-[var(--text-primary)] cursor-default relative overflow-hidden bg-gradient-to-r from-[var(--accent)]/5 to-transparent hover:from-[var(--accent)]/15 transition-all duration-500"
                onMouseEnter={() => setHoveredPrize(1)}
                onMouseLeave={() => setHoveredPrize(null)}
              >
                {/* Structural Rank Badge for 01 */}
                <div className="w-24 md:w-32 flex flex-col items-center justify-center bg-[var(--text-primary)] text-[var(--void)] relative shrink-0 overflow-hidden group-hover:bg-[var(--accent)] group-hover:text-white transition-colors duration-500">
                  <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, #000 2px, #000 4px)' }}></div>
                  <span className="font-mono text-[9px] tracking-[0.3em] mb-1 relative z-10 opacity-70 group-hover:opacity-100 transition-opacity">RANK</span>
                  <span className="font-display text-5xl md:text-6xl relative z-10 group-hover:scale-110 transition-transform duration-500">01</span>
                  {/* Micro decoration */}
                  <div className="absolute bottom-2 left-2 right-2 h-[2px] bg-current opacity-30 flex gap-1">
                    <div className="w-2 h-full bg-current"></div>
                    <div className="w-1 h-full bg-current"></div>
                    <div className="w-full h-full bg-current"></div>
                  </div>
                </div>

                <div className="flex-1 p-6 md:p-8 flex items-center justify-between">
                  <div>
                    <div className="font-mono text-[10px] tracking-widest text-[var(--accent)] mb-1 flex items-center gap-2">
                      <span className="hidden group-hover:inline-block w-3 h-[1px] bg-[var(--accent)] transition-all"></span>
                      CHAMPION
                    </div>
                    <div className="font-display text-2xl md:text-3xl group-hover:translate-x-2 transition-transform duration-500">FIRST BLOOD</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-3xl md:text-4xl text-[var(--accent)] group-hover:scale-110 origin-right transition-transform duration-500" style={{ textShadow: '0 0 15px rgba(220,38,38,0.3)' }}>₹3,000</div>
                  </div>
                </div>
              </div>

              {/* 2nd Place */}
              <div 
                className="group flex items-stretch border-b-2 border-[var(--text-primary)] cursor-default relative overflow-hidden hover:bg-black/5 transition-colors duration-500"
                onMouseEnter={() => setHoveredPrize(2)}
                onMouseLeave={() => setHoveredPrize(null)}
              >
                {/* Structural Rank Badge for 02 */}
                <div className="w-24 md:w-32 flex flex-col items-center justify-center bg-black/5 text-black border-r-2 border-[var(--text-primary)]/20 relative shrink-0 overflow-hidden group-hover:bg-black group-hover:text-white transition-colors duration-500">
                  <span className="font-mono text-[9px] tracking-[0.3em] mb-1 relative z-10 opacity-50 group-hover:opacity-70 transition-opacity">RANK</span>
                  <span className="font-display text-5xl md:text-6xl relative z-10 group-hover:scale-110 transition-transform duration-500">02</span>
                  <div className="absolute bottom-2 left-2 right-2 h-[2px] bg-current opacity-20 flex gap-1">
                    <div className="w-full h-full bg-current"></div>
                    <div className="w-1 h-full bg-current"></div>
                    <div className="w-2 h-full bg-current"></div>
                  </div>
                </div>

                <div className="flex-1 p-6 md:p-8 flex items-center justify-between">
                  <div>
                    <div className="font-mono text-[10px] tracking-widest text-[var(--text-muted)] mb-1 flex items-center gap-2">
                      <span className="hidden group-hover:inline-block w-3 h-[1px] bg-black transition-all"></span>
                      RUNNER-UP
                    </div>
                    <div className="font-display text-2xl md:text-3xl group-hover:translate-x-2 transition-transform duration-500">SILVER EDGE</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-3xl md:text-4xl group-hover:scale-110 origin-right transition-transform duration-500">₹2,000</div>
                  </div>
                </div>
              </div>

              {/* 3rd Place */}
              <div 
                className="group flex items-stretch border-b-2 border-[var(--text-primary)] cursor-default relative overflow-hidden hover:bg-black/5 transition-colors duration-500"
                onMouseEnter={() => setHoveredPrize(3)}
                onMouseLeave={() => setHoveredPrize(null)}
              >
                {/* Structural Rank Badge for 03 */}
                <div className="w-24 md:w-32 flex flex-col items-center justify-center bg-black/5 text-black/50 border-r-2 border-[var(--text-primary)]/20 relative shrink-0 overflow-hidden group-hover:bg-black/80 group-hover:text-white transition-colors duration-500">
                  <span className="font-mono text-[9px] tracking-[0.3em] mb-1 relative z-10 opacity-50 group-hover:opacity-70 transition-opacity">RANK</span>
                  <span className="font-display text-5xl md:text-6xl relative z-10 group-hover:scale-110 transition-transform duration-500">03</span>
                  <div className="absolute bottom-2 left-2 right-2 h-[2px] bg-current opacity-20 flex gap-1">
                    <div className="w-2 h-full bg-current"></div>
                    <div className="w-1 h-full bg-current"></div>
                    <div className="w-1 h-full bg-current"></div>
                  </div>
                </div>

                <div className="flex-1 p-6 md:p-8 flex items-center justify-between">
                  <div>
                    <div className="font-mono text-[10px] tracking-widest text-[var(--text-muted)] mb-1 flex items-center gap-2">
                      <span className="hidden group-hover:inline-block w-3 h-[1px] bg-black/60 transition-all"></span>
                      FINALIST
                    </div>
                    <div className="font-display text-2xl md:text-3xl text-black/80 group-hover:text-black group-hover:translate-x-2 transition-all duration-500">BRONZE FURY</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-3xl md:text-4xl text-black/80 group-hover:text-black group-hover:scale-110 origin-right transition-transform duration-500">₹1,000</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contraband / Goodies Section */}
            <div className="flex-1 flex flex-col md:flex-row relative bg-[#f0f0f0]">
              
              {/* Subtle hazard stripe background */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000, #000 10px, transparent 10px, transparent 20px)' }}></div>

              {/* Goodies Info */}
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-center border-r-0 md:border-r-2 border-[var(--text-primary)] relative z-10">
                <div className="font-mono text-sm tracking-widest text-[var(--text-muted)] mb-3 flex justify-between items-center border-b border-[var(--text-primary)]/20 pb-2">
                  <span>05 // CONTRABAND</span>
                  <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-sm">SECURED</span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-black mb-6">
                  BONUS LOOT
                </h3>
                <ul className="font-mono text-sm tracking-wider uppercase flex flex-col gap-4">
                  <li className="flex items-center gap-4 group">
                    <div className="w-6 h-6 border border-[var(--accent)] flex items-center justify-center shrink-0 group-hover:bg-[var(--accent)] transition-colors">
                      <div className="w-2 h-2 bg-[var(--accent)] group-hover:bg-white transition-colors"></div>
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform">EXCLUSIVE T-SHIRTS</span>
                  </li>
                  <li className="flex items-center gap-4 group">
                    <div className="w-6 h-6 border border-[var(--accent)] flex items-center justify-center shrink-0 group-hover:bg-[var(--accent)] transition-colors">
                      <div className="w-2 h-2 bg-[var(--accent)] group-hover:bg-white transition-colors"></div>
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform">HOLO STICKER PACKS</span>
                  </li>
                  <li className="flex items-center gap-4 group">
                    <div className="w-6 h-6 border border-[var(--accent)] flex items-center justify-center shrink-0 group-hover:bg-[var(--accent)] transition-colors">
                      <div className="w-2 h-2 bg-[var(--accent)] group-hover:bg-white transition-colors"></div>
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform">PREMIUM GOODIES KIT</span>
                  </li>
                  <li className="flex items-center gap-4 mt-2 pt-4 border-t border-[var(--text-primary)]/10">
                    <div className="w-2 h-[1px] bg-[var(--text-muted)] shrink-0"></div>
                    <span className="text-[var(--text-muted)] italic">+ MORE CLASSIFIED SURPRISES</span>
                  </li>
                </ul>
              </div>

              {/* Gift Box 3D */}
              <div className="w-full md:w-[280px] min-h-[250px] relative bg-[#0a0a0a] overflow-hidden border-t-2 md:border-t-0 border-[var(--text-primary)]">
                
                {/* Cinematic Spotlight for Gift Box */}
                <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 60%, rgba(255,255,255,0.1) 0%, transparent 60%)' }}></div>
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 pointer-events-none z-[5]">
                  <div className="absolute top-[20%] left-[15%] w-1 h-1 bg-[var(--accent)] animate-pulse shadow-[0_0_5px_var(--accent)]"></div>
                  <div className="absolute top-[60%] right-[20%] w-1.5 h-1.5 bg-white/50 animate-ping"></div>
                  <div className="absolute bottom-[25%] left-[40%] w-1 h-1 bg-white/30 animate-pulse"></div>
                  
                  {/* Target Crosshair overlay */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-white/10 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-[var(--accent)] rotate-45"></div>
                </div>
                
                <div className="w-full h-full relative z-10">
                  <AssetModel 
                    modelPath="/models/gift_box.glb" 
                    scale={0.006} 
                    position={[0, -0.4, 0]} 
                    autoRotate={true}
                    autoRotateSpeed={1.5}
                    interactive={false}
                    environment="apartment"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes trophyMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-trophy-marquee {
          animation: trophyMarquee 15s linear infinite;
        }
      `}} />
    </section>
  )
}
