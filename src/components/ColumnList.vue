<template>
  <div class="row">
    <div class="col-4 mb-4" v-for="item in colList" :key="item._id">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
           <img :src="item.avatar && item.avatar.url" class="rounded-circle border border-light w-25 my-3" :alt="item.title">
          <h5 class="card-title">{{item.title}}</h5>
          <p class="card-text">{{item.description}}</p>
          <router-link :to="{name: 'ColumnDetail', params: { id: item._id}}" class="btn btn-primary">进入专栏</router-link>
        </div>
     </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { ColumnProps } from '@/store'
export default defineComponent({
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>, // 解决接收参数的类型问题
      required: true
    }
  },
  setup(props) {
    const colList = computed(() => props.list.map(it => {
      if(!it.avatar?.url) {
        it.avatar = {
          ...it.avatar,
          url: new URL('../assets/logo.png', import.meta.url).href
        }
      } else {
        it.avatar.url = `${it.avatar.url}?x-oss-process=image/resize,m_pad,h_50,w_50`
      }
      return it
    }))
    return {
      colList
    }
  },
})
</script>
<style scoped>
</style>

