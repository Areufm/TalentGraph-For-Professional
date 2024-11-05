import { defineStore } from "pinia";
import { ref } from "vue";
import { storage } from "@/utils/storage";
import { store } from "@/store";
import type { User } from "@/types/user";
import { refreshToken } from "@/api/user";

// 使用setup模式
export const authStore = defineStore(
  "authStore",
  () => {
    let isLogin = ref<boolean>(false);
    const token = ref<string>("");
    const userInfo = ref<User>({
      id: 0,
      name: "",
      age: 1,
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

    const updateUserInfo = (newUserInfo: User) => {
      Object.assign(userInfo.value, newUserInfo);
    };

    const getToken = () => {
      return storage.get("accessToken");
    };

    const getUserInfo = (): User => {
      return storage.get("userInfo") as User;
    };

    const setUserInfo = (data: User) => {
      storage.set("userInfo", data);
    };

    // const isLogin = () => {
    //   const user = storage.get("userInfo");
    //   return user != null && user != undefined;
    // };

    const getNewToken = (token: string) => {
      return new Promise<any>((resolve, reject) => {
        refreshToken(token)
          .then((res: any) => {
            resolve(res);
          })
          .catch((error: any) => {
            reject(error);
          });
      });
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
      key: "auth", // 保存的key
    },
  }
);

export function useAuthStore() {
  return authStore(store);
}
