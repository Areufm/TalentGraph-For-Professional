<template>
  <n-layout>
    <n-layout-header>
      <div class="header_left">
        <div class="header_left_title">服务外包A15赛题</div>
        <div class="nav-city">
          <p class="nav-city-box" ka="header-switch-city">
            <i class="icon-poi"></i><span class="nav-city-selected">杭州</span
            ><span class="switchover-city">[切换城市]</span>
          </p>
          <!-- <div class="city-box">
            <ul class="dorpdown-province"></ul>
            <div class="dorpdown-city"></div>
          </div> -->
        </div>
        <div class="header_left_text">首页</div>
        <div class="header_left_text">推荐岗位</div>
      </div>
      <div class="header_right">
        <a href="/login" class="header_right_text">我要招聘</a>
        <a href="/login" class="header_right_text">我要求职</a>
        <button
          style="
            border: rgb(255, 255, 255) solid 2px;
            border-radius: 50px;
            background-color: rgba(255, 255, 255, 0);
            color: white;
            padding: 10px;
          "
          @click="toLogin"
        >
          登录 / 注册
        </button>
      </div>
    </n-layout-header>
    <n-layout-content content-style="padding: 24px;">
      <div class="centerPosition" style="margin-top: 20px">
        <SearchBar />
      </div>
      <h1>热门职位</h1>
      <HotWorks />
      <HotWorks />
      <HotWorks />
      <div class="get-more">
        <GetMore />
      </div>
      <h1>热门企业</h1>
      <HotCompany />
      <HotCompany />
      <HotCompany />
      <div class="get-more">
        <GetMore />
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
import GetMore from "@/components/GetMore.vue";

const router = useRouter();
const count = ref(0);

const toLogin = () => {
  router.push("/register");
};
</script>

<style scoped>
.nav-city {
  float: left;
  position: relative;
  cursor: pointer;
  height: 49px;
  line-height: 49px;
  color: #00bebd;
  display: flex;
  align-items: center;
  margin: 5px;
}
.nav-city .nav-city-selected {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 84px;
  vertical-align: middle;
}
.nav-city .icon-poi {
  display: inline-block;
  vertical-align: top;
  width: 18px;
  height: 18px;
  background: url(https://img.bosszhipin.com/static/file/2023/umua62pczi1679922532668.png)
    0 -18px/18px auto no-repeat;
  margin: 16px 3px 0 24px;
}
.nav-city .switchover-city {
  font-size: 12px;
  color: #fff;
  margin-left: 10px;
}
.nav-city .city-box {
  top: 49px;
}

.nav-city .city-box {
  font-size: 14px;
}
.city-box {
  display: none;
  position: absolute;
  width: 298px;
  background: #fff;
  top: 45px;
  left: 0;
  z-index: 1;
  color: #9fa3b0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

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
  align-items: center;
}
.header_right {
  display: flex;
  margin-left: auto;
}

.header_left_title {
  margin: 10px;
  color: white;
  font-size: 25px;
  font-weight: bold;
}
.header_left_text {
  margin: 10px;
  color: white;
}
.header_right_text {
  margin: 10px, 0;
  color: white;
  display: flex;
  padding: 10px;
  width: 70px;
  text-decoration: none;
}

.n-layout-content {
  /* flex: 1; */
  height: 90%;
  background: rgb(225, 222, 222);
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
