import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/dist/index.css'
import { globalRegister } from './global'
import { setupStore } from './store'

const app = createApp(App).use(globalRegister).use(store).use(router).mount('#app')
setupStore()


declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
      $filters:any
    }
} 

