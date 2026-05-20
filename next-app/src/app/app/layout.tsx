import { redirect } from 'next/navigation'
import { getSessionUser } from '@/lib/auth'

export const runtime = 'nodejs'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser()
  if (!user) redirect('/login')

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <aside
        className="w-[240px] shrink-0 border-r"
        style={{ borderColor: 'var(--border2)', background: 'var(--bg2)' }}
      >
        <div className="h-14 flex items-center px-4 border-b" style={{ borderColor: 'var(--border2)' }}>
          <div className="text-sm font-semibold">MarketingOS</div>
        </div>
        <div className="px-4 py-4">
          <div className="text-xs font-semibold" style={{ color: 'var(--text3)' }}>
            Signed in as
          </div>
          <div className="mt-1 text-sm font-medium">{user.name}</div>
          <div className="mt-0.5 text-xs" style={{ color: 'var(--text3)' }}>
            {user.email}
          </div>

          <form className="mt-4" action="/api/auth/logout" method="post">
            <button
              type="submit"
              className="w-full rounded-md px-3 py-2 text-xs font-semibold border"
              style={{ borderColor: 'var(--border)', background: 'var(--bg3)', color: 'var(--text2)' }}
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  )
}
