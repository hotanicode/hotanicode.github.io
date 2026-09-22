import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { isBrowser, prefersLightScheme } from '@/composables/useReducedMotion'

const STORAGE_KEY = 'portfolio:theme'

function readStoredTheme() {
  if (!isBrowser) return 'dark'

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // Storage can be blocked (private mode, strict settings) — fall through.
  }

  return prefersLightScheme() ? 'light' : 'dark'
}

function applyTheme(theme) {
  if (!isBrowser) return
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.dataset.theme = theme
}

export const useUiStore = defineStore('ui', () => {
  const theme = ref(readStoredTheme())
  const menuOpen = ref(false)

  const isDark = computed(() => theme.value === 'dark')

  watch(
    theme,
    (value) => {
      applyTheme(value)
      try {
        window.localStorage?.setItem(STORAGE_KEY, value)
      } catch {
        // Ignore storage failures — the theme still applies for this session.
      }
    },
    // `sync` so the class flips in the same frame as the click.
    { immediate: true, flush: 'sync' },
  )

  function toggleTheme() {
    theme.value = isDark.value ? 'light' : 'dark'
  }

  function setTheme(value) {
    if (value === 'light' || value === 'dark') theme.value = value
  }

  function openMenu() {
    menuOpen.value = true
  }

  function closeMenu() {
    menuOpen.value = false
  }

  function toggleMenu() {
    menuOpen.value = !menuOpen.value
  }

  return { theme, isDark, menuOpen, toggleTheme, setTheme, openMenu, closeMenu, toggleMenu }
})

export default useUiStore
