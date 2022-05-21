
import { createStore, Commit } from 'vuex'

/*
 * import { PostProps } from '@/testData'
 * import { apiGetList, apiGetColumn, apiFetchPost } from '@/apis'
 */
import request from '@/assets/request'
const getAndCommit = async (url: string, mutationsName: string, commit: Commit) => {
  const { data } = await request.get(url)
  commit(mutationsName, data)

}
export interface PostProps {
  _id: string,
  title: string,
  excerpt?: string,
  content?: string,
  image?: ImgProps,
  createdAt: string,
  column: string
}
interface UserProps {
  isLogin: boolean,
  name?: string,
  id?: number,
  columnId?: number
}
interface ImgProps {
  _id?: string,
  url?: string,
  createdAt?: string
}
export interface GlobalDataProps {
  columns: ColumnProps[],
  posts: PostProps[],
  user: UserProps,
  loading: boolean
}
export interface ColumnProps {
  _id: number,
  title: string;
  avatar?: ImgProps,
  description: string
}
// 创建一个新的 store 实例
const store = createStore<GlobalDataProps>({
  state() {
    return {
      loading: false,
      columns: [] as ColumnProps[],
      posts: [] as PostProps[],
      user: {
        isLogin: true,
        columnId: 1,
        name: '张三',
      }
    }


  },
  getters: {
    biggerColumnLen: state => state.columns.filter(c => c._id > 2).length,
    getColumnById: state => (id: number) => state.columns.find(todo => todo._id === id),
    getPostNyCid: state => (cid: string) => state.posts.filter(post => post.column === cid)
  },
  mutations: {
    loginTap(state) {
      state.user = {
        ...state.user,
        isLogin: true,
        name: '李大壮',
      }
    },
    setLoading(state, status) {
      state.loading = status
    },
    createPost(state, newPost) {
      state.posts.push(newPost)
    },
    setColumns(state, data) {
      state.columns = data.data.list
    },
    setColumn(state, data) {
      state.columns = [data.data]
    },
    setPost(state, data) {
      state.posts = data.data.list
    }
  },
  actions: {
    fetchColumns({ commit }) {
      getAndCommit('/columns', 'setColumns', commit)
    },
    fetchColumn({ commit }, id) {
      getAndCommit(`/columns/${id}`, 'setColumn', commit)
    },
    fetchPost({ commit }, id) {
      getAndCommit(`/columns/${id}/posts`, 'setPost', commit)
    }

  }
})
export default store
