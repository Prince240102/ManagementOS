import { redirect } from 'next/navigation'
import { getSessionUser } from '@/lib/auth'

export const runtime = 'nodejs'

type Props = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function LoginPage(props: Props) {
  const user = await getSessionUser()
  if (user) redirect('/')

  const sp = (await props.searchParams) || {}
  const nextRaw = sp.next
  const next = typeof nextRaw === 'string' && nextRaw.startsWith('/') ? nextRaw : '/'

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
      <div
        className="w-full max-w-sm rounded-2xl border p-8"
        style={{ background: 'var(--bg2)', borderColor: 'var(--border2)', boxShadow: 'var(--shadow-lg)' }}
      >
        <div className="text-lg font-semibold" style={{ color: 'var(--text)' }}>
          Sign in
        </div>
        <div className="mt-1 text-sm" style={{ color: 'var(--text3)' }}>
          Use your MarketingOS account.
        </div>

        <form className="mt-6 flex flex-col gap-3" action="/api/auth/login" method="post">
          <input type="hidden" name="next" value={next} />
          <label className="text-xs font-medium" style={{ color: 'var(--text3)' }}>
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="rounded-md border px-3 py-2 text-sm"
            style={{ background: 'var(--bg3)', borderColor: 'var(--border)', color: 'var(--text)' }}
          />
          <label className="mt-2 text-xs font-medium" style={{ color: 'var(--text3)' }}>
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="rounded-md border px-3 py-2 text-sm"
            style={{ background: 'var(--bg3)', borderColor: 'var(--border)', color: 'var(--text)' }}
          />
          <button
            type="submit"
            className="mt-3 rounded-md px-3 py-2 text-sm font-semibold"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
