import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
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
router.beforeEach((to, from, next) => {
  if(to.name !== 'Login' && !store.state.user.isLogin) {
    next({ name: 'Login' })
  }
  next()
})
export default router
