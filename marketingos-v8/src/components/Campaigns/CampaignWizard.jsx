import { useState } from 'react'
import { useCampaignStore } from '../../store/campaignStore'
import { useUiStore } from '../../store/uiStore'
import { CAMPAIGN_STATUS } from '../../utils/constants'

const STEPS = [
  { id: 'basics',   label: 'Basics' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'budget',   label: 'Budget' },
  { id: 'review',   label: 'Review' },
]

export default function CampaignWizard({ brands = [], onClose }) {
  const { create } = useCampaignStore()
  const showToast = useUiStore((s) => s.showToast)
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    name: '',
    brand_id: brands[0]?.id || '',
    description: '',
    status: 'draft',
    start_date: '',
    end_date: '',
    budget: '',
  })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  const upd = (patch) => setForm((f) => ({ ...f, ...patch }))

  const canNext = (() => {
    if (step === 0) return form.name.trim() && form.brand_id
    if (step === 1) return true
    if (step === 2) return true
    return true
  })()

  const submit = async () => {
    setBusy(true)
    setError(null)
    const payload = {
      ...form,
      budget: form.budget === '' ? null : Number(form.budget),
      start_date: form.start_date || null,
      end_date:   form.end_date   || null,
    }
    const res = await create(payload)
    setBusy(false)
    if (res.error) {
      setError(res.error.message || String(res.error))
      return
    }
    showToast('Campaign created', 'success')
    onClose?.()
  }

  return (
    <div className="wiz-overlay" onClick={(e) => e.target === e.currentTarget && onClose?.()}>
      <div className="wiz-container">
        <div className="wiz-head">
          {step > 0 && (
            <button className="tbtn" onClick={() => setStep((s) => s - 1)}>←</button>
          )}
          <div>
            <div className="wiz-title">New campaign</div>
            <div className="wiz-subtitle">Step {step + 1} of {STEPS.length} · {STEPS[step].label}</div>
          </div>
          <button className="tbtn" onClick={onClose} style={{ marginLeft: 'auto' }}>✕</button>
        </div>

        <div className="wiz-steps">
          {STEPS.map((s, i) => (
            <div key={s.id} className="wiz-step" style={{ flex: i < STEPS.length - 1 ? 1 : 'initial' }}>
              <div className={'wiz-step-num ' + (i < step ? 'done' : i === step ? 'active' : 'pending')}>
                {i < step ? '✓' : i + 1}
              </div>
              <div className={'wiz-step-lbl ' + (i === step ? 'active' : i < step ? 'done' : 'pending')}>{s.label}</div>
              {i < STEPS.length - 1 && <div className={'wiz-connector' + (i < step ? ' done' : '')} />}
            </div>
          ))}
        </div>

        <div className="wiz-body">
          {step === 0 && (
            <>
              <div className="form-row full">
                <div className="fg2">
                  <label className="flbl">Name *</label>
                  <input className="finp" value={form.name} onChange={(e) => upd({ name: e.target.value })} placeholder="e.g. Q3 Brand Awareness Push" autoFocus />
                </div>
              </div>
              <div className="form-row">
                <div className="fg2">
                  <label className="flbl">Brand *</label>
                  <select className="fsel" value={form.brand_id} onChange={(e) => upd({ brand_id: e.target.value })}>
                    {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                </div>
                <div className="fg2">
                  <label className="flbl">Initial status</label>
                  <select className="fsel" value={form.status} onChange={(e) => upd({ status: e.target.value })}>
                    {Object.entries(CAMPAIGN_STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row full">
                <div className="fg2">
                  <label className="flbl">Description</label>
                  <textarea className="ftxt" value={form.description} onChange={(e) => upd({ description: e.target.value })} placeholder="Goal, audience, key channels…" />
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <div className="form-row">
              <div className="fg2"><label className="flbl">Start date</label><input className="finp" type="date" value={form.start_date} onChange={(e) => upd({ start_date: e.target.value })} /></div>
              <div className="fg2"><label className="flbl">End date</label><input className="finp" type="date" value={form.end_date} onChange={(e) => upd({ end_date: e.target.value })} /></div>
            </div>
          )}

          {step === 2 && (
            <div className="form-row">
              <div className="fg2"><label className="flbl">Budget (USD)</label><input className="finp" type="number" min="0" value={form.budget} onChange={(e) => upd({ budget: e.target.value })} placeholder="0" /></div>
            </div>
          )}

          {step === 3 && (
            <div>
              <ReviewRow label="Name" value={form.name} />
              <ReviewRow label="Brand" value={brands.find((b) => b.id === form.brand_id)?.name || '—'} />
              <ReviewRow label="Status" value={CAMPAIGN_STATUS[form.status]?.label || form.status} />
              <ReviewRow label="Schedule" value={[form.start_date || '—', '→', form.end_date || '—'].join(' ')} />
              <ReviewRow label="Budget" value={form.budget ? `$${Number(form.budget).toLocaleString()}` : '—'} />
              <ReviewRow label="Description" value={form.description || '—'} />
              {error && <div className="lerr" style={{ display: 'block', marginTop: 12 }}>{error}</div>}
            </div>
          )}
        </div>

        <div className="wiz-footer">
          <button className="mbtn c" onClick={onClose}>Cancel</button>
          {step < STEPS.length - 1 ? (
            <button className="mbtn ok" disabled={!canNext} onClick={() => setStep((s) => s + 1)}>Next →</button>
          ) : (
            <button className="mbtn ok" disabled={busy} onClick={submit}>{busy ? 'Creating…' : 'Create campaign'}</button>
          )}
        </div>
      </div>
    </div>
  )
}

function ReviewRow({ label, value }) {
  return (
    <div style={{ display: 'flex', gap: 12, padding: '9px 0', borderBottom: '0.5px solid var(--border)' }}>
      <div style={{ fontSize: 11, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em', minWidth: 120, fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 13, color: 'var(--text)', flex: 1, lineHeight: 1.5 }}>{value}</div>
    </div>
  )
}
