<template>
  <teleport to="#message">
    <div :class="classObject"  v-if="isShow" class="alert alert-dismissible fixed-top fade show" role="alert">
      {{message}}
  <button type="button" @click.prevent="hideTap" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import useDomCreate from '@/hooks/useDomCreate'
export type MesaageType = 'success' | 'error' | 'default'
export default defineComponent({
  name: 'MessagePage',
  props: {
    message: String,
    type: {
      type: String as PropType<MesaageType>,
      default: 'default'
    }
  },
  emits: ['close-messsage'],
  setup(props, context) {
    useDomCreate('message') // 创建dom节点
    const isShow = ref(true)
    const hideTap = () => {
      isShow.value = false
      context.emit('close-messsage', isShow.value)
    }
    const classObject = {
      'alert-success': props.type === 'success',
      'alert-danger': props.type === 'error',
      'alert-primary': props.type === 'default'
    }
    return {
      isShow,
      classObject,
      hideTap
    }
  },
})
</script>
