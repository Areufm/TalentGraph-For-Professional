import request from "@/utils/request";
import type { UserLogin } from "@/types/user";

/**
 *
 * @param data
 * @returns
 */
export const login = (data: UserLogin) => {
  return request<any>({
    url: "/api/login", // mock接口
    method: "post",
    data,
  });
};

/**
 *
 * @param accessToken
 * @returns
 */
export const getUserInfoByToken = (accessToken: string) => {
  return request<any>({
    url: "/api/getUserInfo", // mock接口
    method: "get",
    params: {
      accessToken,
    },
  });
};

/**
 *
 * 重新刷新token信息
 * @param refreshToken
 * @returns
 */
export const refreshToken = (refreshToken: string) => {
  return request<any>({
    url: `/api/refreshToken/`, // mock接口
    method: "get",
    params: {
      refreshToken,
    },
  });
};

/**
 *
 * 通过账号密码登录
 * @param data
 * @returns
 */
export const loginByCode = (data: UserLogin) => {
  return request<any>({
    url: "/auth/auth/loginByCode", // mock接口
    method: "post",
    data,
  });
};

/**
 *
 * 获取特定用户的趋势页面数据
 * @param currentPage
 * @param pageSize
 * @param userId
 * @param type
 * @returns
 */
export const getTrendPageByUser = (
  currentPage: number,
  pageSize: number,
  userId: string,
  type: number
) => {
  return request<any>({
    url: `/platform/user/getTrendPageByUser/${currentPage}/${pageSize}`, // mock接口
    method: "get",
    params: {
      userId,
      type,
    },
  });
};

/**
 *
 * 通过id获取用户数据
 * @param userId
 * @returns
 */
export const getUserById = (userId: string) => {
  return request<any>({
    url: `/platform/user/getUserById`, // mock接口
    method: "get",
    params: {
      userId,
    },
  });
};

/**
 *
 * 退出登录
 * @param userId
 * @returns
 */
export const loginOut = (userId: string) => {
  return request<any>({
    url: `/auth/auth/loginOut`, // mock接口
    method: "get",
    params: {
      userId,
    },
  });
};
