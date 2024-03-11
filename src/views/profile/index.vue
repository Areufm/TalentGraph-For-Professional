<template>
  <div class="container">
    <div class="left">
      <div class="profile">
        <div class="top">
          <img src="../../assets/xue.jpg" alt="Profile Picture" />

          <div class="profile-name">
            <h3>张三</h3>
            <div style="display: flex; margin: 10px">
              <p style="margin: 0 10px">地点</p>
              <p style="margin: 0 10px">年龄</p>
              <p style="margin: 0 10px">学校</p>
            </div>
            <div style="display: flex; margin: 10px">
              <p style="margin: 0 10px">电话</p>
              <p style="margin: 0 10px">状态</p>
            </div>
          </div>
        </div>
      </div>
      <div class="job">
        <h3>求职意向</h3>
      </div>
      <div class="education">
        <h3>教育经历</h3>
      </div>
      <div class="advance">
        <h3>个人优势</h3>
      </div>
      <div class="project">
        <h3>项目经历</h3>
      </div>
      <div class="skill">
        <h3>技能点</h3>
      </div>
      <div class="experience">
        <h3>个人经历</h3>
      </div>
      <div class="language">
        <h3>语言</h3>
      </div>
      <div class="add">
        <h3>额外资料</h3>
      </div>
      <div class="cv">
        <h3>个人简历</h3>
      </div>
    </div>
    <div class="right">
      <div class="upload">
        <div style="display: flex; justify-content: space-between">
          <h4>上传简历附件</h4>
          <div class="input-div">
            <input class="input" name="file" type="file" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              stroke-linejoin="round"
              stroke-linecap="round"
              viewBox="0 0 24 24"
              stroke-width="2"
              fill="none"
              stroke="currentColor"
              class="icon"
            >
              <polyline points="16 16 12 12 8 16"></polyline>
              <line y2="21" x2="12" y1="12" x1="12"></line>
              <path
                d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"
              ></path>
              <polyline points="16 16 12 12 8 16"></polyline>
            </svg>
          </div>
        </div>
        <p>在简历中显示更多优势与特长</p>
      </div>
      <div class="improve">
        <h4>简历待完善</h4>
        <h5>基本信息：</h5>
        <h5>基本信息：</h5>
      </div>
      <div class="security">
        <h4>个人隐私项</h4>
        <p>谁可以联系我</p>
        <p>屏蔽公司</p>
      </div>
      <div class="process">
        <h4>简历完成度</h4>
        <p>简历已完成： XX%</p>
      </div>
      <div class="radar">
        <h4>个人能力雷达图</h4>
        <Radar />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Radar from "@/components/Radar.vue";
</script>

<style scoped>
.input-div {
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid rgb(1, 235, 252);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-shadow: 0px 0px 100px rgba(1, 235, 252, 0.425),
    inset 0px 0px 10px rgb(1, 235, 252), 0px 0px 5px rgb(255, 255, 255);
}

.icon {
  color: rgb(1, 235, 252);
  font-size: 2rem;
  cursor: pointer;
}

.input {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer !important;
}
.profile,
.job,
.education,
.advance,
.project,
.skill,
.experience,
.language,
.add,
.cv,
.upload,
.improve,
.security,
.process,
.radar {
  /* width: 100%; */
  /* height: 100%; */
  background-color: #ffffff;
  /* background-color: rgb(230, 245, 248); */
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  /* text-align: center; */
  font-family: Arial, sans-serif;
  margin: 5px 0;
}
.profile img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}
.profile h3 {
  margin: 0;
  font-size: 20px;
  color: #333;
}
.top {
  display: flex;
  margin: 20px;
}
.profile-name {
  margin: auto 20px;
  text-align: center;
}
.profile p {
  margin: 10px 0;
  font-size: 16px;
  color: #666;
}
.container {
  display: flex;
  background-color: rgb(230, 245, 248);
  /* height: 100vh; */
  height: 100%;
  width: 100%;
}
.left {
  display: flex;
  flex-direction: column;
  flex: 2;
  /* border: 2px black solid; */
  margin: 0 0 0 200px;
  padding: 10px;
}
.right {
  display: flex;
  flex-direction: column;
  flex: 1;
  /* border: 2px black solid; */
  margin: 0 50px 0 0;
  padding: 10px;
}
</style>
