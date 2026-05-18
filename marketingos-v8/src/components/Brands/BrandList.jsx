import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useBrandStore } from '../../store/brandStore'
import { useUiStore } from '../../store/uiStore'
import { initials } from '../../utils/helpers'
import LoadingSpinner from '../Common/LoadingSpinner'
import Modal from '../Common/Modal'
import BrandForm from './BrandForm'

export default function BrandList() {
  const { brands, loading, load, create } = useBrandStore()
  const showToast = useUiStore((s) => s.showToast)
  const [query, setQuery] = useState('')
  const [showCreate, setShowCreate] = useState(false)

  useEffect(() => { load() }, [load])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return brands
    return brands.filter((b) => (b.name || '').toLowerCase().includes(q) || (b.slug || '').toLowerCase().includes(q))
  }, [brands, query])

  const handleCreate = async (payload) => {
    const res = await create(payload)
    if (!res.error) {
      showToast('Brand created', 'success')
      setShowCreate(false)
    }
    return res
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 8, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Brands</div>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>{brands.length} total</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            className="sinp"
            placeholder="🔍 Search brands"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="tbtn p" onClick={() => setShowCreate(true)}>+ Add brand</button>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">◈</div>
          <div className="empty-state-title">No brands yet</div>
          <div className="empty-state-sub">Add your first brand to start organizing campaigns, assets and tasks.</div>
        </div>
      ) : (
        <div className="bgrid">
          {filtered.map((b) => (
            <Link key={b.id} to={`/brands/${b.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="bcard">
                <div className="bch">
                  <div className="blogo" style={{ background: b.color || '#7c6af7' }}>{initials(b.name)}</div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div className="bcnm">{b.name}</div>
                    <div className="bcin">{b.description?.slice(0, 60) || 'No description'}</div>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>
                  Slug: <span style={{ fontFamily: 'var(--mono)' }}>{b.slug}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Add new brand" subtitle="Brand name, color and description." size="md">
        <BrandForm onSubmit={handleCreate} onCancel={() => setShowCreate(false)} submitLabel="Create brand" />
      </Modal>
    </div>
  )
}
