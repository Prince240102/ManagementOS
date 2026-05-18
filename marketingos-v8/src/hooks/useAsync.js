import { useCallback, useEffect, useRef, useState } from 'react'

export function useAsync(asyncFn, deps = [], { immediate = true } = {}) {
  const [status, setStatus] = useState(immediate ? 'pending' : 'idle')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const mounted = useRef(true)

  useEffect(() => () => { mounted.current = false }, [])

  const run = useCallback(
    async (...args) => {
      setStatus('pending')
      setError(null)
      try {
        const result = await asyncFn(...args)
        if (mounted.current) {
          setData(result)
          setStatus('success')
        }
        return result
      } catch (err) {
        if (mounted.current) {
          setError(err)
          setStatus('error')
        }
        throw err
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps,
  )

  useEffect(() => {
    if (immediate) run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { status, data, error, run, loading: status === 'pending' }
}
