import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style/element-plus-theme.css'
import './style/layout.css'
import App from './App.vue'
import router from './router'
import { setupGlobalDialogManager } from './utils/dialogManager'
import { initApiConfig } from './utils/apiConfig'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)

// 初始化API配置
initApiConfig()

// 初始化全局弹窗管理器
setupGlobalDialogManager()

app.mount('#app') 