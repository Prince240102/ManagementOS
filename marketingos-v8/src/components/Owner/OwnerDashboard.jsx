import { useState } from 'react'
import ApprovalsTab from './ApprovalsTab'
import AssetsTab from './AssetsTab'
import MyBrandTab from './MyBrandTab'

const TABS = [
  { id: 'approvals', label: 'Approvals', icon: '✓' },
  { id: 'assets',    label: 'Assets',    icon: '📁' },
  { id: 'brand',     label: 'My Brand',  icon: '🎨' },
]

export default function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState('approvals')

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>Owner dashboard</div>
        <div style={{ fontSize: 13, color: 'var(--text2)', marginTop: 2 }}>
          Approvals, assets and your brand workspace
        </div>
      </div>

      <div className="tabs" style={{ width: 'fit-content' }}>
        {TABS.map((t) => (
          <button
            key={t.id}
            className={'tab' + (activeTab === t.id ? ' active' : '')}
            onClick={() => setActiveTab(t.id)}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div className="card" style={{ overflow: 'visible' }}>
        {activeTab === 'approvals' && <ApprovalsTab />}
        {activeTab === 'assets'    && <AssetsTab />}
        {activeTab === 'brand'     && <MyBrandTab />}
      </div>
    </div>
  )
}
