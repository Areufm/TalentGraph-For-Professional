<template>
  <div ref="chart" class="echartDiv" style="width: 100%; height: 400px"></div>
</template>

<script setup>
import * as echarts from "echarts/core";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from "echarts/components";
import { GraphChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  GraphChart,
  CanvasRenderer,
]);

import { ref, onMounted } from "vue";

const chart = ref();

onMounted(() => {
  var myChart = echarts.init(chart.value);
  // 指定图表的配置项和数据
  var option;

  const axisData = [
    "Mon",
    "Tue",
    "Wed",
    "Very Loooong Thu",
    "Fri",
    "Sat",
    "Sun",
  ];
  const data = axisData.map(function (item, i) {
    return Math.round(Math.random() * 1000 * (i + 1));
  });
  const links = data.map(function (item, i) {
    return {
      source: i,
      target: i + 1,
    };
  });
  links.pop();
  option = {
    title: {
      text: "Graph on Cartesian",
    },
    tooltip: {},
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: axisData,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        type: "graph",
        layout: "none",
        coordinateSystem: "cartesian2d",
        symbolSize: 40,
        label: {
          show: true,
        },
        edgeSymbol: ["circle", "arrow"],
        edgeSymbolSize: [4, 10],
        data: data,
        links: links,
        lineStyle: {
          color: "#2f4554",
        },
      },
    ],
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
});
</script>

<style scoped></style>
