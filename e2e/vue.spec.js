import { test, expect } from '@playwright/test'

import { projects } from '../src/data/projects.js'

test.describe('portfolio', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('shows the hero and the page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Michael Kiarie/)
    await expect(page.locator('h1')).toContainText('Michael')
    await expect(page.locator('#home')).toBeVisible()
  })

  test('renders every section', async ({ page }) => {
    for (const id of ['#about', '#skills', '#experience', '#projects', '#apps', '#contact']) {
      await expect(page.locator(id)).toBeAttached()
    }
  })

  test('navigates to a section from the header', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page
      .getByRole('navigation', { name: 'Primary' })
      .getByRole('link', { name: 'Projects' })
      .click()

    await expect(page.locator('#projects')).toBeInViewport({ timeout: 10000 })
  })

  test('filters the project grid', async ({ page }) => {
    const cards = page.locator('#projects article')
    await expect(cards).toHaveCount(projects.length)

    const category = 'Payments'
    const expected = projects.filter((project) => project.category === category)

    await page.getByRole('tab', { name: category }).click()

    // Auto-retries until the leave transition has removed the old cards.
    await expect(cards).toHaveCount(expected.length)
    await expect(cards.first()).toContainText(expected[0].title)
  })

  test('toggles the colour theme', async ({ page }) => {
    const html = page.locator('html')
    const bodyBackground = () =>
      page.evaluate(() => getComputedStyle(document.body).backgroundColor)

    const wasDark = await html.evaluate((el) => el.classList.contains('dark'))
    const before = await bodyBackground()

    await page.getByRole('button', { name: /Switch to (light|dark) theme/ }).click()

    await expect.poll(() => html.evaluate((el) => el.classList.contains('dark'))).toBe(!wasDark)
    // The palette is driven by CSS variables, so the paint must change too.
    await expect.poll(bodyBackground).not.toBe(before)
  })

  test('validates the contact form before sending', async ({ page }) => {
    await page.locator('#contact').scrollIntoViewIfNeeded()
    await page.getByRole('button', { name: 'Send message' }).click()

    await expect(page.getByText('Please tell me your name.')).toBeVisible()
    await expect(page.getByText('A valid email lets me reply.')).toBeVisible()
  })

  test('loads without console errors', async ({ page }) => {
    // Third-party font CDN hiccups are not app failures — ignore them.
    const isThirdParty = (text) => /fonts\.(googleapis|gstatic)\.com/.test(text)

    const errors = []
    page.on('console', (message) => {
      if (message.type() === 'error' && !isThirdParty(message.text())) errors.push(message.text())
    })
    page.on('pageerror', (error) => errors.push(error.message))

    await page.reload()
    await page.locator('#contact').scrollIntoViewIfNeeded()
    await expect(page.locator('#contact')).toBeVisible()

    expect(errors).toEqual([])
  })

  test('shows the app screenshots in device frames', async ({ page }) => {
    await page.locator('#apps').scrollIntoViewIfNeeded()

    const shots = page.locator('#apps figure img')
    await expect(shots.first()).toBeVisible()

    // The screenshot must actually decode, not just be present in the DOM.
    // Images are lazy-loaded, so poll until the browser has finished with it.
    await expect
      .poll(() => shots.first().evaluate((img) => img.complete && img.naturalWidth > 0))
      .toBe(true)
  })

  test('defaults to dark even when the OS prefers light', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await page.reload()

    await expect(page.locator('html')).toHaveClass(/dark/)
  })

  test('lists the small frontend builds', async ({ page }) => {
    await page.locator('#apps').scrollIntoViewIfNeeded()

    const heading = page.getByRole('heading', { name: 'Small builds' })
    await expect(heading).toBeVisible()

    for (const name of ['Advice Generator', 'Calculator', 'Age Calculator']) {
      await expect(page.getByRole('heading', { name, exact: true })).toBeVisible()
    }
  })

  test('links out to the Canaaneast Group site', async ({ page }) => {
    await page.locator('#apps').scrollIntoViewIfNeeded()

    await expect(page.getByRole('heading', { name: 'Canaaneast Group' })).toBeVisible()
    await expect(page.locator('#apps a[href="https://canaangroupco.com/"]')).toHaveCount(1)
  })

  test('shows a 404 page for unknown routes', async ({ page }) => {
    await page.goto('/not-a-real-page')
    await expect(page.getByRole('heading', { name: /wrong turn/i })).toBeVisible()
  })
})
