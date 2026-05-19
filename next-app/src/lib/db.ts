import { Pool } from 'pg'

declare global {
  var __pgPool: Pool | undefined
}

function getDatabaseUrl() {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error('DATABASE_URL is not set')
  }
  return url
}

export function getPool() {
  if (!globalThis.__pgPool) {
    globalThis.__pgPool = new Pool({ connectionString: getDatabaseUrl() })
  }
  return globalThis.__pgPool
}
