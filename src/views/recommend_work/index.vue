<template>
  <HeaderBar />
  <div class="container">
    <div class="head">推荐岗位：前端工程师</div>
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
        <Info />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Card from "./components/Card.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import Info from "./components/Info.vue";
</script>

<style scoped>
.container {
  margin: 60px auto 0 auto;
  /* margin: 0 auto; */
  background-color: #fff;
  padding: 50px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

.head {
  border: 1px rgb(170, 164, 164) solid;
  border-radius: 20px;
  height: 50px;
  padding: 20px;
}

.some {
  /* margin-top: 60px; */
  display: flex;
  flex-grow: 1;
  width: 100%;
  margin: 30px 0 0 0;
}

.left {
  display: flex;
  flex-direction: column;
  width: 400px;
  margin-left: 100px;
  overflow-y: auto;
  height: 60vh;
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
  margin: 5px 100px 0 10px;
  height: 60vh;
  overflow-y: auto;
}
</style>
