import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import type { UserType } from '@global/types/src/user'

type StoreState = {
  user?: UserType | null
}

type Action = {
  setUser: (user: StoreState['user'] | null) => void
}

export const useStoreBase = create(
  persist<StoreState & Action>(
    (set) => ({
      volume: 0.1,
      setUser: (user) => set(() => ({ user })),
    }),
    {
      name: 'storage-base',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
