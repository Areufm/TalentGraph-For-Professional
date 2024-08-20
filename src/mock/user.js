// mock/user.js
export default [
  // 模拟登录获取 token
  {
    url: "/api/login", // 请求的 URL 地址
    method: "post", // 请求方法
    response: (req) => {
      const { username, password } = req.body;
      if (username === "xiaohm" && password === "123456") {
        return {
          code: 200,
          data: {
            accessToken: "fake-access-token",
            refreshToken: "fake-refresh-token",
            userId: 1,
          },
          message: "Login successful",
        };
      } else {
        return {
          code: 400,
          message: "Invalid username or password",
        };
      }
    },
  },

  // 模拟获取用户信息
  {
    url: "/api/getUserInfo",
    method: "get",
    response: (req) => {
      const { accessToken } = req.headers;
      if (accessToken === "fake-access-token") {
        return {
          code: 200,
          data: {
            id: 1,
            name: "小红帽",
            age: "19",
            phone: "18472638093",
          },
        };
      } else {
        return {
          code: 401,
          message: "Invalid token",
        };
      }
    },
  },

  // 模拟刷新 token
  {
    url: "/api/refreshToken",
    method: "post",
    response: (req) => {
      const { refreshToken } = req.body;
      if (refreshToken === "fake-refresh-token") {
        return {
          code: 200,
          data: {
            accessToken: "new-fake-access-token",
            refreshToken: "new-fake-refresh-token",
          },
          message: "Token refreshed successfully",
        };
      } else {
        return {
          code: 401,
          message: "Invalid refresh token",
        };
      }
    },
  },
];
