import { getSessionUser } from '@/lib/auth'

export const runtime = 'nodejs'

export default async function AppHome() {
  const user = await getSessionUser()

  return (
    <div className="p-6">
      <div className="text-lg font-semibold">Home</div>
      <div className="mt-2 text-sm" style={{ color: 'var(--text3)' }}>
        Auth is enabled. Next step is implementing Brands → Workspace → Monthly Plan → Campaign wizard.
      </div>
      <div className="mt-4 text-sm">
        <div>
          <span style={{ color: 'var(--text3)' }}>User:</span> {user?.name}
        </div>
        <div>
          <span style={{ color: 'var(--text3)' }}>Role:</span> {user?.role}
        </div>
      </div>
    </div>
  )
}
