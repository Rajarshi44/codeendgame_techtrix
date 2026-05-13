'use client'

import { useState } from 'react'
import ThanosModel from './ThanosModel'

export default function ProblemStatements() {
  const [activeId, setActiveId] = useState<string | null>('OP-01')

  const STATEMENTS = [
    {
      id: 'OP-01',
      title: 'Real-Time Code Logic Explanation',
      track: 'Education',
      difficulty: 'Easy',
      background: 'Computer Science students frequently hit logic errors that compilers, linters, and raw error logs cannot catch or explain. Existing IDEs and browser-based coding platforms surface syntax highlighting and stack traces but fail to explain why the underlying logic is flawed. Without immediate, contextual guidance, students fall back to trial-and-error, miss the root cause, and never connect mistakes to the CS fundamentals behind them. Build a tool that analyzes student code in real-time, detects logic and conceptual errors, and explains them in a way that maps back to core CS concepts.',
      core_requirements: [
        'Platform integration: Ship as a Chrome extension and/or VS Code extension that fits inside the student\'s existing coding environment.',
        'Real-time logic analysis: Detect underlying logic errors and conceptual flaws as the student writes — not just syntax validation.',
        'CS concept mapping: When a logic error is found, explicitly map it to the underlying CS concept and explain the gap in plain terms.',
        'Interactive visualizations: Deliver explanations through interactive visualizations of execution flow, state changes, or algorithmic missteps — not static text alone.'
      ],
      examples: null,
      constraints: [
        'Must run as a Chrome extension(should be functional on platforms such as LeetCode and HackerRank) and/or VS Code extension.',
        'Must operate on the student\'s live code, not pre-canned snippets.'
      ]
    },
    {
      id: 'OP-02',
      title: 'Autonomous Threat Detection & Log Classification Engine',
      track: 'Cybersecurity',
      difficulty: 'Medium',
      background: 'Current intrusion logging tools record everything but classify nothing. Humans, botnets, and AI agents all land as identical unclassified command streams — yet each demands a different response: forensic escalation, perimeter hardening, or early detection and tool-chain attribution. Build a framework that classifies intruders in real-time — and in particular detects AI-driven attackers by their distinct signatures and defends against them.',
      core_requirements: [
        'Active real-time classification: Go beyond passive logging — classify intruders as human, botnet, or AI agent in real-time during the intrusion.',
        'Targeted AI agent detection: Detect AI-driven attackers via distinct behavioral patterns: response to embedded system-output instructions, machine-consistent timing, systematic error-free enumeration.',
        'Actionable threat intelligence: Push classified, prioritized intelligence to security teams the moment an intrusion begins — not unclassified raw log dumps.',
        'Original system log processing: Integrate with and parse standard OS log repositories — C:\\Windows\\System32\\winevt\\Logs on Windows and /var/log/ (e.g. auth.log, syslog) on Linux or Server Logs.',
        'Rigorous log testing: Validate detection, classification, and alerting against real system logs to prove real-world applicability.'
      ],
      examples: null,
      constraints: [
        'Must process authentic logs, not simulated data.',
        'Must support both Windows Event Logs and Linux syslog-style sources.'
      ]
    },
    {
      id: 'OP-03',
      title: 'Agentic AI Video Game System',
      track: 'Game Development',
      difficulty: 'Medium',
      background: 'Modern games lean on rigid, pre-scripted behavior trees and finite state machines for NPCs and world interactions. The result is static — entities cannot adapt to novel player strategies, reason about their environment, or produce emergent, unscripted narratives. Agentic AI flips this: autonomous agents that perceive their environment, maintain internal state or memory, and make independent decisions toward goals. Build an interactive experience where agentic intelligence is the foundational core mechanic of gameplay, not a background feature or gimmick.',
      core_requirements: [
        'Agentic AI as core mechanic: The fundamental gameplay loop must rely on an active agentic AI system (LLM-powered autonomous entities, RL agents, or advanced goal-oriented action planners) that dynamically reasons and reacts — replacing hardcoded event scripts.',
        'Engine & framework flexibility: Full freedom on tech stack — Godot, Pygame, Unity, Unreal, browser-based frameworks, or any engine of choice.',
        'Focused scope & scale: Not a AAA-style game. No high-end graphics, no sprawling story campaign. Tightly scoped, highly functional prototype or short game where the AI system is the centerpiece.'
      ],
      examples: [
        'Dynamic interrogation / social game: Mystery or negotiation game where players converse with LLM-driven characters who autonomously manage their own secrets, stress levels, and shifting alliances based on the player\'s actual words.',
        'Emergent ecosystem / simulation: Sandbox or colony-sim where AI agents dynamically form factions, trade, build, or betray each other based on evolving needs, memories, and observations.',
        'Adaptive "Dungeon Master": Rogue-like or puzzle game where an autonomous AI agent acts as adversary or director — analyzing the player\'s habits and generating customized traps, rule changes, or enemy tactics in real-time.'
      ],
      constraints: [
        'AI must be the core mechanic — not a chatbot bolted onto traditional gameplay.',
        'Scope must stay prototype-sized; depth of AI behavior over breadth of content.(no need to make AAA Game)'
      ]
    },
    {
      id: 'OP-04',
      title: 'AI-Powered Real-Time Day Trading System',
      track: 'Finance',
      difficulty: 'Hard',
      background: 'Independent day traders work in a high-noise, millisecond-sensitive environment with major information asymmetry against institutional players. Most rely on manual charting tools that lack real-time algorithmic support, leaving them exposed to emotional bias and inconsistent execution. No accessible end-to-end platform today combines deterministic, backtested algorithms with live market data and transparent performance metrics on realistic intraday timescales. Build a System that gives independent retail day traders a systematic, data-driven edge and to validate and deploy custom strategies on top of it.',
      core_requirements: [
        'Real-time market data ingestion: Live price feeds from institutional-grade sources (MT5, broker APIs, or equivalent). Must reflect true bid/ask spreads and tick-level granularity, with data latency under 500 ms.',
        'Deterministic trading algorithm engine: All trade signals must be generated by a fully deterministic algorithm — same inputs always produce same outputs. No black-box or probabilistic signal generation.',
        'Rigorous backtesting on real historical data: Every algorithm must be backtested against verified historical data from MT5 or equivalent. Backtests must account for spread, slippage, and realistic order-fill assumptions.',
        'Transparent performance reporting: Win rate, risk-reward ratio, max drawdown, Sharpe ratio, and expectancy must be surfaced clearly per algorithm — not buried or averaged across strategies.'
      ],
      examples: null,
      constraints: [
        'Signal generation must be deterministic; any probabilistic component must be explicitly disclosed.',
        'LLMs should not be used to take any trading decisions, can be used as an additional input source to the algorithm or be the one suggesting/implementing/backtesting.',
        'Strategies must run on timescales a human day trader plausibly uses (1-min to 4-hour candles), with entry/exit windows that respect real market session constraints.'
      ]
    },
    {
      id: 'OP-05',
      title: 'Open Innovation',
      track: 'Open Innovation',
      difficulty: 'Any',
      background: 'Got a revolutionary idea that doesn\'t fit neatly into the predefined tracks? The Open Innovation track is your sandbox. Whether it\'s a decentralized app, a novel IoT solution, an accessibility tool, or an entirely new paradigm of human-computer interaction, this is where you build it. If it solves a real problem, pushes technical boundaries, and creates impact, we want to see it.',
      core_requirements: [
        'Real-world impact: The project must clearly articulate and solve a genuine, recognizable problem or create a significant new opportunity.',
        'Technical ambition: The solution should demonstrate technical depth, creativity, and robust engineering practices.',
        'Working prototype: A functional MVP or prototype must be presented — conceptual pitches without working code will not be evaluated.'
      ],
      examples: null,
      constraints: [
        'Must not be a minor variation of an existing product without significant innovation.',
        'Must be original work developed during the hackathon timeframe.'
      ]
    }
  ]

  return (
    <section id="problem-statements" className="relative w-full py-16 md:py-24 bg-[var(--void)] text-[var(--text-primary)]">
      
      {/* Background Graphic Noise */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, #050505 2px, #050505 8px)' }}>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10 flex flex-col">
        
        {/* --- TOP SECTION: WIDE CINEMATIC HEADER & 3D MODEL --- */}
        <div className="w-full border-4 border-[var(--text-primary)] bg-[var(--text-primary)] shadow-[12px_12px_0_0_var(--text-primary)] flex flex-col lg:flex-row gap-px">
          
          {/* Header Text Area */}
          <div className="w-full lg:w-5/12 bg-[var(--void-surface)] p-8 md:p-12 xl:p-16 flex flex-col justify-center relative">
            <div className="inline-block border-2 border-[var(--text-primary)] px-3 py-1 bg-[var(--text-primary)] mb-8 w-max">
              <span className="font-mono text-xs font-black uppercase tracking-[0.2em] text-[var(--void)]">
                Classified Briefing
              </span>
            </div>
            <h2 className="font-display font-black uppercase tracking-tighter leading-[0.85] text-[clamp(3.5rem,6vw,7rem)] mb-6">
              Mission <br/> Targets
            </h2>
            <p className="font-body text-base lg:text-lg text-[var(--text-secondary)] leading-relaxed border-l-4 border-[var(--accent)] pl-5 max-w-md mb-8">
              Five anomalous subsystems detected. Select an objective to expand the tactical requirements. 
              Exact adherence to constraints is mandatory.
            </p>

            <a 
              href="https://docs.google.com/document/d/1uP1XmnELvIBr9EoRHZSi5BWBIbbMVYDUluwzb3KZU60/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between self-start border-2 border-[var(--text-primary)] px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:bg-[var(--text-primary)] hover:text-[var(--void)] transition-colors duration-300"
            >
              <span>Access Full Dossier</span>
              <span className="ml-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">↗</span>
            </a>
          </div>

          {/* Epic 3D Model Area - Threat Analysis Radar */}
          <div className="w-full lg:w-7/12 min-h-[400px] lg:min-h-[500px] bg-[var(--void-surface)] relative flex items-center justify-center overflow-hidden">
            
            {/* Layer 1: Massive Infinite Marquee Typography */}
            <div className="absolute inset-0 flex flex-col justify-center gap-6 -rotate-12 scale-150 opacity-10 pointer-events-none mix-blend-multiply select-none">
              <div className="whitespace-nowrap flex animate-bg-marquee">
                <span className="font-display text-[8rem] xl:text-[10rem] font-black uppercase mx-8">ANOMALY DETECTED //</span>
                <span className="font-display text-[8rem] xl:text-[10rem] font-black uppercase mx-8">ANOMALY DETECTED //</span>
              </div>
              <div className="whitespace-nowrap flex animate-bg-marquee-reverse">
                <span className="font-display text-[8rem] xl:text-[10rem] font-black uppercase mx-8 text-hollow">THREAT LEVEL OMEGA //</span>
                <span className="font-display text-[8rem] xl:text-[10rem] font-black uppercase mx-8 text-hollow">THREAT LEVEL OMEGA //</span>
              </div>
            </div>

            {/* Layer 2: Concentric Radar Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full border border-[var(--text-primary)]/20 border-dashed animate-[spin_40s_linear_infinite] pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full border border-[var(--text-primary)]/10 animate-[spin_30s_linear_infinite_reverse] pointer-events-none"></div>

            {/* Layer 3: Architectural Axes */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-[var(--text-primary)]/10 pointer-events-none"></div>
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[1px] bg-[var(--text-primary)]/10 pointer-events-none"></div>

            {/* Layer 4: Tactical HUD Corners */}
            <div className="absolute top-8 left-8 w-16 h-16 border-t-4 border-l-4 border-[var(--text-primary)] pointer-events-none z-20"></div>
            <div className="absolute bottom-8 right-8 w-16 h-16 border-b-4 border-r-4 border-[var(--text-primary)] pointer-events-none z-20"></div>

            {/* Target Data Overlays */}
            <div className="absolute bottom-6 left-6 font-mono text-[10px] uppercase font-black tracking-[0.2em] text-[var(--text-primary)] z-20">
              <span className="block text-[var(--accent)] mb-1">SCAN_V.09</span>
              AZM: 114.22<br/>
              ELV: -04.10
            </div>
            <div className="absolute top-6 right-6 font-mono text-[10px] uppercase font-black tracking-[0.2em] text-[var(--text-primary)] text-right z-20">
              <span className="text-[var(--accent)] animate-pulse inline-block mr-2">●</span> 
              Behavioral Analysis
            </div>

            {/* Layer 5: The 3D Model */}
            <div className="w-full h-full relative z-10">
              <ThanosModel interactive={true} autoRotate={true} scale={0.01} position={[0, -1.9, 0]} />
            </div>
          </div>
        </div>


        {/* --- BOTTOM SECTION: FULL-WIDTH ACCORDION STACK --- */}
        <div className="w-full flex flex-col mt-8 border-t-4 border-l-4 border-r-4 border-[var(--text-primary)] bg-[var(--text-primary)] shadow-[12px_12px_0_0_var(--text-primary)]">
          {STATEMENTS.map((stmt, idx) => {
            const isActive = activeId === stmt.id;

            return (
              <div 
                key={stmt.id} 
                className="bg-[var(--void)] border-b-4 border-[var(--text-primary)] flex flex-col transition-colors duration-500"
              >
                
                {/* ACCORDION HEADER (Clickable) */}
                <button 
                  onClick={() => setActiveId(isActive ? null : stmt.id)}
                  className={`w-full text-left p-6 md:p-8 flex flex-col xl:flex-row xl:items-center justify-between gap-6 transition-colors group cursor-pointer ${isActive ? 'bg-[var(--void-surface)]' : 'hover:bg-[var(--void-surface)]'}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 flex-1">
                    <span className="font-mono text-2xl md:text-3xl font-black text-[var(--accent)] shrink-0 w-24">
                      {stmt.id}
                    </span>
                    <h3 className={`font-display text-2xl md:text-4xl xl:text-5xl font-black uppercase tracking-tighter leading-[0.9] transition-colors ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'}`}>
                      {stmt.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 font-mono text-[10px] md:text-xs uppercase font-black bg-[var(--text-primary)] text-[var(--void)] leading-none border-2 border-[var(--text-primary)]">
                        {stmt.track}
                      </span>
                      <span className={`px-3 py-1 font-mono text-[10px] md:text-xs uppercase font-black leading-none border-2 ${
                        stmt.difficulty === 'Easy' ? 'border-green-600 text-green-700 bg-green-50' :
                        stmt.difficulty === 'Medium' ? 'border-amber-600 text-amber-700 bg-amber-50' :
                        'border-[var(--accent)] text-[var(--accent)] bg-red-50'
                      }`}>
                        LVL: {stmt.difficulty}
                      </span>
                    </div>
                    <div className={`w-12 h-12 border-4 border-[var(--text-primary)] flex items-center justify-center transition-transform duration-500 hidden md:flex ${isActive ? 'rotate-45 bg-[var(--text-primary)] text-[var(--void)]' : 'group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]'}`}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </div>
                  </div>
                </button>

                {/* ACCORDION EXPANDED CONTENT - Full Width Grid Layout */}
                <div 
                  className={`overflow-hidden transition-[max-height,opacity] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${isActive ? 'max-h-[3000px] opacity-100 border-t-4 border-[var(--text-primary)] bg-[var(--void)]' : 'max-h-0 opacity-0 border-t-0'}`}
                >
                  <div className="p-6 md:p-10 lg:p-12 xl:p-16">
                    
                    {/* The Full-Width Data Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-16">
                      
                      {/* Left Block: Context & Constraints (Span 5) */}
                      <div className="xl:col-span-5 flex flex-col gap-10">
                        <div>
                          <h4 className="font-mono text-xs font-black tracking-[0.2em] uppercase text-[var(--text-muted)] mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-[var(--text-primary)] inline-block"></span> Context
                          </h4>
                          <p className="font-body text-base lg:text-lg text-[var(--text-primary)] leading-relaxed font-medium">
                            {stmt.background}
                          </p>
                        </div>

                        <div className="border-4 border-[var(--accent)] bg-[var(--accent)]/5 p-6 md:p-8 relative overflow-hidden group mt-auto">
                          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 10px, var(--accent) 10px, var(--accent) 20px)' }}></div>
                          <h4 className="font-mono text-xs font-black tracking-[0.2em] uppercase text-[var(--accent)] mb-6 flex items-center gap-3 relative z-10">
                            <span className="w-3 h-3 bg-[var(--accent)] animate-pulse"></span> Strict Constraints
                          </h4>
                          <ul className="flex flex-col gap-4 font-mono text-sm text-[var(--text-primary)] relative z-10">
                            {stmt.constraints.map((cons, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <span className="font-black text-[var(--accent)] mt-[2px] text-lg leading-none">×</span>
                                <span className="leading-relaxed font-black">{cons}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right Block: Core Requirements & Examples (Span 7) */}
                      <div className="xl:col-span-7 flex flex-col gap-10">
                        <div>
                          <h4 className="font-mono text-xs font-black tracking-[0.2em] uppercase text-[var(--text-primary)] mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 bg-[var(--text-primary)] inline-block"></span> Execution Protocol
                          </h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm text-[var(--text-primary)]">
                            {stmt.core_requirements.map((req, i) => (
                              <li key={i} className="flex items-start gap-4 p-5 border-2 border-[var(--text-primary)]/10 bg-[var(--void-surface)] shadow-[4px_4px_0_0_rgba(5,5,5,0.05)] hover:bg-white transition-colors">
                                <span className="text-[var(--accent)] font-black text-lg leading-none mt-[2px]">{'>>'}</span>
                                <span className="leading-relaxed font-bold">{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {stmt.examples && (
                          <div className="border-t-2 border-dashed border-[var(--text-primary)]/30 pt-8">
                            <h4 className="font-mono text-xs font-black tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-6 flex items-center gap-2">
                              <span className="w-2 h-2 bg-[var(--text-secondary)] inline-block"></span> Functional Examples
                            </h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs text-[var(--text-secondary)]">
                              {stmt.examples.map((ex, i) => (
                                <li key={i} className="flex flex-col gap-2 p-5 border-2 border-[var(--text-primary)]/5 bg-white">
                                  <span className="text-[var(--text-muted)] font-black text-base leading-none">0{i+1}</span>
                                  <span className="leading-relaxed font-medium">{ex}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Inject Keyframes for Marquee */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes customMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes customMarqueeReverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-bg-marquee {
          animation: customMarquee 20s linear infinite;
        }
        .animate-bg-marquee-reverse {
          animation: customMarqueeReverse 25s linear infinite;
        }
        .text-hollow {
          -webkit-text-stroke: 2px var(--text-primary);
          color: transparent;
        }
      `}} />
    </section>
  )
}
