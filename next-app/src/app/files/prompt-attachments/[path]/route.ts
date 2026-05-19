import { NextResponse } from 'next/server'
import path from 'node:path'
import { readFile, stat } from 'node:fs/promises'
import { getObject } from '@/lib/objectStore'

export const runtime = 'nodejs'

function getUploadsRoot() {
  return process.env.UPLOADS_DIR || path.join(process.cwd(), 'uploads')
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ path: string }> },
) {
  const { path: encoded } = await ctx.params
  const rel = decodeURIComponent(encoded).replace(/^\/+/, '')
  const normal = rel.split('..').join('')
  const abs = path.join(getUploadsRoot(), 'prompt-attachments', normal)

  try {
    const s3 = await getObject(normal)
    if (s3.ok) {
      return new NextResponse(s3.bytes, {
        status: 200,
        headers: {
          'content-type': s3.contentType,
          'content-length': String(s3.bytes.byteLength),
          'cache-control': 'public, max-age=31536000, immutable',
        },
      })
    }
  } catch {
    // fall back to disk
  }

  try {
    const fileStat = await stat(abs)
    const bytes = await readFile(abs)
    return new NextResponse(bytes, {
      status: 200,
      headers: {
        'content-type': 'application/octet-stream',
        'content-length': String(fileStat.size),
        'cache-control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }
}
