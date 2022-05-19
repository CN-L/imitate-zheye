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
      component: import('@/views/Login.vue')
    },
    {
      path: '/column/:id',
      name: 'ColumnDetail',
      component: import('@/components/ColumnDetail.vue')
    },
    {
      path: '/create',
      name: 'CreatePage',
      component: import('@/views/CreatePost.vue')
    }
  ],
  history: createWebHistory(),
})
export default router
