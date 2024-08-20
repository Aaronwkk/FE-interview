import { createApp } from 'vue'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import App from './App.vue'

import pinia from './store'

createApp(App).use(router).use(pinia).use(Antd).mount('#app')
