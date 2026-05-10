// frontend/types/index.ts

export type Phase =
  | 'PRE_HACKATHON'
  | 'REGISTRATION_CLOSED'
  | 'CORE_WINDOW_OPEN'
  | 'HACKATHON_LIVE'
  | 'RESULTS_PENDING'
  | 'FINALE'

export type SubmissionStatus = 'complete' | 'partial' | 'pending'

export type StoneColor = 'space' | 'mind' | 'reality' | 'power' | 'time' | 'soul'

export interface CoreFields {
  teamName: string
  leadName: string
  leadEmail: string
  leadMobile: string
  githubLink: string
}

export interface TeamSubmission extends CoreFields {
  id: string
  liveLink?: string
  videoLink?: string
  coreSubmittedAt: string | null
  lastUpdatedAt: string
  isCoreLocked: boolean
  status: SubmissionStatus
}

export interface CountdownValues {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
}

export interface PhaseInfo {
  phase: Phase
  isHackathonLive: boolean
  isCoreWindowOpen: boolean
  timeToHackathonStart: number
  timeToHackathonEnd: number
  timeToCoreWindowEnd: number
}
