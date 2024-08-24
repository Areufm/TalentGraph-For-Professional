import axios from "axios";
import { ElMessage } from "element-plus";
import { useAuthStore } from "@/stores/auth";
import { storage } from "./storage";

// 刷新 token 后, 将缓存的接口重新请求一次
// 是否正在刷新 token
let isRefreshing = false;

// 存储待重发的请求
let requestsQueue = [];

// 创建baseURL
const baseURL = "/";
// const baseURL = "http://localhost:5173";

// 创建 axios 实例
const service = axios.create({
  // baseURL: import.meta.env.VITE_APP_BASE_API,
  baseURL: baseURL,
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

// 请求拦截器
// 作用：在每次请求发送前，拦截请求并在请求头中自动添加 accessToken 和 userId。
// 效果：确保所有请求都会携带用户的身份信息，避免手动添加 token，提升安全性和开发效率。
service.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore.getToken()) {
      config.headers.accessToken = authStore.getToken();
      // config.headers.userId = authStore.getUserInfo().id;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
// 作用：对服务器返回的响应进行统一处理。
// code === 200: 表示请求成功，直接返回数据。
// code === 501: 表示 token 过期，需要刷新 token，刷新后会重新发送之前失败的请求。
// code === 401: 表示用户认证失败，需重新登录。
// 效果：
// Token 刷新：实现了无感知 token 刷新。如果多个请求同时发出并且 token 过期，第一个请求触发刷新 token，其他请求会等待刷新完成后重新发出，确保所有请求使用最新的 token。
// 登录过期处理：如果返回 401 状态码，提示用户登录过期，并清空本地存储的数据，重定向到登录页面。
service.interceptors.response.use((response) => {
  const { code } = response.data;
  console.log(code);

  // console.log(response, code);
  if (code === 200) {
    return response.data;
  }

  const config = response.config;

  const authStore = useAuthStore();

  if (code === 501) {
    // 无感刷新Token
    if (!isRefreshing) {
      isRefreshing = true;
      storage.set("accessToken", "");
      const refreshToken = storage.get("refreshToken");
      console.log("refreshToken", refreshToken);
      return authStore
        .getNewToken(refreshToken)
        .then(async (rftRes) => {
          console.log("rftRes", rftRes);
          const { accessToken, refreshToken } = rftRes.data;
          storage.set("accessToken", accessToken);
          storage.set("refreshToken", refreshToken);
          config.headers.accessToken = accessToken;
          // 重新请求一下第一个 501 的接口
          const firstReqRes = await service.request(config);
          // token 刷新后将数组的方法重新执行
          requestsQueue.forEach((cb) => cb(accessToken));
          // 队列中的请求执行完毕后，清空数组
          requestsQueue = [];
          return firstReqRes;
        })
        .finally(() => {
          isRefreshing = false;
        });
    } else {
      // 如果正在 refreshToken

      // 如果有多个请求同时发起，第一个请求 401 了，refreshToken 又正在进行中
      // 那么把第一个以外的请求暂存起来
      return new Promise((resolve) => {
        // 用函数形式将 resolve 存入，等待 refreshToken 完成后再执行
        requestsQueue.push((token) => {
          config.headers.Authorization = token;
          resolve(service.request(config));
        });
      });
    }
  } else if (code == 401) {
    ElMessage.error("登录过期，请重新登陆");
    window.localStorage.clear();
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  }
  return Promise.reject(response.data);
});

// 导出 axios 实例
export default service;
