import request from "@/utils/request";
import { HotWorksRequest } from "@/types/mock";

export const getHotWorkTags = () => {
  return request({
    url: "/api/work/tags",
    method: "get",
  });
};

export const getHotWorks = (data: HotWorksRequest) => {
  return request({
    url: "/api/work/hotWorks",
    method: "post",
    data,
  });
};

export const getWorkInfo = (neo4j: number) => {
  return request({
    url: "/api/work/workInfo",
    method: "get",
    params: { neo4j },
  });
};

export const getSearchWorks = (query: string) => {
  return request({
    url: "/api/work/searchWorks",
    method: "get",
    params: { query },
  });
};
