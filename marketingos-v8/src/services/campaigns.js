import { supabase } from './supabase'

export const campaignsService = {
  list: async (filters = {}) => {
    let q = supabase.from('campaigns').select('*').order('created_at', { ascending: false })
    if (filters.brandId) q = q.eq('brand_id', filters.brandId)
    if (filters.status)  q = q.eq('status', filters.status)
    const { data, error } = await q
    return { data: data || [], error }
  },

  get: async (id) => {
    const { data, error } = await supabase.from('campaigns').select('*').eq('id', id).single()
    return { data, error }
  },

  create: async (campaign) => {
    const { data, error } = await supabase.from('campaigns').insert([campaign]).select().single()
    return { data, error }
  },

  update: async (id, updates) => {
    const { data, error } = await supabase
      .from('campaigns')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  remove: async (id) => {
    const { error } = await supabase.from('campaigns').delete().eq('id', id)
    return { error }
  },
}
