import { createPinia } from "pinia";

const stores = createPinia();

// 全局注册 store
export function setupStore(app) {
  app.use(stores);
}

export { stores };
