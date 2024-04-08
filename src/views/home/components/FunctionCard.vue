<template>
  <div class="card">
    <div v-if="authStore.isLogin" class="left">
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
            @click="toSkill"
            src="../../../assets/FunctionCard/ability.png"
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const isLogin = ref(true);

const router = useRouter();
const toRecommend = () => {
  router.push("/recommend");
};
const toResume = () => {
  router.push("/profile");
};
const toSkill = () => {
  router.push("/skill-evaluation");
};
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}

.card {
  display: flex;
  margin: 30px 100px;
}

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
}

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
}

.rrtop {
  height: 50%;
  /* border: 2px rgba(161, 159, 159, 0.682) solid;
  border-radius: 10px; */
  margin: 0 0 10px 0;
}

.rrbottom {
  height: 50%;
  /* border: 2px rgba(161, 159, 159, 0.682) solid;
  border-radius: 10px; */
  margin: 10px 0 0 0;
}
</style>
