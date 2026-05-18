import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useUiStore } from '../../store/uiStore'

export default function SignupScreen() {
  const { user, signup, error, clearError } = useAuthStore()
  const showToast = useUiStore((s) => s.showToast)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)

  if (user) return <Navigate to="/" replace />

  const onSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    clearError()
    const res = await signup(email.trim(), password, fullName.trim())
    setBusy(false)
    if (!res.error) {
      showToast('Check your email to confirm your account.', 'success')
      setDone(true)
    }
  }

  return (
    <div className="login-screen">
      <div className="lbox">
        <div className="logo-wrap">
          <div className="logo-mk">M</div>
          <div className="logo-tx">Marketing<span>OS</span></div>
        </div>
        <div className="lh">Create your account</div>
        <div className="ls">Start managing brands, campaigns and tasks</div>

        {done ? (
          <div className="lerr" style={{ display: 'block', color: 'var(--green)' }}>
            Account created. Check your email to verify your address, then sign in.
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <div className="fg">
              <label className="fl">Full name</label>
              <input className="fi" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div className="fg">
              <label className="fl">Email</label>
              <input className="fi" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="fg">
              <label className="fl">Password</label>
              <input className="fi" type="password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button className="lbtn" type="submit" disabled={busy}>
              {busy ? 'Creating…' : 'Create account →'}
            </button>
            {error && <div className="lerr" style={{ display: 'block' }}>{error}</div>}
          </form>
        )}
        <div className="alt-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  )
}
