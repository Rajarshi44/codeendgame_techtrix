import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Client-only UI state. Source-of-truth for submissions = Supabase (RPC).
interface HackathonStore {
  currentUserEmail: string | null
  login: (email: string) => void
  logout: () => void
}

export const useHackathonStore = create<HackathonStore>()(
  persist(
    (set) => ({
      currentUserEmail: null,
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
