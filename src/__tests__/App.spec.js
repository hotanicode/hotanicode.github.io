import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import HomeView from '../views/HomeView.vue'
function createTestRouter() {
  return createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', name: 'home', component: HomeView },
      { path: '/:pathMatch(.*)*', name: 'not-found', component: { template: '<div />' } },
    ],
  })
}
function mountApp(router) {
  return mount(App, { global: { plugins: [createPinia(), router] } })
}
describe('App', () => {
  let router
  beforeEach(async () => {
    router = createTestRouter()
    router.push('/')
    await router.isReady()
  })
  it('renders the home page inside the app shell', () => {
    const wrapper = mountApp(router)
    expect(wrapper.find('#main').exists()).toBe(true)
    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.find('footer').exists()).toBe(true)
  })
  it('shows the hero headline and primary navigation', () => {
    const wrapper = mountApp(router)
    expect(wrapper.find('h1').text()).toContain('Michael')
    expect(wrapper.find('nav[aria-label="Primary"]').exists()).toBe(true)
  })
  it('renders every portfolio section', () => {
    const wrapper = mountApp(router)
    const sections = ['#home', '#about', '#skills', '#experience', '#projects', '#apps', '#contact']
    const missing = sections.filter((id) => !wrapper.find(id).exists())
    expect(missing).toEqual([])
  })
  it('exposes a skip link for keyboard users', () => {
    const wrapper = mountApp(router)
    expect(wrapper.find('a[href="#main"]').text()).toBe('Skip to content')
  })
})
