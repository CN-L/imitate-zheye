<template>
  <global-header :user="currentUser"></global-header>
  <div v-if="isLoading">加载中</div>
  <router-view></router-view>
  <loader v-if="isLoading" text="拼命加载中" background="rgba(0, 0, 0, .8)"></loader>
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
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import GlobalHeader from '@/components/GlobalHeader.vue'
import loader from '@/components/loader.vue'
import request from './assets/request'
export default defineComponent({
  components: {
    GlobalHeader,
    loader,
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const token = computed(() => store.state.token )
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    onMounted(() => {
      if(!currentUser.value.isLogin && token.value) {
        request.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
        store.dispatch('fetchCurrentUser')
      }
    })
    return {
      currentUser,
      isLoading
    }
  },
})
</script>
