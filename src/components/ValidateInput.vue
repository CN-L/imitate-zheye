<template>
  <div class="validate-input-container pb-3">
    <input v-bind="$attrs" type="text" @blur="validateEmail" @input="iptChangeTap" :value="iptRef.val" :class="{'is-invalid': iptRef.error}" class="form-control">
    <span class="invalid-feedback" v-if="iptRef.error">{{iptRef.message}}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue'
const emailReg = new RegExp('/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+/')
interface RuleProp {
  type: 'required' | 'email';
  message: string
}
export type RulesProps = RuleProp[]
export default defineComponent({
  name: 'ValiDateInput',
  inheritAttrs: false,
  props: {
    rules: Array as PropType<RulesProps>,
    emailVal: {
      // 父组件 v-model 没有指定参数名，则默认是 modelValue
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const iptRef = reactive({
      val: props.emailVal || '',
      error: false,
      message: ''
    })
    const validateEmail = () => {
      if(props.rules) {
        const allPassed = props.rules.some(item => {
          let passed = false
          iptRef.message = item.message
          switch (item.type) {
          case 'required':
            passed = iptRef.val.trim() === ''// 为空
            iptRef.error = true
            break
          case 'email':
            passed = !emailReg.test(iptRef.val)
            iptRef.error = true
            break
          default:
            break
          }
          return passed
        })
        iptRef.error = allPassed
      }
    }
    const iptChangeTap = (e: Event) => {
      const currentVal = (e.target as HTMLInputElement).value
      iptRef.val = currentVal
      emit('update:emailVal', currentVal)
    }
    return {
      iptRef,
      iptChangeTap,
      validateEmail
    }
  },
})
</script>
