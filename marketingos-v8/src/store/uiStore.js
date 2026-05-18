import { create } from 'zustand'

export const useUiStore = create((set) => ({
  theme: typeof window !== 'undefined' && localStorage.getItem('mos_theme') === 'light' ? 'light' : 'dark',
  toast: null,

  toggleTheme: () =>
    set((s) => {
      const next = s.theme === 'dark' ? 'light' : 'dark'
      if (typeof document !== 'undefined') {
        document.body.classList.toggle('light', next === 'light')
        localStorage.setItem('mos_theme', next)
      }
      return { theme: next }
    }),

  applyStoredTheme: () => {
    if (typeof document === 'undefined') return
    const stored = localStorage.getItem('mos_theme')
    if (stored === 'light') document.body.classList.add('light')
  },

  showToast: (msg, kind = 'info') => {
    set({ toast: { msg, kind, id: Date.now() } })
    setTimeout(() => set({ toast: null }), 2800)
  },
}))
