<template>
  <div class="post-container">
    <div class="post-container-img mb-3">
      <img v-if="currentPost.image && (typeof currentPost.image !== 'string')" :src="currentPost.image && currentPost.image.url" alt="...">
    </div>
    <h2>{{currentPost.title}}</h2>
    <div class="d-flex align-items-center justify-content-between">
      <user-profile v-if="(typeof currentPost.author !== 'string')" :userInfo="currentPost.author"></user-profile>
      <div class="text-secondary">{{currentPost.createdAt}}</div>
    </div>
    <!-- {{currentPost.content}} -->
    <div v-html="currentPost.content" class="mt-3"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import UserProfile, { userPorps } from '@/components/UserProfile.vue'
import { PostProps } from '@/store'
// import MarkDown from 'markdown-it'
export default defineComponent({
  name: 'postDetail',
  components: {
    UserProfile
  },
  setup() {
    // const md = new MarkDown()
    const currentPost = computed<PostProps<userPorps>>(() => {
      const { currentPost } = store.state
      if(!currentPost.image) {
        currentPost.image = {
          url: new URL('./1.jpeg', import.meta.url).href
        }
      }
      return currentPost
    })

    /*
     * const currentHTML = computed(() => {
     *   if (currentPost.value && currentPost.value.content) {
     *     return md.render(currentPost.value.content)
     *   }
     *   return null
     */

    // })
    const store = useStore()
    const route = useRoute()
    const postId = computed(() => route.params.id)
    onMounted(() => {
      store.dispatch('getAritcle', postId.value)
    })
    return {
      postId,
      // currentHTML,
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

