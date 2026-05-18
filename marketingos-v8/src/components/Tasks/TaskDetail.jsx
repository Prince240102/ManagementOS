import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { tasksService } from '../../services/tasks'
import { useUiStore } from '../../store/uiStore'
import { PRIORITIES } from '../../utils/constants'
import { fmtDate } from '../../utils/helpers'
import LoadingSpinner from '../Common/LoadingSpinner'
import TaskForm from './TaskForm'

export default function TaskDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const showToast = useUiStore((s) => s.showToast)
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    tasksService.get(id).then(({ data }) => { setTask(data); setLoading(false) })
  }, [id])

  if (loading) return <LoadingSpinner />
  if (!task) return <div className="empty-state"><div className="empty-state-title">Task not found</div></div>

  const onSave = async (payload) => {
    const { data, error } = await tasksService.update(id, payload)
    if (!error && data) {
      setTask(data)
      showToast('Saved', 'success')
    }
    return { data, error }
  }

  const onDelete = async () => {
    const { error } = await tasksService.remove(id)
    if (!error) {
      showToast('Deleted', 'success')
      navigate('/tasks')
    }
  }

  const pri = PRIORITIES[task.priority] || PRIORITIES.medium

  return (
    <div>
      <div className="card" style={{ padding: 18, marginBottom: 16 }}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>{task.title}</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 6, alignItems: 'center', flexWrap: 'wrap' }}>
          <span className="badge bgr">{(task.status || 'todo').replace('_', ' ')}</span>
          <span className={'badge ' + pri.cls}>{pri.label}</span>
          {task.due_date && <span style={{ fontSize: 12, color: 'var(--text2)' }}>Due {fmtDate(task.due_date)}</span>}
          <button className="tbtn d" style={{ marginLeft: 'auto' }} onClick={onDelete}>Delete</button>
        </div>
      </div>

      <div className="card" style={{ padding: 18 }}>
        <TaskForm initial={task} onSubmit={onSave} onCancel={() => navigate('/tasks')} submitLabel="Save changes" />
      </div>
    </div>
  )
}
