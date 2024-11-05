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

const chart = ref();

onMounted(() => {
  var myChart = echarts.init(chart.value);
  // 指定图表的配置项和数据
  let option = {
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
        // { name: "Customer Support", max: 38000 },
        // { name: "Development", max: 52000 },
        // { name: "Marketing", max: 25000 },
      ],
    },
    series: [
      {
        name: "Budget vs spending",
        type: "radar",
        data: [
          {
            value: [0.7, 0.8, 0.6],
            name: "个人值",
          },
          {
            value: [0.65, 0.5, 0.4],
            name: "平均值",
          },
        ],
      },
    ],
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
});
</script>
