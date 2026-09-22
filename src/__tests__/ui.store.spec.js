import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { useUiStore } from '../stores/ui'

describe('ui store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('defaults to dark', () => {
    const ui = useUiStore()

    expect(ui.theme).toBe('dark')
    expect(ui.isDark).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('stays dark even when the system asks for a light scheme', () => {
    // Enforced dark: the OS preference must not override the default.
    vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
      matches: query.includes('prefers-color-scheme: light'),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }))

    expect(useUiStore().theme).toBe('dark')
  })

  it('still honours an explicit light choice from a previous visit', () => {
    localStorage.setItem('portfolio:theme', 'light')

    expect(useUiStore().theme).toBe('light')
  })

  it('toggles between light and dark', () => {
    const ui = useUiStore()
    const initial = ui.theme

    ui.toggleTheme()
    expect(ui.theme).not.toBe(initial)

    ui.toggleTheme()
    expect(ui.theme).toBe(initial)
  })

  it('applies the theme class to the document and persists it', () => {
    const ui = useUiStore()

    ui.setTheme('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('portfolio:theme')).toBe('dark')

    ui.setTheme('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem('portfolio:theme')).toBe('light')
  })

  it('ignores unknown theme values', () => {
    const ui = useUiStore()
    ui.setTheme('dark')

    ui.setTheme('neon')
    expect(ui.theme).toBe('dark')
  })

  it('opens, closes and toggles the mobile menu', () => {
    const ui = useUiStore()
    expect(ui.menuOpen).toBe(false)

    ui.openMenu()
    expect(ui.menuOpen).toBe(true)

    ui.closeMenu()
    expect(ui.menuOpen).toBe(false)

    ui.toggleMenu()
    expect(ui.menuOpen).toBe(true)
  })
})
