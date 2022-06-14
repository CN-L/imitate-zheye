import { useStore } from 'vuex'
import { ref, computed, ComputedRef } from 'vue'
interface LoadParams {
  currentPage: number,
  pageSize: number,
}
const useLoadMore = (
  actionName: string, total: ComputedRef<number>,
  parmas: LoadParams = { currentPage: 2, pageSize: 10 }
) => {
  const store = useStore()
  const currentPage = ref(parmas.currentPage)
  const requestParams = {
    currentPage: currentPage.value,
    pageSize: parmas.pageSize
  }
  const loadMorePage = () => {
    store.dispatch(actionName, requestParams).then(() => {
      currentPage.value++
    })
  }
  const isLastPage = computed(() => Math.ceil(total.value / parmas.pageSize))
  return {
    isLastPage,
    loadMorePage,
    currentPage
  }
}
export default useLoadMore
