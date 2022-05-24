<template>
  <div class="file-upload">
    <button class="btn btn-primary" @click.prevent="triggerUpload">
     <span v-if="filesStatus === 'loading'">正在上传</span>
     <span v-if="filesStatus === 'success'">上传成功</span>
     <span v-else>点击上传</span>
    </button>
    <input type="file" @change="fileChange" ref="fileInput" class="file-input d-none">
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import request from '@/assets/request'
type UploaderStatus = 'ready' | 'loading' | 'success' | 'error'
export default defineComponent({
  name: 'UploaderView',
  props: {
    action: {
      type: String,
      required: true,
      default: ''
    }
  },
  setup(props) {
    const fileInput = ref<HTMLInputElement | null>(null)
    // 上传状态
    const filesStatus = ref<UploaderStatus>('ready')
    const triggerUpload = () => {
      if(fileInput.value) {
        fileInput.value.click()
      }
    }
    const fileChange = (e: Event) => {
      const currentTarget = (e.target as HTMLInputElement)
      if(currentTarget.files) {
        const files = Array.from(currentTarget.files)
        const formData = new FormData()
        formData.append('file', files[0])
        filesStatus.value = 'loading'
        request.post(props.action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(resp => {
          console.log(resp.data)
          filesStatus.value = 'success'
        })
          .catch(error => {
            filesStatus.value = 'error'
            console.log(error)
          })
          .finally(() => {
            filesStatus.value = 'ready'
            if(fileInput.value) {
              fileInput.value.value = ''
            }
          })
      }
    }
    return {
      filesStatus,
      fileInput,
      fileChange,
      triggerUpload
    }
  },
})
</script>
