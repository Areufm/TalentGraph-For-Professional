import axios from "axios";

export const getUploadFile = (file: File) => {
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
