import { useState } from 'react'
import { slugify } from '../../utils/helpers'

const DEFAULTS = {
  name: '',
  slug: '',
  color: '#7c6af7',
  description: '',
}

export default function BrandForm({ initial = {}, onSubmit, onCancel, submitLabel = 'Save brand' }) {
  const [form, setForm] = useState({ ...DEFAULTS, ...initial })
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState(null)

  const update = (patch) => setForm((f) => ({ ...f, ...patch }))

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setErr('Brand name is required')
      return
    }
    setErr(null)
    setBusy(true)
    const payload = {
      ...form,
      slug: form.slug?.trim() || slugify(form.name),
    }
    const res = await onSubmit(payload)
    setBusy(false)
    if (res?.error) setErr(res.error.message || String(res.error))
  }

  return (
    <form onSubmit={submit}>
      <div className="form-row">
        <div className="fg2">
          <label className="flbl">Brand name *</label>
          <input
            className="finp"
            value={form.name}
            onChange={(e) => update({ name: e.target.value, slug: slugify(e.target.value) })}
            placeholder="e.g. AutoDrive"
            required
          />
        </div>
        <div className="fg2">
          <label className="flbl">Slug</label>
          <input className="finp" value={form.slug} onChange={(e) => update({ slug: e.target.value })} placeholder="auto-drive" />
        </div>
      </div>

      <div className="form-row">
        <div className="fg2">
          <label className="flbl">Color</label>
          <input
            type="color"
            value={form.color}
            onChange={(e) => update({ color: e.target.value })}
            className="finp"
            style={{ height: 40, padding: 4 }}
          />
        </div>
        <div className="fg2">
          <label className="flbl">Logo URL</label>
          <input className="finp" value={form.logo_url || ''} onChange={(e) => update({ logo_url: e.target.value })} placeholder="https://…" />
        </div>
      </div>

      <div className="form-row full">
        <div className="fg2">
          <label className="flbl">Description</label>
          <textarea className="ftxt" value={form.description || ''} onChange={(e) => update({ description: e.target.value })} placeholder="Short positioning, industry, audience…" />
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
