﻿<template>
  <div class="profile-card">
    <div class="top">
      <img src="../../../assets/xue.jpg" alt="Profile Picture" />

      <div class="profile-name">
        <h3>猫猫鼠</h3>
        <p>我的简历完成度: <span>77%</span></p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.profile-card {
  width: 200px;
  /* width: 30%; */
  /* height: 100%; */
  /* background-color: #ffffff; */
  /* background-color: rgb(230, 245, 248); */
  padding: 0px;
  border-radius: 15px;
  box-shadow: 0 2px 18px rgba(0, 0, 0, 0.5);
  text-align: center;
  font-family: Arial, sans-serif;

  .top {
    /* display: flex; */
    margin: 20px;
    justify-content: center;

    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-bottom: 10px;
    }

    .profile-name {
      margin: auto 20px;

      h3 {
        margin: 0;
        font-size: 20px;
        color: #333;
      }

      p {
        margin: 10px 0;
        font-size: 15px;
        color: #666;
      }

      span {
        font-weight: bold;
        color: #ff6600;
      }
    }
  }
}
</style>
