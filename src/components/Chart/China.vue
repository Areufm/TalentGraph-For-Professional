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
import china from "@/constant/chinaChange.json";
import { GeoJSONSourceInput } from "echarts/types/src/coord/geo/geoTypes.js";

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

const chinaData = ref<DataItem[]>([]);
let myChart: echarts.ECharts | null = null;

const getChinaData = async () => {
  try {
    const res = await getChina();
    chinaData.value = res.data;
    // 确保获取到地图数据后再初始化
    await initMap();
  } catch (error) {
    console.error("获取地图数据失败:", error);
  }
};

const initMap = async () => {
  if (!chinaData.value) return;

  const mapDom = document.querySelector("#mapDom");
  if (!mapDom) return;

  myChart = echarts.init(mapDom as HTMLElement);
  // 使用实际的地图数据注册
  echarts.registerMap("china", china as GeoJSONSourceInput);

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
        data: chinaData.value,
      },
    ],
  };

  myChart.setOption(options);
};
onMounted(async () => {
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
