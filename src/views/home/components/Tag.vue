<template>
  <el-tabs v-model="tabs" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="互联网" name="internet"></el-tab-pane>
    <el-tab-pane label="AI/数据" name="ai"></el-tab-pane>
    <el-tab-pane label="电子" name="electronics"></el-tab-pane>
    <el-tab-pane label="电气" name="electrical"></el-tab-pane>
    <el-tab-pane label="通信" name="communication"></el-tab-pane>
  </el-tabs>
  <HotWorks :label="tabs" />
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import type { TabsPaneContext } from "element-plus";
import HotWorks from "./HotWorks.vue";

const tabs = ref("internet");

const handleClick = (tab: TabsPaneContext) => {
  tabs.value = tab.paneName as string;
};
</script>

<style lang="scss" scoped>
:deep(.el-tabs__header) {
  overflow: hidden;
  display: flex;
  justify-content: space-around;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
