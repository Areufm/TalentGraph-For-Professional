<template>
  <HeaderBar />
  <div class="container">
    <div class="sort">
      <p style="font-size: 20px; font-weight: bold;">请选择排序方式:</p>
      <el-button type="primary" style="margin: auto 20px;">名企优先</el-button>
      <el-button type="primary" style="margin: auto 20px;">薪资优先</el-button>
      <el-button type="primary" style="margin: auto 20px;">同城优先</el-button>
      <el-button type="primary" style="margin: auto 20px;">技能优先</el-button>

      <!-- <el-button type="primary" style="margin: auto 20px;" @click="drawer = true">
        详细信息
      </el-button> -->
    </div>
    <el-drawer v-model="drawer" direction="rtl" size="60%">
      <template #header>
        <h1>职位具体信息</h1>
      </template>
      <template #default>
        <Info />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">cancel</el-button>
          <el-button type="primary" @click="confirmClick">confirm</el-button>
        </div>
      </template>
    </el-drawer>
    <div class="some">
      <div class="left">
        <Card :toggle-drawer="toggleDrawer" />
        <Card :toggle-drawer="toggleDrawer" />
        <Card :toggle-drawer="toggleDrawer" />
        <Card :toggle-drawer="toggleDrawer" />
        <div style="margin: 10px auto;">
          <el-pagination :page-size="4" :pager-count="7" layout="prev, pager, next" :total="40" />
        </div>
      </div>
      <div class="right">
        <Relationship />
        <!-- <div class="ltop">
          <Relationship />
        </div>
        <div class="lbottom">
          <Relationship />
        </div>
        <div class="rtop">
          <Relationship />
        </div>
        <div class="rbottom">
          <Relationship />
        </div> -->
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from "vue";
import Card from "./components/Card.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import Info from "./components/Info.vue";
import Graph from "@/components/Chart/Graph.vue";
import Relationship from "@/components/Chart/Relationship.vue"
import Know from "@/components/Chart/Know.vue"

import { ElMessage, ElMessageBox } from 'element-plus'

const drawer = ref(false)

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

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
  background-color: #fff;
  padding: 50px 30px 0 30px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

.sort {
  display: flex;
  margin: 20px auto;
  height: 50px;
  text-align: center;
  align-items: center
}

.some {
  /* margin-top: 60px; */
  display: flex;
  flex-grow: 1;
  width: 100%;
  margin: 20px 0 0 0;
  /* height: 80vh; */
  height: calc(100vh-110px);
}

.left {
  display: flex;
  flex-direction: column;
  width: 250px;
  /* margin-left: 30px; */
  overflow-y: auto;
  /* height: 60vh; */
}

.right {
  flex: 1;
  border: 2px rgb(142, 136, 136) solid;
  border-radius: 10px;
  margin: 5px 0 10px 10px;
  /* height: 60vh; */
  overflow-y: auto;
  /* padding: 20px; */
  /* display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr; */

}

.ltop {
  grid-area: 1 / 1 / 2 / 2;
  border: 2px rgb(142, 136, 136) solid;
  border-radius: 10px;
  /* 左上角 */
}

.rtop {
  grid-area: 1 / 2 / 2 / 3;
  border: 2px rgb(142, 136, 136) solid;
  border-radius: 10px;
  /* 右上角 */
}

.lbottom {
  grid-area: 2 / 1 / 3 / 2;
  border: 2px rgb(142, 136, 136) solid;
  border-radius: 10px;
  /* 左下角 */
}

.rbottom {
  grid-area: 2 / 2 / 3 / 3;
  border: 2px rgb(142, 136, 136) solid;
  border-radius: 10px;
  /* 右下角 */
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
</style>
