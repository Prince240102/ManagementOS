import { useEffect } from 'react'
import clsx from 'clsx'

export default function Modal({ open, onClose, title, subtitle, size = 'sm', children, actions }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="moverlay" onClick={(e) => e.target === e.currentTarget && onClose?.()}>
      <div className={clsx('modal', size === 'md' && 'md', size === 'lg' && 'lg')}>
        <div className="modal-p">
          {title && <div className="mtit">{title}</div>}
          {subtitle && <div className="msub">{subtitle}</div>}
          {children}
          {actions && <div className="macts">{actions}</div>}
        </div>
      </div>
    </div>
  )
}
