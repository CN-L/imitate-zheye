<template>
  <div class="file-upload">
    <button class="btn btn-primary" @click.prevent="triggerUpload">点击上传</button>
    <input type="file" ref="fileInput" class="file-input d-none">
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'UploaderView',
  setup() {
    const fileInput = ref<HTMLInputElement | null>(null)
    const triggerUpload = () => {
      if(fileInput.value) {
        fileInput.value.click()
      }
    }
    return {
      fileInput,
      triggerUpload
    }
  },
})
</script>
