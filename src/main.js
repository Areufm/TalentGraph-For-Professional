import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";

const app = createApp(App);
const store = createPinia();

app.use(store);
app.use(router);

app.mount("#app");
