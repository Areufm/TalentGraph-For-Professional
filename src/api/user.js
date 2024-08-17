import request from "@/utils/request";

/**
 *
 * @param data
 * @returns
 */
export const login = (data) => {
  return request({
    url: "/auth/auth/login", // mock接口
    method: "post",
    data,
  });
};

/**
 *
 * @param deptId
 * @param file
 * @returns
 */
export function importFile(deptId, file) {
  const formData = new FormData();
  formData.append("file", file);
  return request({
    url: "/api/v1/users/_import",
    method: "post",
    params: { deptId: deptId },
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

/**
 *
 * @param accessToken
 * @returns
 */
export const getUserInfoByToken = (accessToken) => {
  return request({
    url: "/auth/auth/getUserInfoByToken", // mock接口
    method: "get",
    params: {
      accessToken,
    },
  });
};

/**
 *
 * @param refreshToken
 * @returns
 */
export const refreshToken = (refreshToken) => {
  return request({
    url: `/auth/auth/refreshToken/`, // mock接口
    method: "get",
    params: {
      refreshToken,
    },
  });
};

/**
 *
 * @param data
 * @returns
 */
export const loginByCode = (data) => {
  return request({
    url: "/auth/auth/loginByCode", // mock接口
    method: "post",
    data,
  });
};

/**
 *
 * @param currentPage
 * @param pageSize
 * @param userId
 * @param type
 * @returns
 */
export const getTrendPageByUser = (currentPage, pageSize, userId, type) => {
  return request({
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
 * @param userId
 * @returns
 */
export const getUserById = (userId) => {
  return request({
    url: `/platform/user/getUserById`, // mock接口
    method: "get",
    params: {
      userId,
    },
  });
};

/**
 *
 * @param userId
 * @returns
 */
export const loginOut = (userId) => {
  return request({
    url: `/auth/auth/loginOut`, // mock接口
    method: "get",
    params: {
      userId,
    },
  });
};
