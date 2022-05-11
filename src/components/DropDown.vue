<template>
  <div ref="dropDwonRef" class="dropdown">
    <a @click="toggleOpen" class="btn my-2 btn-outline-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
      {{title}}
    </a>
    <ul v-if="isOpen" class="dropdown-menu" style="display: block">
     <slot></slot>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'

export default defineComponent({
  name: 'DropDown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    const isOpen = ref(false)
    const dropDwonRef = ref <null | HTMLElement>(null) // dom元素
    // 点击关闭dropDown
    const clickTap = (e: MouseEvent) => {
      if(dropDwonRef.value) {
        if(isOpen.value && !dropDwonRef.value.contains(e.target as HTMLElement)) {
          isOpen.value = false
        }
      }

    }
    // 因为监听器一直存在 干扰后面网页运行 所以需要清楚
    onMounted(() => {
      document.addEventListener('click', clickTap)
    })
    onUnmounted(() => {
      document.removeEventListener('click', clickTap)
    })
    // 点击事件
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    return {
      isOpen,
      dropDwonRef,
      toggleOpen
    }
  },
})
</script>
