import { supabase } from './supabase'

export const brandsService = {
  list: async () => {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('created_at', { ascending: false })
    return { data: data || [], error }
  },

  get: async (id) => {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
  },

  create: async (brand) => {
    const { data, error } = await supabase.from('brands').insert([brand]).select().single()
    return { data, error }
  },

  update: async (id, updates) => {
    const { data, error } = await supabase
      .from('brands')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  remove: async (id) => {
    const { error } = await supabase.from('brands').delete().eq('id', id)
    return { error }
  },
}
