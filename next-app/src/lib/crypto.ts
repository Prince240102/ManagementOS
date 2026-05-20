import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

const SCRYPT_N = 16384
const SCRYPT_R = 8
const SCRYPT_P = 1
const KEYLEN = 64

type HashParts = {
  saltHex: string
  derivedHex: string
}

function parseHash(stored: string): HashParts | null {
  const parts = stored.split(':')
  if (parts.length !== 2) return null
  const [saltHex, derivedHex] = parts
  if (!saltHex || !derivedHex) return null
  return { saltHex, derivedHex }
}

export function hashPassword(password: string) {
  const salt = randomBytes(16)
  const derived = scryptSync(password, salt, KEYLEN, {
    N: SCRYPT_N,
    r: SCRYPT_R,
    p: SCRYPT_P,
  })
  return `${salt.toString('hex')}:${derived.toString('hex')}`
}

export function verifyPassword(stored: string, password: string) {
  const parsed = parseHash(stored)
  if (!parsed) return false

  const salt = Buffer.from(parsed.saltHex, 'hex')
  const expected = Buffer.from(parsed.derivedHex, 'hex')
  const actual = scryptSync(password, salt, expected.length, {
    N: SCRYPT_N,
    r: SCRYPT_R,
    p: SCRYPT_P,
  })
  return timingSafeEqual(expected, actual)
}

export function randomId(bytes = 32) {
  return randomBytes(bytes).toString('hex')
}
