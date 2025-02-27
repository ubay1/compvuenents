import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/playground',
      name: 'playground',
      component: () => import('../views/PlaygroundView.vue'),
    },
    {
      path: '/components/button',
      name: 'components-button',
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/components/ButtonView.vue'),
    },
  ],
})

export default router
