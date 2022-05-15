<template>
  <form class="validate-from-container">
    <slot name="default"></slot>
    <div class="row">
      <div @click.prevent="submitForm" class="submit-area col-2">
        <slot name="submitNode">
          <button type="submit" class="btn btn-primary">提交</button>
        </slot>
      </div>
      <div @click.prevent="clearInputs" class="submit-area col-2">
       <slot name="clearNode">
        <button type="submit" class="btn btn-primary">清除</button>
      </slot>
    </div>
    </div>
  </form>
</template>
<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
type FuncType = () => boolean
type clearType = () => void
type Events = {
  'form-item-created': FuncType;
  'form-item-clear': clearType;
};
export const emitter = mitt<Events>()
export default defineComponent({
  emits: ['form-submit'], // 声明事件
  setup(props, context) {
    let funcArr:FuncType[] = []
    let clearFuncArr: clearType[] = []
    const submitForm = () => {
      const result = funcArr.map(it => it()).some(it => it)
      if(!result) {
        context.emit('form-submit', result)
      }
    }
    const callback = (func: FuncType) => {
      funcArr.push(func)
    }
    emitter.on('form-item-created', callback) // 注册监听form表单校验
    // 清空value
    const clearInputFucn = (func: clearType) => {
      console.log(func, '90')
      clearFuncArr.push(func)
    }
    emitter.on('form-item-clear', clearInputFucn) // 注册监听form清空
    // 清除input输入框
    const clearInputs = () => {
      console.log('是否执行')
      console.log(clearFuncArr)
      clearFuncArr.map(func => func())
    }
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      emitter.off('form-item-clear', clearInputFucn)
      funcArr = []
      clearFuncArr = []
    })
    return {
      callback,
      clearInputs,
      clearInputFucn,
      submitForm
    }
  },
})
</script>
