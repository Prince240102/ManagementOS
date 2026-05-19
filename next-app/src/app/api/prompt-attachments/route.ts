import { NextResponse } from 'next/server'
import path from 'node:path'
import { unlink } from 'node:fs/promises'
import { z } from 'zod'
import { deleteObject } from '@/lib/objectStore'

export const runtime = 'nodejs'

const DeleteBody = z.object({
  paths: z.array(z.string()).default([]),
})

function getUploadsRoot() {
  return process.env.UPLOADS_DIR || path.join(process.cwd(), 'uploads')
}

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

  const uploadsRoot = getUploadsRoot()
  await Promise.all(
    parsed.data.paths.map(async (p) => {
      const rel = safeRelativePath(p)
      const abs = path.join(uploadsRoot, 'prompt-attachments', rel)

      try {
        await deleteObject(rel)
      } catch {
        // ignore
      }
      try {
        await unlink(abs)
      } catch {
        // supabase remove is effectively best-effort
      }
    }),
  )

  return NextResponse.json({ ok: true })
}
