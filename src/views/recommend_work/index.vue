<template>
  <HeaderBar />
  <div class="container">
    <div class="sort">
      <el-button type="primary" style="margin: auto 20px;">名企优先</el-button>
      <el-button type="primary" style="margin: auto 20px;">薪资优先</el-button>
      <el-button type="primary" style="margin: auto 20px;">同城优先</el-button>
      <el-button type="primary" style="margin: auto 20px;">技能优先</el-button>

      <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
        with footer
      </el-button>

      <el-drawer v-model="drawer" direction="rtl" size="50%">
        <template #header>
          <h4>职位具体信息</h4>
        </template>
        <template #default>
          <div>
            <Info />
          </div>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="cancelClick">cancel</el-button>
            <el-button type="primary" @click="confirmClick">confirm</el-button>
          </div>
        </template>
      </el-drawer>
    </div>
    <div class="some">
      <div class="left">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div class="right">
        <!-- <Radar /> -->
        <Graph />
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from "vue";
import Card from "./components/Card.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import Info from "./components/Info.vue";
import Radar from "@/components/Chart/Radar.vue";
import Graph from "./components/Graph.vue";

import { ElMessage, ElMessageBox } from 'element-plus'

const drawer = ref(false)

function cancelClick() {
  drawer.value = false
}
function confirmClick() {
  ElMessageBox.confirm(
    'proxy will permanently delete the file. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: 'Delete completed',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  /* margin: 0 auto; */
  background-color: #fff;
  padding: 50px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

.sort {
  display: flex;
  margin: 20px auto;
}

.some {
  /* margin-top: 60px; */
  display: flex;
  flex-grow: 1;
  width: 100%;
  margin: 20px auto;
  height: 75vh;
}

.left {
  display: flex;
  flex-direction: column;
  width: 400px;
  margin-left: 120px;
  overflow-y: auto;
  /* height: 60vh; */
}

.left::-webkit-scrollbar,
.right::-webkit-scrollbar {
  width: 0.5em;
  /* 设置滚动条的宽度 */
}

.left::-webkit-scrollbar-track,
.right::-webkit-scrollbar-track {
  background-color: transparent;
  /* 设置滚动条轨道的背景颜色 */
}

.left::-webkit-scrollbar-thumb,
.right::-webkit-scrollbar-thumb {
  background-color: #88888800;
  /* 设置滚动条的颜色 */
}

.right {
  flex: 1;
  border: 2px rgb(142, 136, 136) solid;
  border-radius: 10px;
  margin: 10px 100px 0 10px;
  /* height: 60vh; */
  overflow-y: auto;
  padding: 20px;
}
</style>
