export default function LoadingSpinner({ fullscreen = false }) {
  const cls = fullscreen
    ? 'flex items-center justify-center h-screen bg-[var(--bg)]'
    : 'spinner-wrap'
  return (
    <div className={cls}>
      <div className="spinner" />
    </div>
  )
}
