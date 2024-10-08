import request from "@/utils/request";

export const getHotWorkTags = () => {
  return request({
    url: "/api/info/tags",
    method: "get",
  });
};

export const getHotWorks = (data) => {
  return request({
    url: "/api/info/hotWorks",
    method: "post",
    data,
  });
};
