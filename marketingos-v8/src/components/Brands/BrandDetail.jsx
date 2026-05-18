import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { brandsService } from '../../services/brands'
import { campaignsService } from '../../services/campaigns'
import { tasksService } from '../../services/tasks'
import { useBrandStore } from '../../store/brandStore'
import { useUiStore } from '../../store/uiStore'
import { initials } from '../../utils/helpers'
import LoadingSpinner from '../Common/LoadingSpinner'
import Modal from '../Common/Modal'
import BrandForm from './BrandForm'

export default function BrandDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { update, remove } = useBrandStore()
  const showToast = useUiStore((s) => s.showToast)

  const [brand, setBrand]   = useState(null)
  const [campaigns, setCampaigns] = useState([])
  const [tasks, setTasks]   = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [confirmDel, setConfirmDel] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const [{ data: b }, { data: c }, { data: t }] = await Promise.all([
        brandsService.get(id),
        campaignsService.list({ brandId: id }),
        tasksService.list(),
      ])
      if (cancelled) return
      setBrand(b)
      setCampaigns(c)
      setTasks((t || []).filter((tk) => tk.brand_id === id || tk.campaign_id && c.some((cp) => cp.id === tk.campaign_id)))
      setLoading(false)
    }
    load()
    return () => { cancelled = true }
  }, [id])

  if (loading) return <LoadingSpinner />
  if (!brand) return <div className="empty-state"><div className="empty-state-title">Brand not found</div></div>

  const onSave = async (payload) => {
    const res = await update(id, payload)
    if (!res.error) {
      setBrand({ ...brand, ...payload })
      setEditing(false)
      showToast('Brand updated', 'success')
    }
    return res
  }

  const onDelete = async () => {
    const res = await remove(id)
    if (!res.error) {
      showToast('Brand deleted', 'success')
      navigate('/brands')
    }
  }

  return (
    <div>
      <div className="card" style={{ padding: 18, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div className="blogo" style={{ width: 52, height: 52, background: brand.color || '#7c6af7', fontSize: 18 }}>
            {initials(brand.name)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>{brand.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>
              {brand.description || 'No description yet'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="tbtn" onClick={() => setEditing(true)}>Edit</button>
            <button className="tbtn d" onClick={() => setConfirmDel(true)}>Delete</button>
          </div>
        </div>
      </div>

      <div className="g2">
        <div className="card">
          <div className="ch"><div className="ct">Campaigns ({campaigns.length})</div></div>
          <div className="cb">
            {campaigns.length === 0 ? (
              <div className="empty-state-sub">No campaigns for this brand yet.</div>
            ) : (
              campaigns.map((c) => (
                <div key={c.id} style={{ padding: '8px 0', borderBottom: '0.5px solid var(--border)' }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>Status: {c.status}</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card">
          <div className="ch"><div className="ct">Tasks ({tasks.length})</div></div>
          <div className="cb">
            {tasks.length === 0 ? (
              <div className="empty-state-sub">No tasks for this brand yet.</div>
            ) : (
              tasks.slice(0, 8).map((t) => (
                <div key={t.id} style={{ padding: '8px 0', borderBottom: '0.5px solid var(--border)' }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{t.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>{t.status} · {t.priority}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Modal open={editing} onClose={() => setEditing(false)} title="Edit brand" size="md">
        <BrandForm initial={brand} onSubmit={onSave} onCancel={() => setEditing(false)} submitLabel="Save changes" />
      </Modal>

      <Modal
        open={confirmDel}
        onClose={() => setConfirmDel(false)}
        title="Delete brand?"
        subtitle="This permanently removes the brand and all linked campaigns, tasks and assets."
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
