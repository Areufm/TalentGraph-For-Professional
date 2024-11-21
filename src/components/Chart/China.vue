<!-- 链接：https://blog.csdn.net/liuzaixi/article/details/136674560?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-1-136674560-blog-133934291.235^v43^pc_blog_bottom_relevance_base1&spm=1001.2101.3001.4242.2&utm_relevant_index=4 -->
<template>
  <div style="width: 100%; height: 100%; margin: 20px auto auto auto">
    <div id="mapDom" style="width: 100%; height: 100%"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, nextTick, onMounted } from "vue";
import * as echarts from "echarts";
import { getChina } from "@/api/chart";

interface DataItem {
  name: string;
  value: number;
  itemStyle?: {
    normal: {
      opacity: number;
      label: {
        show: boolean;
      };
    };
  };
}

let dataList = ref<DataItem[]>([]);
const china = ref();
let myChart: echarts.ECharts | null = null;

const getChinaData = async () => {
  try {
    const res = await getChina();
    china.value = res.data;
    // 确保获取到地图数据后再初始化
    await initMap();
  } catch (error) {
    console.error("获取地图数据失败:", error);
  }
};

const initMap = async () => {
  if (!china.value) return;

  const mapDom = document.querySelector("#mapDom");
  if (!mapDom) return;

  myChart = echarts.init(mapDom as HTMLElement);
  // 使用实际的地图数据注册
  echarts.registerMap("china", china.value);

  const options = {
    title: {
      text: "目标职业分布图",
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}<br/>{c} (工作岗位)",
    },
    toolbox: {
      show: true,
      orient: "vertical",
      left: "right",
      top: "center",
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {},
      },
    },
    visualMap: {
      min: 0,
      max: 1000,
      text: ["High", "Low"],
      realtime: false,
      calculable: true,
      inRange: {
        color: ["LightSkyBlue", "DodgerBlue", "MediumBlue", "MidnightBlue"],
      },
    },
    series: [
      {
        name: "中国",
        type: "map",
        map: "china",
        label: {
          show: false,
        },
        data: dataList.value,
      },
    ],
  };

  myChart.setOption(options);
};
onMounted(async () => {
  dataList.value = [
    { name: "北京", value: 290 },
    { name: "天津", value: 320 },
    { name: "河北", value: 240 },
    { name: "山西", value: 520 },
    { name: "内蒙古", value: 120 },
    { name: "辽宁", value: 210 },
    { name: "吉林", value: 620 },
    { name: "黑龙江", value: 20 },
    { name: "上海", value: 220 },
    { name: "江苏", value: 820 },
    { name: "浙江", value: 320 },
    { name: "安徽", value: 520 },
    { name: "福建", value: 120 },
    { name: "江西", value: 620 },
    { name: "山东", value: 920 },
    { name: "河南", value: 220 },
    { name: "湖北", value: 720 },
    { name: "湖南", value: 210 },
    { name: "广东", value: 20 },
    { name: "广西", value: 20 },
    { name: "海南", value: 240 },
    { name: "重庆", value: 20 },
    { name: "四川", value: 240 },
    { name: "贵州", value: 420 },
    { name: "云南", value: 320 },
    { name: "西藏", value: 20 },
    { name: "陕西", value: 240 },
    { name: "甘肃", value: 920 },
    { name: "青海", value: 720 },
    { name: "宁夏", value: 120 },
    { name: "新疆", value: 420 },
    { name: "台湾", value: 230 },
    { name: "香港", value: 420 },
    { name: "澳门", value: 210 },
    {
      name: "南海诸岛",
      value: 0,
      itemStyle: {
        normal: {
          opacity: 0,
          label: {
            show: false,
          },
        },
      },
    },
  ];
  // 等待 DOM 更新
  await nextTick();
  // 获取地图数据并初始化
  await getChinaData();
});

// 组件卸载时清理图表实例
onUnmounted(() => {
  if (myChart) {
    myChart.dispose();
    myChart = null;
  }
});
</script>
<style></style>
