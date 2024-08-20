<template>
  <div class="profile-card">
    <div class="top">
      <img src="../../../assets/zkn.jpg" alt="Profile Picture" />

      <div class="profile-name">
        <h3>{{ authStore.userInfo.name }}</h3>
        <p>我的简历完成度: <span>77%</span></p>
      </div>
    </div>
    <div class="bottom">
      <div class="info">
        <h1>0</h1>
        <h3>谁看过我</h3>
      </div>
      <div class="info">
        <h1>0</h1>
        <h3>我的浏览</h3>
      </div>
      <div class="info">
        <h1>0</h1>
        <h3>我评价过</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
</script>

<style scoped>
.info {
  margin: 0 10px;
}

.bottom {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.top {
  display: flex;
  margin: 20px;
  justify-content: center;
}

.profile-name {
  margin: auto 20px;
}

.profile-card {
  width: 100%;
  /* height: 100%; */
  /* background-color: #ffffff; */
  /* background-color: rgb(230, 245, 248); */
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.5);
  text-align: center;
  font-family: Arial, sans-serif;
}

.profile-card img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.profile-card h3 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.profile-card p {
  margin: 10px 0;
  font-size: 16px;
  color: #666;
}

.profile-card span {
  font-weight: bold;
  color: #ff6600;
}
</style>
