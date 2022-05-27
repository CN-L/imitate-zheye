
import { createStore, Commit } from 'vuex'
import request from '@/assets/request'
const getAndCommit = async (url: string, mutationsName: string, commit: Commit) => {
  const { data } = await request.get(url)
  commit(mutationsName, data)
  return data

}
export interface GloablErrorProps {
  status: boolean,
  message?: string
}
const postAndCommit = async (url: string, mutationsName: string, commit: Commit, payLoad: any) => {
  const { data } = await request.post(url, payLoad)
  commit(mutationsName, data)
  return data
}
export interface ResponType<T = never> {
  code: number,
  msg: string,
  data: T
}
export interface PostProps<T = null>{
  _id?: string,
  title: string,
  excerpt?: string,
  content?: string,
  image?: ImgProps | string,
  createdAt?: string,
  column: string
  author?: string | T
}
export interface UserProps {
  isLogin: boolean,
  nickName?: string,
  _id?: number,
  column?: string,
  email?: string
}
export interface ImgProps {
  _id?: string,
  url?: string,
  createdAt?: string
}
export interface GlobalDataProps {
  error: GloablErrorProps,
  token: string,
  columns: ColumnProps[],
  posts: PostProps[],
  user: UserProps,
  currentPost: PostProps,
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
      error: {
        status: false
      },
      token: localStorage.getItem('token') || '',
      loading: false,
      columns: [] as ColumnProps[],
      posts: [] as PostProps[],
      currentPost: {} as PostProps,
      user: {
        isLogin: false
      }
    }


  },
  getters: {
    biggerColumnLen: state => state.columns.filter(c => c._id > 2).length,
    getColumnById: state => (id: number) => state.columns.find(todo => todo._id === id),
    getPostNyCid: state => (cid: string) => state.posts.filter(post => post.column === cid),
    currendPostDetail: state => (cid: string) => state.posts.filter(post => post._id = cid)
  },
  mutations: {
    setError(state, data: GloablErrorProps) {
      state.error = data
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
    },
    setUser(state, data) {
      state.user = { isLogin: true, ...data.data }
    },
    setLogin(state, data) {
      // 添加token
      const { token } = data.data
      localStorage.setItem('token', token)
      state.token = token
      request.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    getPostDetail(state, data) {
      state.currentPost = data.data
    },
    // 退出登陆
    setLoginOut(state) {
      localStorage.clear()
      state.token = ''
      state.user.isLogin = false
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
      return getAndCommit('/user/current', 'setUser', commit)
    },
    createPost({ commit }, data) {
      return postAndCommit('/posts', 'createPost', commit, data)
    },
    // 组合actions
    loginAndFetch({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => dispatch('fetchCurrentUser'))
    },
    // 文章详情
    getAritcle({ commit }, id) {
      return getAndCommit(`/posts/${id}`, 'getPostDetail', commit)
    }

  }
})
export default store
