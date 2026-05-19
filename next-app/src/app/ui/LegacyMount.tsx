'use client'

import { useEffect, useRef } from 'react'
import { createSupabaseShim } from '@/lib/supabaseShim'

type SupabaseShimGlobal = {
  supabase?: { createClient: (url?: string, anonKey?: string) => unknown }
}

type Props = {
  bodyHtml: string
  appJs: string
}

function getPublicEnv(name: string) {
  return (process.env[name] || '').trim()
}

export default function LegacyMount({ bodyHtml, appJs }: Props) {
  const mounted = useRef(false)

  useEffect(() => {
    if (mounted.current) return
    mounted.current = true

    const shim = createSupabaseShim()
    ;(window as unknown as SupabaseShimGlobal).supabase = { createClient: shim.createClient }

    const supabaseUrl = getPublicEnv('NEXT_PUBLIC_SUPABASE_URL')
    const supabaseAnonKey = getPublicEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY')
    ;(window as unknown as { SUPABASE_URL?: string }).SUPABASE_URL = supabaseUrl
    ;(window as unknown as { SUPABASE_ANON_KEY?: string }).SUPABASE_ANON_KEY = supabaseAnonKey

    const host = document.createElement('div')
    host.id = 'legacy-host'
    host.innerHTML = bodyHtml
    document.body.appendChild(host)

    const prelude = [
      `const SUPABASE_URL = ${JSON.stringify(supabaseUrl)};`,
      `const SUPABASE_ANON_KEY = ${JSON.stringify(supabaseAnonKey)};`,
      `let _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);`,
    ].join('\n')

    const script = document.createElement('script')
    script.id = 'legacy-app-script'
    script.textContent = prelude + '\n' + appJs
    document.body.appendChild(script)
  }, [bodyHtml, appJs])

  return null
}
