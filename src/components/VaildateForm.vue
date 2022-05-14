<template>
  <form class="validate-from-container">
    <slot name="default"></slot>
    <div @click.prevent="submitForm" class="submit-area">
      <slot name="submitNode">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>
<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
type Events = {
  'form-item-created': FuncType;
};
type FuncType = () => boolean
export const emitter = mitt<Events>()
export default defineComponent({
  emits: ['form-submit'], // 声明事件
  setup(props, context) {
    let funcArr:FuncType[] = []
    const submitForm = () => {
      const result = funcArr.map(it => it()).some(it => it)
      if(!result) {
        context.emit('form-submit', result)
      }
    }
    const callback = (func: FuncType) => {
      funcArr.push(func)
    }
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funcArr = []
    })
    return {
      callback,
      submitForm
    }
  },
})
</script>
