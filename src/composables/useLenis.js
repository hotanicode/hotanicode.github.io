import { onBeforeUnmount, onMounted } from 'vue'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, registerScrollTrigger } from './useGsap'
import { isBrowser, prefersReducedMotion } from './useReducedMotion'

/** Shared instance so every component talks to the same scroller. */
let lenis = null
let subscribers = 0

function createLenis() {
  const instance = new Lenis({
    duration: 1.05,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.6,
  })

  // Let GSAP drive Lenis so ScrollTrigger and the scroller stay in sync.
  instance.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  return instance
}

function tick(time) {
  lenis?.raf(time * 1000)
}

function destroyLenis() {
  gsap.ticker.remove(tick)
  lenis?.destroy()
  lenis = null
}

/**
 * Scroll to an element, a selector or a pixel offset.
 * Falls back to the native API when Lenis is disabled (reduced motion / SSR).
 */
export function scrollTo(target, options = {}) {
  if (!isBrowser) return

  const { offset = -72, immediate = false } = options

  if (lenis) {
    lenis.scrollTo(target, { offset, immediate, duration: immediate ? 0 : 1.1 })
    return
  }

  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' })
    return
  }
  if (!el) return

  const top = el.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' })
}

export function stopScroll() {
  lenis?.stop()
}

export function startScroll() {
  lenis?.start()
}

/**
 * Mounts a page-level smooth scroller. Safe to call from several components —
 * the underlying instance is reference counted.
 */
export function useLenis() {
  onMounted(() => {
    if (!isBrowser || prefersReducedMotion()) return
    if (!registerScrollTrigger()) return

    subscribers += 1
    if (!lenis) lenis = createLenis()
  })

  onBeforeUnmount(() => {
    if (!lenis) return

    subscribers = Math.max(0, subscribers - 1)
    if (subscribers === 0) destroyLenis()
  })

  return { scrollTo, stopScroll, startScroll, getLenis: () => lenis }
}

export default useLenis
