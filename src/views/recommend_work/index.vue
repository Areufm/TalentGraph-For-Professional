<template>
  <HeaderBar />
  <div class="container">
    <div class="sort">
      <p style="font-size: 20px; font-weight: bold;">请选择推荐方式:</p>
      <sort-button type="primary" style="margin: auto 20px;">名企优先</sort-button>
      <sort-button type="primary" style="margin: auto 20px;">薪资优先</sort-button>
      <sort-button type="primary" style="margin: auto 20px;">同城优先</sort-button>
      <sort-button type="primary" style="margin: auto 20px;">技能优先</sort-button>
      <p class="title_job">岗位</p>
      <p class="title_salary">薪资</p>
      <p class="title_region">地区</p>
      <p class="title_skill">技能</p>
      <p class="title_company">公司</p>
      <!-- <el-button type="primary" style="margin: auto 20px;">名企优先</el-button>
      <el-button type="primary" style="margin: auto 20px;">薪资优先</el-button>
      <el-button type="primary" style="margin: auto 20px;">同城优先</el-button>
      <el-button type="primary" style="margin: auto 20px;">技能优先</el-button> -->

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
        <div style="margin: 20px auto 0 auto;">
          <el-pagination :page-size="4" :pager-count="5" layout="prev, pager, next" :total="40" />
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
import Relationship from "@/components/Chart/Relationship.vue"

// import { ElMessage, ElMessageBox } from 'element-plus'

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
.title_company {
  font-size: 20px;
  color: royalblue;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;
  margin: auto 20px;
}

.title_company::before,
.title_company::after {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: royalblue;
}

.title_company::before {
  width: 18px;
  height: 18px;
  background-color: royalblue;
}

.title_company::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
}

.title_job {
  font-size: 20px;
  color: rgb(238, 178, 94);
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;
  margin: auto 20px;
}

.title_job::before,
.title_job::after {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: rgb(238, 178, 94);
}

.title_cotitle_jobmpany::before {
  width: 18px;
  height: 18px;
  background-color: rgb(238, 178, 94);
}

.title_job::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
}

.title_salary {
  font-size: 20px;
  color: #FF0000;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;
  margin: auto 20px;
}

.title_salary::before,
.title_salary::after {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: #FF0000;
}

.title_salary::before {
  width: 18px;
  height: 18px;
  background-color: #FF0000;
}

.title_salary::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
}

.title_region {
  font-size: 20px;
  color: #FF1493;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;
  margin: auto 20px;
}

.title_region::before,
.title_region::after {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: #FF1493;
}

.title_region::before {
  width: 18px;
  height: 18px;
  background-color: #FF1493;
}

.title_region::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
}

.title_skill {
  font-size: 20px;
  color: rgb(0,
      206,
      209);
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;
  margin: auto 20px;
}

.title_skill::before,
.title_skill::after {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: rgb(0, 206, 209);
}

.title_skill::before {
  width: 18px;
  height: 18px;
  background-color: rgb(0, 206, 209);
}

.title_skill::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
}

@keyframes pulse {
  from {
    transform: scale(0.9);
    opacity: 1;
  }

  to {
    transform: scale(1.8);
    opacity: 0;
  }
}

sort-button {
  position: relative;
  padding: 10px 20px;
  border-radius: 7px;
  border: 2px solid rgb(61, 106, 255);
  font-size: 15px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 2px;
  background: transparent;
  color: #000000;
  overflow: hidden;
  box-shadow: 0 0 0 0 transparent;
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

sort-button:hover {
  color: white;
  background: rgb(61, 106, 255);
  box-shadow: 0 0 30px 5px rgba(0, 142, 236, 0.815);
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
}

sort-button:hover::before {
  -webkit-animation: sh02 0.5s 0s linear;
  -moz-animation: sh02 0.5s 0s linear;
  animation: sh02 0.5s 0s linear;
}

sort-button::before {
  content: '';
  display: block;
  width: 0px;
  height: 86%;
  position: absolute;
  top: 7%;
  left: 0%;
  opacity: 0;
  background: #04242a;
  box-shadow: 0 0 50px 30px #fff;
  -webkit-transform: skewX(-20deg);
  -moz-transform: skewX(-20deg);
  -ms-transform: skewX(-20deg);
  -o-transform: skewX(-20deg);
  transform: skewX(-20deg);
}

@keyframes sh02 {
  from {
    opacity: 0;
    left: 0%;
  }

  50% {
    opacity: 1;
  }

  to {
    opacity: 0;
    left: 100%;
  }
}

button:active {
  box-shadow: 0 0 0 0 transparent;
  -webkit-transition: box-shadow 0.2s ease-in;
  -moz-transition: box-shadow 0.2s ease-in;
  transition: box-shadow 0.2s ease-in;
}

.container {
  margin: 0 auto;
  background-color: #fff;
  padding: 50px 30px 0 30px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to bottom, rgba(192, 230, 245, 0.818), rgba(188, 228, 244, 0.616),
      rgb(211, 238, 248), rgb(221, 239, 245), rgb(225, 238, 242), white);
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
  width: 300px;
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
