<template>
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
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Radar from "@/components/Chart/Radar.vue";
</script>

<style scoped>
.job-card {
  width: 100%;
  overflow-y: auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.job-info {
  background-color: white;
  /* border: 1px rgb(164, 160, 160) solid; */
  /* border-radius: 30px; */
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
