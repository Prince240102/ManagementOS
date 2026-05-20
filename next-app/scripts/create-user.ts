import { Client } from 'pg'
import { hashPassword } from '../src/lib/crypto'

function requireEnv(name: string) {
  const v = process.env[name]
  if (!v) throw new Error(`${name} is not set`)
  return v
}

function readArg(flag: string) {
  const idx = process.argv.indexOf(flag)
  if (idx === -1) return null
  const v = process.argv[idx + 1]
  return v || null
}

async function main() {
  const email = readArg('--email')
  const password = readArg('--password')
  const name = readArg('--name')
  const role = readArg('--role') || 'super-admin'
  const title = readArg('--title') || ''

  if (!email || !password || !name) {
    throw new Error(
      'Usage: npm -C next-app run create-user -- --email you@x.com --password pass --name "Your Name" [--role super-admin] [--title ""]',
    )
  }

  const databaseUrl = requireEnv('DATABASE_URL')
  const client = new Client({ connectionString: databaseUrl })
  await client.connect()

  try {
    const passwordHash = hashPassword(password)
    const res = await client.query<{ id: number }>(
      `insert into users (email, password_hash, name, role, title, active)
       values ($1, $2, $3, $4, $5, true)
       on conflict (email) do update
         set password_hash = excluded.password_hash,
             name = excluded.name,
             role = excluded.role,
             title = excluded.title,
             active = true,
             updated_at = now()
       returning id`,
      [email, passwordHash, name, role, title],
    )

    const id = res.rows[0]?.id
    console.log(`user id=${id} email=${email} role=${role}`)
  } finally {
    await client.end()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
