<template>
  <div class="file-upload">
    <div v-bind="$attrs" class="file-upload-container" @click.prevent="triggerUpload">
      <div  v-show="filesStatus === 'success'" @click.stop="deleteImg" class="file-upload-delete">
        <svg t="1653546664718" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3693" width="50" height="50"><path d="M895.464448 119.006208 677.967872 119.006208c0 0-32.8448 1.020928-58.648576-26.943488-10.395648-12.050432-27.804672-23.795712-56.4224-24.799232l-41.183232 0-6.280192 0-41.182208 0c-28.618752 1.004544-46.031872 12.749824-56.4224 24.799232-25.807872 27.964416-58.6496 26.943488-58.6496 26.943488L141.682688 119.006208c-13.99296 0-25.33888 11.34592-25.33888 25.33888l0 93.090816c-0.053248 26.927104 26.083328 26.396672 26.083328 26.396672l49.83808 0L192.265216 913.65376c0 0-3.966976 44.084224 40.121344 46.45888l269.31712 0 33.738752 0 30.808064 0.238592 38.500352 0 174.934016 0 24.297472 0 0.782336-0.238592c44.080128-2.374656 40.117248-46.45888 40.117248-46.45888L844.88192 263.832576l49.842176 0c0 0 26.133504 0.530432 26.083328-26.396672l0-93.090816C920.8064 130.353152 909.46048 119.006208 895.464448 119.006208zM430.539776 803.171328c0 17.042432-13.828096 30.865408-30.865408 30.865408-17.042432 0-30.865408-13.824-30.865408-30.865408L368.80896 320.736256c0-17.042432 13.824-30.865408 30.865408-30.865408 17.038336 0 30.865408 13.824 30.865408 30.865408L430.539776 803.171328zM663.436288 803.171328c0 17.042432-13.824 30.865408-30.865408 30.865408-17.038336 0-30.865408-13.824-30.865408-30.865408L601.705472 320.736256c0-17.042432 13.828096-30.865408 30.865408-30.865408 17.041408 0 30.865408 13.824 30.865408 30.865408L663.436288 803.171328z" p-id="3694" fill="#ffffff"></path></svg>
      </div>
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
import { defineComponent, PropType, ref, watch } from 'vue'
import request from '@/assets/request'
type UploaderStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean
export default defineComponent({
  name: 'UploaderView',
  inheritAttrs: false,
  props: {
    action: {
      type: String,
      required: true,
      default: ''
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>
    },
    uploaded: {
      type: Object
    }
  },
  emits: ['file-uploaded', 'file-uploaded-error', 'remove-uploaded'],
  setup(props, context) {
    const fileInput = ref<HTMLInputElement | null>(null)
    const uploadedDate = ref(props.uploaded || null)
    watch(() => props.uploaded, newVal => {
      if(newVal) {
        filesStatus.value = 'success'
        uploadedDate.value = newVal
      }
    })
    // 上传状态
    const filesStatus = ref<UploaderStatus>(props.uploaded ? 'success' : 'ready')
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
    // 图片删除
    const deleteImg = () => {
      uploadedDate.value = null
      filesStatus.value = 'ready'
      context.emit('remove-uploaded')
    }
    return {
      filesStatus,
      deleteImg,
      fileInput,
      uploadedDate,
      fileChange,
      triggerUpload
    }
  },
})
</script>
<style scoped>
.file-upload-container {
  position: relative;
  width: 100%;
}
.file-upload-delete {
  width: 100%;
  background: rgba(0, 0, 0, .5);
  position: absolute;
  opacity: 0;
  text-align: center;
  bottom: 0;
}

.file-upload-container:hover .file-upload-delete {
   transition: all 1s linear;
   opacity: 1;
}
</style>
