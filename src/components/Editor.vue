<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="vue-asycmd-editor">
    <textarea ref="textArea"></textarea>
  </div>
</template>
<script lang="ts" setup>
import EasyMDE, { Options } from 'easymde'
import { defineProps, defineEmits, ref, onMounted, onUnmounted } from 'vue'
// 类型、属性以及事件
interface EditorProps {
  modalValue?: string,
  config? : Options
}
interface EditorEvents {
  (type: 'update:modalValue', value: string): void
  (type: 'change', value: string): void
  (type: 'blur'): void
}
const props = defineProps<EditorProps>()
const emit = defineEmits<EditorEvents>()
const textArea = ref<HTMLTextAreaElement | null>(null)
let easyMDEInstance: EasyMDE | null = null
const innerVal = ref(props.modalValue || '')
onMounted(() => {
  if(textArea.value) {
    // 组装options
    const config: Options = {
      ...(props.config || {}),
      element: textArea.value,
      initialValue: innerVal.value
    }
    easyMDEInstance = new EasyMDE(config)
    // 监控对应的事件
    easyMDEInstance.codemirror.on('change', () => {
      if(easyMDEInstance) {
        // 拿到当前的值
        const updated = easyMDEInstance.value()
        innerVal.value = updated
        emit('update:modalValue', updated)
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
onUnmounted(() => {
  if(easyMDEInstance) {
    easyMDEInstance.cleanup()
    easyMDEInstance = null
  }
})
</script>
