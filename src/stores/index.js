import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"; //引入持久化插件

const stores = createPinia();
stores.use(piniaPluginPersistedstate); //将插件添加到 pinia 实例上

// 全局注册 store
export function setupStore(app) {
  app.use(stores);
}
export { stores };
