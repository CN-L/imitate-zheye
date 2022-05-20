
import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from '@/testData'
interface UserProps {
  isLogin: boolean,
  name?: string,
  id?: number,
  columnId?: number
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
        isLogin: false,
        columnId: 1,
        name: '张三',
      }
    }


  },
  getters: {
    biggerColumnLen: state => state.columns.filter(c => c.id > 2).length,
    getColumnById: state => (id: number) => state.columns.find(todo => todo.id === id),
    getPostNyCid: state => (cid: number) => state.posts.filter(post => post.columnId === cid)
  },
  mutations: {
    loginTap(state) {
      state.user = {
        ...state.user,
        isLogin: true,
        name: '李大壮',
      }
    },
    createPost(state, newPost) {
      console.log(newPost)
      state.posts.push(newPost)
      console.log(state.posts, '900000')
    }
  }
})
export default store
