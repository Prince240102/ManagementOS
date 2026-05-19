import { NextResponse } from 'next/server'
import path from 'node:path'
import { writeFile, mkdir, stat } from 'node:fs/promises'
import { headObject, putObject } from '@/lib/objectStore'

export const runtime = 'nodejs'

function getUploadsRoot() {
  return process.env.UPLOADS_DIR || path.join(process.cwd(), 'uploads')
}

function safeRelativePath(p: string) {
  const rel = p.replace(/^\/+/, '')
  const normal = rel.split('..').join('')
  return normal
}

export async function POST(req: Request) {
  const form = await req.formData()
  const file = form.get('file')
  const reqPath = form.get('path')
  const upsert = form.get('upsert')

  if (!(file instanceof File) || typeof reqPath !== 'string') {
    return NextResponse.json({ error: 'file and path required' }, { status: 400 })
  }

  const destRel = safeRelativePath(reqPath)

  // Prefer object storage when configured; fall back to local disk.
  if (upsert !== 'true') {
    try {
      const s3Head = await headObject(destRel)
      if (s3Head.ok) {
        return NextResponse.json({ error: 'exists' }, { status: 409 })
      }
    } catch {
      // ignore
    }

    try {
      const destAbs = path.join(getUploadsRoot(), 'prompt-attachments', destRel)
      await stat(destAbs)
      return NextResponse.json({ error: 'exists' }, { status: 409 })
    } catch {
      // ignore
    }
  }

  const bytes = new Uint8Array(await file.arrayBuffer())
  const s3Put = await putObject(destRel, bytes, file.type || undefined)
  if (!s3Put.ok) {
    const destAbs = path.join(getUploadsRoot(), 'prompt-attachments', destRel)
    await mkdir(path.dirname(destAbs), { recursive: true })
    await writeFile(destAbs, bytes)
  }

  return NextResponse.json({ path: destRel })
}
