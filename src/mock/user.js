// mock/user.js
export default [
  {
    url: "/api/getUser", // 请求的API地址
    method: "get", // 请求方式
    response: () => {
      return {
        code: 200,
        data: {
          name: "John Doe",
          age: 30,
        },
      };
    },
  },
  {
    url: "/api/updateUser", // 另一个API地址
    method: "post", // 请求方式
    response: (req) => {
      const { name, age } = req.body;
      return {
        code: 200,
        message: "User updated successfully",
        data: {
          name,
          age,
        },
      };
    },
  },
];
