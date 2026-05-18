import { useEffect, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import bodyHtml from '../legacy/reference.body.html?raw'
import appJs from '../legacy/reference.app.js?raw'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export default function LegacyApp() {
  const mounted = useRef(false)

  useEffect(() => {
    if (mounted.current) return
    mounted.current = true

    // Expose the @supabase/supabase-js module on window so the legacy script's
    // `window.supabase.createClient(...)` keeps working without the CDN tag.
    window.supabase = { createClient }

    // Mirror the credentials the legacy init script expects.
    window.SUPABASE_URL = SUPABASE_URL
    window.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY

    try {
      window._sb = SUPABASE_URL && SUPABASE_ANON_KEY
        ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
        : null
      if (window._sb) console.log('✅ Supabase connected (legacy bridge)')
      else console.warn('⚡ Running in local mode — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local')
    } catch (e) {
      console.warn('Supabase init failed — local mode:', e)
      window._sb = null
    }

    // Mount the reference HTML into the document body so all the inline event
    // handlers (`onclick="doLogin()"` etc.) bind to the real document globals.
    const host = document.createElement('div')
    host.id = 'legacy-host'
    host.innerHTML = bodyHtml
    document.body.appendChild(host)

    // Inject the legacy script. The reference declared `const SUPABASE_URL`,
    // `const SUPABASE_ANON_KEY` and `let _sb` at script top level — we re-emit
    // those bindings in the same script so the rest of the legacy code sees them.
    const prelude = [
      `const SUPABASE_URL = ${JSON.stringify(SUPABASE_URL)};`,
      `const SUPABASE_ANON_KEY = ${JSON.stringify(SUPABASE_ANON_KEY)};`,
      `let _sb = window._sb || null;`,
    ].join('\n')

    const script = document.createElement('script')
    script.id = 'legacy-app-script'
    script.textContent = prelude + '\n' + appJs
    document.body.appendChild(script)

    // No cleanup: the legacy script registers thousands of globals and event
    // handlers, and React StrictMode's dev-only double-mount would otherwise
    // tear the DOM down before the legacy `loadData()` could finish.
  }, [])

  return null
}
