import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import StartView from '@/views/StartView.vue'
import { refreshToken } from '@/services/authorization'

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
          path: '/browse',
          name: 'browse',
          component: () => import('@/views/BrowseView.vue')
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
  const isAuhenticated = sessionStorage.getItem('access_token')
  if (isAuhenticated) {
    const expires_at = Number(sessionStorage.getItem('expires_at'))
    const t = new Date().getTime()
    if (expires_at - t <= 1) refreshToken()
    if (to.name === 'start') return { name: 'home' }
  } else if (!isAuhenticated && to.name !== 'start') return { name: 'start' }
})
export default router
