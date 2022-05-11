<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
    <validate-input :rules="emailRules"></validate-input>
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
import ValidateInput, { RulesProps } from '@/components/ValidateInput.vue'
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
    ValidateInput
  },
  setup() {
    const emailRules: RulesProps = reactive([
      {
        type: 'required', message: '电子邮箱不能为空'
      },
      {
        type: 'email', message: '请输入正确的电子邮箱格式'
      }
    ])
    return {
      testData,
      emailRules,
      currentUser,
    }
  },
})
</script>
