<template>
  <div ref="dropDwonRef" class="dropdown">
    {{isOpen}}
    <a @click="toggleOpen" class="btn my-2 btn-outline-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
      {{title}}
    </a>
    <ul v-if="isOpen" class="dropdown-menu" style="display: block">
     <slot></slot>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useClickOutSide from '@/hooks/useClickOutSide'
export default defineComponent({
  name: 'DropDown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    const dropDwonRef = ref <null | HTMLElement>(null) // dom元素
    const isOpen = ref(false)
    const { isClickOutSide } = useClickOutSide(dropDwonRef)
    watch(isClickOutSide, () => {
      if(isClickOutSide && isOpen) {
        isOpen.value = false
      }
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
