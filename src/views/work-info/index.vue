<template>
  <HeaderBar />
  <div v-if="currentJob" class="container">
    <div class="job-header">
      <h1 class="job-title">{{ currentJob.title }}</h1>

      <div style="display: flex; align-items: center">
        <img :src="currentJob.logo" alt="" style="
            border-radius: 50%;
            width: 40px;
            height: 40px;
            margin-right: 15px;
          " />
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
        <p style="display: flex; align-items: center">
          推荐评价：
          <el-rate v-model="rateValue" :texts="['不满意', '一般', '还行', '很棒', '非常满意']" show-text />
        </p>
      </div>
      <button class="send-button">
        <div class="svg-wrapper-1">
          <div class="svg-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path fill="currentColor"
                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z">
              </path>
            </svg>
          </div>
        </div>
        <span>投递简历</span>
      </button>
    </div>

    <div class="job-card">
      <div class="job-info">
        <h2 v-if="currentJob.major.length > 0">专业方向</h2>
        <ul v-for="(majorInfo, i) in currentJob.major.slice(0, 5)" :key="i">
          <li>{{ majorInfo }}</li>
        </ul>
        <h2>要求和技能</h2>

        <div class="flex">
          <p class="job-description-card" v-for="(keyword, i) in currentJob.skill.slice(0, 5) " :key="i">
            {{ keyword }}
          </p>
        </div>
        <h2>职位描述</h2>
        <p style=" white-space: pre-wrap;">{{ currentJob.description }}</p>
      </div>
    </div>
  </div>
  <div v-else style="margin-top: 100px">
    ？？？？正在加载中
    <h1>JOB: -- {{ infoJob }}</h1>
    <h1>{{ currentNum }}</h1>
    <button @click="jobStore.addNum()">+1</button>
    <button @click="console.log(infoJob)">job</button>
  </div>
</template>

<script setup>
import HeaderBar from "@/components/HeaderBar.vue";
import Radar from "@/components/Chart/Radar.vue";
import { ref, onMounted, onBeforeMount } from "vue";

const rateValue = ref();

import { useJobStore } from "@/stores/job";
import { storeToRefs } from "pinia";

const jobStore = useJobStore();

const { infoJob } = storeToRefs(jobStore)
// const currentJob = computed(() => jobStore.getCurrentJob);
const currentNum = computed(() => jobStore.getCurrentNum);

const currentJob = {
  title: "Android",
  salary: "6-12K",
  education: "本科",
  skill: [
    "Java",
    "ui",
    "app",
    "多线程",
    "Android",
    "android ndk",
    "Android Studio",
    "网络",
  ],
  info: "带薪年假，节日福利，餐补，年终奖，工龄奖，绩效奖金",
  kind1: "互联网",
  kind2: "前端/移动开发",
  kind3: "移动开发",
  description:
    "岗位职责：\n1、 从事安卓APP移动平台客户端软件的功能设计、开发和实现；\n2、 根据产品功能模块设计，编码实现各模块功能，并确保开发质量与进度；\n3、 对于产品的BUG进行问题的修正；\n4、 对移动端应用做出系统优化和数据优化；\n5、 产品的迭代和维护；\n岗位要求：\n1、熟练掌握Java, 熟悉面向对象思想，熟悉常用设计模式，编程习惯良好；\n2、熟练掌握安卓应用开发技术（包括UI、网络、存储、多线程等方面）、开发工具和测试工具；\n3、熟练掌握Android开发平台及框架原理，精通系统组件的使用，能进行自定义控件的封装；\n4、熟悉android屏幕适配，有APP性能优化的经验；\n5、有独立完整开发 App 经验优先，有个人上架 App 优先；\n6、良好的沟通及人际技巧，与团队成员高效协作；\n7、熟悉安卓各大市场APP上线流程",
  province: "安徽省",
  city: "合肥市",
  district: "瑶海区",
  address: "安徽合肥市瑶海区都市科技工业园C6栋101",
  major: ["计算机"],
  neo4j: 8852,
  company: "统旭智慧科技",
  logo: "https://img.bosszhipin.com/beijin/upload/com/logo/20220926/7b5b554d84f9729c157fc655c4aecc0c8cf8e49fb37c6801ccd75b28d7f169b2a9c7a6bce39fbdca.png?x-oss-process=image/resize,w_100,limit_0",
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  /* background: linear-gradient(
    to bottom,
    rgb(192, 230, 245),
    rgb(188, 228, 244),
    rgb(211, 238, 248),
    rgb(221, 239, 245),
    rgb(225, 238, 242),
    white
  ); */
  background: linear-gradient(to bottom,
      rgba(192, 230, 245, 0.818) 2%,
      rgba(188, 228, 244, 0.616) 8%,
      rgb(211, 238, 248) 15%,
      rgb(221, 239, 245) 20%,
      rgb(225, 238, 242) 40%,
      white);
  /* padding: 50px; */
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
}

.job-header {
  width: 45vw;
  margin: 60px auto 20px 50px;
  padding: 20px;
}

.job-title {
  font-size: 50px;
  margin-bottom: 10px;
}

.company-name {
  font-size: large;
  margin-bottom: 10px;
  color: #555;
}

.job-details {
  margin-bottom: 20px;
}

.job-details p {
  margin: 0;
  margin-bottom: 10px;
  font-size: medium;
}

.job-card {
  align-items: center;
  justify-content: center;
  width: 50vw;
  margin: 0 50px 0 auto;
}

.job-info {
  /* background-color: white; */
  border: 1px rgb(181, 178, 178) solid;
  border-radius: 30px;
  box-shadow: 5px 10px 20px rgba(0, 0, 0, 0.5);
  padding: 40px 50px;
  height: 70vh;
  overflow-y: auto;
}

.apply-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
}

.flex {
  display: flex;
}

.margin {
  margin: 8px;
}

.job-description-card {
  margin: 10px;
  border: 2px solid rgb(164, 224, 248);
  border-radius: 20px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
  display: inline-block;
  padding: 5px 15px;
  font-size: 13px;
}

.send-button {
  font-family: inherit;
  font-size: 17px;
  background: skyblue;
  color: white;
  padding: 0.5em 0.7em;
  padding-left: 0.9em;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s;
  cursor: pointer;
}

.send-button span {
  display: block;
  margin-left: 0.3em;
  transition: all 0.3s ease-in-out;
}

.send-button svg {
  display: block;
  transform-origin: center center;
  transition: transform 0.3s ease-in-out;
}

.send-button:hover .svg-wrapper {
  animation: fly-1 0.6s ease-in-out infinite alternate;
}

.send-button:hover svg {
  transform: translateX(1.2em) rotate(45deg) scale(1.1);
}

.send-button:hover span {
  transform: translateX(5em);
}

.send-button:active {
  transform: scale(0.95);
}

@keyframes fly-1 {
  from {
    transform: translateY(0.1em);
  }

  to {
    transform: translateY(-0.1em);
  }
}

::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

::-webkit-scrollbar-track {
  width: 0px;
  height: 0px;
}

::-webkit-scrollbar-thumb {
  width: 0px;
  height: 0px;
}
</style>
