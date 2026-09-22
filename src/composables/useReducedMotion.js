const isBrowser = typeof window !== 'undefined'

/** True when the visitor asked the OS to reduce motion. */
export function prefersReducedMotion() {
  if (!isBrowser || typeof window.matchMedia !== 'function') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export { isBrowser }
