import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Michael Kiarie — Software Developer' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      // Lazy loaded: the 404 page is rarely needed.
      component: () => import('@/views/NotFoundView.vue'),
      meta: { title: 'Page not found — Michael Kiarie' },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 76, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  if (typeof document !== 'undefined' && to.meta?.title) {
    document.title = to.meta.title
  }
})

export default router
