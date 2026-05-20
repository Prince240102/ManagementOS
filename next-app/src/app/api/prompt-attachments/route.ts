import { NextResponse } from 'next/server'
import { z } from 'zod'
import { deleteObject } from '@/lib/objectStore'

export const runtime = 'nodejs'

const DeleteBody = z.object({
  paths: z.array(z.string()).default([]),
})

function safeRelativePath(p: string) {
  const rel = p.replace(/^\/+/, '')
  const normal = rel.split('..').join('')
  return normal
}

export async function DELETE(req: Request) {
  const parsed = DeleteBody.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 })
  }
  await Promise.all(
    parsed.data.paths.map(async (p) => {
      const rel = safeRelativePath(p)

      const res = await deleteObject(rel)
      if (!res.ok) throw new Error('s3 not configured')
    }),
  )

  return NextResponse.json({ ok: true })
}
