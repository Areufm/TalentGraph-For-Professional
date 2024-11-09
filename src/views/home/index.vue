<template>
  <el-container>
    <el-header>
      <HeaderBar />
    </el-header>
    <el-main class="hide-scrollbar">
      <img
        :src="cityImg"
        alt=""
        style="
          width: 100%;
          height: 140px;
          background: rgba(192, 230, 245);
          margin: 0;
        "
      />
      <div class="centerPosition" style="margin-top: 10px">
        <SearchBar />
        <div class="hotWorkTags">
          热门职位：
          <el-check-tag
            round
            checked
            v-for="hotWorkTag in hotWorkTags"
            style="display: flex; margin: 0 5px"
            @change="clickTag(hotWorkTag)"
          >
            {{ hotWorkTag }}
          </el-check-tag>
        </div>
      </div>
      <FunctionCard />
      <h1>热门职位</h1>
      <el-tabs v-model="hotWorkTab" class="demo-tabs" @tab-click="changeTab">
        <el-tab-pane label="互联网" name="internet"></el-tab-pane>
        <el-tab-pane label="AI/数据" name="ai"></el-tab-pane>
        <el-tab-pane label="电子" name="electronics"></el-tab-pane>
        <el-tab-pane label="电气" name="electrical"></el-tab-pane>
        <el-tab-pane label="通信" name="communication"></el-tab-pane>
      </el-tabs>
      <HotWorks :label="hotWorkTab" />
      <div class="get-more">
        <GetMore />
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import type { TabsPaneContext } from "element-plus";
import cityImg from "@/assets/img/city.png";
import HeaderBar from "@/components/HeaderBar.vue";
import SearchBar from "@/components/SearchBar.vue";
import GetMore from "@/components/GetMore.vue";
import HotWorks from "./components/HotWorks.vue";
import FunctionCard from "./components/FunctionCard.vue";
import { getHotWorkTags } from "@/api/info";
import { onMounted, ref } from "vue";

const hotWorkTab = ref("internet");
const hotWorkTags = ref([]);

// 获取热门职位标签Tags
const getTags = async () => {
  const res = await getHotWorkTags();
  hotWorkTags.value = res.data;
};

// 点击热门职位标签Tag
const clickTag = (hotWorkTag: string) => {
  console.log(hotWorkTag);
};

// 切换热门职业Tab
const changeTab = (tab: TabsPaneContext) => {
  hotWorkTab.value = tab.paneName as string;
};

onMounted(() => {
  getTags();
});
</script>

<style scoped lang="scss">
.el-tabs--top {
  align-items: center;
}

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

.hotWorkTags {
  display: flex;
  align-items: center;
  margin: 10px auto;
  font-weight: bold;
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
  padding: 0;
}

.get-more {
  margin: 30px;
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
