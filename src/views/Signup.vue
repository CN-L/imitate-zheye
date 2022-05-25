<template>
  <div class="signup-page mx-auto p-3">
    <vaildate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">邮箱地址</label>
        <validate-input placeholder="请输入邮箱地址"  :rules="emailRules" v-model:emailVal="_form.email"></validate-input>
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">昵称</label>
        <validate-input placeholder="请输入昵称" :rules="nameRules" v-model:emailVal="_form.nickName"></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input type="password" placeholder="请输入密码" :rules="psdWordRules" v-model:emailVal="_form.password"></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">重复密码</label>
        <validate-input type="password" placeholder="请再次输入密码" :rules="repeatRules" v-model:emailVal="_form.repeatPassword"></validate-input>
      </div>
      <template v-slot:submitNode>
        <button class="btn btn-success">注册新用户</button>
      </template>
    </vaildate-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { apiRegister } from '@/apis'
import { useRouter } from 'vue-router'
import VaildateForm from '@/components/VaildateForm.vue'
import ValidateInput from '@/components/ValidateInput.vue'
import rulesForm, { RulesGlobal, RulesProps } from '@/assets/rules'
import createMessage from '@/hooks/createMessage'
export default defineComponent({
  name: 'SingnUp',
  components: {
    VaildateForm,
    ValidateInput
  },
  setup() {
    const router = useRouter()
    const rulesAll: RulesGlobal = { ...rulesForm }

    /*
     * const emailRules: RulesProps = rulesForm.emailRules
     * const nameRules: RulesProps = rulesForm.nameRules
     * const psdWordRules: RulesProps = rulesForm.psdWordRules
     */
    const repeatRules: RulesProps = [
      { type: 'required', message: '重复密码不为空' },
      { type: 'range', min: { message: '你的密码至少包括六位，不能含有空格', length: 6 } },
      { type: 'custom',
        vaildator: () => _form.password !== _form.repeatPassword,
        message: '密码不相同'
      }
    ]
    const _form = reactive({
      email: '',
      nickName: '',
      repeatPassword: '',
      password: ''
    })
    const onFormSubmit = async (result: boolean) => {
      if(!result) {
        try {
          await apiRegister(_form)
          createMessage('注册成功', 'success', 2000)
          router.push({ name: 'Login' })
        } catch (error: any) {
          createMessage(error, 'error', 2000)
        }
      }
    }
    return {
      onFormSubmit,
      _form,
      repeatRules,
      ...rulesAll
    }
  },
})
</script>
<style>
.signup-page {
  width: 700px;
}
</style>
