import { supabase } from './supabase'

export const assetsService = {
  list: async (filters = {}) => {
    let q = supabase.from('assets').select('*').order('created_at', { ascending: false })
    if (filters.brandId) q = q.eq('brand_id', filters.brandId)
    if (filters.type)    q = q.eq('type', filters.type)
    const { data, error } = await q
    return { data: data || [], error }
  },

  create: async (asset) => {
    const { data, error } = await supabase.from('assets').insert([asset]).select().single()
    return { data, error }
  },

  remove: async (id) => {
    const { error } = await supabase.from('assets').delete().eq('id', id)
    return { error }
  },

  upload: async (file, path) => {
    const { data, error } = await supabase.storage.from('assets').upload(path, file, { upsert: false })
    if (error) return { data: null, error }
    const { data: pub } = supabase.storage.from('assets').getPublicUrl(path)
    return { data: { ...data, publicUrl: pub?.publicUrl }, error: null }
  },
}
