import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import { CoreFields, TeamSubmission, SubmissionStatus } from '@/types'

function computeStatus(team: TeamSubmission): SubmissionStatus {
  if (team.githubLink && team.liveLink && team.videoLink) return 'complete'
  if (team.githubLink) return 'partial'
  return 'pending'
}

interface HackathonStore {
  teams: TeamSubmission[]
  adminUnlocked: boolean
  currentUserEmail: string | null
  submitCoreDetails: (data: CoreFields) => void
  submitOptionalLinks: (leadEmail: string, liveLink?: string, videoLink?: string) => void
  lockCoreFields: (leadEmail: string) => void
  unlockAdmin: () => void
  lockAdmin: () => void
  login: (email: string) => void
  logout: () => void
}

export const useHackathonStore = create<HackathonStore>()(
  persist(
    (set, get) => ({
      teams: [],
      adminUnlocked: false,
      currentUserEmail: null,

      submitCoreDetails: (data: CoreFields) => {
        const existing = get().teams.find(t => t.leadEmail === data.leadEmail)
        if (existing) {
          if (existing.isCoreLocked) return
          set(state => ({
            teams: state.teams.map(t =>
              t.leadEmail === data.leadEmail
                ? { ...t, ...data, lastUpdatedAt: new Date().toISOString(), status: computeStatus({ ...t, ...data }) }
                : t
            ),
          }))
        } else {
          const newTeam: TeamSubmission = {
            ...data,
            id: uuidv4(),
            liveLink: undefined,
            videoLink: undefined,
            coreSubmittedAt: new Date().toISOString(),
            lastUpdatedAt: new Date().toISOString(),
            isCoreLocked: false,
            status: 'pending',
          }
          newTeam.status = computeStatus(newTeam)
          set(state => ({ teams: [...state.teams, newTeam] }))
        }
      },

      submitOptionalLinks: (leadEmail: string, liveLink?: string, videoLink?: string) => {
        set(state => ({
          teams: state.teams.map(t => {
            if (t.leadEmail !== leadEmail) return t
            const updated = {
              ...t,
              liveLink: liveLink ?? t.liveLink,
              videoLink: videoLink ?? t.videoLink,
              lastUpdatedAt: new Date().toISOString(),
            }
            updated.status = computeStatus(updated)
            return updated
          }),
        }))
      },

      lockCoreFields: (leadEmail: string) => {
        set(state => ({
          teams: state.teams.map(t =>
            t.leadEmail === leadEmail ? { ...t, isCoreLocked: true } : t
          ),
        }))
      },

      unlockAdmin: () => set({ adminUnlocked: true }),
      lockAdmin: () => set({ adminUnlocked: false }),
      login: (email: string) => set({ currentUserEmail: email }),
      logout: () => set({ currentUserEmail: null }),
    }),
    {
      name: 'code-endgame-store',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') return localStorage
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        }
      }),
      partialize: state => ({ teams: state.teams, currentUserEmail: state.currentUserEmail }),
    }
  )
)
