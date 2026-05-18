import { supabase } from './supabase'

export const approvalsService = {
  list: async (filters = {}) => {
    let q = supabase.from('approvals').select('*').order('created_at', { ascending: false })
    if (filters.status) q = q.eq('status', filters.status)
    if (filters.assignedTo) q = q.eq('assigned_to', filters.assignedTo)
    const { data, error } = await q
    return { data: data || [], error }
  },

  approve: async (id, feedback = null) => {
    const { data, error } = await supabase
      .from('approvals')
      .update({ status: 'approved', feedback, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  reject: async (id, feedback = null) => {
    const { data, error } = await supabase
      .from('approvals')
      .update({ status: 'rejected', feedback, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  create: async (approval) => {
    const { data, error } = await supabase.from('approvals').insert([approval]).select().single()
    return { data, error }
  },
}
