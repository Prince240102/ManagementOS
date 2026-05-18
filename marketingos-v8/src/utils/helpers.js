import { format, formatDistanceToNow, isAfter, parseISO } from 'date-fns'

export const initials = (name = '') => {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export const fmtDate = (d) => {
  if (!d) return ''
  try {
    return format(typeof d === 'string' ? parseISO(d) : d, 'd MMM yyyy')
  } catch {
    return String(d)
  }
}

export const fmtRelative = (d) => {
  if (!d) return ''
  try {
    return formatDistanceToNow(typeof d === 'string' ? parseISO(d) : d, { addSuffix: true })
  } catch {
    return ''
  }
}

export const isOverdue = (dueDate) => {
  if (!dueDate) return false
  try {
    return isAfter(new Date(), parseISO(dueDate))
  } catch {
    return false
  }
}

export const colorFromString = (s = '') => {
  const palette = ['#7c6af7', '#4eca8b', '#f5a623', '#5baef7', '#f55c5c', '#a78bfa', '#2dd4bf', '#f472b6']
  let hash = 0
  for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) | 0
  return palette[Math.abs(hash) % palette.length]
}

export const slugify = (s = '') =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export const fmtMoney = (n) =>
  n == null
    ? '—'
    : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
