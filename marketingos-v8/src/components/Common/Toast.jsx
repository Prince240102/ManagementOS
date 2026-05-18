import { useUiStore } from '../../store/uiStore'

export default function Toast() {
  const toast = useUiStore((s) => s.toast)
  if (!toast) return null
  const colorMap = {
    success: 'var(--green)',
    error: 'var(--red)',
    warning: 'var(--amber)',
    info: 'var(--accent2)',
  }
  return (
    <div className="toastEl" style={{ borderColor: colorMap[toast.kind] || 'var(--border2)' }}>
      <span>{toast.msg}</span>
    </div>
  )
}
