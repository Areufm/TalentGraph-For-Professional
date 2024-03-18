<template>
  <n-layout-header>
    <div class="header_left">
      <img src="../assets/workcat.png" alt="logo"
        style="border-radius: 50%; height: 45px; width: 45px; margin: 0 10px" />
      <div class="header_left_title">职业猫</div>
      <div class="nav-city">
        <p class="nav-city-box" ka="header-switch-city">
          <i class="icon-poi"></i><span class="nav-city-selected">杭州</span><span class="switchover-city">[切换城市]</span>
        </p>
        <!-- <div class="city-box">
            <ul class="dorpdown-province"></ul>
            <div class="dorpdown-city"></div>
          </div> -->
      </div>
      <a href="/" class="header_left_text">首页</a>
      <a href="/recommend" class="header_left_text">推荐岗位</a>
      <a href="/profile" class="header_left_text">个人信息</a>
      <button @click="isLogin = !isLogin">切换登录状态</button>
    </div>
    <div v-if="isLogin" class="header_right">
      <a href="/boss" class="header_right_text">我要招聘</a>
      <a href="/login" class="header_right_text">我要求职</a>
      <button style="
          border: rgb(255, 255, 255) solid 2px;
          border-radius: 50px;
          background-color: rgba(255, 255, 255, 0);
          color: white;
          padding: 10px;
        " @click="toLogin">
        登录 / 注册
      </button>
    </div>
    <div v-else class="header_right">
      <a href="/profile" class="header_right_text">简历</a>
      <div class="card-container hidden">
        <button class="card-btn" @click="uploadFile">
          <img src="../assets/resume-file.png" alt="卡片图片1" />
        </button>
        <button class="card-btn" @click="toResume">
          <img src="../assets/resume-online.png" alt="卡片图片2" />
        </button>
      </div>
      <p class="header_right_text">用户名</p>
      <img src="../assets/xue.jpg" alt="头像" style="border-radius: 50%; height: 45px; width: 45px" />
    </div>
  </n-layout-header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isLogin = ref(true);

const toLogin = () => {
  router.push("/login");
};
const toResume = () => {
  router.push("/profile");
};
</script>

<style scoped>
.n-layout-header {
  /* background: rgba(0, 102, 255); */
  background: rgb(98, 145, 217);
  padding: 24px;
  /* height: 70px; */
  height: 8%;
  position: fixed;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
}

.header_left {
  margin-left: 20px;
  display: flex;
  align-items: center;
}

.header_right {
  display: flex;
  margin-left: auto;
  justify-content: center;
  align-items: center;
  position: relative;
  /* right: 50px;  */
}

.card-container {
  display: none;
  position: absolute;
  top: 130%;
  left: 30%;
  transform: translateX(-50%);
  z-index: 1000;
  white-space: nowrap;
  border: 2px rgba(128, 128, 128, 0.586) solid;
  border-radius: 20px;
}

.card-btn {
  width: 120px;
  /* 按钮宽度 */
  height: 150px;
  /* 按钮高度 */
  /* margin: 5px; */
  display: inline-block;
  background-color: transparent;
  /* 透明背景 */
  border: none;
  /* 无边框 */
  cursor: pointer;
  /* 鼠标悬停时显示手形光标 */
  outline: none;
  /* 无焦点轮廓 */
}

.card-btn img {
  width: 100%;
  /* 图片填满按钮 */
  height: 100%;
  object-fit: cover;
  /* 图片覆盖按钮，保持宽高比 */
  border-radius: 20px;
}

.header_right:hover .card-container {
  display: block;
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
  text-decoration: none;
  /* 取消链接下划线 */
}

.header_right_text {
  margin: 0 15px;
  color: white;
  display: flex;
  /* padding: 10px; */
  /* width: 70px; */
  text-decoration: none;
}

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
  background: url(https://img.bosszhipin.com/static/file/2023/umua62pczi1679922532668.png) 0 -18px/18px auto no-repeat;
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
</style>
