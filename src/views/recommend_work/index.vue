<template>
  <HeaderBar />
  <div class="container">
    <div class="top">
      <div style="display: flex">
        <svg style="width: 30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728="">
          <path fill="currentColor" d="M288 128h608L736 384l160 256H288v320h-96V64h96z"></path>
        </svg>
        <h2>求职岗位： {{ recommendWork }}</h2>
      </div>
      <div class="sort">
        <p style="font-size: 17px; font-weight: bold">请选择推荐方式:</p>
        <!-- <el-button type="primary" style="margin: auto 20px">名企优先</el-button>
        <el-button type="primary" style="margin: auto 20px">薪资优先</el-button>
        <el-button type="primary" style="margin: auto 20px">同城优先</el-button>
        <el-button type="primary" style="margin: auto 20px">技能优先</el-button> -->
        <sort-button type="primary" style="margin: auto 20px">技能优先</sort-button>
        <sort-button type="primary" style="margin: auto 20px">名企优先</sort-button>
        <sort-button type="primary" style="margin: auto 20px">薪资优先</sort-button>
        <sort-button type="primary" style="margin: auto 20px">同城优先</sort-button>
      </div>
      <!-- 知识图谱节点说明
      <div style="display: flex; margin-left: auto;">
        <p class="title_job">岗位</p>
        <p class="title_salary">薪资</p>
        <p class="title_region">地区</p>
        <p class="title_skill">技能</p>
        <p class="title_company">公司</p>
      </div> -->
    </div>
    <!-- 职位具体信息 -->
    <el-drawer v-model="drawer" direction="rtl" size="60%" style="
        background: linear-gradient(
          to bottom,
          rgba(192, 230, 245) 2%,
          rgba(188, 228, 244) 8%,
          rgb(211, 238, 248) 15%,
          rgb(221, 239, 245) 20%,
          rgb(225, 238, 242) 40%,
          white
        );
      ">
      <template #header>
        <h1 class="job-title">{{ currentJob.title }}</h1>
      </template>
      <template #default>
        <!-- <Info /> -->
        <div class="Info-container">
          <div class="job-header">
            <div style="display: flex; align-items: center">
              <img :src="currentJob.logo" alt="" style="
                  border-radius: 50%;
                  width: 50px;
                  height: 50px;
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

            </div>
          </div>

          <div class="job-card">
            <div class="job-info">
              <h2 v-if="currentJob.major.length > 0">专业方向</h2>
              <ul v-for="(majorInfo, i) in currentJob.major.slice(0, 5)" :key="i">
                <li>{{ majorInfo }}</li>
              </ul>
              <h2>要求和技能</h2>

              <div class="flex">
                <p class="job-description-card" v-for="(keyword, i) in currentJob.skill.slice(0, 5)" :key="i">
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
        <div style="display: flex; ">
          <p style="display: flex; align-items: center">
            推荐评价：
            <el-rate v-model="rateValue" :texts="['不满意', '一般', '还行', '很棒', '非常满意']" show-text />
          </p>
          <div style="margin-left: auto;display: flex;align-items: center">

            <!-- <el-button @click="cancelClick">取消</el-button> -->

            <button class="send-button" @click="confirmClick">
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
          <!-- <el-button type="primary" @click="confirmClick">confirm</el-button> -->
        </div>
      </template>
    </el-drawer>
    <div class="some">
      <div class="left">
        <!-- <Card :toggle-drawer="toggleDrawer" @mouseover="handleCardHover(0)" />
        <Card :toggle-drawer="toggleDrawer" @mouseover="handleCardHover(1)" />
        <Card :toggle-drawer="toggleDrawer" @mouseover="handleCardHover(2)" />
        <Card :toggle-drawer="toggleDrawer" @mouseover="handleCardHover(3)" /> -->

        <div class="card" v-for="(job, index) in currentJobs" :key="index" @click="selectJob(job,index)">
          <div class="card-details">
            <div style="display: flex; align-items: center; padding-right: 10px">
              <div style="
                  display: flex;
                  flex-direction: column;
                  top: 0;
                  width: 200px;
                  /* justify-content: center; */
                ">
                <p class="work_name">{{ job.title }}</p>
                <p class="work_salary">{{ job.salary }}</p>
              </div>
              <el-progress class="custom-progress" type="dashboard" :percentage="(job.match_value * 100).toFixed(1)"
                :width="70">
                <template #default="{ percentage }">
                  <span class="percentage-value">{{ percentage }}%</span>
                  <span class="percentage-label">岗位匹配度</span>
                </template>
              </el-progress>
            </div>

            <div style="display: flex; align-items: center; padding-right: 10px">
              <!-- <img
                :src="job.logo"
                alt=""
                style="width: 30px; height: 30px; border-radius: 50%"
              /> -->
              <p class="company_name">{{ job.company }}</p>
              <p class="job">{{ job.kind2 }}</p>
            </div>
            <!-- <button class="card-button" @click="handleToggleDrawer">More info</button> -->
          </div>
        </div>

        <!-- 换页组件 -->
        <div style="margin: 20px auto 0 auto">
          <el-pagination small background :page-size="pageSize" :pager-count="5" layout="prev, pager, next"
            :total="total" @current-change="changePage" />
        </div>
      </div>
      <div class="right">
        <Relationship :ref="relationshipRef" />
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
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import Card from "./components/Card.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import Info from "./components/Info.vue";
import Relationship from "@/components/Chart/Relationship.vue";

const relationshipRef = ref(0);

// 假设Card组件现在能接受cardIndex并发出hover事件
function handleCardHover(index) {
  relationshipRef.value = index + 1;
  // console.log(relationshipRef.value);
}

onBeforeMount(() => {
  // 初始化时从本地存储恢复登录状态
  const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
  if (storedIsLoggedIn === "true") {
    authStore.isLogin = true;
  }
  console.log(authStore.isLogin);
  if (!authStore.isLogin) {
    ElMessage.error("请先登录账户！");
    router.push("/login");
  }
});

import { useJobStore } from "@/stores/job";
import { storeToRefs } from "pinia";

const jobStore = useJobStore();

const { currentJob } = storeToRefs(jobStore);

function selectJob(job,index) {
  relationshipRef.value = index + 1;
  jobStore.selectJob(job);
  toggleDrawer();
}

const authStore = useAuthStore();
const router = useRouter();
const drawer = ref(false);
const recommendWork = ref("前端开发");

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

function confirmClick() {
  ElMessageBox.confirm(
    "你确定要投递简历信息吗？",
    "Confirm",
    {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "info",
    }
  )
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
}

const currentPage = ref(1); // 当前页码
const pageSize = ref(4); // 每页显示的数据条数
const total = ref(20); // 假设总共有100条数据
const jobsData = ref([
  {
    title: "php开发工程师",
    salary: "6-10K·13薪",
    education: "学历不限",
    skill: [
      "Java",
      "CSS",
      "Javascript",
      "MySQL",
      "PHP",
      "web",
      "HTML5",
      "Golang",
    ],
    info: "五险一金，补充医疗保险，员工旅游，零食下午茶，定期体检，加班补助，节日福利，年终奖",
    kind1: "互联网",
    kind2: "后端开发",
    kind3: "PHP",
    description:
      "注：工作地点在杭州临安区，16号线人民广场\n1、计算机或相关专业优先；\n2、熟练掌握PHP/MySQL编程\n3、熟悉HTML5，Javascript，CSS等相关Web技术；\n4、良好的工作态度，责任心强，有良好的沟通能力以及团队协作精神。\n5、对编程热爱，只要你想学，高薪等你挑战。\n公司福利\n1、富有竞争力的薪酬及职务晋升体系，五险一金；\n2、免费咖啡\n3、不定期团建，聚餐\n4、团队均为90后，年轻活力\n5、年度体检\n工作时间：双休",
    province: "浙江省",
    city: "杭州市",
    district: "临安市",
    address: "杭州临安区中国(杭州)跨境电子商务综合试验区临安园区二期528",
    major: ["计算机"],
    neo4j: 8025,
    company: "嘉策信息",
    logo: "https://img.bosszhipin.com/beijin/mcs/chatphoto/20201211/8c69751fc2866f96eb1fbd686e190b72ae5f1a690cf0c6810a0b25e33b2c6751_s.jpg?x-oss-process=image/resize,w_100,limit_0",
    match_value: 0.7327061342009246,
  },
  {
    title: "web前端工程师",
    salary: "16-26K",
    education: "大专",
    skill: ["CSS", "Javascript", "web", "JS", "HTML5"],
    info: null,
    kind1: "互联网",
    kind2: "前端/移动开发",
    kind3: "前端开发工程师",
    description:
      "职责描述： 1. 负责公司超级账本项目的网管子系统部分前端页面的开发工作； 2. 负责设计Web前端用户交互流程；3. 对业务需求进行评估，提出解决方案； 4. 配合后台工程师完成应用的整合测试； 5. 学习和钻研新的前端框架、前端技术，不断优化程序质量。任职要求： 1. 不低于2年Web前端项目开发; 2. 熟悉前端开发的基础技术（CSS、HTML5、CSS3等）;3. 熟悉原生js，对JavaScript的底层原理有深刻的理解，熟悉ES6;4. 能够熟练使用VUE，element-ui进行前端页面开发;5. 熟知前端代码在各种浏览器下的差异，并且能做出兼容方案;6. 精通各种前端设计模式，并且有深刻认识;",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区西溪明园13幢B楼",
    major: [],
    neo4j: 5176,
    company: "浙江永旗区块链科技有限公司",
    logo: "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
    match_value: 0.667297226198856,
  },
  {
    title: "前端开发工程师",
    salary: "15-30K",
    education: "大专",
    skill: ["CSS", "React", "vue", "JS"],
    info: "带薪年假，12%公积金，股票期权，定期体检，年终奖，餐补，五险一金，补充医疗保险，节日福利",
    kind1: "互联网",
    kind2: "前端/移动开发",
    kind3: "前端开发工程师",
    description:
      "我们的团队：- 在线化客户服务建设- 提供动态化，流程化，智能化的客户服务能力职位描述：- 负责IM即时通讯工具开发- 负责工单系统，反馈平台，帮助中心等开发- 负责内容运营系统开发- 涉及移动端自适应适配职位要求：- 熟悉React或者Vue技术栈及其生态圈- 有扎实的JS和CSS基础- 熟悉常用的设计模式，更够编写良好的代码模块和接口- 有较好的业务理解能力和解决能力",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区杭州涂鸦科技有限公司杭州市西湖区华策中心A座",
    major: [],
    neo4j: 5252,
    company: "杭州涂鸦信息技术有限公司",
    logo: "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
    match_value: 0.6660526792460265,
  },
  {
    title: "3D前端开发工程师",
    salary: "15-25K·14薪",
    education: "大专",
    skill: ["canvas", "CSS", "Javascript", "HTML", "JS", "WebGL", "three.js"],
    info: "五险一金，股票期权，免费班车，年终奖，补充医疗保险，带薪年假，员工旅游，定期体检，餐补，包吃",
    kind1: "互联网",
    kind2: "前端/移动开发",
    kind3: "前端开发工程师",
    description:
      "岗位描述：1. 负责产品的前端的技术方案选型2. 对前端性能有一定的把控与优化手段3. 关注前端前沿技术，能够运用新技术服务产品与团队岗位要求：1. 熟练掌握前端技术（javascript, html, css）2. 熟练掌握vue，react等框架及其周边技术3. 掌握常用的前端动画技术（Canvas，WebGL，SVG）等4. 熟悉至少一种3D渲染框架，如three.js、d3.js，能够熟练应用到业务中5. 具有良好的沟通与合作能力6. 有大屏开发经验，能够接受偶尔的出差",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区蒋村商务中心9楼",
    major: [],
    neo4j: 5173,
    company: "浙江讯盟科技有限公司",
    logo: "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
    match_value: 0.6166410685733384,
  },
  {
    title: "前端开发工程师(实习生)",
    salary: "2-3K",
    education: "大专",
    skill: ["GIT", "CSS", "Javascript", "React", "HTML", "vue"],
    info: null,
    kind1: "互联网",
    kind2: "前端/移动开发",
    kind3: "前端开发工程师",
    description:
      "岗位内容：1、负责公司产品开发和维护；2、根据产品需求完成模块设计、编码、自测工作3、按照项目计划，遵循公司相关流程按时提交高质量代码，完成开发任务；4、对产品进行性能优化，确保优质的用户体验；5、与产品、项目经理、测试部门沟通保证产品的质量和开发进度；6、确保高还原度的完成项目开发，并且有主动意识提出产品体验改进建议;7、完成领导交代的其他任务；岗位要求：1、计算机相关专业，在校/应届本科及以上；2、熟悉HTML、CSS、JavaScript等前端技术，具有良好的前端开发基础；3、了解React、Vue框架优先;4、能熟练使用git代码管理；5、自我管理能力良好，具备较高目标导向和团队合作精神，有快速学习能力，擅长沟通；6.日薪120-150元/天    每周工作3天以上。",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区西溪科创园9幢9楼",
    major: ["计算机"],
    neo4j: 4234,
    company: "先之（杭州）教育科技有限公司",
    logo: "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
    match_value: 0.586210847398996,
  },
  {
    title: "资深前端工程师",
    salary: "17-23K·13薪",
    education: "大专",
    skill: [
      "Java",
      "C++",
      "Node",
      "Python",
      "PHP",
      "Ruby",
      "小程序",
      "C",
      "vue",
      "H5",
    ],
    info: "餐补，免费班车，加班补助，年终奖，节日福利，五险一金",
    kind1: "互联网",
    kind2: "前端/移动开发",
    kind3: "前端开发工程师",
    description:
      "一：工作内容1、负责产品开发及维护；2、根据产品设计需求，参与公司H5、小程序，pc端的前端开发；3、优化开发细节，跟其他同事一起共同提高开发效率。4、研究前沿技术和前端新特性，提高开发效率和质量5、参与建设前端基础服务，设计大型项目框架，如微服务，lowCode，组件库等二：任职资格1、有扎实的前端基本功，编程能力够硬，了解业界先进的概念和开发方式，有实践经验；2、精通Vue等主流框架，如果对其他的框架有着深入理解，我们也欢迎3、了解工程化相关的概念，有处理性能优化或者项目搭建相关经历；4、我们绝大多数项目不强制要求兼容ie11之前版本，但是需要了解兼容性方面的知识；5、独立负责过中大型系统前端，能重复设计考虑可维护性和可拓展性等。6、拥有良好的代码书写习惯，具备良好的团队协作精神，能利用自身技术能力提升团队整体研发效率，提高团队影响力；7、对前端技术有持续的热情，个性乐观开朗，逻辑性强，善于和其他职能的人合作；8、了解技术的原理和机制，对于前沿技术的热枕和对自己的高要求会是你最大的加分项9、至少熟悉一门非前端的语言（如Java/PHP/C/C++/Python/Ruby）或者node相关知识；ps：我们团队正处于快速上升期，node端的赋能、异常，埋点，发布等平台的搭建、标准化，微服务，组件库等的建设。总有一款能让你一展所学。我们有良好的codeReview机制，积极的技术分享，不断思考用技术解决遇到的问题，信仰技术改变世界的力量。期待不满足于现状，坚信技术改变世界，渴望更大舞台你的加入，在这里你能接触到真正的大量用户，负责环境的考验，真实的面临各种极端情况下的处理方案，同时有一群坚信技术能改变世界的小伙伴",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区紫金创业园B座13楼",
    major: [],
    neo4j: 5122,
    company: "湖州全都来了网络科技有限公司",
    logo: "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
    match_value: 0.574774170867473,
  },
  {
    title: "前端开发工程师",
    salary: "20-25K·13薪",
    education: "大专",
    skill: ["web", "前端", "Javascript", "HTML5"],
    info: "意外险，零食下午茶，带薪年假，股票期权，节日礼品，五险一金，补充医疗保险，交通补助，家庭关爱假，餐补，免费健身设施，年终奖，餐饮及下午茶，就近租房补贴，法定节假日三薪，家属自选保险，团建聚餐，定期体检，弹性工作制，年度体检",
    kind1: "互联网",
    kind2: "前端/移动开发",
    kind3: "前端开发工程师",
    description:
      "岗位职责：1. 负责前端开发框架的设计和搭建；2. 根据设计文档、开发规范进行页面开发；3.公司产品线易用性改进和Web界面技术优化；4. 完成领导交代的其他工作；负责公司的PC端项目产品的开发工作；任职要求：1. 计算机相关专业，3年及以上前端区块链开发的工作经验；2. 有vue网站的前端部署和实践经验，代码风格良好；3. 熟练掌握HTML5、CSS3、JavaScript开发；4. 确保web网页能支持指定的浏览器和设备，解决兼容性问题；5. 理解能力强，善于沟通，有责任心和团队精神；",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区西溪银泰城2-西写字楼(弘德路)南楼1009",
    major: ["计算机"],
    neo4j: 5112,
    company: "杭州微声科技有限公司",
    logo: "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
    match_value: 0.5706162328399005,
  },
  {
    title: "前端工程师",
    salary: "15-25K",
    education: "大专",
    skill: [
      "前端",
      "Angular",
      "Java",
      "C++",
      "React",
      "Python",
      "PHP",
      "web",
      "app",
      "Node.js",
      "C",
      "Ruby",
    ],
    info: "五险一金，免费工装，绩效奖金，生日福利，带薪年假，节日福利，股票期权，餐补，团建聚餐，零食下午茶，年终奖，定期体检，补充医疗保险，加班补助",
    kind1: "互联网",
    kind2: "前端/移动开发",
    kind3: "前端开发工程师",
    description:
      "1、有扎实的前端基本功，编程能力够硬，了解先进开发方式，有实践经验。2、具备跨终端的前端开发能力，在Web（PC+Mobile）/Node.js/Hybrid App三个方向上至少精通一个方向，具备多个的更佳；3、精通React/Angular/WEEX等前端框架，熟悉源码和框架原理，熟悉前端工程化。4、至少熟悉一门非前端的语言（如Java/PHP/C/C++/Python/Ruby）5、具备良好的团队协作精神，能利用自身技术能力提升团队整体研发效率，提高团队影响力；6、对前端技术有持续的热情，个性乐观开朗，逻辑性强，善于和各种背景的人合作；",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区德力西大厦10",
    major: [],
    neo4j: 5240,
    company: "杭州天阙科技有限公司",
    logo: "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
    match_value: 0.5394541085089856,
  },
  {
    title: "PHP",
    salary: "8-13K",
    education: "本科",
    skill: ["HTML/CSS", "Javascript", "HTML5"],
    info: null,
    kind1: "互联网",
    kind2: "后端开发",
    kind3: "PHP",
    description: "业务熟练，吃苦耐劳，自信，豁达",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区西溪谷",
    major: [],
    neo4j: 7989,
    company: "裕隆通信",
    logo: "https://img.bosszhipin.com/beijin/mcs/chatphoto/20160929/e3df06e67ecbdeff3dfd41c98742598ed97c00de18854d6428265f2bd005ca31.jpg?x-oss-process=image/resize,w_100,limit_0",
    match_value: 0.5251600204327264,
  },
  {
    title: "全栈工程师",
    salary: "15-20K·13薪",
    education: "本科",
    skill: [
      "Java",
      "Vue",
      "JavaScript",
      "Swift",
      "全栈无侧重",
      "HTML",
      "全栈项目经验",
      "计算机相关专业",
      "C",
      "小程序",
      "Kotlin",
    ],
    info: "交通补助，节日福利，股票期权，绩效奖金，保底工资，夜班补助，员工旅游，五险一金，带薪年假，法定节假日三薪",
    kind1: "互联网",
    kind2: "后端开发",
    kind3: "全栈工程师",
    description:
      "莱普晟医疗\n【岗位职责】\n1、 参与需求方案讨论分析，设计文档编写等；\n2、 对软件需求进行分析，软件设计，编码，测试；\n3、 负责现有软件系统的二次开发，系统优化，系统升级等工作；\n4、 负责公司项目的前端和后端开发、修改以及调试的工作，高效、保质地完成代码编写；\n5、 负责公司小程序及移动端各类业务新系统的设计，开发等工作；\n6、 解决项目中的各种问题，持续优化相关产品的质量、性能以及用户体验。\n【任职要求】\n1、 本科以上学历，计算机、通信相关专业；\n2、 有2年以上软件开发经验，熟悉开发平台及框架原理，精通Java/Objective-C/Swift/Kotlin语言；\n3、 熟悉软件设计原则及设计模式，代码规范性强；\n4、 学习能力强，有较强的沟通能力，有较强的理解，逻辑分析能力。\n杭州莱普晟医疗科技有限公司成立于2016年8月，是国内唯一一家由双院士（李兰娟、郑树森）领衔技术开发的公司，曾荣获2014，2015双国家科技进步一等奖，2017国家科技进步特等奖，国家高新技术企业。\n我司核心团队由留学美国哈佛大学、麻省理工及瑞士洛桑大学、伯尔尼大学的海归博士组建，项目负责人曾在国家卫计委挂职一年余，直接参与器官移植管理及政策制定工作，参与并推动我国首个器官转运绿色通道的建立。\n公司是目前国内唯一一家自主研发的“移植器官灌注保存、复苏及转运技术”先进医疗器械公司，致力成为移植器官灌注保存、复苏领域国内标杆，领先的解决方案提供商。\n研发中心位于杭州经济开发区白杨街道6号大街452号高科技企业孵化园，配备500平米现代化研发空间。生产工厂位于浙江省杭州经济技术开发区6号大街260号正泰中自科技园。在嘉兴、绍兴、萧山、上海等多地设有子公司、研发中心。\n我们的团队由2名院士、6名博士、14名大学研究员、30多名员工组成，队伍还在持续壮大中……\n我们是一支专业的团队。我们的成员拥有深厚技术 –院士，海归，浙大，交大，MIT，HARVARD，瑞士技术支撑，一线移植医师及医院临床。\n我们是一支年轻的团队。我们的平均年龄不到30岁，充满了朝气和创新精神。\n我们是一支专注的团队。我们坚信，只有专注，才能把事情做到极致。只有专注，才能走得更远，飞得更高。\n我们是一支有梦想的团队。我们来自五湖四海，因为一个共同的梦想：润泽器官， 普济众生。\n诚挚期待有志之士加入我们，共同为器官移植事业添砖加瓦。",
    province: "浙江省",
    city: "杭州市",
    district: "上城区",
    address: "杭州上城区杭州市高科技企业孵化园区2幢",
    major: ["计算机", "通信"],
    neo4j: 8411,
    company: "莱普晟医疗",
    logo: "https://img.bosszhipin.com/beijin/upload/com/workfeel/20220304/7bf6f160950405e913949b939f9b67089507b58a23bd4b6be02b78f48dbb619813056c5b80572c5d.jpg?x-oss-process=image/resize,w_100,limit_0",
    match_value: 0.5036947100699732,
  },
  {
    title: "前端开发工程师",
    salary: "15-30K",
    education: "大专",
    skill: ["canvas", "前端", "React"],
    info: "餐补，五险一金，零食下午茶，带薪年假，住房补贴，团建聚餐，绩效奖金，保底工资",
    kind1: "互联网",
    kind2: "前端/移动开发",
    kind3: "前端开发工程师",
    description:
      "工作内容：1、负责前端功能设计、开发和实现，保证产品的质量和开发进度；2、设计开发高效的前端组件，提高开发效率和维护成本；3、适应快速变化的需求，及时输出产品。岗位要求：1、大专及以上学历，计算机相关专业，3年以上前端开发工作经验；2、丰富的开发经验，熟悉react；3、能熟练使用Canvas等工具优先；4、扎实的计算机基础，具备较强的解决问题的能力，熟悉基础算法；5、对前端技术有持续的热情，个性乐观开朗，逻辑性强；",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区世贸丽晶城欧美中心(天目山路)C座501室",
    major: ["计算机"],
    neo4j: 5160,
    company: "西格玛（海南）家居科技发展有限责任公司",
    logo: "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
    match_value: 0.4985853020669807,
  },
  {
    title: "前端开发工程师",
    salary: "5-10K",
    education: "大专",
    skill: [
      "GIT",
      "前端",
      "Webpack",
      "gulp",
      "CSS",
      "web",
      "app",
      "SVN",
      "HTML",
      "JS",
      "vue",
      "H5",
    ],
    info: "餐补，五险一金，定期体检，交通补助，零食下午茶",
    kind1: "互联网",
    kind2: "前端/移动开发",
    kind3: "前端开发工程师",
    description:
      "岗位职责：1、负责移动端自动化脚本，PC web及App端的前端开发工作；2、与产品设计、开发人员紧密配合，准时、高效地完成模块功能；任职资格：1.精通JS，对闭包、事件和异步有深刻的见解，熟练手写原生JS代码，精通各种前端调试工具，熟悉JS性能优化。2.熟练使用移动端自动化脚本开发，有实际项目经验3.熟练使用vue开发，有实际项目经验4.熟悉gulp、webpack脚本配置。5.熟练使用svn、git代码管理工具。6.熟练使用html、css,精通css布局。7.熟悉H5混合开发，对前后端分离有独特见解，有实际项目经验8.良好的学习能力和沟通能力，编码稳健严谨，精益求精，对问题有探究精神",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区黄龙恒励大厦8楼",
    major: [],
    neo4j: 4840,
    company: "浙江爱电机器人科技有限公司",
    logo: "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
    match_value: 0.49857339908023973,
  },
  {
    title: "前端开发工程师",
    salary: "12-20K",
    education: "大专",
    skill: ["HTTP", "web", "vue", "JS", "uni-app", "HTML5", "vuejs", "H5"],
    info: "股票期权，零食下午茶，电脑津贴，带薪年假，绩效奖金，五险一金",
    kind1: "互联网",
    kind2: "前端/移动开发",
    kind3: "前端开发工程师",
    description:
      "岗位职责：1、负责H5端、微信小程序、Web后台等前端开发、调试和维护；2、配合后台开发人员实现界面交互与功能；3、负责Web性能优化、体验优化；4、参与新技术探索、推进系统架构的演化。任职要求：1、扎实的计算机以及网络基础，了解HTTP协议以及浏览器原理；2、熟悉Web前端技术（HTML5、CSS3.0、ES6等)，熟悉主流框架、类库的设计和实现，熟练跨浏览器兼容与开发；3、熟悉模块化、前端编译和构建工具，熟练运用主流的移动端JS库和开发框架，并深入理解其设计原理，例如：ReactJS、VueJS、uni-app等；4、能够理解业务需求并提出改进意见，页面效果还原度高，注重细节实现；5、有BI大屏页、大型前端工程化、大型Vue项目实施经验加分。",
    province: "浙江省",
    city: "杭州市",
    district: "上城区",
    address: "杭州上城区趣村游文旅集团3层",
    major: [],
    neo4j: 5035,
    company: "杭州趣村游文旅集团有限公司",
    logo: "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
    match_value: 0.4903722689140013,
  },
  {
    title: "Python开发工程师",
    salary: "13-20K·13薪",
    education: "本科",
    skill: ["JQuery", "Django", "bootstrap", "web", "Flask"],
    info: "年终奖，补充医疗保险，节日福利，定期体检，股票期权，员工旅游，餐补，通讯补贴，零食下午茶，五险一金，带薪年假",
    kind1: "互联网",
    kind2: "后端开发",
    kind3: "Python",
    description:
      "后台服务功能模块的设计与开发,会熟悉Django/flask等web开发框架，\n至少用flask开发过一个项目，对技术有浓厚兴趣，熟悉bootstrap/jquery优先\n熟悉eventlet,wtf,cython,paramiko",
    province: "浙江省",
    city: "杭州市",
    district: "上城区",
    address: "杭州上城区鑫亚·钱江国际时代广场3-38层",
    major: [],
    neo4j: 8286,
    company: "VisionVera",
    logo: "https://img.bosszhipin.com/beijin/upload/com/workfeel/20220628/7bf6f160950405e95831aae8e1c2a7ebf3e4aba4d4c2a571442a9e77da98470ea3229cea12915d21.jpg?x-oss-process=image/resize,w_100,limit_0",
    match_value: 0.4880116823149259,
  },
  {
    title: "前端开发工程师",
    salary: "20-30K·16薪",
    education: "大专",
    skill: [
      "前端",
      "HTTP",
      "Node",
      "CSS",
      "React",
      "Javascript",
      "web",
      "HTML",
      "vue",
      "英文",
    ],
    info: "生日福利，节日福利，夜班补助，保底工资，团建聚餐，交通补助，员工旅游，带薪年假，五险一金，定期体检，绩效奖金，法定节假日三薪，年终奖，餐补",
    kind1: "互联网",
    kind2: "前端/移动开发",
    kind3: "前端开发工程师",
    description:
      "工作职责：负责爱逛直播业务的前端开发和底层技术、工具支持。工作内容：1.参与前端开发；3.参与改进开发、构建、发布、监控等前端工程化体系；4.参与Web性能优化、体验优化；5.参与新技术探索、推进系统架构的演化。任职要求：1.技术栈：React(PC)+Vue(Mobile)+Node(展示层+SSR)；2.扎实的计算机以及网络基础；3.阅读英文技术文档和书籍无障碍；4.HTML、CSS、JavaScript基础扎实，了解HTTP协议以及浏览器原理；5.有大型前端工程化、大型Node项目实施经验加分。成长建议：1.多看别人的代码，学习里面的代码组织和设计思路；2.参与技术项目；3.多了解一些后端以及运维相关的知识；4.培养自己在交互和设计上的敏感性；5.工具化思维，减少重复劳动。",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区杭州有赞科技有限公司7号楼",
    major: [],
    neo4j: 5155,
    company: "杭州爱逛网络信息服务有限公司",
    logo: "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
    match_value: 0.47757459931642715,
  },
  {
    title: "前端开发工程师",
    salary: "8-10K",
    education: "大专",
    skill: [
      "GIT",
      "npm",
      "HTTP",
      "Node",
      "CSS",
      "element-ui",
      "HTML",
      "axios",
      "vue",
    ],
    info: null,
    kind1: "互联网",
    kind2: "前端/移动开发",
    kind3: "前端开发工程师",
    description:
      "岗位职责1. 负责公司整体前端项目开发、维护2. 参与前端产品需求讨论3. 与公司其他部门对接前端项目任职要求1. 熟练掌握HTML，CSS，JS2. 熟悉vue开发(vue全家桶)，适应H5，PC端项目及相关UI框架(element-ui为主)3. 对H5兼容性有一定了解，处理H5兼容问题4. 对HTTP有一定了解，axios封装5. 熟练使用GIT版本控制工具6. 掌握多语言开发，适配多语言开发下的样式问题7. 对视频，直播流，图片处理有所了解8. 了解node，npm，cocos",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区东部软件园7号楼616",
    major: [],
    neo4j: 4727,
    company: "杭州盘丝洞网络科技有限公司",
    logo: "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
    match_value: 0.47745741837778793,
  },
  {
    title: "前端开发工程师（杭州/react）",
    salary: "19-22K·13薪",
    education: "大专",
    skill: [
      "HTTP",
      "CSS",
      "ui",
      "Javascript",
      "React",
      "api",
      "element-ui",
      "web",
      "HTML",
      "ECharts",
    ],
    info: "五险一金，补充医疗保险，免费班车，餐补",
    kind1: "互联网",
    kind2: "前端/移动开发",
    kind3: "前端开发工程师",
    description:
      "任职要求：1. 3年以上 Web 前端开发经验，能独立完成单个模块的前端开发工作。2. 掌握 HTML, JavaScript / ES6, CSS 等前端基础技能，深刻理解 Web 应用的基本实现原理，掌握 HTTP 等基本协议，熟练对接后端 API。3. 精通React框架,以及全家桶。4. 有流行 UI 框架的使用经验，例如 Ant Design, Element-ui等。5. 有流行 图表框架的使用经验，例如 Echarts、AntV等。",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区黄龙国际中心写字楼B座12楼",
    major: [],
    neo4j: 5088,
    company: "博彦科技",
    logo: "https://img.bosszhipin.com/beijin/mcs/banner/eb7c416aa1c228b43cbae35dbf1e6990cfcd208495d565ef66e7dff9f98764da.jpg?x-oss-process=image/resize,w_100,limit_0",
    match_value: 0.4730844325952631,
  },
  {
    title: "软件测试工程师",
    salary: "2-4K",
    education: "本科",
    skill: [
      "HTTP",
      "Javascript",
      "web",
      "HTML",
      "SQL",
      "Selenium",
      "LoadRunner",
      "英文",
    ],
    info: "全勤奖，员工旅游，年终奖，节日福利，补充医疗保险，加班补助，带薪年假，五险一金",
    kind1: "互联网",
    kind2: "测试",
    kind3: "软件测试",
    description:
      "职位描述要求：工作职责 ：1.负责公司产品的Web环境测试、性能测试及通用性测试；2.能够编写测试用例以及构建和维护测试环境，根据需求文档、测试用例设计编写测试详细过程并执行测试；3.负责进行专业的软件功能测试，产品验证测试等各类测试工作；4.分析和定位缺陷并进行跟踪、验证；5.编写缺陷报告、测试总结、质量检测报告等测试报告。任职资格 ：1.2018年计算机相关专业本科毕业生；2.熟悉软件测试理论和方法，了解Web自动化测试；3.熟悉性能测试和自动化测试工具如LoadRunner、Selenium等；4.了解HTTP、HTML及JavaScript，了解SQL和数据库操作；5.对软件测试有浓厚的兴趣，持续关注业界的趋势及各种新技术；6.乐于并善于学习，有高度的责任心，关注细节，注重测试方法，能够与开发团队做很好的沟通；7.有软件测试或者开发背景者优先；8.CET4或以上水平，能阅读、编写中英文技术文档；9.具备较强学习能力、逻辑思维能力和自主解决问题的能力，具备良好的沟通能力和团队协",
    province: "浙江省",
    city: "杭州市",
    district: "上城区",
    address: "杭州上城区创新中国产业园5楼532",
    major: ["计算机"],
    neo4j: 5510,
    company: "杭州飓卓科技有限公司",
    logo: "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
    match_value: 0.4707642516166806,
  },
  {
    title: "uniapp前端工程师",
    salary: "4-8K",
    education: "大专",
    skill: ["mqtt", "uniapp", "HTTP", "json", "app"],
    info: "定期体检，五险一金",
    kind1: "互联网",
    kind2: "前端/移动开发",
    kind3: "前端开发工程师",
    description:
      "1.  负责智能家居系统APP开发与维护。2.  熟悉uniapp，MQTT，HTTP，JSON。3.  吃苦耐劳，有团队合作精神。4.  应届生优先考虑。 5. 双休，不加班，工作时间9:00～12:00，1:30～6:00。",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区颐高创业大厦颐高创业大厦A座5F",
    major: [],
    neo4j: 4495,
    company: "杭州雪意科技有限公司",
    logo: "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
    match_value: 0.46189826743791523,
  },
  {
    title: "高级Java开发工程师/技术专家",
    salary: "25-35K·13薪",
    education: "本科",
    skill: ["微服务", "Java", "Spring", "web", "架构师", "银行", "运维"],
    info: "股票期权，节日福利，通讯补贴，零食下午茶，定期体检，带薪年假，餐补，年终奖，包吃，免费班车，餐补，五险一金，加班补助，交通补助，补充医疗保险，员工旅游",
    kind1: "互联网",
    kind2: "后端开发",
    kind3: "java",
    description:
      "1、主导信贷、存款、理财、渠道、客户营销等系统分析与设计工作，承担核心功能或组件的代码编写；\n2、主导技术难题攻关，持续提升系统稳定性和高并发处理能力，扫除技术风险；\n3、主导金融行业基础平台、业务平台的架构设计及落地。\n要求：\n1、扎实的java编程基础，精通Java EE、微服务、消息中间件等相关技术；对各种开源的框架如Spring,消息中间件等有深入的了解；\n2、2年以上大规模高并发访问的Web应用系统设计和开发经验，丰富的线上运维经验；\n3、具备良好的识别和设计通用框架及模块的能力；\n4、具有大型电子商务网站以及银行业核心系统、电信boss系统设计与研发经验背景的优先考虑。",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区德力西大厦1号楼12-19层",
    major: [],
    neo4j: 7891,
    company: "网商银行",
    logo: "https://img.bosszhipin.com/beijin/mcs/chatphoto/20180226/cdcccd257874715c64fecbdc2b5922f2cfcd208495d565ef66e7dff9f98764da.jpg?x-oss-process=image/resize,w_100,limit_0",
    match_value: 0.46014786797276064,
  },
]); // 存储所有职位数据

const currentJobs = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return jobsData.value.slice(start, end);
});

const changePage = (newPage) => {
  currentPage.value = newPage;
};

const relationInfo = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return relationData.value.slice(start, end);
});

const relationData = ref([
  [
    {
      "n": {
        "id": "8025",
        "title": "php开发工程师"
      },
      "type(r)": "专业",
      "m": {
        "title": "计算机"
      }
    },
    {
      "n": {
        "id": "8025",
        "title": "php开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Golang"
      }
    },
    {
      "n": {
        "id": "8025",
        "title": "php开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "HTML5"
      }
    },
    {
      "n": {
        "id": "8025",
        "title": "php开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "web"
      }
    },
    {
      "n": {
        "id": "8025",
        "title": "php开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "PHP"
      }
    },
    {
      "n": {
        "id": "8025",
        "title": "php开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "MySQL"
      }
    },
    {
      "n": {
        "id": "8025",
        "title": "php开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Javascript"
      }
    },
    {
      "n": {
        "id": "8025",
        "title": "php开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "CSS"
      }
    },
    {
      "n": {
        "id": "8025",
        "title": "php开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Java"
      }
    },
    {
      "n": {
        "id": "8025",
        "title": "php开发工程师"
      },
      "type(r)": "公司",
      "m": {
        "scale": "100",
        "title": "嘉策信息"
      }
    },
    {
      "n": {
        "id": "8025",
        "title": "php开发工程师"
      },
      "type(r)": "薪资",
      "m": {
        "title": "6-10K·13薪"
      }
    },
    {
      "n": {
        "id": "8025",
        "title": "php开发工程师"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "学历不限"
      }
    },
    {
      "n": {
        "id": "8025",
        "title": "php开发工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "临安市",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "8025",
        "title": "php开发工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "PHP"
      }
    }
  ],
  [
    {
      "n": {
        "id": "5176",
        "title": "web前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "HTML5"
      }
    },
    {
      "n": {
        "id": "5176",
        "title": "web前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "JS"
      }
    },
    {
      "n": {
        "id": "5176",
        "title": "web前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "web"
      }
    },
    {
      "n": {
        "id": "5176",
        "title": "web前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Javascript"
      }
    },
    {
      "n": {
        "id": "5176",
        "title": "web前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "CSS"
      }
    },
    {
      "n": {
        "id": "5176",
        "title": "web前端工程师"
      },
      "type(r)": "公司",
      "m": {
        "scale": "100",
        "title": "浙江永旗区块链科技有限公司"
      }
    },
    {
      "n": {
        "id": "5176",
        "title": "web前端工程师"
      },
      "type(r)": "薪资",
      "m": {
        "title": "16-26K"
      }
    },
    {
      "n": {
        "id": "5176",
        "title": "web前端工程师"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "大专"
      }
    },
    {
      "n": {
        "id": "5176",
        "title": "web前端工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "西湖区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "5176",
        "title": "web前端工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "前端开发工程师"
      }
    }
  ],
  [
    {
      "n": {
        "id": "5252",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "JS"
      }
    },
    {
      "n": {
        "id": "5252",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "vue"
      }
    },
    {
      "n": {
        "id": "5252",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "React"
      }
    },
    {
      "n": {
        "id": "5252",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "CSS"
      }
    },
    {
      "n": {
        "id": "5252",
        "title": "前端开发工程师"
      },
      "type(r)": "公司",
      "m": {
        "scale": "100",
        "title": "杭州涂鸦信息技术有限公司"
      }
    },
    {
      "n": {
        "id": "5252",
        "title": "前端开发工程师"
      },
      "type(r)": "薪资",
      "m": {
        "title": "15-30K"
      }
    },
    {
      "n": {
        "id": "5252",
        "title": "前端开发工程师"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "大专"
      }
    },
    {
      "n": {
        "id": "5252",
        "title": "前端开发工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "西湖区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "5252",
        "title": "前端开发工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "前端开发工程师"
      }
    }
  ],
  [
    {
      "n": {
        "id": "5173",
        "title": "3D前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "three.js"
      }
    },
    {
      "n": {
        "id": "5173",
        "title": "3D前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "WebGL"
      }
    },
    {
      "n": {
        "id": "5173",
        "title": "3D前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "JS"
      }
    },
    {
      "n": {
        "id": "5173",
        "title": "3D前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "HTML"
      }
    },
    {
      "n": {
        "id": "5173",
        "title": "3D前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Javascript"
      }
    },
    {
      "n": {
        "id": "5173",
        "title": "3D前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "CSS"
      }
    },
    {
      "n": {
        "id": "5173",
        "title": "3D前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "canvas"
      }
    },
    {
      "n": {
        "id": "5173",
        "title": "3D前端开发工程师"
      },
      "type(r)": "公司",
      "m": {
        "scale": "100",
        "title": "浙江讯盟科技有限公司"
      }
    },
    {
      "n": {
        "id": "5173",
        "title": "3D前端开发工程师"
      },
      "type(r)": "薪资",
      "m": {
        "title": "15-25K·14薪"
      }
    },
    {
      "n": {
        "id": "5173",
        "title": "3D前端开发工程师"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "大专"
      }
    },
    {
      "n": {
        "id": "5173",
        "title": "3D前端开发工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "西湖区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "5173",
        "title": "3D前端开发工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "前端开发工程师"
      }
    }
  ],
  [
    {
      "n": {
        "id": "4234",
        "title": "前端开发工程师(实习生)"
      },
      "type(r)": "专业",
      "m": {
        "title": "计算机"
      }
    },
    {
      "n": {
        "id": "4234",
        "title": "前端开发工程师(实习生)"
      },
      "type(r)": "技能",
      "m": {
        "title": "vue"
      }
    },
    {
      "n": {
        "id": "4234",
        "title": "前端开发工程师(实习生)"
      },
      "type(r)": "技能",
      "m": {
        "title": "HTML"
      }
    },
    {
      "n": {
        "id": "4234",
        "title": "前端开发工程师(实习生)"
      },
      "type(r)": "技能",
      "m": {
        "title": "React"
      }
    },
    {
      "n": {
        "id": "4234",
        "title": "前端开发工程师(实习生)"
      },
      "type(r)": "技能",
      "m": {
        "title": "Javascript"
      }
    },
    {
      "n": {
        "id": "4234",
        "title": "前端开发工程师(实习生)"
      },
      "type(r)": "技能",
      "m": {
        "title": "CSS"
      }
    },
    {
      "n": {
        "id": "4234",
        "title": "前端开发工程师(实习生)"
      },
      "type(r)": "技能",
      "m": {
        "title": "GIT"
      }
    },
    {
      "n": {
        "id": "4234",
        "title": "前端开发工程师(实习生)"
      },
      "type(r)": "公司",
      "m": {
        "scale": "100",
        "title": "先之（杭州）教育科技有限公司"
      }
    },
    {
      "n": {
        "id": "4234",
        "title": "前端开发工程师(实习生)"
      },
      "type(r)": "薪资",
      "m": {
        "title": "2-3K"
      }
    },
    {
      "n": {
        "id": "4234",
        "title": "前端开发工程师(实习生)"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "大专"
      }
    },
    {
      "n": {
        "id": "4234",
        "title": "前端开发工程师(实习生)"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "西湖区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "4234",
        "title": "前端开发工程师(实习生)"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "前端开发工程师"
      }
    }
  ],
  [
    {
      "n": {
        "id": "5122",
        "title": "资深前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "H5"
      }
    },
    {
      "n": {
        "id": "5122",
        "title": "资深前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "vue"
      }
    },
    {
      "n": {
        "id": "5122",
        "title": "资深前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "C"
      }
    },
    {
      "n": {
        "id": "5122",
        "title": "资深前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "小程序"
      }
    },
    {
      "n": {
        "id": "5122",
        "title": "资深前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Ruby"
      }
    },
    {
      "n": {
        "id": "5122",
        "title": "资深前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "PHP"
      }
    },
    {
      "n": {
        "id": "5122",
        "title": "资深前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Python"
      }
    },
    {
      "n": {
        "id": "5122",
        "title": "资深前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Node"
      }
    },
    {
      "n": {
        "id": "5122",
        "title": "资深前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "C++"
      }
    },
    {
      "n": {
        "id": "5122",
        "title": "资深前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Java"
      }
    },
    {
      "n": {
        "id": "5122",
        "title": "资深前端工程师"
      },
      "type(r)": "公司",
      "m": {
        "scale": "100",
        "title": "湖州全都来了网络科技有限公司"
      }
    },
    {
      "n": {
        "id": "5122",
        "title": "资深前端工程师"
      },
      "type(r)": "薪资",
      "m": {
        "title": "17-23K·13薪"
      }
    },
    {
      "n": {
        "id": "5122",
        "title": "资深前端工程师"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "大专"
      }
    },
    {
      "n": {
        "id": "5122",
        "title": "资深前端工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "西湖区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "5122",
        "title": "资深前端工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "前端开发工程师"
      }
    }
  ],
  [
    {
      "n": {
        "id": "5112",
        "title": "前端开发工程师"
      },
      "type(r)": "专业",
      "m": {
        "title": "计算机"
      }
    },
    {
      "n": {
        "id": "5112",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "HTML5"
      }
    },
    {
      "n": {
        "id": "5112",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Javascript"
      }
    },
    {
      "n": {
        "id": "5112",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "前端"
      }
    },
    {
      "n": {
        "id": "5112",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "web"
      }
    },
    {
      "n": {
        "id": "5112",
        "title": "前端开发工程师"
      },
      "type(r)": "公司",
      "m": {
        "scale": "100",
        "title": "杭州微声科技有限公司"
      }
    },
    {
      "n": {
        "id": "5112",
        "title": "前端开发工程师"
      },
      "type(r)": "薪资",
      "m": {
        "title": "20-25K·13薪"
      }
    },
    {
      "n": {
        "id": "5112",
        "title": "前端开发工程师"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "大专"
      }
    },
    {
      "n": {
        "id": "5112",
        "title": "前端开发工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "西湖区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "5112",
        "title": "前端开发工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "前端开发工程师"
      }
    }
  ],
  [
    {
      "n": {
        "id": "5240",
        "title": "前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Ruby"
      }
    },
    {
      "n": {
        "id": "5240",
        "title": "前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "C"
      }
    },
    {
      "n": {
        "id": "5240",
        "title": "前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Node.js"
      }
    },
    {
      "n": {
        "id": "5240",
        "title": "前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "app"
      }
    },
    {
      "n": {
        "id": "5240",
        "title": "前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "web"
      }
    },
    {
      "n": {
        "id": "5240",
        "title": "前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "PHP"
      }
    },
    {
      "n": {
        "id": "5240",
        "title": "前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Python"
      }
    },
    {
      "n": {
        "id": "5240",
        "title": "前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "React"
      }
    },
    {
      "n": {
        "id": "5240",
        "title": "前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "C++"
      }
    },
    {
      "n": {
        "id": "5240",
        "title": "前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Java"
      }
    },
    {
      "n": {
        "id": "5240",
        "title": "前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Angular"
      }
    },
    {
      "n": {
        "id": "5240",
        "title": "前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "前端"
      }
    },
    {
      "n": {
        "id": "5240",
        "title": "前端工程师"
      },
      "type(r)": "公司",
      "m": {
        "scale": "100",
        "title": "杭州天阙科技有限公司"
      }
    },
    {
      "n": {
        "id": "5240",
        "title": "前端工程师"
      },
      "type(r)": "薪资",
      "m": {
        "title": "15-25K"
      }
    },
    {
      "n": {
        "id": "5240",
        "title": "前端工程师"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "大专"
      }
    },
    {
      "n": {
        "id": "5240",
        "title": "前端工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "西湖区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "5240",
        "title": "前端工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "前端开发工程师"
      }
    }
  ],
  [
    {
      "n": {
        "id": "7989",
        "title": "PHP"
      },
      "type(r)": "技能",
      "m": {
        "title": "HTML5"
      }
    },
    {
      "n": {
        "id": "7989",
        "title": "PHP"
      },
      "type(r)": "技能",
      "m": {
        "title": "Javascript"
      }
    },
    {
      "n": {
        "id": "7989",
        "title": "PHP"
      },
      "type(r)": "技能",
      "m": {
        "title": "HTML/CSS"
      }
    },
    {
      "n": {
        "id": "7989",
        "title": "PHP"
      },
      "type(r)": "公司",
      "m": {
        "scale": "100",
        "title": "裕隆通信"
      }
    },
    {
      "n": {
        "id": "7989",
        "title": "PHP"
      },
      "type(r)": "薪资",
      "m": {
        "title": "8-13K"
      }
    },
    {
      "n": {
        "id": "7989",
        "title": "PHP"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "本科"
      }
    },
    {
      "n": {
        "id": "7989",
        "title": "PHP"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "西湖区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "7989",
        "title": "PHP"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "PHP"
      }
    }
  ],
  [
    {
      "n": {
        "id": "8411",
        "title": "全栈工程师"
      },
      "type(r)": "专业",
      "m": {
        "title": "通信"
      }
    },
    {
      "n": {
        "id": "8411",
        "title": "全栈工程师"
      },
      "type(r)": "专业",
      "m": {
        "title": "计算机"
      }
    },
    {
      "n": {
        "id": "8411",
        "title": "全栈工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Kotlin"
      }
    },
    {
      "n": {
        "id": "8411",
        "title": "全栈工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "小程序"
      }
    },
    {
      "n": {
        "id": "8411",
        "title": "全栈工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "C"
      }
    },
    {
      "n": {
        "id": "8411",
        "title": "全栈工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "计算机相关专业"
      }
    },
    {
      "n": {
        "id": "8411",
        "title": "全栈工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "全栈项目经验"
      }
    },
    {
      "n": {
        "id": "8411",
        "title": "全栈工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "HTML"
      }
    },
    {
      "n": {
        "id": "8411",
        "title": "全栈工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "全栈无侧重"
      }
    },
    {
      "n": {
        "id": "8411",
        "title": "全栈工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Swift"
      }
    },
    {
      "n": {
        "id": "8411",
        "title": "全栈工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "JavaScript"
      }
    },
    {
      "n": {
        "id": "8411",
        "title": "全栈工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Vue"
      }
    },
    {
      "n": {
        "id": "8411",
        "title": "全栈工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Java"
      }
    },
    {
      "n": {
        "id": "8411",
        "title": "全栈工程师"
      },
      "type(r)": "公司",
      "m": {
        "scale": "1000",
        "title": "莱普晟医疗"
      }
    },
    {
      "n": {
        "id": "8411",
        "title": "全栈工程师"
      },
      "type(r)": "薪资",
      "m": {
        "title": "15-20K·13薪"
      }
    },
    {
      "n": {
        "id": "8411",
        "title": "全栈工程师"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "本科"
      }
    },
    {
      "n": {
        "id": "8411",
        "title": "全栈工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "上城区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "8411",
        "title": "全栈工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "全栈工程师"
      }
    }
  ],
  [
    {
      "n": {
        "id": "5160",
        "title": "前端开发工程师"
      },
      "type(r)": "专业",
      "m": {
        "title": "计算机"
      }
    },
    {
      "n": {
        "id": "5160",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "React"
      }
    },
    {
      "n": {
        "id": "5160",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "前端"
      }
    },
    {
      "n": {
        "id": "5160",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "canvas"
      }
    },
    {
      "n": {
        "id": "5160",
        "title": "前端开发工程师"
      },
      "type(r)": "公司",
      "m": {
        "scale": "100",
        "title": "西格玛（海南）家居科技发展有限责任公司"
      }
    },
    {
      "n": {
        "id": "5160",
        "title": "前端开发工程师"
      },
      "type(r)": "薪资",
      "m": {
        "title": "15-30K"
      }
    },
    {
      "n": {
        "id": "5160",
        "title": "前端开发工程师"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "大专"
      }
    },
    {
      "n": {
        "id": "5160",
        "title": "前端开发工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "西湖区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "5160",
        "title": "前端开发工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "前端开发工程师"
      }
    }
  ],
  [
    {
      "n": {
        "id": "4840",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "H5"
      }
    },
    {
      "n": {
        "id": "4840",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "vue"
      }
    },
    {
      "n": {
        "id": "4840",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "JS"
      }
    },
    {
      "n": {
        "id": "4840",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "HTML"
      }
    },
    {
      "n": {
        "id": "4840",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "SVN"
      }
    },
    {
      "n": {
        "id": "4840",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "app"
      }
    },
    {
      "n": {
        "id": "4840",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "web"
      }
    },
    {
      "n": {
        "id": "4840",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "CSS"
      }
    },
    {
      "n": {
        "id": "4840",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "gulp"
      }
    },
    {
      "n": {
        "id": "4840",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Webpack"
      }
    },
    {
      "n": {
        "id": "4840",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "前端"
      }
    },
    {
      "n": {
        "id": "4840",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "GIT"
      }
    },
    {
      "n": {
        "id": "4840",
        "title": "前端开发工程师"
      },
      "type(r)": "公司",
      "m": {
        "scale": "100",
        "title": "浙江爱电机器人科技有限公司"
      }
    },
    {
      "n": {
        "id": "4840",
        "title": "前端开发工程师"
      },
      "type(r)": "薪资",
      "m": {
        "title": "5-10K"
      }
    },
    {
      "n": {
        "id": "4840",
        "title": "前端开发工程师"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "大专"
      }
    },
    {
      "n": {
        "id": "4840",
        "title": "前端开发工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "西湖区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "4840",
        "title": "前端开发工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "前端开发工程师"
      }
    }
  ],
  [
    {
      "n": {
        "id": "5035",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "H5"
      }
    },
    {
      "n": {
        "id": "5035",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "vuejs"
      }
    },
    {
      "n": {
        "id": "5035",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "HTML5"
      }
    },
    {
      "n": {
        "id": "5035",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "uni-app"
      }
    },
    {
      "n": {
        "id": "5035",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "JS"
      }
    },
    {
      "n": {
        "id": "5035",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "vue"
      }
    },
    {
      "n": {
        "id": "5035",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "web"
      }
    },
    {
      "n": {
        "id": "5035",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "HTTP"
      }
    },
    {
      "n": {
        "id": "5035",
        "title": "前端开发工程师"
      },
      "type(r)": "公司",
      "m": {
        "scale": "100",
        "title": "杭州趣村游文旅集团有限公司"
      }
    },
    {
      "n": {
        "id": "5035",
        "title": "前端开发工程师"
      },
      "type(r)": "薪资",
      "m": {
        "title": "12-20K"
      }
    },
    {
      "n": {
        "id": "5035",
        "title": "前端开发工程师"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "大专"
      }
    },
    {
      "n": {
        "id": "5035",
        "title": "前端开发工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "上城区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "5035",
        "title": "前端开发工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "前端开发工程师"
      }
    }
  ],
  [
    {
      "n": {
        "id": "8286",
        "title": "Python开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Flask"
      }
    },
    {
      "n": {
        "id": "8286",
        "title": "Python开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "web"
      }
    },
    {
      "n": {
        "id": "8286",
        "title": "Python开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "bootstrap"
      }
    },
    {
      "n": {
        "id": "8286",
        "title": "Python开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Django"
      }
    },
    {
      "n": {
        "id": "8286",
        "title": "Python开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "JQuery"
      }
    },
    {
      "n": {
        "id": "8286",
        "title": "Python开发工程师"
      },
      "type(r)": "公司",
      "m": {
        "scale": "10000",
        "title": "VisionVera"
      }
    },
    {
      "n": {
        "id": "8286",
        "title": "Python开发工程师"
      },
      "type(r)": "薪资",
      "m": {
        "title": "13-20K·13薪"
      }
    },
    {
      "n": {
        "id": "8286",
        "title": "Python开发工程师"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "本科"
      }
    },
    {
      "n": {
        "id": "8286",
        "title": "Python开发工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "上城区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "8286",
        "title": "Python开发工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "Python"
      }
    }
  ],
  [
    {
      "n": {
        "id": "5155",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "英文"
      }
    },
    {
      "n": {
        "id": "5155",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "vue"
      }
    },
    {
      "n": {
        "id": "5155",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "HTML"
      }
    },
    {
      "n": {
        "id": "5155",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "web"
      }
    },
    {
      "n": {
        "id": "5155",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Javascript"
      }
    },
    {
      "n": {
        "id": "5155",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "React"
      }
    },
    {
      "n": {
        "id": "5155",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "CSS"
      }
    },
    {
      "n": {
        "id": "5155",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Node"
      }
    },
    {
      "n": {
        "id": "5155",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "HTTP"
      }
    },
    {
      "n": {
        "id": "5155",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "前端"
      }
    },
    {
      "n": {
        "id": "5155",
        "title": "前端开发工程师"
      },
      "type(r)": "公司",
      "m": {
        "scale": "100",
        "title": "杭州爱逛网络信息服务有限公司"
      }
    },
    {
      "n": {
        "id": "5155",
        "title": "前端开发工程师"
      },
      "type(r)": "薪资",
      "m": {
        "title": "20-30K·16薪"
      }
    },
    {
      "n": {
        "id": "5155",
        "title": "前端开发工程师"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "大专"
      }
    },
    {
      "n": {
        "id": "5155",
        "title": "前端开发工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "西湖区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "5155",
        "title": "前端开发工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "前端开发工程师"
      }
    }
  ],
  [
    {
      "n": {
        "id": "4727",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "vue"
      }
    },
    {
      "n": {
        "id": "4727",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "axios"
      }
    },
    {
      "n": {
        "id": "4727",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "HTML"
      }
    },
    {
      "n": {
        "id": "4727",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "element-ui"
      }
    },
    {
      "n": {
        "id": "4727",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "CSS"
      }
    },
    {
      "n": {
        "id": "4727",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Node"
      }
    },
    {
      "n": {
        "id": "4727",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "HTTP"
      }
    },
    {
      "n": {
        "id": "4727",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "npm"
      }
    },
    {
      "n": {
        "id": "4727",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "GIT"
      }
    },
    {
      "n": {
        "id": "4727",
        "title": "前端开发工程师"
      },
      "type(r)": "公司",
      "m": {
        "scale": "100",
        "title": "杭州盘丝洞网络科技有限公司"
      }
    },
    {
      "n": {
        "id": "4727",
        "title": "前端开发工程师"
      },
      "type(r)": "薪资",
      "m": {
        "title": "8-10K"
      }
    },
    {
      "n": {
        "id": "4727",
        "title": "前端开发工程师"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "大专"
      }
    },
    {
      "n": {
        "id": "4727",
        "title": "前端开发工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "西湖区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "4727",
        "title": "前端开发工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "前端开发工程师"
      }
    }
  ],
  [
    {
      "n": {
        "id": "5088",
        "title": "前端开发工程师（杭州/react）"
      },
      "type(r)": "技能",
      "m": {
        "title": "ECharts"
      }
    },
    {
      "n": {
        "id": "5088",
        "title": "前端开发工程师（杭州/react）"
      },
      "type(r)": "技能",
      "m": {
        "title": "HTML"
      }
    },
    {
      "n": {
        "id": "5088",
        "title": "前端开发工程师（杭州/react）"
      },
      "type(r)": "技能",
      "m": {
        "title": "web"
      }
    },
    {
      "n": {
        "id": "5088",
        "title": "前端开发工程师（杭州/react）"
      },
      "type(r)": "技能",
      "m": {
        "title": "element-ui"
      }
    },
    {
      "n": {
        "id": "5088",
        "title": "前端开发工程师（杭州/react）"
      },
      "type(r)": "技能",
      "m": {
        "title": "api"
      }
    },
    {
      "n": {
        "id": "5088",
        "title": "前端开发工程师（杭州/react）"
      },
      "type(r)": "技能",
      "m": {
        "title": "React"
      }
    },
    {
      "n": {
        "id": "5088",
        "title": "前端开发工程师（杭州/react）"
      },
      "type(r)": "技能",
      "m": {
        "title": "Javascript"
      }
    },
    {
      "n": {
        "id": "5088",
        "title": "前端开发工程师（杭州/react）"
      },
      "type(r)": "技能",
      "m": {
        "title": "ui"
      }
    },
    {
      "n": {
        "id": "5088",
        "title": "前端开发工程师（杭州/react）"
      },
      "type(r)": "技能",
      "m": {
        "title": "CSS"
      }
    },
    {
      "n": {
        "id": "5088",
        "title": "前端开发工程师（杭州/react）"
      },
      "type(r)": "技能",
      "m": {
        "title": "HTTP"
      }
    },
    {
      "n": {
        "id": "5088",
        "title": "前端开发工程师（杭州/react）"
      },
      "type(r)": "公司",
      "m": {
        "scale": "10000",
        "title": "博彦科技"
      }
    },
    {
      "n": {
        "id": "5088",
        "title": "前端开发工程师（杭州/react）"
      },
      "type(r)": "薪资",
      "m": {
        "title": "19-22K·13薪"
      }
    },
    {
      "n": {
        "id": "5088",
        "title": "前端开发工程师（杭州/react）"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "大专"
      }
    },
    {
      "n": {
        "id": "5088",
        "title": "前端开发工程师（杭州/react）"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "西湖区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "5088",
        "title": "前端开发工程师（杭州/react）"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "前端开发工程师"
      }
    }
  ],
  [
    {
      "n": {
        "id": "5510",
        "title": "软件测试工程师"
      },
      "type(r)": "专业",
      "m": {
        "title": "计算机"
      }
    },
    {
      "n": {
        "id": "5510",
        "title": "软件测试工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "英文"
      }
    },
    {
      "n": {
        "id": "5510",
        "title": "软件测试工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "LoadRunner"
      }
    },
    {
      "n": {
        "id": "5510",
        "title": "软件测试工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Selenium"
      }
    },
    {
      "n": {
        "id": "5510",
        "title": "软件测试工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "SQL"
      }
    },
    {
      "n": {
        "id": "5510",
        "title": "软件测试工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "HTML"
      }
    },
    {
      "n": {
        "id": "5510",
        "title": "软件测试工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "web"
      }
    },
    {
      "n": {
        "id": "5510",
        "title": "软件测试工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Javascript"
      }
    },
    {
      "n": {
        "id": "5510",
        "title": "软件测试工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "HTTP"
      }
    },
    {
      "n": {
        "id": "5510",
        "title": "软件测试工程师"
      },
      "type(r)": "公司",
      "m": {
        "scale": "100",
        "title": "杭州飓卓科技有限公司"
      }
    },
    {
      "n": {
        "id": "5510",
        "title": "软件测试工程师"
      },
      "type(r)": "薪资",
      "m": {
        "title": "2-4K"
      }
    },
    {
      "n": {
        "id": "5510",
        "title": "软件测试工程师"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "本科"
      }
    },
    {
      "n": {
        "id": "5510",
        "title": "软件测试工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "上城区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "5510",
        "title": "软件测试工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "软件测试"
      }
    }
  ],
  [
    {
      "n": {
        "id": "4495",
        "title": "uniapp前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "app"
      }
    },
    {
      "n": {
        "id": "4495",
        "title": "uniapp前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "json"
      }
    },
    {
      "n": {
        "id": "4495",
        "title": "uniapp前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "HTTP"
      }
    },
    {
      "n": {
        "id": "4495",
        "title": "uniapp前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "uniapp"
      }
    },
    {
      "n": {
        "id": "4495",
        "title": "uniapp前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "mqtt"
      }
    },
    {
      "n": {
        "id": "4495",
        "title": "uniapp前端工程师"
      },
      "type(r)": "公司",
      "m": {
        "scale": "100",
        "title": "杭州雪意科技有限公司"
      }
    },
    {
      "n": {
        "id": "4495",
        "title": "uniapp前端工程师"
      },
      "type(r)": "薪资",
      "m": {
        "title": "4-8K"
      }
    },
    {
      "n": {
        "id": "4495",
        "title": "uniapp前端工程师"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "大专"
      }
    },
    {
      "n": {
        "id": "4495",
        "title": "uniapp前端工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "西湖区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "4495",
        "title": "uniapp前端工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "前端开发工程师"
      }
    }
  ],
  [
    {
      "n": {
        "id": "7891",
        "title": "高级Java开发工程师/技术专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "运维"
      }
    },
    {
      "n": {
        "id": "7891",
        "title": "高级Java开发工程师/技术专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "银行"
      }
    },
    {
      "n": {
        "id": "7891",
        "title": "高级Java开发工程师/技术专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "架构师"
      }
    },
    {
      "n": {
        "id": "7891",
        "title": "高级Java开发工程师/技术专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "web"
      }
    },
    {
      "n": {
        "id": "7891",
        "title": "高级Java开发工程师/技术专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "Spring"
      }
    },
    {
      "n": {
        "id": "7891",
        "title": "高级Java开发工程师/技术专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "Java"
      }
    },
    {
      "n": {
        "id": "7891",
        "title": "高级Java开发工程师/技术专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "微服务"
      }
    },
    {
      "n": {
        "id": "7891",
        "title": "高级Java开发工程师/技术专家"
      },
      "type(r)": "公司",
      "m": {
        "scale": "100",
        "title": "网商银行"
      }
    },
    {
      "n": {
        "id": "7891",
        "title": "高级Java开发工程师/技术专家"
      },
      "type(r)": "薪资",
      "m": {
        "title": "25-35K·13薪"
      }
    },
    {
      "n": {
        "id": "7891",
        "title": "高级Java开发工程师/技术专家"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "本科"
      }
    },
    {
      "n": {
        "id": "7891",
        "title": "高级Java开发工程师/技术专家"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "西湖区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "7891",
        "title": "高级Java开发工程师/技术专家"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "java"
      }
    }
  ]
])
</script>

<style scoped>
.title_company {
  font-size: 17px;
  color: royalblue;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;
  margin: auto 20px;
}

.title_company::before,
.title_company::after {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: royalblue;
}

.title_company::before {
  width: 18px;
  height: 18px;
  background-color: royalblue;
}

.title_company::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
}

.title_job {
  font-size: 17px;
  color: rgb(238, 178, 94);
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;
  margin: auto 20px;
}

.title_job::before,
.title_job::after {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: rgb(238, 178, 94);
}

.title_cotitle_jobmpany::before {
  width: 18px;
  height: 18px;
  background-color: rgb(238, 178, 94);
}

.title_job::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
}

.title_salary {
  font-size: 17px;
  color: #ff0000;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;
  margin: auto 20px;
}

.title_salary::before,
.title_salary::after {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: #ff0000;
}

.title_salary::before {
  width: 18px;
  height: 18px;
  background-color: #ff0000;
}

.title_salary::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
}

.title_region {
  font-size: 17px;
  color: #ff1493;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;
  margin: auto 20px;
}

.title_region::before,
.title_region::after {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: #ff1493;
}

.title_region::before {
  width: 18px;
  height: 18px;
  background-color: #ff1493;
}

.title_region::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
}

.title_skill {
  font-size: 17px;
  color: rgb(0, 206, 209);
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;
  margin: auto 20px;
}

.title_skill::before,
.title_skill::after {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: rgb(0, 206, 209);
}

.title_skill::before {
  width: 18px;
  height: 18px;
  background-color: rgb(0, 206, 209);
}

.title_skill::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
}

@keyframes pulse {
  from {
    transform: scale(0.9);
    opacity: 1;
  }

  to {
    transform: scale(1.8);
    opacity: 0;
  }
}

sort-button {
  position: relative;
  padding: 5px 10px;
  border-radius: 7px;
  border: 2px solid rgb(61, 106, 255);
  font-size: 15px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 2px;
  background: transparent;
  color: #000000;
  overflow: hidden;
  box-shadow: 0 0 0 0 transparent;
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

sort-button:hover {
  color: white;
  background: rgb(61, 106, 255);
  box-shadow: 0 0 30px 5px rgba(0, 142, 236, 0.815);
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
}

sort-button:hover::before {
  -webkit-animation: sh02 0.5s 0s linear;
  -moz-animation: sh02 0.5s 0s linear;
  animation: sh02 0.5s 0s linear;
}

sort-button::before {
  content: "";
  display: block;
  width: 0px;
  height: 86%;
  position: absolute;
  top: 7%;
  left: 0%;
  opacity: 0;
  background: #04242a;
  box-shadow: 0 0 50px 30px #fff;
  -webkit-transform: skewX(-20deg);
  -moz-transform: skewX(-20deg);
  -ms-transform: skewX(-20deg);
  -o-transform: skewX(-20deg);
  transform: skewX(-20deg);
}

@keyframes sh02 {
  from {
    opacity: 0;
    left: 0%;
  }

  50% {
    opacity: 1;
  }

  to {
    opacity: 0;
    left: 100%;
  }
}

sort-button:active {
  box-shadow: 0 0 0 0 transparent;
  -webkit-transition: box-shadow 0.2s ease-in;
  -moz-transition: box-shadow 0.2s ease-in;
  transition: box-shadow 0.2s ease-in;
}

.container {
  height: 100vh;
  margin: 0 auto;
  background-color: #fff;
  padding: 50px 30px 0 30px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to bottom,
      rgba(192, 230, 245, 0.818),
      rgba(188, 228, 244, 0.616),
      rgb(211, 238, 248),
      rgb(221, 239, 245),
      rgb(225, 238, 242),
      white);
}

.top {
  display: flex;
  margin: 0px auto;
  /* height: 50px; */
  text-align: center;
  align-items: center;
}

.sort {
  display: flex;
  position: absolute;
  left: 350px;
}

.some {
  /* margin-top: 60px; */
  display: flex;
  flex-grow: 1;
  width: 100%;
  margin: 10px 0 0 0;
  /* height: calc(100vh-50px); */
}

.left {
  display: flex;
  flex-direction: column;
  width: 300px;
  /* margin-left: 30px; */
  overflow-y: auto;
  /* height: 60vh; */
}

.right {
  flex: 1;
  border: 2px rgb(142, 136, 136) solid;
  border-radius: 10px;
  margin: 5px 0 10px 10px;
  /* height: 60vh; */
  overflow-y: scroll;
  position: relative;
  /* padding: 20px; */
}

.left::-webkit-scrollbar,
.right::-webkit-scrollbar {
  width: 0.5em;
  /* 设置滚动条的宽度 */
}

.left::-webkit-scrollbar-track,
.right::-webkit-scrollbar-track {
  background-color: transparent;
  /* 设置滚动条轨道的背景颜色 */
}

.left::-webkit-scrollbar-thumb,
.right::-webkit-scrollbar-thumb {
  background-color: #88888800;
  /* 设置滚动条的颜色 */
}

/* 添加或修改 el-progress 组件容器的 CSS 类名，例如：custom-progress */
.custom-progress {
  margin-left: auto;
  position: relative;
  /* 使内部元素能够基于此容器进行定位 */
}

.percentage-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  font-size: 20px;
  margin-top: 0;
  /* 移除不必要的上外边距 */
}

.percentage-label {
  /* position: absolute;
  left: 50%;
  transform: translateX(-50%); */
  display: block;
  font-size: 12px;
  margin-top: 80px;
  /* 移除不必要的上外边距 */
}

::v-deep .demo-progress .el-progress--line {
  margin-bottom: 15px;
  max-width: 200px;
}

.card {
  /* width: 350px; */
  /* width: 30%; */
  height: 135px;
  border-radius: 20px;
  /* background: #f5f5f5; */
  position: relative;
  /* padding: 1rem; */
  border: 2px solid #c3c6ce;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  transition: 0.5s ease-out;
  overflow: visible;
  margin: 5px 0;
}

.card-details {
  color: black;
  height: 100%;
  display: grid;
  align-items: center;
  /* place-content: center; */
}

.card-button {
  transform: translate(-50%, 125%);
  width: 60%;
  border-radius: 1rem;
  border: none;
  background-color: #008bf8;
  color: #fff;
  font-size: 1rem;
  padding: 0.3rem 1rem;
  position: absolute;
  left: 50%;
  bottom: 0;
  opacity: 0;
  transition: 0.3s ease-out;
}

/*Hover*/
.card:hover {
  border-color: #008bf8;
  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
}

.card:hover .card-button {
  transform: translate(-50%, 20%);
  opacity: 1;
}

.company_name {
  color: rgb(134, 134, 134);
  margin-left: 10px;
  width: 170px;
  overflow: hidden;
  /* 超出部分隐藏 */
  text-overflow: ellipsis;
  /* 超出部分以省略号显示 */
  white-space: nowrap;
}

.job {
  /* margin-right: 15px; */
  margin-left: auto;
}

.text-title {
  font-size: 1.5em;
  font-weight: bold;
}

/*Text*/
.work_name {
  font-size: 1.5em;
  /* font-size: 20px; */
  font-weight: bold;
  margin: 10px;
  display: block;
  /* width: 150px; */
  overflow: hidden;
  /* 超出部分隐藏 */
  text-overflow: ellipsis;
  /* 超出部分以省略号显示 */
  white-space: nowrap;
  /* 禁止文本换行 */
}

.work_salary {
  margin: 5px 10px;
  font-size: 1.3em;
  /* font-size: 20px; */
  font-weight: bold;
  color: red;
  /* display: flex; */
}

.Info-container {
  /* padding: 50px; */
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  /* height: 100vh; */
}

.job-header {
  width: 45vw;
  margin: 60px auto 0 50px;
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
  /* border: 1px rgb(181, 178, 178) solid;
  border-radius: 30px;
  box-shadow: 5px 10px 20px rgba(0, 0, 0, 0.5); */
  padding: 0px 50px;
  /* height: 70vh; */
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
  font-size: 13px;
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
  margin-right: 20px;
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
