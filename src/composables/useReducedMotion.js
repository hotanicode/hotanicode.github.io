const isBrowser = typeof window !== 'undefined'

/**
 * True when the visitor asked the OS to reduce motion.
 * Also returns `false` in environments without `matchMedia` (SSR, jsdom).
 */
export function prefersReducedMotion() {
  if (!isBrowser || typeof window.matchMedia !== 'function') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** True when the visitor prefers a light colour scheme. */
export function prefersLightScheme() {
  if (!isBrowser || typeof window.matchMedia !== 'function') return false
  return window.matchMedia('(prefers-color-scheme: light)').matches
}

export { isBrowser }
