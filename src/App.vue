<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
    <input v-model="emailRef.val" @blur="validateEmail" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <div class="form-text" v-if="emailRef.error">{{emailRef.message}}</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">密码</label>
    <input type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    <!-- <column-list :list="testData"></column-list> -->
  </div>
</template>
<script lang='ts'>
import { defineComponent, reactive } from 'vue'
import ColumnList, { ColumnProps } from '@/components/ColumnList.vue'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'
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
    GlobalHeader,
  },
  setup() {
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const validateEmail = () => {
      const emailReg = new RegExp('/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+/')
      if(emailRef.val.trim() === '') {
        emailRef.error = true
        emailRef.message = 'email must be required'
      } else if(!emailReg.test(emailRef.val)) {
        emailRef.error = true
        emailRef.message = 'email must valid mesage'
      }
    }
    return {
      testData,
      currentUser,
      validateEmail,
      emailRef
    }
  },
})
</script>
