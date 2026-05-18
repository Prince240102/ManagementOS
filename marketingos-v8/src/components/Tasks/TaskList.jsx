import { useEffect, useMemo, useState } from 'react'
import { tasksService } from '../../services/tasks'
import { useBrandStore } from '../../store/brandStore'
import { useUiStore } from '../../store/uiStore'
import { PRIORITIES } from '../../utils/constants'
import { fmtDate, isOverdue } from '../../utils/helpers'
import LoadingSpinner from '../Common/LoadingSpinner'
import Modal from '../Common/Modal'
import TaskForm from './TaskForm'

const KANBAN_COLS = [
  { id: 'todo',        label: 'To do',       color: 'var(--text3)' },
  { id: 'in_progress', label: 'In progress', color: 'var(--blue)'  },
  { id: 'in_review',   label: 'In review',   color: 'var(--amber)' },
  { id: 'completed',   label: 'Completed',   color: 'var(--green)' },
]

export default function TaskList() {
  const showToast = useUiStore((s) => s.showToast)
  const { brands, load: loadBrands } = useBrandStore()

  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('kanban')
  const [filter, setFilter] = useState('all')
  const [brandFilter, setBrandFilter] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const [activeTask, setActiveTask] = useState(null)

  const load = async () => {
    setLoading(true)
    const { data } = await tasksService.list()
    setTasks(data)
    setLoading(false)
  }

  useEffect(() => { load(); loadBrands() }, [loadBrands])

  const brandMap = useMemo(() => Object.fromEntries(brands.map((b) => [b.id, b])), [brands])

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      if (brandFilter && t.brand_id !== brandFilter) return false
      if (filter === 'high'    && t.priority !== 'high') return false
      if (filter === 'review'  && t.status   !== 'in_review') return false
      if (filter === 'overdue' && !isOverdue(t.due_date))   return false
      return true
    })
  }, [tasks, filter, brandFilter])

  const grouped = useMemo(() => {
    const g = Object.fromEntries(KANBAN_COLS.map((c) => [c.id, []]))
    filtered.forEach((t) => {
      const key = g[t.status] ? t.status : 'todo'
      g[key].push(t)
    })
    return g
  }, [filtered])

  const setStatus = async (id, status) => {
    setTasks((arr) => arr.map((t) => (t.id === id ? { ...t, status } : t)))
    const { error } = await tasksService.setStatus(id, status)
    if (error) {
      showToast('Failed to update task', 'error')
      load()
    }
  }

  const createTask = async (payload) => {
    const { data, error } = await tasksService.create(payload)
    if (!error && data) {
      setTasks((arr) => [data, ...arr])
      setShowCreate(false)
      showToast('Task created', 'success')
    }
    return { data, error }
  }

  const updateTask = async (payload) => {
    if (!activeTask) return {}
    const { data, error } = await tasksService.update(activeTask.id, payload)
    if (!error && data) {
      setTasks((arr) => arr.map((t) => (t.id === activeTask.id ? data : t)))
      setActiveTask(null)
      showToast('Task updated', 'success')
    }
    return { data, error }
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', background: 'var(--bg2)', border: '0.5px solid var(--border)', borderRadius: 6, padding: 3 }}>
          {['kanban', 'list'].map((v) => (
            <button key={v} className={'tab' + (view === v ? ' active' : '')} style={{ padding: '5px 12px' }} onClick={() => setView(v)}>
              {v === 'kanban' ? '⊞ Kanban' : '☰ List'}
            </button>
          ))}
        </div>

        <div className="ftabs">
          {['all', 'high', 'review', 'overdue'].map((f) => (
            <button key={f} className={'ftab' + (filter === f ? ' active' : '')} onClick={() => setFilter(f)}>
              {f[0].toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <select className="fsel" style={{ width: 140 }} value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
          <option value="">All brands</option>
          {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>

        <button className="tbtn p" style={{ marginLeft: 'auto' }} onClick={() => setShowCreate(true)}>+ New task</button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">◻</div>
          <div className="empty-state-title">No tasks</div>
          <div className="empty-state-sub">Add a task to start tracking your work.</div>
        </div>
      ) : view === 'kanban' ? (
        <div className="kanban">
          {KANBAN_COLS.map((col) => (
            <div key={col.id} className="kb-col">
              <div className="kb-col-hdr">
                <div className="kb-stage-dot" style={{ background: col.color }} />
                <div className="kb-stage-name">{col.label}</div>
                <div className="kb-count">{grouped[col.id].length}</div>
              </div>
              <div className="kb-cards">
                {grouped[col.id].map((t) => (
                  <KanbanCard key={t.id} task={t} brand={brandMap[t.brand_id]} onOpen={() => setActiveTask(t)} onMove={setStatus} />
                ))}
                {grouped[col.id].length === 0 && (
                  <div style={{ fontSize: 11, color: 'var(--text3)', textAlign: 'center', padding: '12px 0' }}>—</div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          {filtered.map((t) => {
            const pri = PRIORITIES[t.priority] || PRIORITIES.medium
            const brand = brandMap[t.brand_id]
            return (
              <div key={t.id} style={{ padding: '12px 16px', borderBottom: '0.5px solid var(--border)', display: 'grid', gridTemplateColumns: '1fr 110px 90px 100px 90px', gap: 8, alignItems: 'center', cursor: 'pointer' }} onClick={() => setActiveTask(t)}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{t.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>{brand?.name || '—'}</div>
                </div>
                <span className="badge bgr">{(t.status || 'todo').replace('_', ' ')}</span>
                <span className={'badge ' + pri.cls}>{pri.label}</span>
                <span style={{ fontSize: 11, color: isOverdue(t.due_date) ? 'var(--red)' : 'var(--text2)' }}>{fmtDate(t.due_date) || '—'}</span>
                <select className="fsel" style={{ fontSize: 11, padding: '5px 8px' }} value={t.status || 'todo'} onChange={(e) => { e.stopPropagation(); setStatus(t.id, e.target.value) }} onClick={(e) => e.stopPropagation()}>
                  {KANBAN_COLS.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
            )
          })}
        </div>
      )}

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="New task" subtitle="Add a task to a brand or campaign" size="md">
        <TaskForm onSubmit={createTask} onCancel={() => setShowCreate(false)} submitLabel="Create task" />
      </Modal>

      <Modal open={!!activeTask} onClose={() => setActiveTask(null)} title="Edit task" size="md">
        {activeTask && <TaskForm initial={activeTask} onSubmit={updateTask} onCancel={() => setActiveTask(null)} submitLabel="Save changes" />}
      </Modal>
    </div>
  )
}

function KanbanCard({ task, brand, onOpen, onMove }) {
  const pri = PRIORITIES[task.priority] || PRIORITIES.medium
  return (
    <div className="kb-card" onClick={onOpen}>
      <div className="kb-card-title">{task.title}</div>
      <div className="kb-card-brand">{brand?.name || 'No brand'}</div>
      <div className="kb-card-meta">
        <span className={'badge ' + pri.cls}>{pri.label}</span>
        {task.due_date && (
          <span style={{ fontSize: 10, color: isOverdue(task.due_date) ? 'var(--red)' : 'var(--text3)', marginLeft: 'auto' }}>
            {new Date(task.due_date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
          </span>
        )}
      </div>
    </div>
  )
}
