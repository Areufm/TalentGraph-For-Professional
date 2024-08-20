import { defineStore } from "pinia";
import { ref } from "vue";
import { storage } from "@/utils/storage";
import { refreshToken } from "@/api/user";
import { stores } from "@/stores";

// 使用setup模式定义
export const userStore = defineStore("userStore", () => {
  const token = ref("");

  const getToken = () => {
    return storage.get("accessToken");
  };

  const getUserInfo = () => {
    return storage.get("userInfo");
  };

  const setUserInfo = (data) => {
    storage.set("userInfo", data);
  };

  const isLogin = () => {
    const user = storage.get("userInfo");
    return user != null && user != undefined;
  };

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

  const loginOut = () => {
    window.localStorage.clear();
  };

  return {
    token,
    getToken,
    getNewToken,
    getUserInfo,
    setUserInfo,
    loginOut,
    isLogin,
  };
});

export function useUserStore() {
  return userStore(stores);
}
