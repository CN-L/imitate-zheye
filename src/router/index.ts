import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
const router = createRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: { name: 'HomePage' },
    },
    {
      path: '/home',
      name: 'HomePage',
      meta: { login: true },
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/login',
      name: 'Login',
      meta: {},
      component: import('@/views/Login.vue')
    },
    {
      meta: { login: true },
      path: '/column/:id',
      name: 'ColumnDetail',
      component: import('@/components/ColumnDetail.vue')
    },
    {
      path: '/create',
      name: 'CreatePage',
      meta: { login: true },
      component: import('@/views/CreatePost.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: import('@/views/Signup.vue')
    }
  ],
  history: createWebHistory(),
})
router.beforeEach((to, from, next) => {
  if(to.meta.login && store.state.token) {
    next()
  } else if(to.meta.login && !store.state.token) {
    next({ name: 'Login' })
  } else {
    next()
  }

})
export default router
