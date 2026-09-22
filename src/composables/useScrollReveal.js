import { nextTick, onBeforeUnmount, onMounted, unref } from 'vue'
import { gsap, ScrollTrigger, registerScrollTrigger, refreshScrollTrigger } from './useGsap'
import { isBrowser, prefersReducedMotion } from './useReducedMotion'

/**
 * Reveals every `[data-reveal]` descendant of `rootRef` as it scrolls into view.
 *
 * @param {import('vue').Ref<HTMLElement|null>} rootRef container to scan
 * @param {object} [options]
 * @param {string} [options.selector='[data-reveal]']
 * @param {number} [options.y=28] starting offset in px
 * @param {number} [options.stagger=0.09] delay between batched elements
 * @param {string} [options.start='top 85%'] ScrollTrigger start position
 */
export function useScrollReveal(rootRef, options = {}) {
  const { selector = '[data-reveal]', y = 28, stagger = 0.09, start = 'top 85%' } = options

  let ctx = null

  const build = () => {
    const root = unref(rootRef)
    if (!isBrowser || !root) return

    // Detached nodes (unit tests) or reduced motion: show everything at once.
    if (!root.isConnected || prefersReducedMotion()) {
      root.querySelectorAll(selector).forEach((el) => el.classList.remove('reveal'))
      return
    }

    // Without ScrollTrigger there is nothing to drive the reveal — show it all.
    if (!registerScrollTrigger()) {
      root.querySelectorAll(selector).forEach((el) => el.classList.remove('reveal'))
      return
    }

    ctx = gsap.context(() => {
      const targets = gsap.utils.toArray(selector)
      if (!targets.length) return

      gsap.set(targets, { opacity: 0, y })

      ScrollTrigger.batch(targets, {
        start,
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            stagger,
            overwrite: true,
            onComplete: () => batch.forEach((el) => el.classList.remove('reveal')),
          }),
      })
    }, root)
  }

  const refresh = () => refreshScrollTrigger()

  onMounted(async () => {
    await nextTick()
    build()
    // Images and fonts can shift layout after the first paint.
    if (isBrowser) window.addEventListener('load', refresh, { once: true })
  })

  onBeforeUnmount(() => {
    if (isBrowser) window.removeEventListener('load', refresh)
    ctx?.revert()
    ctx = null
  })

  return { refresh }
}

export default useScrollReveal
