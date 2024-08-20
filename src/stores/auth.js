// import { defineStore } from "pinia";
// import { onBeforeMount } from "vue";

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
//       skill: "",
//       info: "",
//     },
//   }),
//   actions: {
//     login() {
//       this.isLogin = true;
//       localStorage.setItem("isLoggedIn", "true");
//       localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
//       // 这里添加你的登录逻辑，如调用接口验证等
//     },
//     logout() {
//       this.isLogin = false;
//       localStorage.removeItem("isLoggedIn");
//       localStorage.removeItem("userInfo");
//       // 这里添加登出逻辑
//     },
//     setUserInfo(newUserInfo) {
//       Object.assign(this.userInfo, newUserInfo);
//       localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
//     },
//     restoreState() {
//       const isLoggedIn = localStorage.getItem("isLoggedIn");
//       const userInfo = localStorage.getItem("userInfo");

//       if (isLoggedIn) {
//         this.isLogin = true;
//       }
//       if (userInfo) {
//         this.userInfo = JSON.parse(userInfo);
//       }
//     },
//   },
//   // 恢复状态
//   onBeforeMount() {
//     this.restoreState();
//   },
//   persist: true,
// });

import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLogin: false,
    userInfo: {
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
    },
  }),
  actions: {
    login() {
      this.isLogin = true;
      localStorage.setItem("isLoggedIn", "true");
      // 登录逻辑
    },
    logout() {
      this.isLogin = false;
      localStorage.removeItem("isLoggedIn");
      // 登出逻辑
    },
    setUserInfo(newUserInfo) {
      Object.assign(this.userInfo, newUserInfo);
    },
  },
  persist: true,
});
