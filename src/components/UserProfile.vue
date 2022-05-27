<template>
  <div class="d-flex user-content align-items-center">
    <div class="user-content-avator">
      <img v-if="userInfo?.avatar?.url" :src="userInfo?.avatar?.url" class="rounded-circle" alt="...">
      <img v-else class="rounded-circle" src="../assets/teacher.svg" alt="">
    </div>
    <div v-if="userInfo" class="ml-5">
      <span class="mb-3">{{userInfo.nickName}}</span>
      <div>{{userInfo.description || '作者什么都没有留下～'}}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ImgProps } from '@/store'
export type userPorps = {
  avatar?: ImgProps,
  description?: string,
  email?: string,
  nickName: string
  _id?: string
}
export default defineComponent({
  name: 'UserProfile',
  props: {
    userInfo: {
      type: Object as PropType<userPorps>
    }
  },
  setup() {
    return {}
  },
})
</script>
<style>
.user-content-avator {
  width: 50px;
  height: 50px;
  margin-right: 16px;
}
.user-content-avator img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
