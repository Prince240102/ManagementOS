import { create } from 'zustand'
import { campaignsService } from '../services/campaigns'

export const useCampaignStore = create((set, get) => ({
  campaigns: [],
  loading: false,
  error: null,

  load: async (filters) => {
    set({ loading: true, error: null })
    const { data, error } = await campaignsService.list(filters)
    set({ campaigns: data, loading: false, error: error?.message || null })
  },

  create: async (campaign) => {
    const { data, error } = await campaignsService.create(campaign)
    if (!error && data) set({ campaigns: [data, ...get().campaigns] })
    return { data, error }
  },

  update: async (id, updates) => {
    const { data, error } = await campaignsService.update(id, updates)
    if (!error && data) set({ campaigns: get().campaigns.map((c) => (c.id === id ? data : c)) })
    return { data, error }
  },

  remove: async (id) => {
    const { error } = await campaignsService.remove(id)
    if (!error) set({ campaigns: get().campaigns.filter((c) => c.id !== id) })
    return { error }
  },
}))
