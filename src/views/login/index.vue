<template>
  <div class="login">
    <div class="left">
      <button style="margin: 5px auto" @click="isLogin = !isLogin">
        我要招聘
      </button>
      <button style="margin: 5px auto" @click="isLogin = !isLogin">
        我要求职
      </button>
    </div>
    <div class="right">
      <div v-if="isLogin">
        <Login />
      </div>
      <div v-else>
        <Register />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";

const isLogin = ref(true);
</script>

<style scoped>
.login {
  /* width: 80%; */
  /* max-width: 500px; */
  width: 700px;
  display: flex;
  border: 2px black solid;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.left {
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 5px;
  border: 2px black solid;
}
.right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5px;
  border: 2px black solid;
  flex: 2;
}
</style>
