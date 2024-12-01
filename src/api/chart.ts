import request from "@/utils/request";

// 获取推荐岗位知识图谱数据
export const getRecommendGraph = (data: any) => {
  return request({
    url: "/api/chart/getRecommendGraph",
    method: "post",
    data,
  });
};

// 获取个人知识图谱数据
export const getUserGraph = () => {
  return request({
    url: "/api/chart/getUserGraph",
    method: "get",
  });
};

// 获取个人雷达图数据
export const getRadar = () => {
  return request({
    url: "/api/chart/getRadar",
    method: "get",
  });
};

// 获取全国岗位数量数据
export const getChina = () => {
  return request({
    url: "/api/chart/getChina",
    method: "get",
  });
};
