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

// Server submission row (camelCase view of `public.submissions`).
export interface Submission {
  id: string
  eventId: string
  teamId: string
  leadEmail: string
  teamName: string
  leadName: string
  leadMobile: string
  githubLink: string
  liveLink: string | null
  videoLink: string | null
  isCoreLocked: boolean
  coreSubmittedAt: string
  lastUpdatedAt: string
  status: SubmissionStatus
}

// Kept for admin UI compatibility (maps from Submission).
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

// Maps Postgres exception text → user-facing message.
export const SUBMISSION_ERROR_COPY: Record<string, string> = {
  unauthenticated:            'Sign in required.',
  not_paid_or_unregistered:   'Your team payment is not verified. Contact an organizer.',
  window_not_open:            'Submission window opens 14 May, 00:01 IST.',
  window_closed:              'Submission window closed 15 May, 23:59 IST.',
  no_submission:              'No submission to lock yet.',
  team_name_required:         'Team name is required.',
  lead_name_required:         'Lead name is required.',
  lead_mobile_required:       'Mobile is required.',
  github_required:            'GitHub link is required.',
  team_name_too_long:         'Team name too long.',
  lead_name_too_long:         'Lead name too long.',
  lead_mobile_too_long:       'Mobile too long.',
  github_too_long:            'GitHub link too long.',
  live_too_long:              'Live link too long.',
  video_too_long:             'Video link too long.',
  github_invalid_url:         'GitHub link must start with http(s)://',
  live_invalid_url:           'Live link must start with http(s)://',
  video_invalid_url:          'Video link must start with http(s)://',
}
