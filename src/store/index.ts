
import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from '@/testData'
interface UserProps {
  isLogin: boolean,
  name?: string,
  id?: number
}
export interface GlobalDataProps {
  columns: ColumnProps[],
  posts: PostProps[],
  user: UserProps
}
// 创建一个新的 store 实例
const store = createStore<GlobalDataProps>({
  state() {
    return {
      columns: testData as ColumnProps[],
      posts: testPosts as PostProps[],
      user: {
        isLogin: false
      }
    }


  },
  mutations: {
    loginTap(state) {
      state.user = {
        ...state.user,
        isLogin: true,
        name: '李大壮',
      }
    }
  }
})
export default store
