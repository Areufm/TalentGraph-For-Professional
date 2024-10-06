export default [
  // 模拟主页获取热门工作标签
  {
    url: "/api/info/tags",
    method: "get",
    response: (req) => {
      return {
        code: 200,
        data: [
          "python",
          "ml工程师",
          "运维",
          "测试",
          "Java",
          "C#",
          "深度学习",
          "教师",
          "电子",
        ],
        message: "Get HotWork Tags successfully",
      };
    },
  },
];
