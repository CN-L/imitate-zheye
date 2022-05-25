<template>
  <div class="file-upload">
    <div class="file-upload-container" @click.prevent="triggerUpload">
     <slot name="loading" v-if="filesStatus === 'loading'">
       <button class="btn btn-primary">正在上传</button>
     </slot>
      <slot name="success" :uploadedDate="uploadedDate" v-else-if="filesStatus === 'success'">
       <button class="btn btn-primary">上传成功</button>
     </slot>
     <slot name="default" v-else>
       <button class="btn btn-primary">点击上传</button>
     </slot>
    </div>
    <input type="file" @change="fileChange" ref="fileInput" class="file-input d-none">
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import request from '@/assets/request'
type UploaderStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean
export default defineComponent({
  name: 'UploaderView',
  props: {
    action: {
      type: String,
      required: true,
      default: ''
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>
    }
  },
  emits: ['file-uploaded', 'file-uploaded-error'],
  setup(props, context) {
    const fileInput = ref<HTMLInputElement | null>(null)
    const uploadedDate = ref(null)
    // 上传状态
    const filesStatus = ref<UploaderStatus>('ready')
    const triggerUpload = () => {
      if(fileInput.value) {
        fileInput.value.click()
      }
    }
    // 上传
    const fileChange = (e: Event) => {
      const currentTarget = (e.target as HTMLInputElement)
      if(currentTarget.files) {
        const files = Array.from(currentTarget.files)
        // 上传前的检查
        if(props.beforeUpload) {
          const result = props.beforeUpload(files[0])
          if(!result) {
            return
          }
        }
        const formData = new FormData()
        formData.append('file', files[0])
        filesStatus.value = 'loading'
        request.post(props.action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(resp => {

          uploadedDate.value = resp.data
          context.emit('file-uploaded', resp.data)
          filesStatus.value = 'success'
        })
          .catch(({ error }) => {
            filesStatus.value = 'error'
            context.emit('file-uploaded-error', error)
          })
          .finally(() => {
            // filesStatus.value = 'ready'
            if(fileInput.value) {
              fileInput.value.value = ''
            }
          })
      }
    }
    return {
      filesStatus,
      fileInput,
      uploadedDate,
      fileChange,
      triggerUpload
    }
  },
})
</script>
