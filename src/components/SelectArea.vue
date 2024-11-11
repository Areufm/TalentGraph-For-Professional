<template>
  <el-cascader
    placeholder="请选择地区"
    size="default"
    :options="regionOptions"
    v-model="selectedOptions"
    @change=""
  >
  </el-cascader>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { regionData } from "element-china-area-data";
import type { CascaderOption } from "element-plus";

const regionOptions = regionData as CascaderOption[];
const selectedOptions = ref(["33", "3301", "330106"]); // 初始化选中值

function findLabelByValue(data: any, value: any): string {
  for (const item of data) {
    if (item.value === value) {
      return item.label;
    } else if (Array.isArray(item.children) && item.children.length > 0) {
      const foundLabel = findLabelByValue(item.children, value);
      if (foundLabel) {
        return foundLabel;
      }
    }
  }
  return "";
}

const lastSelectedRegionText = computed(() => {
  const lastOption = selectedOptions.value[selectedOptions.value.length - 1];
  return findLabelByValue(regionData, lastOption);
});

const handleChange = (value: string) => {
  console.log(value);
};
</script>

<style scoped></style>
