<template>
  <div class="validate-input-container pb-3">
    <input v-if="tag !== 'textarea'" v-bind="$attrs" @blur="validateEmail" v-model="iptRef.val" :class="{'is-invalid': iptRef.error}" class="form-control">
    <textarea v-else @blur="validateEmail" :class="{'is-invalid': iptRef.error}" class="form-control" v-model="iptRef.val" v-bind="$attrs">
    </textarea>
    <span class="invalid-feedback" v-if="iptRef.error">{{iptRef.message}}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, PropType, onMounted, computed } from 'vue'
import { emitter } from '@/components/VaildateForm.vue'
import { RulesProps, TagType } from '@/assets/rules'
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
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  setup(props, { emit }) {
    const emailReg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/
    const iptRef = reactive({
      val: computed({
        get: () => props.emailVal || '',
        set: val => {
          emit('update:emailVal', val)
        }
      }),
      error: false,
      message: ''
    })
    const validateEmail = () => {
      if(props.rules) {
        const allPassed = props.rules.some(item => {
          let passed = false
          iptRef.message = item.message || ''
          switch (item.type) {
          case 'required':
            passed = iptRef.val.trim() === ''// 为空
            iptRef.error = passed
            break
          case 'email':
            passed = !emailReg.test(iptRef.val)
            break
          case 'custom':
            passed = item.vaildator ? item.vaildator() : false
            break
          case 'range':
            if(item.min) {
              passed = (iptRef.val.length < item.min?.length)
              iptRef.message = item.min.message
            }
            if(item.max) {
              passed = (iptRef.val.length > item.max?.length)
              iptRef.message = item.max.message
            }
            break

          // eslint-disable-next-line no-fallthrough
          default:
            break
          }
          return passed
        })
        iptRef.error = allPassed
        return allPassed
      }
      return false
    }

    /*
     * const iptChangeTap = (e: Event) => {
     *   const currentVal = (e.target as HTMLInputElement).value
     *   iptRef.val = currentVal
     *   emit('update:emailVal', currentVal)
     * }
     */
    const clearValus = () => {
      iptRef.val = ''
      // emit('update:emailVal', iptRef.val)
    }
    onMounted(() => {
      emitter.emit('form-item-created', validateEmail)
      emitter.emit('form-item-clear', clearValus)
    })
    return {
      iptRef,
      clearValus,
      // iptChangeTap, // 输入事件 更新父组件
      validateEmail // 验证表单事件
    }
  },
})
</script>
