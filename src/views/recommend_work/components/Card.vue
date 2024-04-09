<template>
  <div class="card" @click="handleToggleDrawer">
    <div class="card-details">
      <div style="display: flex; top: 0; justify-content: space-between">
        <p class="work_name">前端开发工程师</p>
        <p class="work_salary">12K-15K</p>
      </div>
      <div style="display: flex">
        <p style="margin: 0 15px">关键词1</p>
        <p style="margin: 0 15px">关键词2</p>
        <p style="margin: 0 15px">关键词3</p>
      </div>
      <div style="display: flex; justify-content: space-between">
        <p class="company_name">企业名</p>
        <p class="job">职业类型</p>
      </div>
      <!-- <button class="card-button" @click="handleToggleDrawer">More info</button> -->
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

// 定义props，接收父组件传递的方法
const props = defineProps({
  toggleDrawer: Function,
});

// 在子组件中调用父组件传递的方法
const handleToggleDrawer = () => {
  if (props.toggleDrawer) {
    props.toggleDrawer();
  }
};
</script>

<style scoped>
.card {
  /* width: 350px; */
  /* width: 30%; */
  height: 135px;
  border-radius: 20px;
  /* background: #f5f5f5; */
  position: relative;
  /* padding: 1rem; */
  border: 2px solid #c3c6ce;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  transition: 0.5s ease-out;
  overflow: visible;
  margin: 5px 0;
}

.card-details {
  color: black;
  height: 100%;
  display: grid;
  align-items: center;
  /* place-content: center; */
}

.card-button {
  transform: translate(-50%, 125%);
  width: 60%;
  border-radius: 1rem;
  border: none;
  background-color: #008bf8;
  color: #fff;
  font-size: 1rem;
  padding: 0.3rem 1rem;
  position: absolute;
  left: 50%;
  bottom: 0;
  opacity: 0;
  transition: 0.3s ease-out;
}

/*Hover*/
.card:hover {
  border-color: #008bf8;
  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
}

.card:hover .card-button {
  transform: translate(-50%, 20%);
  opacity: 1;
}

.company_name {
  color: rgb(134, 134, 134);
  margin-left: 15px;
  width: 180px;
  overflow: hidden;
  /* 超出部分隐藏 */
  text-overflow: ellipsis;
  /* 超出部分以省略号显示 */
  white-space: nowrap;
}

.job {
  margin-right: 15px;
}

.text-title {
  font-size: 1.5em;
  font-weight: bold;
}

/*Text*/
.work_name {
  font-size: 1.5em;
  font-weight: bold;
  margin-left: 15px;
  display: block;
  width: 170px;
  overflow: hidden;
  /* 超出部分隐藏 */
  text-overflow: ellipsis;
  /* 超出部分以省略号显示 */
  white-space: nowrap;
  /* 禁止文本换行 */
}

.work_salary {
  margin-right: 15px;
  font-size: 1.5em;
  font-weight: bold;
  color: red;
  display: flex;
}
</style>
