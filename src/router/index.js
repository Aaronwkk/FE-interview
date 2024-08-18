import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(''),
  routes: [
    {
      path: '',
      name: 'basic',
      component: () => import('../layout/layout.vue'),
      children: []
    }
  ]
})

export default router
