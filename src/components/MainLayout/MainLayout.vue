<template>
  <el-container>
    <el-header>
      <HeaderBar />
    </el-header>
    <el-main class="hide-scrollbar">
      <RouterView />
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import HeaderBar from "@/components/HeaderBar.vue";
import { RouterView } from "vue-router";
</script>

<style scoped lang="scss">
.el-container {
  margin: 0;
  padding: 0;
  height: 100vh;
}

.el-main {
  background: linear-gradient(
    to bottom,
    rgba(192, 230, 245, 0.818) 2%,
    rgba(188, 228, 244, 0.616) 8%,
    rgb(211, 238, 248) 15%,
    rgb(221, 239, 245) 20%,
    rgb(225, 238, 242) 30%,
    white
  );
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  overflow: auto;
  padding: 0;
}
</style>
