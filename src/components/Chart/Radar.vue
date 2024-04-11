<template>
  <div
    ref="chart"
    class="echartDiv"
    style="width: 100%; height: 100%; margin-top: 20px"
  ></div>
</template>
<script setup>
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
      text: "数据图",
    },
    legend: {
      data: ["线条1", "线条2"],
      top: 260,
    },
    radar: {
      shape: "circle",
      indicator: [
        { name: "数据1", max: 1 },
        { name: "数据2", max: 1 },
        { name: "数据3", max: 1 },
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
            value: [0.6, 0.2, 0.9],
            name: "线条1",
          },
          {
            value: [1, 0.4, 0.3],
            name: "线条2",
          },
        ],
      },
    ],
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
});
</script>
