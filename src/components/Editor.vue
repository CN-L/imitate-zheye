<!-- eslint-disable vue/multi-word-component-names -->
<template>
{{innerVal}}
  <div class="vue-asycmd-editor">
    <textarea ref="textAreaRef"></textarea>
  </div>
</template>
<script lang="ts" setup>
import EasyMDE, { Options } from 'easymde'
import { defineProps, defineEmits, ref, onMounted, onUnmounted, watch } from 'vue'
// 类型、属性以及事件
interface EditorProps {
  modelValue?: string,
  config? : Options
}
interface EditorEvents {
  (type: 'update:modelValue', value: string): void
  (type: 'change', value: string): void
  (type: 'blur'): void
}
const props = defineProps<EditorProps>()
const emit = defineEmits<EditorEvents>()
const textAreaRef = ref<HTMLTextAreaElement | null>(null)
let easyMDEInstance: EasyMDE | null = null
const innerVal = ref(props.modelValue || '')
watch(() => props.modelValue, newValue => {
  if(easyMDEInstance) {
    if(newValue !== innerVal.value) {
      easyMDEInstance.value(newValue || '')
    }
  }
})
onMounted(() => {
  if(textAreaRef.value) {
    // 组装options
    const options: Options = {
      ...(props.config || {}),
      element: textAreaRef.value,
      initialValue: innerVal.value
    }
    easyMDEInstance = new EasyMDE(options)
    // 监控对应的事件
    easyMDEInstance.codemirror.on('change', () => {
      if(easyMDEInstance) {
        // 拿到当前的值
        const updated = easyMDEInstance.value()
        innerVal.value = updated
        emit('update:modelValue', updated)
        emit('change', updated)
      }
    })
    easyMDEInstance.codemirror.on('blur', () => {
      if(easyMDEInstance) {
        emit('blur')
      }
    })
  }
})
const clear = () => {
  if(easyMDEInstance) {
    easyMDEInstance.value('')
  }
}
const getMEDInstance = () => easyMDEInstance
defineExpose({
  clear,
  getMEDInstance
})
onUnmounted(() => {
  if(easyMDEInstance) {
    easyMDEInstance.cleanup()
    easyMDEInstance = null
  }
})
</script>
