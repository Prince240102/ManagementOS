import { setTimeout as delay } from 'node:timers/promises'

async function main() {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
  const stateUrl = new URL('/api/app-state', baseUrl)

  // Give the server a moment if invoked right after starting.
  await delay(200)

  const put = await fetch(stateUrl, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ id: 1, data: { smoke: Date.now() } }),
  })
  if (!put.ok) throw new Error(`PUT ${stateUrl} failed: ${put.status}`)

  const get = await fetch(stateUrl)
  if (!get.ok) throw new Error(`GET ${stateUrl} failed: ${get.status}`)
  const json = (await get.json()) as { data: unknown }
  if (!json || typeof json !== 'object' || !('data' in json)) {
    throw new Error('Unexpected response shape')
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
