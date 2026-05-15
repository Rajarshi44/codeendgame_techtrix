// lib/phases.ts
import { Phase } from '@/types'

// Single source of truth — MUST match SQL constants in submissions schema.
// Submission window: 2026-05-14 00:01 IST → 2026-05-15 23:59 IST
export const PHASE_WINDOWS = {
  REGISTRATION_CLOSE: new Date('2026-05-13T23:59:59+05:30'),
  HACKATHON_START:    new Date('2026-05-14T00:01:00+05:30'),
  CORE_WINDOW_END:    new Date('2026-05-14T02:16:00+05:30'), // 2h 15min core lock window
  HACKATHON_END:      new Date('2026-05-16T06:00:00+05:30'),
  RESULTS_TIME:       new Date('2026-05-16T18:00:00+05:30'),
  FINALE_START:       new Date('2026-05-17T10:30:00+05:30'),
}

export function getCurrentPhase(now: Date): Phase {
  if (now < PHASE_WINDOWS.HACKATHON_START) return 'PRE_HACKATHON'
  if (now < PHASE_WINDOWS.CORE_WINDOW_END) return 'CORE_WINDOW_OPEN'
  if (now < PHASE_WINDOWS.HACKATHON_END)   return 'HACKATHON_LIVE'
  if (now < PHASE_WINDOWS.RESULTS_TIME)    return 'RESULTS_PENDING'
  if (now >= PHASE_WINDOWS.FINALE_START)   return 'FINALE'
  return 'RESULTS_PENDING'
}

export function getNextMilestone(phase: Phase): Date | null {
  switch (phase) {
    case 'PRE_HACKATHON':         return PHASE_WINDOWS.HACKATHON_START
    case 'CORE_WINDOW_OPEN':      return PHASE_WINDOWS.CORE_WINDOW_END
    case 'HACKATHON_LIVE':        return PHASE_WINDOWS.HACKATHON_END
    case 'RESULTS_PENDING':       return PHASE_WINDOWS.FINALE_START
    case 'FINALE':                return null
    default:                      return null
  }
}
