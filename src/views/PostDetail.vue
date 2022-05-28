<template>
  <div class="post-container">
    <div class="post-container-img mb-3">
      <img v-if="currentPost.image && (typeof currentPost.image !== 'string')" :src="currentPost.image && currentPost.image.url" alt="...">
    </div>
    <h2>{{currentPost.title}}</h2>
    <div class="post-container-author d-flex border-top border-bottom align-items-center justify-content-between">
      <user-profile v-if="(typeof currentPost.author !== 'string')" :userInfo="currentPost.author"></user-profile>
      <div class="text-secondary">{{currentPost.createdAt}}</div>
    </div>
    <div v-html="currentHTML" class="mt-3"></div>
    <div v-if="showEditArea" class="btn-group mt-5">
     <router-link :to="{name: 'CreatePage', query: {id: currentPost._id}}" type="button" class="btn btn-success">编辑</router-link>
      <button type="button" @click.prevent="modalShow = true" class="btn btn-danger">删除</button>
    </div>
    <modal title="提示" @modal-on-confirm="deleteTap" @modal-close="modalShow = false" :visible="modalShow">
        确定要删除当前文章吗？
    </modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import UserProfile, { userPorps } from '@/components/UserProfile.vue'
import Modal from '@/components/Modal.vue'
import { PostProps, ResponType } from '@/store'
import createMessage from '@/hooks/createMessage'
import router from '@/router'
import { marked } from 'marked'
// import MarkDown from 'markdown-it'
export default defineComponent({
  name: 'postDetail',
  components: {
    UserProfile,
    Modal
  },
  setup() {
    const modalShow = ref(false)
    // const md = new MarkDown()


    const currentHTML = computed(() => {
      if (currentPost.value && currentPost.value.content) {
        return marked.parse(currentPost.value.content)
      }
      return null


    })
    const store = useStore()
    const route = useRoute()
    const postId = computed(() => route.params.id)
    const currentPost = computed<PostProps<userPorps>>(() => {
      const { currentPost } = store.state
      if(!currentPost.image) {
        currentPost.image = {
          url: new URL('./1.jpeg', import.meta.url).href
        }
      }
      return currentPost
    })
    const showEditArea = computed(() => {
      const { isLogin, _id } = store.state.user
      if(currentPost.value && currentPost.value.author && isLogin) {
        const postAuthor = currentPost.value.author as userPorps
        return postAuthor._id === _id
      }
      return false

    })
    const deleteTap = () => {
      modalShow.value = false
      store.dispatch('deletePost', postId.value).then((res: ResponType<PostProps>) => {
        createMessage('删除成功，2秒后跳转到专栏首页', 'success', 2000)
        setTimeout(() => {
          router.push({ name: 'ColumnDetail', params: { id: res.data.column } })
        }, 2000)
      })
    }
    onMounted(() => {
      store.dispatch('getAritcle', postId.value)
    })
    return {
      postId,
      showEditArea,
      modalShow,
      deleteTap,
      currentHTML,
      currentPost
    }
  },
})
</script>
<style>
.post-container {
  width: 80vw;
  height: 100%;
  margin: 0 auto;
}
.post-container-author {
  padding: 16px 0;
}
  .post-container-img {
    height: 200px;
    width: 100%;
  }
  .post-container-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>

