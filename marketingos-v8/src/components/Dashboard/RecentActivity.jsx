import { fmtRelative } from '../../utils/helpers'

export default function RecentActivity({ items = [] }) {
  if (!items.length) {
    return (
      <div className="card">
        <div className="ch"><div className="ct">Recent activity</div></div>
        <div className="cb">
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <div className="empty-state-title">No activity yet</div>
            <div className="empty-state-sub">Tasks, campaigns and approvals will surface here as your team works.</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="ch"><div className="ct">Recent activity</div></div>
      <div className="cb">
        {items.map((it) => (
          <div key={it.id} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '0.5px solid var(--border)' }}>
            <div className="uav" style={{ width: 24, height: 24, fontSize: 9, background: 'var(--acbg)', color: 'var(--accent2)' }}>
              {it.actor?.slice(0, 2).toUpperCase() || '••'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.4 }}>{it.text}</div>
              <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 2 }}>{fmtRelative(it.at)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
