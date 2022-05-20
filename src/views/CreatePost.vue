<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
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
import VaildateForm from '@/components/VaildateForm.vue'
import { GlobalDataProps } from '@/store'
import { PostProps } from '@/testData'
import ValidateInput, { RulesProps } from '@/components/ValidateInput.vue'
export default defineComponent({
  components: {
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
    const onFormSubmit = (result: boolean) => {
      const { columnId } = store.state.user
      if(columnId) {
        const newPost: PostProps = {
          id: new Date().getTime(),
          title: titleVal.value,
          content: contentVal.value,
          columnId,
          createdAt: new Date().toLocaleString()
        }
        store.commit('createPost', newPost)
        route.push({
          name: 'ColumnDetail',
          params: { id: columnId }
        })
      }
    }
    return {
      titleRules,
      contentRules,
      titleVal,
      contentVal,
      onFormSubmit
    }
  },
})
</script>