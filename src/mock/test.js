export default [
  {
    url: "/api/test",
    method: "post",
    response: () => {
      return {
        code: 200,
        data: "Test response",
        message: "Success",
      };
    },
  },
];
