import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { setupStore } from "./store";
import '@/assets/style/global.scss';

const app = createApp(App);
setupStore(app);
app.use(router);
app.mount("#app");
