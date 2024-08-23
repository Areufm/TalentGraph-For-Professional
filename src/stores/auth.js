import { defineStore } from "pinia";
import { ref } from "vue";
import { storage } from "@/utils/storage";

// 使用setup模式
export const useAuthStore = defineStore(
  "auth",
  () => {
    let isLogin = ref(false);
    const userInfo = ref({
      name: "",
      age: "",
      phone: "",
      email: "",
      area: "",
      education: [
        {
          school_name: "",
          school_time: ["", ""],
          school_degree: "",
        },
      ],
      work: "",
      skill: [],
      info: "",
    });

    const login = () => {
      // 登录逻辑
      isLogin.value = true;
      storage.set("isLoggedIn", "true");
    };

    const logout = () => {
      // 登出逻辑
      isLogin.value = false;
      window.localStorage.clear();
      storage.remove("auth");
    };

    const setUserInfo = (newUserInfo) => {
      Object.assign(userInfo.value, newUserInfo);
    };

    return {
      isLogin,
      userInfo,
      login,
      logout,
      setUserInfo,
    };
  },
  {
    persist: {
      enabled: true,
      key: "auth", // 保存的key
    },
  }
);

// export const useAuthStore = defineStore("auth", {
//   state: () => ({
//     isLogin: false,
//     userInfo: {
//       name: "",
//       age: "",
//       phone: "",
//       email: "",
//       area: "",
//       education: [
//         {
//           school_name: "",
//           school_time: ["", ""],
//           school_degree: "",
//         },
//       ],
//       work: "",
//       skill: [],
//       info: "",
//     },
//   }),
//   actions: {
//     login() {
//       this.isLogin = true;
//       localStorage.setItem("isLoggedIn", "true");
//       // 登录逻辑
//     },
//     logout() {
//       this.isLogin = false;
//       localStorage.removeItem("isLoggedIn");
//       // 登出逻辑
//     },
//     setUserInfo(newUserInfo) {
//       Object.assign(this.userInfo, newUserInfo);
//     },
//   },
//   persist: true,
// });
