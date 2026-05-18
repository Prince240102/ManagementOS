import { useEffect, useState } from 'react'
import { brandsService } from '../../services/brands'
import { tasksService } from '../../services/tasks'
import { approvalsService } from '../../services/approvals'
import { useAuthStore } from '../../store/authStore'
import LoadingSpinner from '../Common/LoadingSpinner'
import StatsCards from './StatsCards'
import RecentActivity from './RecentActivity'

export default function Dashboard() {
  const { user } = useAuthStore()
  const [stats, setStats] = useState(null)
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const [brands, tasks, approvals] = await Promise.all([
        brandsService.list(),
        tasksService.list(),
        approvalsService.list({ status: 'pending' }),
      ])
      if (cancelled) return
      const taskItems = tasks.data || []
      setStats({
        brands: (brands.data || []).length,
        tasks: taskItems.filter((t) => t.status !== 'completed').length,
        review: taskItems.filter((t) => t.status === 'in_review').length,
        approvals: (approvals.data || []).length,
      })
      setRecent(
        taskItems.slice(0, 6).map((t) => ({
          id: t.id,
          actor: t.assigned_to ? 'TM' : 'SY',
          text: `Task "${t.title}" is ${(t.status || 'todo').replace('_', ' ')}`,
          at: t.updated_at || t.created_at,
        })),
      )
      setLoading(false)
    }
    load().catch((e) => { console.error(e); setLoading(false) })
    return () => { cancelled = true }
  }, [user?.id])

  if (loading) return <LoadingSpinner />

  const greeting = (() => {
    const h = new Date().getHours()
    if (h < 5)  return 'Working late 🌙'
    if (h < 12) return 'Good morning 👋'
    if (h < 18) return 'Good afternoon ☀'
    return 'Good evening 🌆'
  })()

  return (
    <div>
      <div className="fade" style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.03em' }}>{greeting}</div>
        <div style={{ fontSize: 13, color: 'var(--text2)', marginTop: 2, marginBottom: 20 }}>
          Here's your workspace at a glance
        </div>
      </div>

      <StatsCards stats={stats} />

      <div className="g2" style={{ marginTop: 16 }}>
        <RecentActivity items={recent} />
        <div className="card">
          <div className="ch"><div className="ct">Quick links</div></div>
          <div className="cb" style={{ display: 'grid', gap: 8 }}>
            <a href="/tasks" className="navi"><span className="nav-ic">◻</span>View all tasks</a>
            <a href="/brands" className="navi"><span className="nav-ic">◈</span>Manage brands</a>
            <a href="/campaigns" className="navi"><span className="nav-ic">◇</span>Browse campaigns</a>
            <a href="/owner" className="navi"><span className="nav-ic">★</span>Open owner view</a>
          </div>
        </div>
      </div>
    </div>
  )
}
