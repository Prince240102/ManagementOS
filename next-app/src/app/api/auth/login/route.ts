import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createSession } from '@/lib/auth'

export const runtime = 'nodejs'

const Body = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
  next: z.string().optional(),
})

function safeNext(next: string | undefined) {
  if (!next) return '/'
  if (!next.startsWith('/')) return '/'
  return next
}

export async function POST(req: Request) {
  const form = await req.formData()
  const parsed = Body.safeParse({
    email: form.get('email'),
    password: form.get('password'),
    next: form.get('next'),
  })
  if (!parsed.success) {
    return NextResponse.redirect(new URL('/login', req.url), { status: 303 })
  }

  const res = await createSession(parsed.data.email, parsed.data.password)
  if (!res.ok) {
    return NextResponse.redirect(new URL('/login', req.url), { status: 303 })
  }

  return NextResponse.redirect(new URL(safeNext(parsed.data.next), req.url), { status: 303 })
}
