<template>
  <n-card style="margin-bottom: 16px; background-color: rgb(242, 244, 247)">
    <n-tabs
      default-value="computer science"
      justify-content="space-evenly"
      type="line"
    >
      <n-tab-pane name="computer science" tab="计算机">
        <HotWorks />
      </n-tab-pane>
      <n-tab-pane name="electronic science" tab="电子信息">
        <HotWorks />
      </n-tab-pane>
      <n-tab-pane name="network security" tab="网络安全">
        <HotWorks />
      </n-tab-pane>
      <n-tab-pane name="finance" tab="金融"> <HotWorks /> </n-tab-pane>
      <n-tab-pane name="eduction" tab="教育"> <HotWorks /> </n-tab-pane>
      <n-tab-pane name="medicine science" tab="医学"> <HotWorks /> </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script setup>
import HotWorks from "./HotWorks.vue";
</script>

<style scoped></style>
