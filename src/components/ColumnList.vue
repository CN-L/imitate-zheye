<template>
  <h1></h1>
  <div></div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
export interface ColumnProps {
  id: number,
  title: string,
  avatar: string,
  description: string
}
export default defineComponent({
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>, // 解决接收参数的类型问题
      required: true
    }
  },
  setup() {
    return {
      // msg: '222'
    }
  },
})
</script>
<style scoped>

</style>

