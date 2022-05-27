<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    {{titleVal}}
    <uploader :uploaded="uploaded" @remove-uploaded="removeImg" class="d-flex text-secondary w-100 my-4 bg-light align-items-center justify-content-center" :before-upload="beforeUpload" action="/upload" @file-uploaded="uploadedTap">
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
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Uploader from '@/components/Uploader.vue'
import VaildateForm from '@/components/VaildateForm.vue'
import { GlobalDataProps, ResponType, ImgProps, PostProps } from '@/store'
import ValidateInput from '@/components/ValidateInput.vue'
import { RulesProps } from '@/assets/rules'
import checkUpload from '@/hooks/commFuncHooks'
import createMessage from '@/hooks/createMessage'
export default defineComponent({
  components: {
    Uploader,
    VaildateForm,
    ValidateInput
  },
  setup() {
    const uploaded = ref()
    const router = useRouter()
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    let imgId = ''
    const isEditMode = !!route.query.id // 是否为编辑模式
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
      const result = checkUpload(file, { size: 2, format: ['image/jpg', 'image/png'] })
      const { passed, errorType } = result
      if(errorType === 'format') {
        createMessage('图片类型不正确', 'error')
      }
      if(errorType === 'size') {
        createMessage('图片超出大小限制', 'error')
      }
      return passed
    }
    const uploadedTap = (res: ResponType<ImgProps>) => {
      if(res.data._id) {
        imgId = String(res.data._id)
      }

    }
    const removeImg = () => {
      imgId = ''
    }
    const onFormSubmit = (result: boolean) => {
      if(!result) {
        const { column, _id } = store.state.user
        const newPost: PostProps = {
          title: titleVal.value,
          content: contentVal.value,
          column: String(column),
          author: String(_id),
        }
        if(imgId) {
          newPost.image = imgId
        }
        store.dispatch('createPost', newPost).then(() => {
          createMessage('发表成功，2秒后跳转到文章', 'success', 2000)
          setTimeout(() => {
            router.push({ name: 'ColumnDetail', params: { id: column } })
          }, 2000)
        })
      }
    }
    onMounted(() => {
      if(isEditMode) {
        store.dispatch('getAritcle', route.query.id).then((res: ResponType<PostProps<ImgProps>>) => {
          const currentPost = res.data
          titleVal.value = currentPost.title
          if(currentPost.content) {
            contentVal.value = currentPost.content
          }
          if(currentPost.image) {
            uploaded.value = { data: currentPost.image }
          }
        })
      }
    })
    return {
      uploadedTap,
      removeImg,
      beforeUpload,
      titleRules,
      contentRules,
      titleVal,
      contentVal,
      uploaded,
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
