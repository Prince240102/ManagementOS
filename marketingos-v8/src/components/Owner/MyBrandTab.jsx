import { useEffect, useState } from 'react'
import { brandsService } from '../../services/brands'
import { useUiStore } from '../../store/uiStore'
import { initials } from '../../utils/helpers'
import LoadingSpinner from '../Common/LoadingSpinner'
import BrandForm from '../Brands/BrandForm'

export default function MyBrandTab() {
  const showToast = useUiStore((s) => s.showToast)
  const [brand, setBrand] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    brandsService.list().then(({ data }) => {
      setBrand(data?.[0] || null)
      setLoading(false)
    })
  }, [])

  const onSave = async (payload) => {
    if (!brand) return {}
    const { data, error } = await brandsService.update(brand.id, payload)
    if (!error && data) {
      setBrand(data)
      setEditing(false)
      showToast('Brand updated', 'success')
    }
    return { data, error }
  }

  if (loading) return <LoadingSpinner />

  if (!brand) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">◈</div>
        <div className="empty-state-title">No brand assigned</div>
        <div className="empty-state-sub">An admin will assign a brand to your workspace shortly.</div>
      </div>
    )
  }

  if (editing) {
    return (
      <div style={{ padding: 24 }}>
        <BrandForm initial={brand} onSubmit={onSave} onCancel={() => setEditing(false)} submitLabel="Save brand" />
      </div>
    )
  }

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
        <div className="blogo" style={{ width: 56, height: 56, background: brand.color || '#7c6af7', fontSize: 18 }}>
          {initials(brand.name)}
        </div>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>{brand.name}</div>
          <div style={{ fontSize: 12, color: 'var(--text3)' }}>Slug: <span style={{ fontFamily: 'var(--mono)' }}>{brand.slug}</span></div>
        </div>
        <button className="tbtn" style={{ marginLeft: 'auto' }} onClick={() => setEditing(true)}>Edit brand</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label="Brand color">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: brand.color, border: '0.5px solid var(--border2)' }} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: 13 }}>{brand.color}</span>
          </div>
        </Field>
        <Field label="Description">
          <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6 }}>{brand.description || '—'}</div>
        </Field>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{label}</div>
      {children}
    </div>
  )
}
