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
        <img
          @click="toRecommend"
          src="../../../assets/FunctionCard/recommend2.png"
          alt="推荐入口"
        />
      </div>
      <div class="rright">
        <div class="rrtop">
          <img
            @click="toProfile"
            src="../../../assets/FunctionCard/ability2.png"
            alt="能力评价入口"
          />
        </div>
        <div class="rrbottom">
          <img
            @click="toResume"
            src="../../../assets/FunctionCard/cv2.png"
            alt="简历上传入口"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PersonCard from "./PersonCard.vue";
import Login from "./Login.vue";
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
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

  .left {
    height: 300px;
    flex: 2;
    width: 400px;
    /* border: 2px rgba(161, 159, 159, 0.682) solid; */
    border-radius: 10px;
    margin: 10px;
    display: flex;
  }

  .right {
    height: 300px;
    flex: 3;
    /* border: 2px rgba(161, 159, 159, 0.682) solid;
  border-radius: 10px; */
    margin: 10px;
    display: flex;

    .rleft {
      /* height: 280px; */
      flex: 2;
      /* border: 2px rgba(161, 159, 159, 0.682) solid;
  border-radius: 10px; */
      /* margin: 10px; */
    }

    .rright {
      /* height: 280px; */
      flex: 1;
      /* border: 2px rgba(161, 159, 159, 0.682) solid;
  border-radius: 10px; */
      display: flex;
      flex-direction: column;
      margin: 0 10px;

      .rrtop {
        height: 50%;
        /* flex:1; */
        /* border: 2px rgba(161, 159, 159, 0.682) solid;
  border-radius: 10px; */
        /* padding: 5px; */
        /* margin: 0 0 0px 0; */
      }

      .rrbottom {
        height: 50%;
        /* flex:1; */
        /* border: 2px rgba(161, 159, 159, 0.682) solid;
  border-radius: 10px; */
        /* margin: 0px 0 0 0; */
        /* padding: 5px; */
      }
    }
  }
}
</style>
