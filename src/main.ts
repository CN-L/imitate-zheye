import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import 'bootstrap/dist/css/bootstrap.min.css'
import { apiGetList } from '@/apis'
apiGetList({ key: 90 }).then(res => console.log(res.data))
import store from '@/store'
const app = createApp(App)
app.use(router).use(store)
  .mount('#app')
