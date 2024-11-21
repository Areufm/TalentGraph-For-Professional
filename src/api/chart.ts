import request from "@/utils/request";

export const getRadar = () => {
  return request({
    url: "/api/chart/getRadar",
    method: "get",
  });
};

export const getChina = () => {
  return request({
    url: "/api/chart/getChina",
    method: "get",
  });
};

export const getUserGraph = () => {
  return request({
    url: "/api/chart/getUserGraph",
    method: "get",
  });
};
