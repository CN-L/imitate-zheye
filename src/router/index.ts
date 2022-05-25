import { createRouter, createWebHistory } from 'vue-router'
import request from '@/assets/request'
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
      meta: { loginAuto: true },
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        isLoginPage: true
      },
      component: import('@/views/Login.vue')
    },
    {
      meta: { loginAuto: true },
      path: '/column/:id',
      name: 'ColumnDetail',
      component: import('@/components/ColumnDetail.vue')
    },
    {
      path: '/create',
      name: 'CreatePage',
      meta: { loginAuto: true },
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
  const { token, user } = store.state
  const { loginAuto, isLoginPage } = to.meta
  if(!user.isLogin) {
    if(token) {
      request.defaults.headers.common['Authorization'] = `Bearer ${token}`
      store.dispatch('fetchCurrentUser').then(() => {
        if(isLoginPage) {
          next('/')
        } else {
          next()
        }
      })
        .catch(() => {
          next({ name: 'Login' })
        })
    } else if(loginAuto) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else if(isLoginPage) {
    next('/')
  } else {
    next()
  }
})
export default router
