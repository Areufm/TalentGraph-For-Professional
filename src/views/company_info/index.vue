<template>
  <div class="container">
    <h1 class="job-title">公司名称</h1>
    <p class="company-name">公司详细介绍</p>

    <div class="job-details">
      <p>薪资范围</p>
      <p>工作地点</p>
    </div>

    <div class="job-description">
      <h2>职位描述</h2>
      <p>职位描述内容...</p>
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
