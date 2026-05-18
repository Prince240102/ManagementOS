import { NavLink } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { initials } from '../../utils/helpers'
import { NAV_ITEMS } from '../../utils/constants'

export default function Sidebar() {
  const { user, signout } = useAuthStore()
  const name = user?.user_metadata?.full_name || user?.email || 'User'
  const role = user?.user_metadata?.role || 'Member'

  return (
    <aside className="sidebar">
      <div className="sb-hdr">
        <div className="sb-logo">M</div>
        <div className="sb-name">Marketing<span>OS</span></div>
      </div>

      <div className="sb-body">
        <Section title="Workspace">
          {NAV_ITEMS.workspace.map((n) => (
            <NavLink key={n.to} to={n.to} end className={({ isActive }) => 'navi' + (isActive ? ' active' : '')}>
              <span className="nav-ic">{n.icon}</span>
              {n.label}
            </NavLink>
          ))}
        </Section>

        <Section title="Work">
          {NAV_ITEMS.work.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => 'navi' + (isActive ? ' active' : '')}>
              <span className="nav-ic">{n.icon}</span>
              {n.label}
            </NavLink>
          ))}
        </Section>

        <Section title="Brand">
          {NAV_ITEMS.owner.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => 'navi' + (isActive ? ' active' : '')}>
              <span className="nav-ic">{n.icon}</span>
              {n.label}
            </NavLink>
          ))}
        </Section>
      </div>

      <div className="sb-foot">
        <div className="ucard">
          <div className="uav" style={{ background: 'var(--acbg)', color: 'var(--accent2)' }}>
            {initials(name)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="uname">{name}</div>
            <div className="urole">{role}</div>
          </div>
          <button className="logout-btn" onClick={signout} title="Sign out">⇥</button>
        </div>
      </div>
    </aside>
  )
}

function Section({ title, children }) {
  return (
    <div className="sb-sec">
      <div className="sb-lbl">{title}</div>
      {children}
    </div>
  )
}
