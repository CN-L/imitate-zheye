import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    }
  ],
  history: createWebHistory(),
})
export default router
