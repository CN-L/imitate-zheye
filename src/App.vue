<template>
  <global-header :user="currentUser"></global-header>
  <Vnode1 msg="大家好才是真的好"></Vnode1>
  <router-view></router-view>
  <loader v-if="isLoading" @vnode-unmounted="onMoutedTap" text="拼命加载中" background="rgba(0, 0, 0, .8)"></loader>
  <footer class="text-center py-4 text-secondary bg-light mt-6">
    <small>
      <ul class="list-inline mb-0">
        <li class="list-inline-item">™️2022 者也专栏</li>
        <li class="list-inline-item">课程</li>
        <li class="list-inline-item">文档</li>
        <li class="list-inline-item">联系</li>
        <li class="list-inline-item">更多</li>
      </ul>
    </small>
  </footer>
</template>
<script lang='ts'>
import { computed, defineComponent, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import GlobalHeader from '@/components/GlobalHeader.vue'
import loader from '@/components/loader.vue'
import request from './assets/request'
import createMessage from '@/hooks/createMessage'
import Vnode1 from './components/Vnode'
export default defineComponent({
  components: {
    Vnode1,
    GlobalHeader,
    loader,
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const token = computed(() => store.state.token )
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const error = computed(() => store.state.error)
    // 子组件生命周期监测
    const onMoutedTap = ((res: any) => {
      console.log(res, '监听子组件某个生命周期')
    })
    watch(() => error.value.status, () => {
      const { status, message } = error.value
      if(status && message) {
        createMessage(message, 'error')
      }
    })
    onMounted(() => {
      if(!currentUser.value.isLogin && token.value) {
        request.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
        store.dispatch('fetchCurrentUser')
      }
    })
    return {
      token,
      error,
      onMoutedTap,
      currentUser,
      isLoading
    }
  },
})
</script>
