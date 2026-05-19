import { NextResponse } from 'next/server'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

export const runtime = 'nodejs'

function legacyRoot() {
  return process.env.LEGACY_ROOT || path.join(process.cwd(), 'legacy')
}

export async function GET() {
  const css = await readFile(path.join(legacyRoot(), 'reference.css'), 'utf8')
  return new NextResponse(css, {
    status: 200,
    headers: {
      'content-type': 'text/css; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
    },
  })
}
