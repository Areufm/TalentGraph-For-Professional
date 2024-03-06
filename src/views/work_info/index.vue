<template>
  <HeaderBar />
  <div class="container">
    <div class="job-header">
      <h1 class="job-title">职位标题</h1>
      <p class="company-name">公司名称</p>
      <div class="job-details">
        <p>薪资范围</p>
        <p>工作地点</p>
        <p>公司福利</p>
      </div>
    </div>

    <div class="job-card">
      <div class="job-info">
        <div class="job-description">
          <h2>专业方向</h2>
          <div class="flex">
            <p class="job-description-card">计算机</p>
            <p class="job-description-card">电子信息</p>
            <p class="job-description-card">运维</p>
            <p class="job-description-card">搬砖</p>
          </div>
          <h2>职位描述</h2>
          <div class="flex">
            <p class="job-description-card">Javascript</p>
            <p class="job-description-card">Vue</p>
            <p class="job-description-card">Axios</p>
            <p class="job-description-card">Html</p>
          </div>
        </div>

        <div class="job-requirements">
          <div>
            <h2>要求和技能</h2>
            <ul>
              <li>要求1</li>
              <li>要求2</li>
              <li>要求3</li>
              <li>要求3</li>
              <li>要求3</li>
              <li>要求3</li>
              <li>要求3</li>
              <li>要求3</li>
              <li>要求3</li>
              <li>要求3</li>
              <li>要求3</li>
              <li>要求3</li>
              <li>要求3</li>
              <li>要求3</li>
              <li>要求3</li>
              <li>要求3</li>
              <li>要求3</li>
              <li>要求3</li>
              <li>要求3</li>
              <li>要求3</li>
            </ul>
          </div>
        </div>
        <KnowGraph />
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderBar from "@/components/HeaderBar.vue";
import KnowGraph from "@/components/KnowGraph.vue";
import { ref } from "vue";
</script>

<style scoped>
.container {
  margin: 0 auto;
  background-color: rgb(230, 245, 248);
  padding: 50px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

.job-header {
  margin-top: 60px;
  margin-left: 50px;
}
.job-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.company-name {
  margin-bottom: 10px;
  color: #555;
}

.job-details {
  margin-bottom: 20px;
}

.job-details p {
  margin: 0;
  margin-bottom: 10px;
}

.job-card {
  align-items: center;
  justify-content: center;
  width: 80%;
  margin: 0 auto;
}

.job-info {
  background-color: white;
  border: 1px rgb(164, 160, 160) solid;
  border-radius: 30px;
  padding: 20px;
}

.job-description {
  margin-bottom: 20px;
}
.job-description-card {
  margin: 10px;
  border: 2px solid rgb(182, 178, 178);
  display: inline-block;
  padding: 5px 15px;
  font-size: 13px;
}

.job-requirements {
  margin-bottom: 20px;
  display: flex;
}

.apply-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
}

.flex {
  display: flex;
}

.margin {
  margin: 8px;
}
</style>
