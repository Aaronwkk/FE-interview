import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(''),
  routes: [
    {
      path: '',
      name: 'basic',
      component: () => import('../layout/Layout.vue'),
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('../view/dashboard.vue')
        },
        {
          path: '/user/list',
          name: '/user/list',
          component: () => import('../view/user_list.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../view/login.vue')
    }
  ]
})

export default router
