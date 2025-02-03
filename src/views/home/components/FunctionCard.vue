<template>
  <div class="card">
    <div v-if="isLogin" class="left">
      <PersonCard />
    </div>
    <div v-else class="left">
      <Login />
    </div>
    <div class="right">
      <div class="rleft">
        <img @click="toRecommend" :src="recommend" alt="推荐入口" />
      </div>
      <div class="rright">
        <div class="rrtop">
          <img @click="toProfile" :src="ability" alt="能力评价入口" />
        </div>
        <div class="rrbottom">
          <img @click="toResume" :src="cv" alt="简历上传入口" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import recommend from "@/assets/img/FunctionCard/recommend.webp";
import ability from "@/assets/img/FunctionCard/ability.webp";
import cv from "@/assets/img/FunctionCard/cv.webp";
import PersonCard from "./PersonCard.vue";
import Login from "./Login.vue";
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { storage } from "@/utils/storage";

onBeforeMount(() => {
  // 初始化时从本地存储恢复登录状态
  const storedIsLoggedIn = storage.get("isLoggedIn");

  if (storedIsLoggedIn === "true") {
    authStore.isLogin = true;
  }
});

const authStore = useAuthStore();
const { isLogin } = storeToRefs(authStore);
const router = useRouter();

const toRecommend = () => {
  router.push("/recommend");
};
const toResume = () => {
  router.push("/profile");
};
const toProfile = () => {
  router.push("/");
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}

.card {
  display: flex;
  margin: 30px 100px;
  height: 300px;
  gap: 10px;

  .left {
    flex: 1;
    display: flex;
  }

  .right {
    width: 700px;
    display: flex;
    gap: 10px;

    .rleft {
      width: 450px;
    }

    .rright {
      flex: 1;
      display: flex;
      gap: 10px;
      flex-direction: column;

      .rrtop {
        height: 145px;
      }

      .rrbottom {
        height: 145px;
      }
    }
  }
}
</style>
