<template>
  <n-layout>
    <HeaderBar />
    <n-layout-content content-style="padding: 24px;">
      <div class="centerPosition" style="margin-top: 20px">
        <SearchBar />
      </div>
      <FunctionCard />
      <h1>热门职位</h1>
      <TagBar />
      <div class="get-more">
        <GetMore />
      </div>
    </n-layout-content>
  </n-layout>
</template>

<script setup>
import HeaderBar from "@/components/HeaderBar.vue";
import SearchBar from "@/components/SearchBar.vue";
import GetMore from "./components/GetMore.vue";
import FunctionCard from "./components/FunctionCard.vue";
import TagBar from "@/components/TagBar.vue";

</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}

.centerPosition {
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
}

.n-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.n-layout-content {
  /* flex: 1; */
  height: 90%;
  /* background: rgba(167, 167, 167, 0.277); */
  background-color: rgb(242, 244, 247);
  /* background: rgb(225, 222, 222); */
  display: flex;
  flex-direction: column;
  margin-top: 70px;
}

.get-more {
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
