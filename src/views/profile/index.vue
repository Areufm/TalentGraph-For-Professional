<template>
  <div class="header">
    <img src="../../assets/xue.jpg" alt="" />

    <div class="person">
      <h1>xiaohm</h1>
      <p>man</p>
    </div>
  </div>
  <el-tabs :tab-position="tabPosition" style="height: 200px" class="demo-tabs">
    <el-tab-pane label="User">User</el-tab-pane>
    <el-tab-pane label="Config">Config</el-tab-pane>
    <el-tab-pane label="Role">Role</el-tab-pane>
    <el-tab-pane label="Task">Task</el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const tabPosition = ref("left");
</script>

<style>
img {
  width: 100px;
  height: 100px;
}

.person {
  margin: 10px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 154px;
  border-radius: 30px;
  background: #e0e0e0;
  box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff;
  margin: 20px 0;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--left .el-tabs__content {
  height: 100%;
}
</style>
