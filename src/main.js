import '@/assets/adminlte/css/adminlte.css';
import { createApp } from 'vue'
import App from './App.vue'
export const apiUrl = 'http://localhost:8000/api/worker';
export const anotherUrl = 'http://localhost:8000/api/cv_projects';
createApp(App).mount('#app')
