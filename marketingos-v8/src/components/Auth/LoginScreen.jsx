import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export default function LoginScreen() {
  const { user, signin, error, clearError } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)

  if (user) return <Navigate to="/" replace />

  const onSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    clearError()
    await signin(email.trim(), password)
    setBusy(false)
  }

  return (
    <div className="login-screen">
      <div className="lbox">
        <div className="logo-wrap">
          <div className="logo-mk">M</div>
          <div className="logo-tx">Marketing<span>OS</span></div>
        </div>
        <div className="lh">Welcome back</div>
        <div className="ls">Sign in to your workspace</div>
        <form onSubmit={onSubmit}>
          <div className="fg">
            <label className="fl">Email</label>
            <input
              className="fi"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="fg">
            <label className="fl">Password</label>
            <input
              className="fi"
              type="password"
              autoComplete="current-password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="lbtn" type="submit" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign in →'}
          </button>
          {error && <div className="lerr" style={{ display: 'block' }}>{error}</div>}
        </form>
        <div className="alt-link">
          New here? <Link to="/signup">Create an account</Link>
        </div>
      </div>
    </div>
  )
}
