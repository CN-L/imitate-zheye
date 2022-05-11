<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <column-list :list="testData"></column-list>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
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
    ColumnList,
    GlobalHeader,
  },
  setup() {
    return {
      testData,
      currentUser
    }
  },
})
</script>
