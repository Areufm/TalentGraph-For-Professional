import request from "@/utils/request";

export const getHotWorkTags = () => {
  return request({
    url: "/api/info/tags",
    method: "get",
  });
};
