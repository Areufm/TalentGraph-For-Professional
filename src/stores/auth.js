import { defineStore } from "pinia";
import { ref, onBeforeMount } from "vue";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLogin: false,
  }),
  actions: {
    login() {
      this.isLogin = true;
      localStorage.setItem("isLoggedIn", "true");
      // 这里添加你的登录逻辑，如调用接口验证等
    },
    logout() {
      this.isLogin = false;
      localStorage.removeItem("isLoggedIn");
      // 这里添加登出逻辑
    },
  },
});
