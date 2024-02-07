<template>
  <n-layout>
    <n-layout-header>
      <div class="header_left">
        <div class="header_left_text">城市</div>
        <div class="header_left_text">首页</div>
        <div class="header_left_text">推荐岗位</div>
      </div>
      <div class="header_right">
        <div class="header_right_text">我要招聘</div>
        <div class="header_right_text">我要求职</div>
        <div
          class="header_right_text"
          style="border: rgb(255, 255, 255) solid 2px; border-radius: 50px"
        >
          登录/注册
        </div>
      </div>
    </n-layout-header>
    <n-layout-content content-style="padding: 24px;">
      <div class="centerPosition" style="margin-top: 20px">
        <SearchBar />
      </div>
      <div>{{ count }}</div>
      <div>
        <n-button @click="count++">+</n-button>
        <n-button @click="count--">-</n-button>
      </div>
      <div>
        <button @click="toLogin">tologin</button>
      </div>
      <div>
        <n-button type="primary"> Primary </n-button>
      </div>
      <h1>热门职位</h1>
      <div class="hotWorks">
        <HotWorks />
      </div>
      <h1>热门企业</h1>
      <div class="hotCompany">
        <HotCompany />
      </div>
    </n-layout-content>
  </n-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import SearchBar from "@/components/SearchBar.vue";
import HotCompany from "@/components/HotCompany.vue";
import HotWorks from "@/components/HotWorks.vue";

const router = useRouter();
const count = ref(0);

const toLogin = () => {
  router.push("/login");
};
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

.n-layout-header {
  background: rgba(0, 102, 255, 0.9);
  padding: 24px;
  /* height: 70px; */
  height: 10%;
  position: fixed;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
}

.header_left {
  display: flex;
}
.header_right {
  display: flex;
  margin-left: auto;
}

.header_left_text {
  margin: 10px;
  color: white;
  display: flex;
}
.header_right_text {
  margin: 10px, 0;
  color: white;
  display: flex;
  padding: 10px;
  width: 70px;
}

.n-layout-content {
  /* flex: 1; */
  height: 90%;
  background: rgb(223, 217, 217);
  display: flex;
  flex-direction: column;
  margin-top: 70px;
}
</style>
