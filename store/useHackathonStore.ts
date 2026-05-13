import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Client-only UI state. Source-of-truth for submissions = Supabase (RPC).
interface HackathonStore {
  adminUnlocked: boolean
  currentUserEmail: string | null
  unlockAdmin: () => void
  lockAdmin: () => void
  login: (email: string) => void
  logout: () => void
}

export const useHackathonStore = create<HackathonStore>()(
  persist(
    (set) => ({
      adminUnlocked: false,
      currentUserEmail: null,
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
      partialize: state => ({ currentUserEmail: state.currentUserEmail }),
    }
  )
)
