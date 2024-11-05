<template>
  <div style="display: flex; justify-content: space-between">
    <div class="card">
      <div class="card-details">
        <div style="display: flex; align-items: center">
          <img
            src="../../src/assets/xue.jpg"
            alt="企业头像"
            style="width: 50px; height: 50px; margin-top: 10px"
          />
          <div style="margin-left: 10px; display: flex; flex-direction: column">
            <h3 style="font-weight: bold; margin-bottom: 5px">企业名称</h3>
            <p style="margin-top: 0">薪资</p>
          </div>
        </div>
        <div style="display: flex">
          <p style="margin: 10px">关键词1</p>
          <p style="margin: 10px">关键词2</p>
          <p style="margin: 10px">关键词3</p>
        </div>
        <div style="display: flex">
          <p class="text-body">企业名</p>
          <p class="text-body" style="margin-left: auto">职业类型</p>
        </div>
      </div>
      <button class="card-button" @click="getMore">More info</button>
    </div>
    <div class="card">
      <div class="card-details">
        <p class="text-title">Card title</p>
        <p class="text-body">Here are the details of the card</p>
      </div>
      <button class="card-button">More info</button>
    </div>
    <div class="card">
      <div class="card-details">
        <p class="text-title">Card title</p>
        <p class="text-body">Here are the details of the card</p>
      </div>
      <button class="card-button">More info</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();
const getMore = () => {
  const href = router.resolve({
    name: "CompanyInfo",
  });
  window.open(href.href, "_blank");
};
</script>

<style scoped>
.card {
  width: 350px;
  /* width: 30vw; */
  height: 154px;
  border-radius: 20px;
  background: #f5f5f5;
  position: relative;
  padding: 1.8rem;
  border: 2px solid #c3c6ce;
  transition: 0.5s ease-out;
  overflow: visible;
  margin: 10px;
}

.card-details {
  color: black;
  height: 100%;
  gap: 0.5em;
  display: grid;
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
  padding: 0.5rem 1rem;
  position: absolute;
  left: 50%;
  bottom: 0;
  opacity: 0;
  transition: 0.3s ease-out;
}

.text-body {
  color: rgb(134, 134, 134);
}

/*Text*/
.work_name,
.text-title {
  font-size: 1.5em;
  font-weight: bold;
}
.work_salary {
  margin-left: auto;
  font-size: 1.5em;
  font-weight: bold;
  color: red;
}

/*Hover*/
.card:hover {
  border-color: #008bf8;
  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
}

.card:hover .card-button {
  transform: translate(-50%, 50%);
  opacity: 1;
}
</style>
