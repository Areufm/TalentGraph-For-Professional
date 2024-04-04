<template>
  <n-layout>
    <HeaderBar />
    <img src="../../assets/home.png" alt="" style="margin: 50px 0 0 0;width: 100vw;height: 150px;">
    <n-layout-content content-style="padding: 24px;">
      <div class="centerPosition" style="margin-top: 20px">
        <SearchBar />
        <div class="hotwork">
          热门职位：
          <a href="" class="work">
            python
          </a>
          <a href="" class="work">
            ml工程师
          </a>
          <a href="" class="work">
            运维
          </a>
          <a href="" class="work">
            测试
          </a>
          <a href="" class="work">
            Java
          </a>
          <a href="" class="work">
            C#
          </a>
          <a href="" class="work">
            深度学习
          </a>
          <a href="" class="work">
            教师
          </a>
          <a href="" class="work">
            电子
          </a>
        </div>
      </div>
      <FunctionCard />
      <h1>热门职位</h1>

      <Tag />
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
import Tag from "./components/Tag.vue";
import FunctionCard from "./components/FunctionCard.vue";

</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}

.centerPosition {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
}

.hotwork {
  display: flex;
  margin: 10px auto;
  font-weight: bold;
}

.work {
  display: flex;
  margin: 0 10px;
  border: 2px rgb(38, 133, 161) solid;
  border-radius: 10px;
  padding: 0 10px;
  color: rgb(48, 83, 96);
  /* 添加默认背景颜色或者透明背景 */
  background-color: transparent;
  text-decoration: none;
}

/* 鼠标悬停时添加渐变背景 */
.work:hover {
  background: rgb(140, 209, 230);
  color: white;
}

.n-layout {
  display: flex;
  flex-direction: column;
  /* height: 100vh; */
}

.n-layout-content {
  /* flex: 1; */
  /* height: 90%; */
  height: calc(100vh-140px);
  /* background: rgba(167, 167, 167, 0.277); */
  /* background: linear-gradient(to bottom, rgb(186, 236, 255), rgb(164, 216, 236),
      rgb(191, 228, 242), rgb(205, 227, 235), rgb(210, 233, 241), white); */
  background: linear-gradient(to bottom, rgba(192, 230, 245, 0.818) 2%, rgba(188, 228, 244, 0.616) 8%,
      rgb(211, 238, 248) 15%, rgb(221, 239, 245) 20%, rgb(225, 238, 242) 30%, white);
  /* background-color: rgb(242, 244, 247); */
  /* background: rgb(225, 222, 222); */
  display: flex;
  flex-direction: column;
  margin-top: -10px;
}

.get-more {
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
