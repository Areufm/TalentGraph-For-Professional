<template>
  <n-layout>
    <HeaderBar />
    <n-layout-content content-style="padding: 24px;">
      <div class="centerPosition" style="margin-top: 20px">
        <SearchBar />
      </div>
      <FunctionCard />
      <h1>热门职位</h1>
      <HotWorks />
      <HotWorks />
      <HotWorks />
      <div class="get-more">
        <GetMore />
      </div>
      <h1>热门企业</h1>
      <HotCompany />
      <HotCompany />
      <HotCompany />
      <div class="get-more">
        <GetMore />
      </div>
    </n-layout-content>
  </n-layout>
</template>

<script setup>
import { ref } from "vue";
import HeaderBar from "@/components/HeaderBar.vue";
import SearchBar from "@/components/SearchBar.vue";
import HotCompany from "@/components/HotCompany.vue";
import HotWorks from "@/components/HotWorks.vue";
import GetMore from "@/components/GetMore.vue";
<<<<<<< HEAD
=======
import FunctionCard from "@/components/FunctionCard.vue";

const router = useRouter();
const count = ref(0);

const toLogin = () => {
  router.push("/register");
};
>>>>>>> 5dc3872c6e4ae22fbf7eeaafd60fb7398258b6d9
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}
.centerPosition {
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
}

.n-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.n-layout-content {
  /* flex: 1; */
  height: 90%;
  background: rgba(167, 167, 167, 0.277);
  /* background: rgb(225, 222, 222); */
  display: flex;
  flex-direction: column;
  margin-top: 70px;
}

.get-more {
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
