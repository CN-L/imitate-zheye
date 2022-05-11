<template>
  <div class="dropdown">
    <a @click="toggleOpen" class="btn my-2 btn-outline-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
      {{title}}
    </a>
    <ul v-if="isOpen" class="dropdown-menu" style="display: block">
     <slot></slot>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

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
    // 点击事件
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    return {
      isOpen,
      toggleOpen
    }
  },
})
</script>
