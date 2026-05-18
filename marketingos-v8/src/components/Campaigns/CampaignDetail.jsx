import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { campaignsService } from '../../services/campaigns'
import { brandsService } from '../../services/brands'
import { tasksService } from '../../services/tasks'
import { useCampaignStore } from '../../store/campaignStore'
import { useUiStore } from '../../store/uiStore'
import { CAMPAIGN_STATUS } from '../../utils/constants'
import { fmtDate, fmtMoney } from '../../utils/helpers'
import LoadingSpinner from '../Common/LoadingSpinner'
import Modal from '../Common/Modal'

export default function CampaignDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { update, remove } = useCampaignStore()
  const showToast = useUiStore((s) => s.showToast)

  const [campaign, setCampaign] = useState(null)
  const [brand, setBrand] = useState(null)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirmDel, setConfirmDel] = useState(false)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({})

  useEffect(() => {
    let cancelled = false
    async function load() {
      const { data: c } = await campaignsService.get(id)
      if (cancelled) return
      setCampaign(c)
      setForm(c || {})
      if (c?.brand_id) {
        const { data: b } = await brandsService.get(c.brand_id)
        if (!cancelled) setBrand(b)
      }
      const { data: t } = await tasksService.list({ campaignId: id })
      if (!cancelled) setTasks(t)
      setLoading(false)
    }
    load()
    return () => { cancelled = true }
  }, [id])

  if (loading) return <LoadingSpinner />
  if (!campaign) return <div className="empty-state"><div className="empty-state-title">Campaign not found</div></div>

  const saveStatus = async (status) => {
    const res = await update(id, { status })
    if (!res.error) {
      setCampaign({ ...campaign, status })
      showToast(`Status set to ${status}`, 'success')
    }
  }

  const saveEdits = async () => {
    const res = await update(id, form)
    if (!res.error) {
      setCampaign({ ...campaign, ...form })
      setEditing(false)
      showToast('Campaign updated', 'success')
    }
  }

  const onDelete = async () => {
    const res = await remove(id)
    if (!res.error) {
      showToast('Campaign deleted', 'success')
      navigate('/campaigns')
    }
  }

  return (
    <div>
      <div className="card" style={{ padding: 18, marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <div className="blogo" style={{ width: 52, height: 52, background: brand?.color || '#7c6af7', fontSize: 18 }}>
            {brand?.name?.[0] || '◇'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>{campaign.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>
              {brand?.name || 'Unknown brand'} · {fmtDate(campaign.start_date)} → {fmtDate(campaign.end_date)} · {fmtMoney(campaign.budget)}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <select className="fsel" value={campaign.status} onChange={(e) => saveStatus(e.target.value)} style={{ width: 130 }}>
              {Object.entries(CAMPAIGN_STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
            <button className="tbtn" onClick={() => setEditing(true)}>Edit</button>
            <button className="tbtn d" onClick={() => setConfirmDel(true)}>Delete</button>
          </div>
        </div>

        {campaign.description && (
          <div style={{ marginTop: 12, fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
            {campaign.description}
          </div>
        )}
      </div>

      <div className="card">
        <div className="ch"><div className="ct">Tasks ({tasks.length})</div></div>
        <div className="cb">
          {tasks.length === 0 ? (
            <div className="empty-state-sub">No tasks tied to this campaign yet.</div>
          ) : (
            tasks.map((t) => (
              <div key={t.id} style={{ padding: '10px 0', borderBottom: '0.5px solid var(--border)' }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{t.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>
                  {t.status} · {t.priority} · due {fmtDate(t.due_date)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Modal open={editing} onClose={() => setEditing(false)} title="Edit campaign" size="md"
        actions={
          <>
            <button className="mbtn c" onClick={() => setEditing(false)}>Cancel</button>
            <button className="mbtn ok" onClick={saveEdits}>Save changes</button>
          </>
        }>
        <div className="form-row">
          <div className="fg2"><label className="flbl">Name</label><input className="finp" value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div className="fg2"><label className="flbl">Budget</label><input className="finp" type="number" value={form.budget || ''} onChange={(e) => setForm({ ...form, budget: e.target.value ? Number(e.target.value) : null })} /></div>
        </div>
        <div className="form-row">
          <div className="fg2"><label className="flbl">Start</label><input className="finp" type="date" value={form.start_date || ''} onChange={(e) => setForm({ ...form, start_date: e.target.value })} /></div>
          <div className="fg2"><label className="flbl">End</label><input className="finp" type="date" value={form.end_date || ''} onChange={(e) => setForm({ ...form, end_date: e.target.value })} /></div>
        </div>
        <div className="form-row full">
          <div className="fg2"><label className="flbl">Description</label><textarea className="ftxt" value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
        </div>
      </Modal>

      <Modal
        open={confirmDel}
        onClose={() => setConfirmDel(false)}
        title="Delete campaign?"
        subtitle="This permanently removes the campaign and unlinks any tasks."
        actions={
          <>
            <button className="mbtn c" onClick={() => setConfirmDel(false)}>Cancel</button>
            <button className="mbtn d" onClick={onDelete}>Delete permanently</button>
          </>
        }
      />
    </div>
  )
}
