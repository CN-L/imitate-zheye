import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from '@/store'
import 'easymde/dist/easymde.min.css'
const app = createApp(App)
app.use(router).use(store)
  .mount('#app')
