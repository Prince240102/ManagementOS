export const isEmail = (s = '') => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
export const required = (s) => s != null && String(s).trim().length > 0
export const minLen = (s, n) => String(s ?? '').length >= n
