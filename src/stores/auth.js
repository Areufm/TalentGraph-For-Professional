import { defineStore } from "pinia";
import { ref } from "vue";
import { storage } from "@/utils/storage";
import { stores } from "@/stores";

// 使用setup模式
export const authStore = defineStore(
  "auth",
  () => {
    let isLogin = ref(false);
    const token = ref("");
    const userInfo = ref({
      id: "",
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

    const updateUserInfo = (newUserInfo) => {
      Object.assign(userInfo.value, newUserInfo);
    };

    const getToken = () => {
      return storage.get("accessToken");
    };

    const getUserInfo = () => {
      return storage.get("userInfo");
    };

    const setUserInfo = (data) => {
      storage.set("userInfo", data);
    };

    // const isLogin = () => {
    //   const user = storage.get("userInfo");
    //   return user != null && user != undefined;
    // };

    const getNewToken = (token) => {
      return (
        new Promise() <
        any >
        ((resolve, reject) => {
          refreshToken(token)
            .then((res) => {
              resolve(res);
            })
            .catch((error) => {
              reject(error);
            });
        })
      );
    };

    return {
      token,
      isLogin,
      userInfo,
      login,
      logout,
      updateUserInfo,
      getToken,
      getNewToken,
      getUserInfo,
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

export function useAuthStore() {
  return authStore(stores);
}

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
