import { readFile } from 'node:fs/promises'
import path from 'node:path'
import LegacyMount from './ui/LegacyMount'

function legacyRoot() {
  return process.env.LEGACY_ROOT || path.join(process.cwd(), 'legacy')
}

export default async function Home() {
  const root = legacyRoot()
  const [bodyHtml, appJs] = await Promise.all([
    readFile(path.join(root, 'reference.body.html'), 'utf8'),
    readFile(path.join(root, 'reference.app.js'), 'utf8'),
  ])

  return <LegacyMount bodyHtml={bodyHtml} appJs={appJs} />
}
