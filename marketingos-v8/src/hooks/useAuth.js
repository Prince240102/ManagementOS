import { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { supabase } from '../services/supabase'

export const useAuth = () => {
  const store = useAuthStore()

  useEffect(() => {
    store.initAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        useAuthStore.setState({
          session,
          user: session?.user || null,
          loading: false,
        })
      },
    )

    return () => subscription?.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return store
}
