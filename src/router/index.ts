import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import StartView from '@/views/StartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'start',
      component: StartView,
      props: (route) => ({ code: route.query.code, state: <string>route.query.state })
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/discover',
          name: 'discover',
          component: () => import('@/views/DiscoverView.vue')
        },
        {
          path: '/mixer',
          name: 'mixer',
          component: () => import('@/views/MixerView.vue')
        }
      ]
    }
  ]
})

router.beforeEach(async (to) => {
  const expires_at = localStorage.getItem('expires_at') || null
  const t = new Date()

  const isAuhenticated = localStorage.getItem('access_token')
  if (to.name !== 'start' && !isAuhenticated) return { name: 'start' }
  if (to.name === 'start' && isAuhenticated) return { name: 'home' }
})
export default router
