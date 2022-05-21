
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
const postAndCommit = async (url: string, mutationsName: string, commit: Commit, payLoad: any) => {
  const { data } = await request.post(url, payLoad)
  commit(mutationsName, data)
  return data
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
export interface UserProps {
  isLogin: boolean,
  nickName?: string,
  _id?: number,
  _column?: number,
  email?: string
}
interface ImgProps {
  _id?: string,
  url?: string,
  createdAt?: string
}
export interface GlobalDataProps {
  token: string,
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
      token: '',
      loading: false,
      columns: [] as ColumnProps[],
      posts: [] as PostProps[],
      user: {
        isLogin: false
      }
    }


  },
  getters: {
    biggerColumnLen: state => state.columns.filter(c => c._id > 2).length,
    getColumnById: state => (id: number) => state.columns.find(todo => todo._id === id),
    getPostNyCid: state => (cid: string) => state.posts.filter(post => post.column === cid)
  },
  mutations: {
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
    },
    serUser(state, data) {
      state.user = { isLogin: true, ...data.data }
    },
    setLogin(state, data) {
      // 添加token
      const { token } = data.data
      state.token = token
      request.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  },
  actions: {
    login({ commit }, data) {
      return postAndCommit('/user/login', 'setLogin', commit, data)
    },
    fetchColumns({ commit }) {
      getAndCommit('/columns', 'setColumns', commit)
    },
    fetchColumn({ commit }, id) {
      getAndCommit(`/columns/${id}`, 'setColumn', commit)
    },
    fetchPost({ commit }, id) {
      getAndCommit(`/columns/${id}/posts`, 'setPost', commit)
    },
    fetchCurrentUser({ commit }) {
      getAndCommit('/user/current', 'serUser', commit)
    },
    loginAndFetch({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => dispatch('fetchCurrentUser'))
    }

  }
})
export default store
