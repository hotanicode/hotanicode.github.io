import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { useUiStore } from '../stores/ui'

describe('ui store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    document.documentElement.classList.remove('dark')
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
