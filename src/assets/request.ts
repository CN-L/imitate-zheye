import axios from 'axios'
import store from '@/store'
const Icode = 'B69F14E65F68760F'
const request = axios.create({
  baseURL: 'http://apis.imooc.com/api',
  timeout: 1000 * 30,
  headers: {
    'Content-ype': 'application/json;charset=utf-8'
  }
})

/*
 * request.defaults.headers.common['Authorization'] = '234'
 * 添加请求拦截器
 */
request.interceptors.request.use(function (config) {
  //  携带token方法之一 请求拦截器+
  /*
   * if(store.state.token) {
   *   config.headers = {
   *     ...config.headers,
   *     Authorization: store.state.token
   *   }
   * }
   */
  store.commit('setLoading', true)
  store.commit('setError', {
    status: false, error: ''
  })
  // 在发送请求之前做些什么
  config.params = {
    ...config.params,
    icode: Icode
  }
  if(config.data instanceof FormData) {
    config.data.append('icode', Icode)
  } else {
    config.data = { ...config.data, icode: Icode }
  }

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  setTimeout(() => {
    store.commit('setLoading', false)
  }, 200)
  // 对响应数据做点什么
  return response
}, function (e) {
  const { error } = e.response.data
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(error)
})
export default request
