import { useEffect, useState } from 'react'
import { approvalsService } from '../../services/approvals'
import { useUiStore } from '../../store/uiStore'
import { fmtRelative } from '../../utils/helpers'
import LoadingSpinner from '../Common/LoadingSpinner'

export default function ApprovalsTab() {
  const showToast = useUiStore((s) => s.showToast)
  const [approvals, setApprovals] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const { data } = await approvalsService.list({ status: 'pending' })
    setApprovals(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handle = async (id, action) => {
    setApprovals((arr) => arr.filter((a) => a.id !== id))
    const { error } = action === 'approve' ? await approvalsService.approve(id) : await approvalsService.reject(id)
    if (error) {
      showToast('Failed — refreshing', 'error')
      load()
    } else {
      showToast(action === 'approve' ? 'Approved' : 'Rejected', 'success')
    }
  }

  if (loading) return <LoadingSpinner />

  if (approvals.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">✓</div>
        <div className="empty-state-title">All caught up</div>
        <div className="empty-state-sub">No pending approvals right now.</div>
      </div>
    )
  }

  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {approvals.map((a) => (
        <div key={a.id} style={{ border: '0.5px solid var(--border)', borderRadius: 10, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, textTransform: 'capitalize' }}>{a.item_type}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'var(--mono)' }}>{a.item_id}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>{fmtRelative(a.created_at)}</div>
          </div>
          <button className="btn btn-g" onClick={() => handle(a.id, 'approve')}>Approve</button>
          <button className="btn btn-d" onClick={() => handle(a.id, 'reject')}>Reject</button>
        </div>
      ))}
    </div>
  )
}
