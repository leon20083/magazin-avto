import { createApp } from 'vue'
import App from './App.vue';
// import { RouterLink } from 'vue-router';
import { router } from './router/router';
import store from './store/store';
import "./assets/styles/style.sass";
import "./assets/styles/variables.sass";

// createApp(App).use(store).mount('#app')
const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");

