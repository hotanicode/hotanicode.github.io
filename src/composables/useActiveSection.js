import { onBeforeUnmount, onMounted, ref } from 'vue'

const isBrowser = typeof window !== 'undefined'

/**
 * Tracks which section is currently in view so the nav can highlight it.
 *
 * @param {string[]} ids section element ids, in document order
 * @returns {{ activeId: import('vue').Ref<string> }}
 */
export function useActiveSection(ids = []) {
  const activeId = ref(ids[0] ?? '')
  let observer = null

  onMounted(() => {
    if (!isBrowser || !('IntersectionObserver' in window)) return

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el) => el instanceof HTMLElement)

    if (!sections.length) return

    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) activeId.value = visible.target.id
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.5, 1] },
    )

    sections.forEach((section) => observer.observe(section))
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })

  return { activeId }
}

export default useActiveSection
