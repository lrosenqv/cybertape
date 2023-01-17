import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/views/AuthView.vue'
import HomeView from '@/views/HomeView.vue'
import StartView from '@/views/StartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'start',
      component: StartView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/discover',
      name: 'discover',
      component: () => import('@/views/DiscoverView.vue')
    },
    {
      path: '/mixer',
      name: 'mixer',
      component: () => import('@/views/MixerView.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      props: (route) => ({ code: route.query.code, state: <string>route.query.state })
    }
  ]
})

/* router.afterEach((to, from, failure) => {
  if (to.name === 'auth') {
    if (to.query.error) router.go(-1)
    else {
      isAuthenticated = true
    }
  }
}) */

/* router.beforeResolve((to, from) => {
  const isAuthenticated = localStorage.getItem('access_token')
  if (to.name !== 'start' && !isAuthenticated) {
    return { name: 'start' }
  }
}) */

export default router
