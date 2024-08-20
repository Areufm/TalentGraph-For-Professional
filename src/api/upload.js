// // 假设这个文件位于 api/upload.js
// import request from "@/utils/request";

// export const getUploadFile = (file) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   return request({
//     url: "/api/upload", // 确保路径与 mock 文件中定义的路径一致
//     method: "post",
//     data: formData,
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };

// 假设这个文件位于 api/upload.js
import axios from "axios";

export const getUploadFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios({
    url: "/api/upload", // 确保路径与 mock 文件中定义的路径一致
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
