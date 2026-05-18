import { create } from 'zustand'
import { brandsService } from '../services/brands'

export const useBrandStore = create((set, get) => ({
  brands: [],
  loading: false,
  error: null,

  load: async () => {
    set({ loading: true, error: null })
    const { data, error } = await brandsService.list()
    set({ brands: data, loading: false, error: error?.message || null })
  },

  create: async (brand) => {
    const { data, error } = await brandsService.create(brand)
    if (!error && data) set({ brands: [data, ...get().brands] })
    return { data, error }
  },

  update: async (id, updates) => {
    const { data, error } = await brandsService.update(id, updates)
    if (!error && data) set({ brands: get().brands.map((b) => (b.id === id ? data : b)) })
    return { data, error }
  },

  remove: async (id) => {
    const { error } = await brandsService.remove(id)
    if (!error) set({ brands: get().brands.filter((b) => b.id !== id) })
    return { error }
  },
}))
