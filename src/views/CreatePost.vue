<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <uploader class="d-flex text-secondary w-100 my-4 bg-light align-items-center justify-content-center" :before-upload="beforeUpload" action="/upload" @file-uploaded="uploadedTap">
      <h2>点击上传头图</h2>
      <template v-slot:loading>
        <div class="d-flex">
            <div class="spinner-border text-secondary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <h2>正在上传</h2>
        </div>
      </template>
      <template #success="{uploadedDate}">
        <img :src="uploadedDate.data.url" alt="">
      </template>
    </uploader>
    <vaildate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input placeholder="请输入文章标题" type="text" :rules="titleRules" v-model:emailVal="titleVal"></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input type="text" tag="textarea" rows="10" placeholder="请输入文章详情" :rules="contentRules" v-model:emailVal="contentVal"></validate-input>
      </div>
      <template #submitNode>
        <button class="btn btn-primary btn-large">发表文章</button>
      </template>
    </vaildate-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Uploader from '@/components/Uploader.vue'
import VaildateForm from '@/components/VaildateForm.vue'
import { GlobalDataProps } from '@/store'
import ValidateInput from '@/components/ValidateInput.vue'
import { RulesProps } from '@/assets/rules'
export default defineComponent({
  components: {
    Uploader,
    VaildateForm,
    ValidateInput
  },
  setup() {
    const route = useRouter()
    const store = useStore<GlobalDataProps>()
    const titleVal = ref('')
    const contentRules: RulesProps = [
      {
        type: 'required', message: '文章详情不能为空'
      }
    ]
    const titleRules: RulesProps = [
      {
        type: 'required', message: '文章标题不能为空'
      }
    ]
    const contentVal = ref('')
    const beforeUpload = (file: File) => {
      const type = file.type.split('/')
      return type.includes('image')
    }
    const uploadedTap = (res: any) => {
      console.log(res)
    }
    const onFormSubmit = (result: boolean) => {

      /*
       * const { column } = store.state.user
       * if(column) {
       *   const newPost: PostProps = {
       *     id: new Date().getTime(),
       *     title: titleVal.value,
       *     content: contentVal.value,
       *     column,
       *     createdAt: new Date().toLocaleString()
       *   }
       *   store.commit('createPost', newPost)
       *   route.push({
       *     name: 'ColumnDetail',
       *     params: { id: column }
       *   })
       * }
       */
    }
    return {
      uploadedTap,
      beforeUpload,
      titleRules,
      contentRules,
      titleVal,
      contentVal,
      onFormSubmit
    }
  },
})
</script>
<style>
.create-post-page {
  box-sizing: border-box;
  padding: 16px;
}
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
}
.create-post-page .file-upload-container img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>
