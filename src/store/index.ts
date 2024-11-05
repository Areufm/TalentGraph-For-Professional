import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"; //引入持久化插件
import type { App } from "vue";

const store = createPinia();
store.use(piniaPluginPersistedstate); //将插件添加到 pinia 实例上

// 全局注册 store
export function setupStore(app: App<Element>) {
  app.use(store);
}
export { store };
