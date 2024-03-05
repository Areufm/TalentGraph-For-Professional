<template>
  <HeaderBar />
  <div class="container">
    <div class="head">推荐岗位：前端工程师</div>
    <div class="some">
      <div class="left">
        <div class="card">card</div>
        <div class="card">card</div>
        <div class="card">card</div>
        <div class="card">card</div>
        <div class="card">card</div>
        <div class="card">card</div>
        <div class="card">card</div>
        <div class="card">card</div>
        <div class="card">card</div>
        <div class="card">card</div>
        <div class="card">card</div>
      </div>
      <div class="right">
        <!-- <ul>
          <li>information</li>
          <li>information</li>
          <li>information</li>
          <li>information</li>
          <li>information</li>
          <li>information</li>
          <li>information</li>
          <li>information</li>
          <li>information</li>
          <li>information</li>
          <li>information</li>
          <li>information</li>
        </ul> -->
      </div>
    </div>
    推荐岗位: {{ num }}
  </div>
</template>

<script setup>
import { ref } from "vue";
import HeaderBar from "@/components/HeaderBar.vue";

const num = ref(10);
</script>

<style scoped>
.container {
  margin: 60px auto 0 auto;
  /* margin: 0 auto; */
  background-color: #fff;
  padding: 50px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}
.head {
  border: 1px rgb(170, 164, 164) solid;
  border-radius: 20px;
  height: 80px;
  padding: 20px;
}

.some {
  /* margin-top: 60px; */
  display: flex;
  width: 100%;
}
.left {
  width: 400px;
}
.card {
  width: 350px;
  height: 180px;
  border: 2px rgb(142, 136, 136) solid;
  border-radius: 10px;
  margin: 10px;
}
.right {
  flex: 1;
  border: 2px rgb(142, 136, 136) solid;
  border-radius: 10px;
  margin: 10px;
}
</style>
