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
      path: '/components/accordion',
      name: 'components-accordion',
      component: () => import('../views/components/AccordionView.vue'),
    },
    {
      path: '/components/alert',
      name: 'components-alert',
      component: () => import('../views/components/AlertView.vue'),
    },
    {
      path: '/components/button',
      name: 'components-button',
      component: () => import('../views/components/ButtonView.vue'),
    },
    {
      path: '/components/calendar',
      name: 'components-calendar',
      component: () => import('../views/components/CalendarView.vue'),
    },
    {
      path: '/components/card',
      name: 'components-card',
      component: () => import('../views/components/CardView.vue'),
    },
    {
      path: '/components/modal',
      name: 'components-modal',
      component: () => import('../views/components/ModalView.vue'),
    },
    {
      path: '/components/checkbox',
      name: 'components-checkbox',
      component: () => import('../views/components/CheckboxView.vue'),
    },
  ],
})

export default router
