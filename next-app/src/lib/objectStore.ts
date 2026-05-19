import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'
import { Readable } from 'node:stream'

type ObjectStoreConfig = {
  endpoint: string
  region: string
  accessKeyId: string
  secretAccessKey: string
  bucket: string
  publicBaseUrl?: string
}

function readConfig(): ObjectStoreConfig | null {
  const endpoint = (process.env.S3_ENDPOINT || '').trim()
  const region = (process.env.S3_REGION || 'us-east-1').trim()
  const accessKeyId = (process.env.S3_ACCESS_KEY_ID || '').trim()
  const secretAccessKey = (process.env.S3_SECRET_ACCESS_KEY || '').trim()
  const bucket = (process.env.S3_BUCKET || '').trim()
  const publicBaseUrl = (process.env.S3_PUBLIC_BASE_URL || '').trim()

  if (!endpoint || !accessKeyId || !secretAccessKey || !bucket) return null
  return { endpoint, region, accessKeyId, secretAccessKey, bucket, publicBaseUrl: publicBaseUrl || undefined }
}

function getClient(cfg: ObjectStoreConfig) {
  return new S3Client({
    region: cfg.region,
    endpoint: cfg.endpoint,
    forcePathStyle: true,
    credentials: {
      accessKeyId: cfg.accessKeyId,
      secretAccessKey: cfg.secretAccessKey,
    },
  })
}

function toBuffer(body: unknown) {
  if (body instanceof Uint8Array) return Buffer.from(body)
  if (typeof body === 'string') return Buffer.from(body)
  if (body instanceof Readable) {
    return new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = []
      body.on('data', (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)))
      body.on('end', () => resolve(Buffer.concat(chunks)))
      body.on('error', reject)
    })
  }
  if (body && typeof body === 'object' && (body as any).transformToByteArray) {
    return (body as any).transformToByteArray().then((b: Uint8Array) => Buffer.from(b))
  }
  throw new Error('Unsupported body type')
}

export function getPublicUrl(key: string) {
  const cfg = readConfig()
  if (!cfg) return null
  if (cfg.publicBaseUrl) {
    const base = cfg.publicBaseUrl.replace(/\/+$/, '')
    return `${base}/${encodeURIComponent(key)}`
  }
  return null
}

export async function putObject(key: string, bytes: Uint8Array, contentType?: string) {
  const cfg = readConfig()
  if (!cfg) return { ok: false as const }

  const client = getClient(cfg)
  await client.send(
    new PutObjectCommand({
      Bucket: cfg.bucket,
      Key: key,
      Body: bytes,
      ContentType: contentType || 'application/octet-stream',
    }),
  )

  return { ok: true as const }
}

export async function deleteObject(key: string) {
  const cfg = readConfig()
  if (!cfg) return { ok: false as const }

  const client = getClient(cfg)
  await client.send(new DeleteObjectCommand({ Bucket: cfg.bucket, Key: key }))
  return { ok: true as const }
}

export async function headObject(key: string) {
  const cfg = readConfig()
  if (!cfg) return { ok: false as const }

  const client = getClient(cfg)
  await client.send(new HeadObjectCommand({ Bucket: cfg.bucket, Key: key }))
  return { ok: true as const }
}

export async function getObject(key: string) {
  const cfg = readConfig()
  if (!cfg) return { ok: false as const }

  const client = getClient(cfg)
  const res = await client.send(new GetObjectCommand({ Bucket: cfg.bucket, Key: key }))
  const bodyBytes = await toBuffer(res.Body)
  return {
    ok: true as const,
    bytes: bodyBytes,
    contentType: res.ContentType || 'application/octet-stream',
  }
}
