'use client'

import { useState, useEffect } from 'react'
import { Phase, PhaseInfo } from '@/types'
import { getCurrentPhase, PHASE_WINDOWS, getNextMilestone } from '@/lib/phases'

export function usePhase(): PhaseInfo {
  const [info, setInfo] = useState<PhaseInfo>(() => {
    const now = new Date()
    const phase = getCurrentPhase(now)
    return {
      phase,
      isHackathonLive: phase === 'HACKATHON_LIVE' || phase === 'CORE_WINDOW_OPEN',
      isCoreWindowOpen: phase === 'CORE_WINDOW_OPEN',
      timeToHackathonStart: Math.max(0, PHASE_WINDOWS.HACKATHON_START.getTime() - now.getTime()),
      timeToHackathonEnd: Math.max(0, PHASE_WINDOWS.HACKATHON_END.getTime() - now.getTime()),
      timeToCoreWindowEnd: Math.max(0, PHASE_WINDOWS.CORE_WINDOW_END.getTime() - now.getTime()),
    }
  })

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date()
      const phase = getCurrentPhase(now)
      setInfo({
        phase,
        isHackathonLive: phase === 'HACKATHON_LIVE' || phase === 'CORE_WINDOW_OPEN',
        isCoreWindowOpen: phase === 'CORE_WINDOW_OPEN',
        timeToHackathonStart: Math.max(0, PHASE_WINDOWS.HACKATHON_START.getTime() - now.getTime()),
        timeToHackathonEnd: Math.max(0, PHASE_WINDOWS.HACKATHON_END.getTime() - now.getTime()),
        timeToCoreWindowEnd: Math.max(0, PHASE_WINDOWS.CORE_WINDOW_END.getTime() - now.getTime()),
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return info
}
