import { createApp } from 'vue'
import './assets/css/style.css'
import './assets/css/global.css'
import './assets/css/booking.css'
import './assets/css/v-dropdown-menu.css'

import App from './App.vue'

const app = createApp(App);

app.config.globalProperties.$appKey = document.currentScript.getAttribute('app');
app.mount('#app');