import { NextResponse } from 'next/server'
import { headObject, putObject } from '@/lib/objectStore'

export const runtime = 'nodejs'

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

  if (upsert !== 'true') {
    const s3Head = await headObject(destRel)
    if (s3Head.ok) {
      return NextResponse.json({ error: 'exists' }, { status: 409 })
    }
  }

  const bytes = new Uint8Array(await file.arrayBuffer())
  const s3Put = await putObject(destRel, bytes, file.type || undefined)
  if (!s3Put.ok) return NextResponse.json({ error: 's3 not configured' }, { status: 500 })

  return NextResponse.json({ path: destRel })
}
