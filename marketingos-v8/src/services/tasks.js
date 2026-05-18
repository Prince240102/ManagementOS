import { supabase } from './supabase'

export const tasksService = {
  list: async (filters = {}) => {
    let q = supabase.from('tasks').select('*').order('created_at', { ascending: false })
    if (filters.assignedTo) q = q.eq('assigned_to', filters.assignedTo)
    if (filters.campaignId) q = q.eq('campaign_id', filters.campaignId)
    if (filters.status)     q = q.eq('status', filters.status)
    const { data, error } = await q
    return { data: data || [], error }
  },

  get: async (id) => {
    const { data, error } = await supabase.from('tasks').select('*').eq('id', id).single()
    return { data, error }
  },

  create: async (task) => {
    const { data, error } = await supabase.from('tasks').insert([task]).select().single()
    return { data, error }
  },

  update: async (id, updates) => {
    const { data, error } = await supabase
      .from('tasks')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  setStatus: async (id, status) => {
    const { data, error } = await supabase
      .from('tasks')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  remove: async (id) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id)
    return { error }
  },
}
