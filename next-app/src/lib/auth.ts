import { cookies } from 'next/headers'
import { getPool } from '@/lib/db'
import { randomId, verifyPassword } from '@/lib/crypto'

export type Role =
  | 'super-admin'
  | 'sam'
  | 'specialist'
  | 'specialist-seo'
  | 'specialist-graphic'
  | 'specialist-video'
  | 'specialist-content'
  | 'owner'
  | 'client'
  | 'brand-owner'

export type SessionUser = {
  id: number
  email: string
  name: string
  role: Role
  title: string
  active: boolean
}

const COOKIE_NAME = 'mos_session'
const SESSION_DAYS = 14

export function isSuperAdmin(u: SessionUser) {
  return u.role === 'super-admin'
}

export function isSAM(u: SessionUser) {
  return u.role === 'sam' || u.role === 'super-admin'
}

export function isSpecialist(u: SessionUser) {
  return (
    u.role === 'specialist' ||
    u.role === 'specialist-seo' ||
    u.role === 'specialist-graphic' ||
    u.role === 'specialist-video' ||
    u.role === 'specialist-content'
  )
}

export function isBrandOwner(u: SessionUser) {
  return u.role === 'owner' || u.role === 'client' || u.role === 'brand-owner'
}

export function canManage(u: SessionUser) {
  return u.role === 'sam' || u.role === 'super-admin'
}

function nowPlusDays(days: number) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000)
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const sid = (await cookies()).get(COOKIE_NAME)?.value
  if (!sid) return null

  const pool = getPool()
  const result = await pool.query<{
    id: number
    email: string
    name: string
    role: Role
    title: string
    active: boolean
  }>(
    `select u.id, u.email, u.name, u.role, u.title, u.active
     from sessions s
     join users u on u.id = s.user_id
     where s.id = $1 and s.expires_at > now()`,
    [sid],
  )
  const row = result.rows[0]
  if (!row) return null
  if (!row.active) return null
  return row
}

export async function createSession(email: string, password: string) {
  const pool = getPool()
  const ures = await pool.query<{
    id: number
    email: string
    name: string
    role: Role
    title: string
    active: boolean
    password_hash: string
  }>(
    `select id, email, name, role, title, active, password_hash
     from users
     where lower(email) = lower($1)
     limit 1`,
    [email],
  )

  const user = ures.rows[0]
  if (!user) return { ok: false as const, error: 'invalid_credentials' as const }
  if (!user.active) return { ok: false as const, error: 'inactive' as const }
  if (!verifyPassword(user.password_hash, password)) {
    return { ok: false as const, error: 'invalid_credentials' as const }
  }

  const sid = randomId(32)
  const expires = nowPlusDays(SESSION_DAYS)
  await pool.query('insert into sessions (id, user_id, expires_at) values ($1, $2, $3)', [
    sid,
    user.id,
    expires,
  ])

  const jar = await cookies()
  jar.set({
    name: COOKIE_NAME,
    value: sid,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires,
  })

  return {
    ok: true as const,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      title: user.title,
      active: user.active,
    },
  }
}

export async function destroySession() {
  const jar = await cookies()
  const sid = jar.get(COOKIE_NAME)?.value
  if (sid) {
    const pool = getPool()
    await pool.query('delete from sessions where id = $1', [sid])
  }
  jar.set({
    name: COOKIE_NAME,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(0),
  })
}
