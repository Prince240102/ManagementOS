import { NextResponse } from 'next/server'
import { S3Client, CreateBucketCommand, HeadBucketCommand } from '@aws-sdk/client-s3'

export const runtime = 'nodejs'

function getConfig() {
  const endpoint = (process.env.S3_ENDPOINT || '').trim()
  const region = (process.env.S3_REGION || 'us-east-1').trim()
  const accessKeyId = (process.env.S3_ACCESS_KEY_ID || '').trim()
  const secretAccessKey = (process.env.S3_SECRET_ACCESS_KEY || '').trim()
  const bucket = (process.env.S3_BUCKET || '').trim()
  if (!endpoint || !accessKeyId || !secretAccessKey || !bucket) return null
  return { endpoint, region, accessKeyId, secretAccessKey, bucket }
}

export async function POST() {
  const cfg = getConfig()
  if (!cfg) {
    return NextResponse.json({ error: 's3 not configured' }, { status: 400 })
  }

  const client = new S3Client({
    region: cfg.region,
    endpoint: cfg.endpoint,
    forcePathStyle: true,
    credentials: {
      accessKeyId: cfg.accessKeyId,
      secretAccessKey: cfg.secretAccessKey,
    },
  })

  try {
    await client.send(new HeadBucketCommand({ Bucket: cfg.bucket }))
    return NextResponse.json({ ok: true, created: false })
  } catch {
    await client.send(new CreateBucketCommand({ Bucket: cfg.bucket }))
    return NextResponse.json({ ok: true, created: true })
  }
}
