type SupabaseError = { message: string }
type SupabaseResult<T> = { data: T | null; error: SupabaseError | null }

type AppStateRow = { id: number; data: unknown }

function asError(e: unknown): SupabaseError {
  if (e && typeof e === 'object' && 'message' in e) {
    const msg = (e as { message?: unknown }).message
    if (typeof msg === 'string') return { message: msg }
  }
  return { message: 'Request failed' }
}

function encodePath(path: string) {
  // legacy uses paths with slashes; keep them stable in URLs
  return encodeURIComponent(path)
}

class AppStateQuery {
  private id: number | null = null

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  select(_cols: string) {
    return this
  }

  eq(col: string, value: number) {
    if (col === 'id') this.id = value
    return this
  }

  async single(): Promise<SupabaseResult<{ data: unknown }>> {
    try {
      const url = this.id == null ? '/api/app-state' : `/api/app-state?id=${this.id}`
      const res = await fetch(url, { method: 'GET' })
      if (!res.ok) return { data: null, error: { message: `HTTP ${res.status}` } }
      const json = (await res.json()) as { data: unknown }
      return { data: json, error: null }
    } catch (e) {
      return { data: null, error: asError(e) }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async upsert(row: AppStateRow, _opts?: { onConflict?: string }): Promise<SupabaseResult<null>> {
    try {
      const res = await fetch('/api/app-state', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(row),
      })
      if (!res.ok) return { data: null, error: { message: `HTTP ${res.status}` } }
      return { data: null, error: null }
    } catch (e) {
      return { data: null, error: asError(e) }
    }
  }
}

function getPublicUrl(path: string) {
  return { data: { publicUrl: `/files/prompt-attachments/${encodePath(path)}` } }
}

async function upload(path: string, file: File, opts?: { upsert?: boolean }) {
  try {
    const form = new FormData()
    form.set('path', path)
    form.set('upsert', String(!!opts?.upsert))
    form.set('file', file)
    const res = await fetch('/api/prompt-attachments/upload', { method: 'POST', body: form })
    if (!res.ok) return { data: null, error: { message: `HTTP ${res.status}` } }
    const json = (await res.json()) as { path: string }
    return { data: json, error: null }
  } catch (e) {
    return { data: null, error: asError(e) }
  }
}

async function remove(paths: string[]) {
  try {
    const res = await fetch('/api/prompt-attachments', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ paths }),
    })
    if (!res.ok) return { data: null, error: { message: `HTTP ${res.status}` } }
    return { data: null, error: null }
  } catch (e) {
    return { data: null, error: asError(e) }
  }
}

export function createSupabaseShim() {
  return {
    // Legacy passes URL/key; they are unused in the shim.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createClient: (_url?: string, _anonKey?: string) => {
      return {
        from: (table: string) => {
          if (table !== 'app_state') {
            throw new Error(`Unsupported table: ${table}`)
          }
          return new AppStateQuery()
        },
        storage: {
          from: (bucket: string) => {
            if (bucket !== 'prompt-attachments') {
              throw new Error(`Unsupported bucket: ${bucket}`)
            }
            return {
              upload,
              remove,
              getPublicUrl,
            }
          },
        },
      }
    },
  }
}
