<template>
    <div class="post-list">
    <article @click="route.push({name: 'PostDetail', params: {id: post._id}})" v-for="post in list" :key="post._id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h4>{{post.title}}</h4>
        <div class="row my-3 align-items-center">
          <div v-if="post.image && (typeof post.image !== 'string')" class="col-3">
            <img :src="post.image.url" :alt="post.title" class="rounded-lg w-100">
          </div>
          <p :class="{'col-9': post.image}">{{post.excerpt}}</p>
        </div>
        <span class="text-muted">{{post.createdAt}}</span>
      </div>
    </article>
  </div>
</template>
<script lang="ts">
import { PostProps } from '@/store'
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  props: {
    list: {
      require: true,
      type: Array as PropType<PostProps[]>
    }
  },
  setup() {
    const route = useRouter()
    return {
      route
    }
  },
})
</script>
<style>
</style>
