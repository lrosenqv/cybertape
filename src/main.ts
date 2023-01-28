import { createApp } from 'vue'
import { store } from './store/store'
import App from './App.vue'
import router from './router'

import 'normalize.css'
import '@/style/base.css'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
