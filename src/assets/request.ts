import axios from 'axios'
import store from '@/store'
const Icode = 'B69F14E65F68760F'
const request = axios.create({
  baseURL: 'http://apis.imooc.com/api',
  timeout: 1000 * 30,
  headers: {},
})

/*
 * request.defaults.headers.common['Authorization'] = '234'
 * 添加请求拦截器
 */
request.interceptors.request.use(function (config) {
  store.commit('setLoading', true)
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
  store.commit('setLoading', false)
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default request
