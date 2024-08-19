import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(''),
  routes: [
    {
      path: '',
      name: 'basic',
      component: () => import('../layout/Layout.vue'),
      children: []
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../view/login.vue')
    }
  ]
})

export default router
