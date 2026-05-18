import { useEffect, useState } from 'react'
import { useBrandStore } from '../../store/brandStore'
import { useCampaignStore } from '../../store/campaignStore'
import { PRIORITIES } from '../../utils/constants'

const STAGES_DB = ['todo', 'in_progress', 'in_review', 'completed']

const DEFAULTS = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  brand_id: '',
  campaign_id: '',
  due_date: '',
}

export default function TaskForm({ initial = {}, onSubmit, onCancel, submitLabel = 'Save task' }) {
  const { brands, load: loadBrands } = useBrandStore()
  const { campaigns, load: loadCampaigns } = useCampaignStore()

  const [form, setForm] = useState({ ...DEFAULTS, ...initial })
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState(null)

  useEffect(() => { loadBrands(); loadCampaigns() }, [loadBrands, loadCampaigns])

  const update = (patch) => setForm((f) => ({ ...f, ...patch }))

  const submit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) return setErr('Title is required')
    setErr(null)
    setBusy(true)
    const payload = {
      ...form,
      campaign_id: form.campaign_id || null,
      brand_id: form.brand_id || null,
      due_date: form.due_date || null,
    }
    const res = await onSubmit(payload)
    setBusy(false)
    if (res?.error) setErr(res.error.message || String(res.error))
  }

  const brandCampaigns = form.brand_id
    ? campaigns.filter((c) => c.brand_id === form.brand_id)
    : campaigns

  return (
    <form onSubmit={submit}>
      <div className="form-row full">
        <div className="fg2">
          <label className="flbl">Title *</label>
          <input className="finp" value={form.title} onChange={(e) => update({ title: e.target.value })} placeholder="e.g. Publish SMM post" required autoFocus />
        </div>
      </div>

      <div className="form-row">
        <div className="fg2">
          <label className="flbl">Brand</label>
          <select className="fsel" value={form.brand_id || ''} onChange={(e) => update({ brand_id: e.target.value, campaign_id: '' })}>
            <option value="">— None —</option>
            {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>
        <div className="fg2">
          <label className="flbl">Campaign</label>
          <select className="fsel" value={form.campaign_id || ''} onChange={(e) => update({ campaign_id: e.target.value })}>
            <option value="">— None —</option>
            {brandCampaigns.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="fg2">
          <label className="flbl">Priority</label>
          <select className="fsel" value={form.priority} onChange={(e) => update({ priority: e.target.value })}>
            {Object.entries(PRIORITIES).map(([k, v]) => <option key={k} value={k}>{v.emoji} {v.label}</option>)}
          </select>
        </div>
        <div className="fg2">
          <label className="flbl">Status</label>
          <select className="fsel" value={form.status} onChange={(e) => update({ status: e.target.value })}>
            {STAGES_DB.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="fg2">
          <label className="flbl">Due date</label>
          <input className="finp" type="date" value={form.due_date || ''} onChange={(e) => update({ due_date: e.target.value })} />
        </div>
      </div>

      <div className="form-row full">
        <div className="fg2">
          <label className="flbl">Description</label>
          <textarea className="ftxt" value={form.description || ''} onChange={(e) => update({ description: e.target.value })} placeholder="Notes, context, requirements…" />
        </div>
      </div>

      {err && <div className="lerr" style={{ display: 'block' }}>{err}</div>}

      <div className="macts">
        <button type="button" className="mbtn c" onClick={onCancel}>Cancel</button>
        <button type="submit" className="mbtn ok" disabled={busy}>{busy ? 'Saving…' : submitLabel}</button>
      </div>
    </form>
  )
}
