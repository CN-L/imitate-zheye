<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
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
    <span class="btn btn-danger">Submit</span>
  </template>
</validate-form>
    <!-- <column-list :list="testData"></column-list> -->
  </div>
</template>
<script lang='ts'>
import { defineComponent, reactive, ref, onMounted } from 'vue'
import ColumnList, { ColumnProps } from '@/components/ColumnList.vue'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'
import ValidateInput, { RulesProps } from '@/components/ValidateInput.vue'
import ValidateForm, { emitter } from '@/components/VaildateForm.vue'
const currentUser: UserProps = {
  isLogin: true,
  name: '李云龙',
}
const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这里是test1的专栏，有一段非常有意思的简介，可以更新一下',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41a8b7d9c60b68cdd1ec.jpg?x-oss-process=image/resize,m_pad,h_50,w_50'
  },
  {
    id: 2,
    description: '这里是test1的专栏，有一段非常有意思的简介，可以更新一下',
    title: 'test1的专栏',
  },
  {
    id: 3,
    description: '这里是test1的专栏，有一段非常有意思的简介，可以更新一下',
    title: 'test1的专栏',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41a8b7d9c60b68cdd1ec.jpg?x-oss-process=image/resize,m_pad,h_50,w_50',
  },
  {
    id: 4,
    title: 'test1的专栏',
    description: '这里是test1的专栏，有一段非常有意思的简介，可以更新一下',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41a8b7d9c60b68cdd1ec.jpg?x-oss-process=image/resize,m_pad,h_50,w_50',
  },
  {
    id: 5,
    description: '这里是test1的专栏，有一段非常有意思的简介，可以更新一下',
    title: 'test1的专栏',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41a8b7d9c60b68cdd1ec.jpg?x-oss-process=image/resize,m_pad,h_50,w_50',
  },
]
export default defineComponent({
  components: {
    // ColumnList,
    ValidateForm,
    GlobalHeader,
    ValidateInput
  },
  setup() {
    const emailVal = ref('')
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
      console.log('22', res)
    }
    return {
      emailVal,
      validataNodeDom,
      passwordVal,
      testData,
      psdWordRules,
      emailRules,
      currentUser,
      onSubmitTap
    }
  },
})
</script>
