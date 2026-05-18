import { useLocation } from 'react-router-dom'
import { useUiStore } from '../../store/uiStore'

const titles = {
  '/':          'Dashboard',
  '/brands':    'Brands',
  '/tasks':     'Tasks',
  '/campaigns': 'Campaigns',
  '/assets':    'Assets',
  '/owner':     'Owner Dashboard',
}

export default function Header() {
  const { pathname } = useLocation()
  const theme = useUiStore((s) => s.theme)
  const toggleTheme = useUiStore((s) => s.toggleTheme)

  const title = titles[pathname] || titles[Object.keys(titles).find((k) => pathname.startsWith(k) && k !== '/')] || 'MarketingOS'

  return (
    <header className="topbar">
      <div className="ptitle">{title}</div>
      <div style={{ display: 'flex', gap: 6 }}>
        <button className="tbtn" onClick={toggleTheme} title="Toggle theme" style={{ fontSize: 15 }}>
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  )
}
