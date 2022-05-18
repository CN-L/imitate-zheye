<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar" :alt="column.title" class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <h4>{{column.title}}</h4>
        <p class="text-muted">{{column.description}}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import PostList from '@/components/PostList.vue'
export default defineComponent({
  components: {
    PostList
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const testData = computed(() => store.state.columns)
    const route = useRoute()
    const currentId = route.params.id
    const column = testData.value.find(c => c.id === +currentId)
    const testPosts = computed(() => store.state.posts)
    const list = testPosts.value.filter(post => post.columnId === +currentId)
    return {
      column,
      list
      // route
    }
  }
})
</script>
