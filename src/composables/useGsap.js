import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isBrowser } from './useReducedMotion'

let registered = false

/**
 * ScrollTrigger reaches for `matchMedia` at registration time, so it is only
 * registered inside a real browser. Returns whether the plugin is usable.
 */
export function registerScrollTrigger() {
  if (registered) return true
  if (!isBrowser || typeof window.matchMedia !== 'function') return false

  gsap.registerPlugin(ScrollTrigger)
  registered = true
  return true
}

/** Recalculates trigger positions after layout changes. No-op when unregistered. */
export function refreshScrollTrigger() {
  if (registered) ScrollTrigger.refresh()
}

export { gsap, ScrollTrigger }
