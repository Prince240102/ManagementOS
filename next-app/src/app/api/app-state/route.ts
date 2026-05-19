import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getPool } from '@/lib/db'

export const runtime = 'nodejs'

const PutBody = z.object({
  id: z.number().int(),
  data: z.unknown(),
})

export async function GET(req: Request) {
  const url = new URL(req.url)
  const idRaw = url.searchParams.get('id')
  const id = idRaw ? Number(idRaw) : 1
  if (!Number.isInteger(id)) {
    return NextResponse.json({ data: null }, { status: 400 })
  }

  const pool = getPool()
  const result = await pool.query<{ data: unknown }>('select data from app_state where id = $1', [id])
  const row = result.rows[0]
  return NextResponse.json({ data: row?.data ?? null })
}

export async function PUT(req: Request) {
  const parsed = PutBody.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 })
  }

  const { id, data } = parsed.data
  const pool = getPool()
  await pool.query(
    'insert into app_state (id, data) values ($1, $2) on conflict (id) do update set data = excluded.data, updated_at = now()'
    ,
    [id, data],
  )

  return NextResponse.json({ ok: true })
}
