<template>
  <div class="container">
    <h1 class="job-title">职位标题</h1>
    <p class="company-name">公司名称</p>

    <div class="job-details">
      <p>薪资范围</p>
      <p>工作地点</p>
    </div>

    <div class="job-description">
      <h2>职位描述</h2>
      <div class="flex">
        <p class="job-description-card">Javascript</p>
        <p class="job-description-card">Vue</p>
        <p class="job-description-card">Axios</p>
        <p class="job-description-card">Html</p>
      </div>
    </div>

    <div class="job-requirements">
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
</template>

<script setup>
import { ref } from "vue";
</script>

<style scoped>
.container {
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
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
