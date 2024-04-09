<template>
  <HeaderBar />
  <div class="container">
    <div v-if="currentJob" style="display: flex">
      <div class="job-header">
        <h1 class="job-title">{{ currentJob.title }}</h1>

        <div style="display: flex; align-items: center">
          <img
            :src="currentJob.logo"
            alt=""
            style="
              border-radius: 50%;
              width: 40px;
              height: 40px;
              margin-right: 15px;
            "
          />
          <p class="company-name">{{ currentJob.company }}</p>
        </div>
        <div class="job-details">
          <p>薪资范围：{{ currentJob.salary }}</p>
          <p>
            工作地点：{{ currentJob.province }} - {{ currentJob.city }} -
            {{ currentJob.district }} - {{ currentJob.address }}
          </p>

          <p>{{ currentJob.info }}</p>
        </div>
      </div>

      <div class="job-card">
        <div class="job-info">
          <div class="job-description">
            <h2>专业方向</h2>
            <div class="flex">
              <p class="job-description-card">计算机</p>
              <p class="job-description-card">电子信息</p>
              <p class="job-description-card">运维</p>
              <p class="job-description-card">搬砖</p>
            </div>
            <h2>职位描述</h2>
            <div class="flex">
              <p
                class="job-description-card"
                v-for="(keyword, i) in currentJob.skill.slice(0, 5)"
                :key="i"
                style="margin: 10px"
              >
                {{ keyword }}
              </p>
            </div>
          </div>

          <div class="job-requirements">
            <div>
              <h2>要求和技能</h2>
              <ul v-for="(keyword, i) in currentJob.skill.slice(0, 5)" :key="i">
                <li>{{ keyword }}</li>
              </ul>
            </div>
          </div>
          <Radar />
        </div>
      </div>
    </div>
    <div v-else class="loading">正在加载中</div>
  </div>
</template>

<script setup>
import HeaderBar from "@/components/HeaderBar.vue";
import Radar from "@/components/Chart/Radar.vue";
import { ref, onMounted } from "vue";

import { useJobStore } from "@/stores/job";

const jobStore = useJobStore();

const currentJob = computed(() => jobStore.getCurrentJob());
// const currentJob = {
//   title: "Android",
//   salary: "6-12K",
//   education: "本科",
//   skill: [
//     "Java",
//     "ui",
//     "app",
//     "多线程",
//     "Android",
//     "android ndk",
//     "Android Studio",
//     "网络",
//   ],
//   info: "带薪年假，节日福利，餐补，年终奖，工龄奖，绩效奖金",
//   kind1: "互联网",
//   kind2: "前端/移动开发",
//   kind3: "移动开发",
//   description:
//     "岗位职责：\n1、 从事安卓APP移动平台客户端软件的功能设计、开发和实现；\n2、 根据产品功能模块设计，编码实现各模块功能，并确保开发质量与进度；\n3、 对于产品的BUG进行问题的修正；\n4、 对移动端应用做出系统优化和数据优化；\n5、 产品的迭代和维护；\n岗位要求：\n1、熟练掌握Java, 熟悉面向对象思想，熟悉常用设计模式，编程习惯良好；\n2、熟练掌握安卓应用开发技术（包括UI、网络、存储、多线程等方面）、开发工具和测试工具；\n3、熟练掌握Android开发平台及框架原理，精通系统组件的使用，能进行自定义控件的封装；\n4、熟悉android屏幕适配，有APP性能优化的经验；\n5、有独立完整开发 App 经验优先，有个人上架 App 优先；\n6、良好的沟通及人际技巧，与团队成员高效协作；\n7.熟悉安卓各大市场APP上线流程",
//   province: "安徽省",
//   city: "合肥市",
//   district: "瑶海区",
//   address: "合肥合肥市瑶海区都市科技工业园C6栋101",
//   major: [],
//   neo4j: 8852,
//   company: "统旭智慧科技",
//   logo: "https://img.bosszhipin.com/beijin/upload/com/logo/20220926/7b5b554d84f9729c157fc655c4aecc0c8cf8e49fb37c6801ccd75b28d7f169b2a9c7a6bce39fbdca.png?x-oss-process=image/resize,w_100,limit_0",
// };
</script>

<style scoped>
.container {
  margin: 0 auto;
  /* background-color: rgb(230, 245, 248); */
  background: linear-gradient(
    to bottom,
    rgb(192, 230, 245),
    rgb(188, 228, 244),
    rgb(211, 238, 248),
    rgb(221, 239, 245),
    rgb(225, 238, 242),
    white
  );
  padding: 50px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

.job-header {
  width: 80%;
  margin: 60px auto 20px auto;
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
  width: 80%;
  margin: 0 auto;
}

.job-info {
  /* background-color: white; */
  border: 1px rgb(164, 160, 160) solid;
  border-radius: 30px;
  padding: 20px;
}

.job-description {
  margin-bottom: 20px;
}

.job-description-card {
  margin: 10px;
  border: 2px solid rgb(182, 178, 178);
  display: inline-block;
  padding: 5px 15px;
  font-size: 13px;
}

.job-requirements {
  margin-bottom: 20px;
  display: flex;
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
</style>
