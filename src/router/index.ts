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
      meta: {
        redirectAlreadyLogin: true
      },
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
      meta: { requiredLogin: true },
      component: import('@/views/CreatePost.vue')
    }
  ],
  history: createWebHistory(),
})
router.beforeEach((to, from, next) => {
  console.log(to.meta)
  if(to.meta.requiredLogin && !store.state.user.isLogin) {
    next({ name: 'Login' })
  } else if(to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
    next('/')
  } else {
    next()
  }

})
export default router
