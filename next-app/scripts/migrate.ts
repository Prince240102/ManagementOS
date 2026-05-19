import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { Client } from 'pg'
import { S3Client, CreateBucketCommand, HeadBucketCommand } from '@aws-sdk/client-s3'

async function connectWithRetry(url: string, retries = 10, delayMs = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      const c = new Client({ connectionString: url })
      await c.connect()
      return c
    } catch (e) {
      if (i === retries - 1) throw e
      console.log(`Database connection attempt ${i + 1} failed, retrying in ${delayMs}ms...`)
      await new Promise((r) => setTimeout(r, delayMs))
    }
  }
  throw new Error('unreachable')
}

async function main() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set')
  }

  const client = await connectWithRetry(databaseUrl)

  try {
    await client.query(
      'create table if not exists schema_migrations (id text primary key, applied_at timestamptz not null default now())',
    )

    const migrationsDir = path.join(process.cwd(), 'migrations')
    const entries = await readdir(migrationsDir)
    const migrations = entries.filter((f) => f.endsWith('.sql')).sort()

    for (const filename of migrations) {
      const id = filename
      const already = await client.query('select 1 from schema_migrations where id = $1', [id])
      if (already.rowCount) continue

      const sql = await readFile(path.join(migrationsDir, filename), 'utf8')
      await client.query('begin')
      try {
        await client.query(sql)
        await client.query('insert into schema_migrations (id) values ($1)', [id])
        await client.query('commit')
      } catch (e) {
        await client.query('rollback')
        throw e
      }
    }
  await bootstrapS3()
  } finally {
    await client.end()
  }
}

async function bootstrapS3() {
  const endpoint = (process.env.S3_ENDPOINT || '').trim()
  const accessKeyId = (process.env.S3_ACCESS_KEY_ID || '').trim()
  const secretAccessKey = (process.env.S3_SECRET_ACCESS_KEY || '').trim()
  const bucket = (process.env.S3_BUCKET || '').trim()
  if (!endpoint || !accessKeyId || !secretAccessKey || !bucket) {
    console.log('S3 not configured, skipping bucket bootstrap')
    return
  }

  const client = new S3Client({
    region: (process.env.S3_REGION || 'us-east-1').trim(),
    endpoint,
    forcePathStyle: true,
    credentials: { accessKeyId, secretAccessKey },
  })

  try {
    await client.send(new HeadBucketCommand({ Bucket: bucket }))
    console.log(`Bucket "${bucket}" already exists`)
  } catch {
    await client.send(new CreateBucketCommand({ Bucket: bucket }))
    console.log(`Created bucket "${bucket}"`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
