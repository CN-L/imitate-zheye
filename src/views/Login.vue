<template>
  <div class="container">
    <validate-form @form-submit="onSubmitTap">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
      <!-- v-model冒号后面不写值，默认就是传递给子组件modelValue -->
      <validate-input ref="validataNodeDom" placeholder="请输入邮箱地址" v-model:emailVal="emailVal" :rules="emailRules"></validate-input>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">密码</label>
      <validate-input placeholder="请输入密码" type="password" v-model:emailVal="passwordVal" :rules="psdWordRules"></validate-input>
    </div>
    <template v-slot:submitNode>
      <span class="btn btn-info">提交</span>
    </template>
    <template v-slot:clearNode>
      <span class="btn btn-secondary">清空</span>
    </template>
    </validate-form>
  </div>
</template>
<script lang='ts'>
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import createMessage from '@/hooks/createMessage'
import ValidateInput from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/VaildateForm.vue'
import rulesForm, { RulesProps, TagType } from '@/assets/rules'
export default defineComponent({
  name: 'LoginPage',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup() {
    const store = useStore()
    const emailVal = ref('')
    const router = useRouter()
    const validataNodeDom = ref<any>(null)
    const passwordVal = ref('')
    const psdWordRules: RulesProps = rulesForm.psdWordRules
    const emailRules: RulesProps = rulesForm.emailRules
    const onSubmitTap = (res: boolean) => {
      const form = {
        email: emailVal.value,
        password: passwordVal.value
      }
      if(!res) {
        store.dispatch('loginAndFetch', form).then(res => {
          createMessage('成功', 'success', 2000)
          router.push('/')
        })
      }
    }
    return {
      emailVal,
      validataNodeDom,
      passwordVal,
      psdWordRules,
      emailRules,
      onSubmitTap
    }
  },
})
</script>
