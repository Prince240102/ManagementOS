import { useEffect, useRef, useState } from 'react'
import { assetsService } from '../../services/assets'
import { useUiStore } from '../../store/uiStore'
import { fmtRelative } from '../../utils/helpers'
import LoadingSpinner from '../Common/LoadingSpinner'

const ICON_FOR = { image: '🖼', video: '🎬', document: '📄', other: '📁' }

export default function AssetsTab() {
  const showToast = useUiStore((s) => s.showToast)
  const fileInput = useRef(null)
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  const load = async () => {
    setLoading(true)
    const { data } = await assetsService.list()
    setAssets(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const onUpload = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setUploading(true)
    const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
    const { data: up, error: upErr } = await assetsService.upload(file, path)
    if (upErr) {
      setUploading(false)
      showToast('Upload failed: ' + upErr.message, 'error')
      return
    }
    const guessType = file.type.startsWith('image/') ? 'image'
      : file.type.startsWith('video/') ? 'video'
      : file.type.includes('pdf') || file.type.includes('document') ? 'document'
      : 'other'
    const { data, error } = await assetsService.create({
      name: file.name,
      type: guessType,
      file_path: up.path || path,
      file_size: file.size,
      mime_type: file.type,
    })
    setUploading(false)
    if (error) {
      showToast('Saved file but DB write failed', 'error')
    } else {
      setAssets((arr) => [data, ...arr])
      showToast('Uploaded', 'success')
    }
  }

  const remove = async (id) => {
    setAssets((arr) => arr.filter((a) => a.id !== id))
    const { error } = await assetsService.remove(id)
    if (error) {
      showToast('Delete failed — refreshing', 'error')
      load()
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div style={{ padding: 16 }}>
      <div className="upzone" onClick={() => fileInput.current?.click()}>
        <div style={{ fontSize: 28, marginBottom: 6, opacity: 0.5 }}>📁</div>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 3 }}>
          {uploading ? 'Uploading…' : 'Click to upload an asset'}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text3)' }}>Images · video · PDFs · docs</div>
        <input ref={fileInput} type="file" style={{ display: 'none' }} onChange={onUpload} />
      </div>

      {assets.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📁</div>
          <div className="empty-state-title">No assets yet</div>
          <div className="empty-state-sub">Upload brand assets so your team can find them later.</div>
        </div>
      ) : (
        <div className="agrid">
          {assets.map((a) => (
            <div key={a.id} className="aitem">
              <div className="aiico">{ICON_FOR[a.type] || ICON_FOR.other}</div>
              <div className="ainm">{a.name}</div>
              <div className="aimt">{a.type} · {fmtRelative(a.created_at)}</div>
              <button className="tbtn d" style={{ marginTop: 8, fontSize: 10, padding: '3px 8px' }} onClick={() => remove(a.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
