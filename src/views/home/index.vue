<template>
  <div>
    <div>home</div>
    <button @click="toLogin">tologin</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const toLogin = () => {
  router.push("/login");
};
</script>
