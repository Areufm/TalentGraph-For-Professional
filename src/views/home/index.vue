<template>
  <el-container>
    <el-header>
      <HeaderBar />
    </el-header>
    <el-main class="hide-scrollbar">
      <img
        :src="cityImg"
        alt=""
        style="width: 100%; height: 140px; background: rgba(192, 230, 245)"
      />
      <div class="centerPosition" style="margin-top: 10px">
        <SearchBar />
        <div class="hotwork">
          热门职位：
          <a v-for="hotWork in hotWorks" href="" class="work">
            {{ hotWork }}
          </a>
        </div>
      </div>
      <FunctionCard />
      <h1>热门职位</h1>

      <Tag />
      <div class="get-more">
        <GetMore />
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import cityImg from "@/assets/img/city.png";
import HeaderBar from "@/components/HeaderBar.vue";
import SearchBar from "@/components/SearchBar.vue";
import GetMore from "./components/GetMore.vue";
import Tag from "./components/Tag.vue";
import FunctionCard from "./components/FunctionCard.vue";
import { getHotWorkTags } from "@/api/info";
import { onMounted, ref } from "vue";

const hotWorks = ref([]);

const getTags = async () => {
  const res = await getHotWorkTags();
  hotWorks.value = res.data;
};

onMounted(() => {
  getTags();
});
</script>

<style scoped lang="scss">
h1 {
  text-align: center;
  margin-bottom: 20px;
}

.centerPosition {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
}

.hotwork {
  display: flex;
  margin: 10px auto;
  font-weight: bold;
}

.work {
  display: flex;
  margin: 0 10px;
  border: 2px rgb(38, 133, 161) solid;
  border-radius: 10px;
  padding: 0 10px;
  color: rgb(48, 83, 96);
  /* 添加默认背景颜色或者透明背景 */
  background-color: transparent;
  text-decoration: none;

  &:hover {
    background: rgb(140, 209, 230);
    color: white;
  }
}

.el-container {
  margin: 0;
  padding: 0;
  height: 100vh;
}

.el-main {
  background: linear-gradient(
    to bottom,
    rgba(192, 230, 245, 0.818) 2%,
    rgba(188, 228, 244, 0.616) 8%,
    rgb(211, 238, 248) 15%,
    rgb(221, 239, 245) 20%,
    rgb(225, 238, 242) 30%,
    white
  );
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  overflow: auto;
}

.get-more {
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hide-scrollbar {
  scrollbar-width: none; /* 适用于Firefox */
  -ms-overflow-style: none; /* 适用于Internet Explorer 10+ */

  &::-webkit-scrollbar {
    display: none; /* 适用于Webkit浏览器 */
  }
}
</style>
