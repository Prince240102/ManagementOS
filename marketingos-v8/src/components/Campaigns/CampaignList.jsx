import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCampaignStore } from '../../store/campaignStore'
import { useBrandStore } from '../../store/brandStore'
import { CAMPAIGN_STATUS } from '../../utils/constants'
import { fmtDate, fmtMoney } from '../../utils/helpers'
import LoadingSpinner from '../Common/LoadingSpinner'
import CampaignWizard from './CampaignWizard'

export default function CampaignList() {
  const { campaigns, loading, load } = useCampaignStore()
  const { brands, load: loadBrands } = useBrandStore()
  const [statusFilter, setStatusFilter] = useState('')
  const [brandFilter, setBrandFilter] = useState('')
  const [query, setQuery] = useState('')
  const [showWizard, setShowWizard] = useState(false)

  useEffect(() => { load(); loadBrands() }, [load, loadBrands])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return campaigns.filter((c) => {
      if (statusFilter && c.status !== statusFilter) return false
      if (brandFilter && c.brand_id !== brandFilter) return false
      if (q && !(c.name || '').toLowerCase().includes(q)) return false
      return true
    })
  }, [campaigns, statusFilter, brandFilter, query])

  const brandMap = useMemo(() => Object.fromEntries(brands.map((b) => [b.id, b])), [brands])

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Campaigns</div>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>{campaigns.length} total · across all brands</div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input className="sinp" placeholder="🔍 Search" value={query} onChange={(e) => setQuery(e.target.value)} />
          <select className="fsel" style={{ width: 140 }} value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
            <option value="">All brands</option>
            {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
          <select className="fsel" style={{ width: 130 }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All statuses</option>
            {Object.entries(CAMPAIGN_STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
          <button className="tbtn p" onClick={() => setShowWizard(true)}>+ New campaign</button>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">◇</div>
          <div className="empty-state-title">No campaigns</div>
          <div className="empty-state-sub">Start a new campaign for any brand with the wizard.</div>
        </div>
      ) : (
        <div className="card">
          {filtered.map((c) => {
            const status = CAMPAIGN_STATUS[c.status] || { label: c.status, cls: 'bgr' }
            const brand = brandMap[c.brand_id]
            return (
              <Link key={c.id} to={`/campaigns/${c.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ padding: '12px 16px', borderBottom: '0.5px solid var(--border)', display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div className="blogo" style={{ background: brand?.color || '#7c6af7', width: 30, height: 30, fontSize: 11 }}>
                    {brand?.name?.[0] || '?'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text3)' }}>
                      {brand?.name || '—'} · {c.start_date ? fmtDate(c.start_date) : 'no start'} → {c.end_date ? fmtDate(c.end_date) : 'no end'}
                    </div>
                  </div>
                  <span className={'badge ' + status.cls}>{status.label}</span>
                  <span style={{ fontSize: 12, color: 'var(--text2)', minWidth: 60, textAlign: 'right' }}>{fmtMoney(c.budget)}</span>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {showWizard && <CampaignWizard onClose={() => setShowWizard(false)} brands={brands} />}
    </div>
  )
}
