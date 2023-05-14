import { createApp } from 'vue'

import App from './App.vue'

import router from './router'
import useAppPinia from './stores'

function setupBoot() {
  const app = createApp(App)
  useAppPinia(app)
  app.use(router)
  app.mount('#app')
}

setupBoot()
