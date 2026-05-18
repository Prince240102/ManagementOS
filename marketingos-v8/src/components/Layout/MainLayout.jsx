import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import Toast from '../Common/Toast'
import { useUiStore } from '../../store/uiStore'

export default function MainLayout() {
  const applyStoredTheme = useUiStore((s) => s.applyStoredTheme)
  useEffect(() => { applyStoredTheme() }, [applyStoredTheme])

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main">
        <Header />
        <main className="content">
          <Outlet />
        </main>
      </div>
      <Toast />
    </div>
  )
}
