import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import router from './router'
import './assets/style.css'
import { i18n } from './i18n.js'

const app = createApp(App)

app.use(MotionPlugin)
app.use(router)
app.use(i18n)

app.mount('#app')