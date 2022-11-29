import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from './pinia'

// 插件
// 简洁：mutation，嵌套模块
// 原子性：单独创建、统一管理
const pinia = createPinia()

createApp(App).use(pinia).mount('#app')
