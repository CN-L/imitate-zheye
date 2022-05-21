<template>
  <teleport to="#message">
    <div class="alert message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2"
    :class="classObject" v-if="isShow"
    >
      <span>{{message}}</span>
      <button type="button" @click.prevent="hideTap" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
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
    useDomCreate('message')
    const isShow = ref(true)
    const hideTap = () => {
      isShow.value = false
      context.emit('close-messsage', isShow.value)
    }
    const classObject = {
      'alert-scueess': props.type === 'success',
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
