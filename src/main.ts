import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { setupStore } from "./store";
import "@/assets/style/global.scss";
import VueLazyload from "vue-lazyload";

import loadingImage from "@/assets/img/404.webp"; // 导入加载时的图片
import errorImage from "@/assets/img/404.webp"; // 导入加载失败时的图片

const app = createApp(App);
setupStore(app);
app.use(router);
app.use(VueLazyload, {
  loading: loadingImage, // 使用导入的加载时图片
  error: errorImage, // 使用导入的加载失败图片
});
app.mount("#app");
