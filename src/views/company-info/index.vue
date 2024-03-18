<template>
  <HeaderBar />
  <div class="container">
    <div class="company-header">
      <h1 class="company-title">公司名称</h1>
      <p class="company-name">公司详细介绍</p>
    </div>

    <div class="company-description">
      <h2>职位描述</h2>
      <p>职位描述内容...</p>
    </div>

    <div class="company-requirements">
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
import HeaderBar from "@/components/HeaderBar.vue";
import { ref } from "vue";
</script>

<style scoped>
.container {
  margin: 0 auto;
  background-color: #fff;
  padding: 50px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

.company-header {
  margin-top: 60px;
}

.company-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.company-name {
  margin-bottom: 10px;
  color: #555;
}

.company-description {
  margin-bottom: 20px;
}

.company-requirements {
  margin-bottom: 20px;
}

.flex {
  display: flex;
}

.margin {
  margin: 8px;
}
</style>
