import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from '@/router'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from '@/store'
axios.defaults.baseURL = 'http://apis.imooc.com/api'
axios.interceptors.request.use(config => {
  config.params = {
    ...config.params,
    icode: 'B69F14E65F68760F'
  }
  return config
})
axios.get('/columns', { params: { key: 90 } }).then(res => console.log(res.data))
const app = createApp(App)
app.use(router).use(store)
  .mount('#app')
