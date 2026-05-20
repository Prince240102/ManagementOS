import { NextResponse } from 'next/server'
import { getObject } from '@/lib/objectStore'

export const runtime = 'nodejs'

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ path: string }> },
) {
  const { path: encoded } = await ctx.params
  const rel = decodeURIComponent(encoded).replace(/^\/+/, '')
  const normal = rel.split('..').join('')

  const s3 = await getObject(normal)
  if (!s3.ok) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }

  const buf = Buffer.from(s3.bytes)
  const body = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
  return new NextResponse(body, {
    status: 200,
    headers: {
      'content-type': s3.contentType,
      'content-length': String(buf.byteLength),
      'cache-control': 'public, max-age=31536000, immutable',
    },
  })
}
