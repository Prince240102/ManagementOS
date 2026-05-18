import { create } from 'zustand'
import { authService } from '../services/auth'

export const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: true,
  error: null,

  initAuth: async () => {
    const { data } = await authService.getSession()
    set({
      session: data?.session || null,
      user: data?.session?.user || null,
      loading: false,
    })
  },

  signup: async (email, password, fullName) => {
    set({ loading: true, error: null })
    const { data, error } = await authService.signup(email, password, fullName)
    if (error) {
      set({ error: error.message, loading: false })
      return { error }
    }
    set({ loading: false })
    return { data }
  },

  signin: async (email, password) => {
    set({ loading: true, error: null })
    const { data, error } = await authService.signin(email, password)
    if (error) {
      set({ error: error.message, loading: false })
      return { error }
    }
    set({ user: data?.user || null, session: data?.session || null, loading: false })
    return { data }
  },

  signout: async () => {
    set({ loading: true })
    await authService.signout()
    set({ user: null, session: null, loading: false })
  },

  clearError: () => set({ error: null }),
}))
