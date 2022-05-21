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
import ValidateInput, { RulesProps } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/VaildateForm.vue'
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
    const psdWordRules: RulesProps = [
      { type: 'range', min: { message: '你的密码至少包括六位，不能含有空格', length: 6 } }
    ]
    const emailRules: RulesProps = reactive([
      {
        type: 'required', message: '电子邮箱不能为空'
      },
      {
        type: 'email', message: '请输入正确的电子邮箱格式'
      },
      { type: 'range', min: { message: '你的邮箱至少包括六位，不能含有空格', length: 6 }, max: { message: '你的邮箱最多包括20位，不能含有空格', length: 20 } }
    ])
    const onSubmitTap = (res: boolean) => {
      const form = {
        email: emailVal.value,
        password: passwordVal.value
      }
      if(!res) {
        store.dispatch('loginAndFetch', form).then(res => {
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
