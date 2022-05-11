import { ref, onMounted, Ref, onUnmounted } from 'vue'
// 联合类型
const clickOutSide = (elementRef: Ref<null | HTMLElement>) => {
  const isClickOutSide = ref(false)
  // 点击关闭dropDown
  const clickTap = (e: MouseEvent) => {
    if(elementRef.value) {
      // 是否点击在了外面
      if(!elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutSide.value = true
      } else {
        isClickOutSide.value = false
      }
    }

  }
  onMounted(() => {
    document.addEventListener('click', clickTap)
  })
  onUnmounted(() => {
    document.removeEventListener('click', clickTap)
  })
  return {
    isClickOutSide
  }
}
export default clickOutSide
