
import { createStore } from 'vuex'
import { PostProps } from '@/testData'
import { apiGetList } from '@/apis'
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
  user: UserProps
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
    },
    setColumns(state, data) {
      state.columns = data.data.list
    }
  },
  actions: {
    async fetchColumns(content, form?) {
      const { data } = await apiGetList(form)
      content.commit('setColumns', data)
    }

    /*
     * fetchColumns({ commit }, data?) {
     *   return new Promise((resove, reject) => {
     *     apiGetList(data).then(res => {
     *       console.log(res, '9099')
     *       commit('setColumns', res.data)
     *       resove(res.data)
     *     })
     *       .catch(error => {
     *         reject(error)
     *       })
     *   })
     * }
     */
  }
})
export default store
