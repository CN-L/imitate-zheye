
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
  getters: {
    biggerColumnLen: state => state.columns.filter(c => c.id > 2).length,
    getColumnById: state => (id: number) => state.columns.find(todo => todo.id === id),
    getPostNyCid: state => (cid: number) => state.posts.filter(post => post.id === cid)
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
