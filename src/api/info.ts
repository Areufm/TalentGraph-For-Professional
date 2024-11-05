import request from "@/utils/request";
import { HotWorksRequest } from "@/types/mock";

export const getHotWorkTags = () => {
  return request({
    url: "/api/info/tags",
    method: "get",
  });
};

export const getHotWorks = (data: HotWorksRequest) => {
  return request({
    url: "/api/info/hotWorks",
    method: "post",
    data,
  });
};
