<template>
  <HeaderBar />
  <div class="container">
    <div class="top">
      <div class="tleft">
        <PersonCard />
      </div>
      <div class="tcenter">
        <Radar />
      </div>
      <div class="tright"></div>
    </div>

    <div class="bottom">
      <div class="bleft">
        <Relationship />
      </div>
      <div class="bright">
        <China />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import HeaderBar from "@/components/HeaderBar.vue";
import Relationship from "./components/Relationship.vue";
import China from "./components/China.vue";
import PersonCard from "./components/PersonCard.vue";
import Radar from "@/components/Chart/Radar.vue";
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 使容器高度为视窗高度 */
  background: linear-gradient(
    to bottom,
    rgba(192, 230, 245, 0.818) 2%,
    rgba(188, 228, 244, 0.616) 8%,
    rgb(211, 238, 248) 15%,
    rgb(221, 239, 245) 20%,
    rgb(225, 238, 242) 30%,
    white
  );
  /* margin-top: 50px; */
  /* padding: 50px; */
}

.top {
  height: 40%;
  width: 100%;
  display: flex;
  margin-top: 50px;
}

.tleft,
.tcenter,
.tright {
  flex: 1; /* 等分宽度 */
  box-sizing: border-box; /* 计入边框、内填充等尺寸 */
  border: 1px solid #ccc; /* 可以看到效果，可删除 */
  padding: 10px;
}

.bottom {
  height: 60%;
  width: 100%;
  display: flex;
}

.bleft,
.bright {
  flex: 1; /* 等分宽度 */
  box-sizing: border-box; /* 计入边框、内填充等尺寸 */
  border: 1px solid #ccc; /* 可以看到效果，可删除 */
  /* overflow-y: scroll; */
}
</style>
