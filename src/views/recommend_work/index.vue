<template>
  <div class="container">
    <!-- 上方信息 -->
    <div class="top">
      <div style="display: flex; align-items: center; width: 300px">
        <el-icon color=" rgba(98,145,217)" size="28px"><StarFilled /></el-icon>
        <h2>求职岗位： {{ recommendWork }}</h2>
      </div>
      <div class="sort">
        <p style="font-size: 17px; font-weight: bold">请选择推荐方式:</p>
        <sort-button
          type="primary"
          style="margin: auto 20px"
          @click="changeButton('skill')"
          >技能优先</sort-button
        >
        <sort-button
          type="primary"
          style="margin: auto 20px"
          @click="changeButton('company')"
          >名企优先</sort-button
        >
        <sort-button
          type="primary"
          style="margin: auto 20px"
          @click="changeButton('salary')"
          >薪资优先</sort-button
        >
        <sort-button
          type="primary"
          style="margin: auto 20px"
          @click="changeButton('city')"
          >同城优先</sort-button
        >
      </div>
    </div>
    <!-- 卡片和图谱 -->
    <div class="some">
      <!-- 推荐卡片 -->
      <div class="left" v-if="currentJobs">
        <div
          class="card"
          v-for="(job, index) in currentJobs"
          :key="index"
          @click="selectJob(job, index)"
        >
          <div
            style="
              height: 100%;
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
            "
          >
            <!-- 岗位信息 -->
            <div
              style="
                max-width: 200px;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
              "
            >
              <p class="work_name">{{ job.title }}</p>
              <p class="work_salary">{{ job.salary }}</p>
            </div>
            <!-- 匹配度 -->
            <el-progress
              class="custom-progress"
              type="dashboard"
              :percentage="Number(((job.match_value ?? 0) * 100).toFixed(1))"
              :width="70"
            >
              <template #default="{ percentage }">
                <span class="percentage-value">{{ percentage }}%</span>
                <span class="percentage-label">岗位匹配度</span>
              </template>
            </el-progress>
          </div>

          <div style="width: 100%; display: flex; align-items: center">
            <p class="company_name">{{ job.company }}</p>
            <p class="job">{{ job.kind2 }}</p>
          </div>
        </div>

        <!-- 换页组件 -->
        <div style="margin: 10px auto 0 auto">
          <el-pagination
            small
            background
            :page-size="pageSize"
            :pager-count="5"
            layout="prev, pager, next"
            :total="total"
            @current-change="changePage"
          />
        </div>
      </div>
      <!-- 知识图谱 -->
      <div class="right">
        <Relationship :relationInfo="relationInfo" />
        <div style="position: absolute; bottom: 0; left: 0">
          <p class="title_job">岗位</p>
          <p class="title_salary">薪资</p>
          <p class="title_region">地区</p>
          <p class="title_skill">技能</p>
          <p class="title_company">公司</p>
        </div>
      </div>
    </div>
  </div>
  <!-- 职位具体信息弹窗 -->
  <el-drawer
    v-if="currentJob"
    v-model="drawer"
    direction="rtl"
    size="60%"
    style="
      background: linear-gradient(
        to bottom,
        rgba(192, 230, 245) 2%,
        rgba(188, 228, 244) 8%,
        rgb(211, 238, 248) 15%,
        rgb(221, 239, 245) 20%,
        rgb(225, 238, 242) 40%,
        white
      );
    "
  >
    <template #header>
      <h1 class="job-title">{{ currentJob.title }}</h1>
    </template>
    <template #default>
      <!-- <Info /> -->
      <div class="Info-container">
        <div class="job-header">
          <div style="display: flex; align-items: center">
            <img
              :src="currentJob.logo ?? ''"
              alt=""
              style="
                border-radius: 50%;
                width: 50px;
                height: 50px;
                margin-right: 15px;
              "
            />
            <p class="company-name">{{ currentJob.company }}</p>
          </div>
          <div class="job-details">
            <p style="color: red">薪资范围： {{ currentJob.salary }}</p>
            <p>
              工作地点： {{ currentJob.province }} - {{ currentJob.city }} -
              {{ currentJob.district }} -
              {{ currentJob.address }}
            </p>

            <p>公司福利： {{ currentJob.info }}</p>
          </div>
        </div>

        <div class="job-card">
          <div class="job-info">
            <h2 v-if="currentJob.major && currentJob.major.length > 0">
              专业方向
            </h2>
            <ul
              v-for="(majorInfo, i) in currentJob.major?.slice(0, 5)"
              :key="i"
            >
              <li>{{ majorInfo }}</li>
            </ul>
            <h2>要求和技能</h2>

            <div class="flex">
              <p
                class="job-description-card"
                v-for="(keyword, i) in currentJob.skill?.slice(0, 5)"
                :key="i"
              >
                {{ keyword }}
              </p>
            </div>
            <h2>职位描述</h2>
            <p style="text-indent: 32px">
              {{ currentJob.description }}
            </p>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div style="display: flex">
        <p style="display: flex; align-items: center">
          推荐评价：
          <el-rate
            v-model="rateValue"
            :texts="['不满意', '一般', '还行', '很棒', '非常满意']"
            show-text
          />
        </p>
        <div style="margin-left: auto; display: flex; align-items: center">
          <!-- <el-button @click="cancelClick">取消</el-button> -->

          <button class="send-button" @click="confirmClick">
            <div class="svg-wrapper-1">
              <div class="svg-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fill="currentColor"
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  ></path>
                </svg>
              </div>
            </div>
            <span>投递简历</span>
          </button>
        </div>
        <!-- <el-button type="primary" @click="confirmClick">confirm</el-button> -->
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { StarFilled } from "@element-plus/icons-vue";
import Relationship from "@/components/Chart/Relationship.vue";
import { storage } from "@/utils/storage";
import { WorkInfo } from "@/types/work";
import { getRecommendGraph } from "@/api/chart";

const relationshipRef = ref(0);

const changeButton = (type: string) => {
  getRecommendGraphData(type);
};

const getRecommendGraphData = async (type: string) => {
  const res = await getRecommendGraph({ type });
  console.log("fetchRecommendGraphData res.data --->", res.data);
  jobsData.value = res.data.jobsData;
  relationData.value = res.data.relationData;
};

onBeforeMount(() => {
  // 初始化时从本地存储恢复登录状态
  const storedIsLoggedIn = storage.get("isLoggedIn");
  if (storedIsLoggedIn === "true") {
    authStore.isLogin = true;
  }
  console.log(authStore.isLogin);
  if (!authStore.isLogin) {
    ElMessage.error("请先登录账户！");
    router.push("/login");
  }
});

onMounted(() => {
  getRecommendGraphData("skill");
});

const currentJob = ref<WorkInfo>(); // 当前选中的职位信息

function selectJob(job: WorkInfo, index: number) {
  relationshipRef.value = index + 1;
  // jobStore.selectJob(job);
  currentJob.value = job;
  toggleDrawer();
}

const authStore = useAuthStore();
const router = useRouter();
const drawer = ref(false); // 职位详情抽屉
const recommendWork = ref("前端开发"); // 推荐岗位

// 切换抽屉显示
const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

// 是否投递简历
const confirmClick = () => {
  ElMessageBox.confirm("你确定要投递简历信息吗？", "Confirm", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "info",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "投递简历成功！",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消投递简历",
      });
    });
};

const currentPage = ref(1); // 当前页码
const pageSize = ref(4); // 每页显示的数据条数
const total = ref(20); // 假设总共有100条数据
const rateValue = ref(0); // 评价值
const jobsData = ref([]); // 存储所有职位数据
const relationData = ref([]); // 存储图谱数据

// 当前页面的几个职位数据
const currentJobs = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return jobsData.value.slice(start, end) as WorkInfo[];
});

// 换页
const changePage = (newPage: number) => {
  currentPage.value = newPage;
};

// 对Relationship组件传递的参数
const relationInfo = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return relationData.value.slice(start, end);
});
</script>

<style scoped src="./index.scss"></style>
