<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link :to="{name: 'Home'}" class="navbar-brand" href="#">
      学者专栏
    </router-link>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item"><router-link :to="{name: 'Login'}" class="btn btn-outline-light my-2">登陆</router-link></li>
      <li class="list-inline-item"><router-link :to="{name: 'Register'}" class="btn btn-outline-light my-2">注册</router-link></li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
       <drop-down :title="`你好，${user.nickName}`">
        <drop-items>
          <router-link :to="{name: 'CreatePage'}" class="dropdown-item">新建文章</router-link>
        </drop-items>
        <drop-items>
           <a href="#" class="dropdown-item">编辑资料</a>
        </drop-items>
        <drop-items>
          <a href="#" @click.prevent="jumpTo" class="dropdown-item">退出登录</a>
        </drop-items>
       </drop-down>
      </li>
    </ul>
</nav>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import DropDown from '@/components/DropDown.vue'
import DropItems from '@/components/DropItem.vue'
import store, { UserProps } from '@/store'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'GlobalHeader',
  components: {
    DropDown,
    DropItems,
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    },
  },
  setup() {
    const router = useRouter()
    const jumpTo = () => {
      store.commit('setLoginOut')
      router.push({ path: '/login' })
    }
    return{
      jumpTo
    }
  },
})
</script>
