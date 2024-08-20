// mock/upload.js
export default [
  {
    url: "/api/upload",
    method: "post",
    response: (req) => {
      return {
        code: 200,
        data: {
          name: "John Doe",
          age: 30,
          phone: "123-456-7890",
          email: "johndoe@example.com",
          area: "",
          education: "",
          work: "",
          skill: "",
          info: "Experienced front-end developer",
        },
        message: "File uploaded successfully",
      };
    },
  },
];
