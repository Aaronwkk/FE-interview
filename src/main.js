import { createApp } from 'vue'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import App from './App.vue'

import { createPinia } from 'pinia'
const pinia = createPinia()

// 暂时在这里注册路由，后期会做调整
import menu from  './store/menu'
import initRouter from './router/generator';

initRouter(menu)

createApp(App).use(router).use(pinia).use(Antd).mount('#app')
