<template>
  <div
    ref="chart"
    class="echartDiv"
    style="width: 100%; height: 100%; margin-top: 20px"
  ></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts/core";
import { TitleComponent, LegendComponent } from "echarts/components";
import { RadarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer]);

import { ref, onMounted } from "vue";
import { getRadar } from "@/api/chart";

const chart = ref();
const radarData = ref([]);
let myChart: echarts.ECharts | null = null;

// 获取雷达图数据
const getRadarData = async () => {
  const res = await getRadar();
  radarData.value = res.data;
};

onMounted(() => {
  getRadarData();
});

// 初始化图表配置
const initChart = () => {
  if (!radarData.value.length) return;

  myChart = echarts.init(chart.value);
  const option = {
    title: {
      text: "能力数据图",
    },
    legend: {
      data: ["个人值", "平均值"],
      top: 0,
    },
    radar: {
      shape: "circle",
      indicator: [
        { name: "能力评分", max: 1 },
        { name: "学历评分", max: 1 },
        { name: "地区评分", max: 1 },
      ],
    },
    series: [
      {
        name: "Budget vs spending",
        type: "radar",
        data: radarData.value,
      },
    ],
  };
  myChart.setOption(option);
};
// 监听数据变化
watch(
  radarData,
  () => {
    if (radarData.value.length > 0) {
      initChart();
    }
  },
  { deep: true }
);

// 组件卸载时销毁图表实例
onUnmounted(() => {
  if (myChart) {
    myChart.dispose();
    myChart = null;
  }
});
</script>
