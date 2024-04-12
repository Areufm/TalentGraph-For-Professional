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
        <sort-button type="primary" style="margin: auto 20px" @click="changeButton">技能优先</sort-button>
        <sort-button type="primary" style="margin: auto 20px" @click="changeButton">名企优先</sort-button>
        <sort-button type="primary" style="margin: auto 20px" @click="changeButton">薪资优先</sort-button>
        <sort-button type="primary" style="margin: auto 20px" @click="changeButton">同城优先</sort-button>
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

        <div class="card" v-for="(job, index) in currentJobs" :key="index" @click="selectJob(job, index)">
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


const changeButton = () => {
  jobsData.value = jobsData_salary.value
  relationData.value = relationData_salary.value
  // console.log(jobsData.value);
}

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

function selectJob(job, index) {
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

const jobsData_salary = ref([
  {
    "title": "高级Java开发工程师",
    "salary": "40-70K·16薪",
    "education": "硕士",
    "skill": ["boot", "Java", "数据库", "Spring", "OceanBase", "cloud"],
    "info": "五险一金，餐补，带薪年假，免费班车，补充医疗保险，年终奖，定期体检，员工旅游，股票期权，交通补助，节日福利",
    "kind1": "互联网",
    "kind2": "后端开发",
    "kind3": "Java",
    "description": "团队介绍：OceanBase 是由蚂蚁集团/阿里巴巴自主研发的分布式关系型数据库。具有数据“零”丢失、可扩展、高性能、持续可用、高兼容性等特点，现已广泛应用在阿里巴巴、蚂蚁集团以及外部银行保险等领域的核心业务中。十年来，OceanBase 已经支撑了支付宝全部核心业务数据库，一次次刷新双十一交易峰值，2019 年在业界公认的 TPC-C 性能评测中成为第一个排名第一的分布式数据库和第一个上榜的中国人完全自主开发的数据库。2020年我们开始启动商业化运作，走向市场，成立北京奥星贝斯科技有限公司，未来我们也会服务于更广大的商业市场。更多信息请看我们的官网 www.oceanbase.com职位描述：1、负责 OceanBase 数据库商业化产品和工具链的研发。构建 OceanBase 商业产品生态，与业内顶尖的数据库内核及企业软件专家一起把 OceanBase 打造为一个成功的商业数据库；2、 加入 OceanBase，你将充分学习到 ToB 产品的灵魂，与技术小伙伴们一起搭建稳定可靠、强大灵活和高安全的系统架构。你将深入到技术细节中，用代码去改写中国数据库的未来；3、此岗位 P6/P7/P8 均有需求。职位要求：1、Java基础扎实，编码能力强，熟悉常用的设计模式，熟悉并发编程；2、精通 Spring Boot/Spring Cloud 相关的技术栈和工具集合，对框架背后的机制和原理有深入理解；3、自驱力强、优秀的团队合作能力和沟通能力，对新技术有好奇心，学习能力和主动性强，有钻研精神，充满激情，乐于接受挑战；4、有云产品、中间件、复杂企业软件开发经验经验者优先；5、熟悉关系数据库原理或有相关运维经验者优先。",
    "province": "浙江省",
    "city": "杭州市",
    "district": "西湖区",
    "address": "杭州西湖区黄龙国际中心5楼",
    "major": [],
    "neo4j": 748,
    "company": "支付宝（杭州）信息技术有限公司",
    "logo": "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
    "match_value": 0.4344966014621123
  },
  {
    "title": "Android技术专家",
    "salary": "30-50K·24薪",
    "education": "本科",
    "skill": [
      "前端",
      "Android SDK",
      "hybird",
      "os",
      "Android UI",
      "web",
      "Android",
      "Sdk"
    ],
    "info": "餐补，定期体检，带薪年假，年终奖，五险一金",
    "kind1": "互联网",
    "kind2": "前端/移动开发",
    "kind3": "移动开发",
    "description": "职位描述：\n支持支付宝支付业务持续迭代，以及维护支付业务相关SDK，打造具备高效迭代能力和动态化能力应用框架\n岗位要求：\n1. 有丰富的客户端应用开发经验，可以独立承担架构设计，并主导项目；\n2. 精通客户端iOS或者Android平台开发，对业界较流行的开源库的实现方案有深刻理解；\n3. 精通客户端调试工具和方法，可以应付客户端的复杂问题；\n4. 在客户端的性能、体验、稳定性、网络等方面指标有监控和优化经验；\n优先考虑：\n1. 在动态化方案有所实践，或对RN、Weex、web容器有项目经验\n2. Android和iOS两个平台都有研发经验或有前端开发经验",
    "province": "浙江省",
    "city": "杭州市",
    "district": "西湖区",
    "address": "杭州西湖区阿里中心·杭州Z空间",
    "major": [],
    "neo4j": 8849,
    "company": "蚂蚁集团",
    "logo": "https://img.bosszhipin.com/beijin/mcs/banner/b10345f203d9c0270a26df28e9c00429cfcd208495d565ef66e7dff9f98764da.jpg?x-oss-process=image/resize,w_100,limit_0",
    "match_value": 0.33427943068502497
  },
  {
    "title": "资深前端工程师",
    "salary": "35-60K·15薪",
    "education": "本科",
    "skill": [
      "MongoDB",
      "Linux",
      "Egg.js",
      "Node",
      "消息队列",
      "Redis",
      "ts",
      "后端",
      "小程序",
      "vue",
      "Socket技术"
    ],
    "info": "股票期权，补充医疗保险，带薪年假，节日福利，交通补助，年终奖，五险一金，定期体检，零食下午茶，免费班车",
    "kind1": "互联网",
    "kind2": "后端开发",
    "kind3": "Node.js",
    "description": "负责滴滴小桔问卷系统的前端及Node服务研发工作。\n在这里，你可以直接参与问卷No-code开发平台闭环系统的建设，用技术创造世界;\n在这里，你也可以深入业务，与产运团队一同探索新的玩法与产品形态，感受技术驱动创新与成长；\n在这里，你还可以参与到团队的NodeX体系建设，数据生态建设，以及面对复杂业务的技术挑战。\n团队技术栈全面，在Vue、小程序、TS、Node服务、MongoDB、消息队列、Hive离线应用等都有深入使用与应用；\n团队能力涵盖全面，团队内闭环业务及自驱项目，职能涵盖服务端、产品、设计与交互、项目管理等多方向的能力；\n我们是一个年轻、热爱技术、热爱分享、积极创新的团队，推崇用极客的方式提升效率、性能和稳定性；\n部门氛围开放，成长没有天花板，期待心里有火、眼里有光的你加入我们。\n工作内容：\n1. 滴滴问卷业务研发工作：包括问卷编辑端、渲染端；\n2. 闭环业务的全栈研发工作，包括前端与服务端研发、稳定性保障等",
    "province": "浙江省",
    "city": "杭州市",
    "district": "西湖区",
    "address": "杭州西湖区云起·西溪谷国际商务中心G座G座8楼",
    "major": [],
    "neo4j": 7950,
    "company": "滴滴出行",
    "logo": "https://img.bosszhipin.com/beijin/mcs/chatphoto/20190408/c23f08b24983fffa26a3a8ba19a463523cc05a6873981b80bf124ddd6c45f629_s.jpg?x-oss-process=image/resize,w_100,limit_0",
    "match_value": 0.3718725707084724
  },
  {
    "title": "web前端",
    "salary": "30-60K·13薪",
    "education": "大专",
    "skill": [
      "canvas",
      "Webpack",
      "Node",
      "CSS",
      "游戏",
      "React",
      "Koa",
      "数据",
      "HTML",
      "web",
      "Node.js",
      "JS",
      "WebGL",
      "ap",
      "vue",
      "H5",
      "算法"
    ],
    "info": "团建聚餐，定期体检，五险一金，带薪年假，零食下午茶，年终奖，节日福利，补充医疗保险，股票期权",
    "kind1": "互联网",
    "kind2": "前端/移动开发",
    "kind3": "前端开发工程师",
    "description": "花呗借呗前端团队（RichLab）工作地点：杭州、北京、重庆前端工程师（基础要求）? 3 年及以上工作经验。如果你觉得自己特别优秀，2 年经验同样欢迎。? 具备良好的 HTML/CSS/JS 前端基础，有 React/Vue 等主流框架开发经验，并深入理解其原理，熟悉 Webpack；? 对互联网产品和 Web 技术有浓厚兴趣，有强大的自我驱动能力、学习能力和强烈的进取心；? 良好的沟通能力和团队合作精神，良好的分析问题和解决问题的能力；在上述基础要求的基础上，设置 5 大方向：1. 移动前端方向：? 需熟练掌握移动端 H5/hybrid 开发；? 对移动前端性能优化有充足的实践和方法；? 有小程序开发经验优先。 2. Node.js 全栈方向? 熟悉 Node.js 异步编程，对 koa/co/async 等原理机制了解透彻；? 熟悉 Node.js 以及 V8 的性能和稳定性优化，能对系统整体性能进行评估，解决内存瓶颈；? 熟悉监控和运维体系，有大流量高并发经验优先。3. 互动技术方向? 精通 Canvas/WebGL/SVG/CSS3，并能够使用原生 API 绘制图形动画；? 熟悉业界流行渲染引擎或游戏开发框架，熟练掌握其中至少一种并具备实际开发经验；? 有 3D 游戏开发经验优先。4. 基础架构方向? 具备良好的抽象能力和架构设计经验，至少以架构角色参与过一个中大型前端开发项目；? 扎实的数据结构、算法和编程基本功；? 有良好的开源作品和社区参与经验，关注新技术。5. 中后台方向? 精通主流 Web 技术，主导与组织过复杂的 Web 项目开发；? 对前端工程化、标准化、组件化有充足的实践和方法；? 有可视化搭建经验优先。",
    "province": "浙江省",
    "city": "杭州市",
    "district": "西湖区",
    "address": "杭州西湖区蚂蚁集团元空间",
    "major": [],
    "neo4j": 5285,
    "company": "蚂蚁智信（杭州）信息技术有限公司",
    "logo": "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
    "match_value": 0.42015145542485477
  },
  {
    "title": "python开发工程师",
    "salary": "30-60K·16薪",
    "education": "本科",
    "skill": [
      "Java",
      "服务端开发经验",
      "Shell",
      "Python",
      "dns",
      "计算机相关专业",
      "后端",
      "运维开发",
      "全栈开发经验"
    ],
    "info": "节日福利，餐补，免费班车，五险一金，年终奖，定期体检，绩效奖金，带薪年假",
    "kind1": "互联网",
    "kind2": "后端开发",
    "kind3": "Python",
    "description": "符合以下条件之一的即可：\n1、有云计算相关研发/运维经验\n2、安全&DNS方向\n3、熟悉计算机网络\n4、有管控研发经验",
    "province": "浙江省",
    "city": "杭州市",
    "district": "西湖区",
    "address": "杭州西湖区阿里巴巴云谷园区1号楼",
    "major": ["计算机"],
    "neo4j": 8204,
    "company": "阿里云",
    "logo": "https://img.bosszhipin.com/beijin/upload/com/workfeel/20230707/7bf6f160950405e94f96793d8508cdc1b01fafbca4af603ab33a0da269092f718e83480322bc9596.png?x-oss-process=image/resize,w_100,limit_0",
    "match_value": 0.3317078279386879
  },
  {
    "title": "数据挖掘专家",
    "salary": "30-60K·17薪",
    "education": "本科",
    "skill": [
      "数据挖掘",
      "机器学习",
      "C++",
      "Spark",
      "Python",
      "SQL",
      "Hadoop",
      "计算机相关专业",
      "TensorFlow",
      "PyTorch",
      "XGBoost",
      "数学/统计相关专业",
      "深度学习",
      "数据",
      "推荐"
    ],
    "info": "补充医疗保险，年终奖，夜班补助，节日福利，免费班车，交通补助，零食下午茶，带薪年假，餐补，五险一金，通讯补贴，包吃，加班补助，节假日加班费，股票期权，定期体检，员工旅游，住房补贴，全勤奖，意外险",
    "kind1": "AI/数据",
    "kind2": "人工智能",
    "kind3": "数据挖掘",
    "description": "1、运用大数据与AI技术，参与蚂蚁业务运营算法研发，推动营销推荐、用户增长相关算法在互联网保险领域落地，包括用户理解、个性化排序技术、事件营销、潜客挖掘等。驱动互联网保险业务决策与产品开发，实现保险业务运营各环节效率提升、用户服务体验优化以及产品和服务创新。\n2、深入理解用户和保险产品，通过智能化的人群定向、点击率/转化率预估建模等技术实现需求的精准匹配和产品推荐。\n3、支撑业务需求快速迭代，持续创新突破核心技术，优化平台用户体验和业务价值。\n职位描述\n1、本科及以上学历，计算机、统计等数学及相关专业，两年以上机器学习应用经验。有搜索、推荐、广告、数据挖掘等领域丰富的实战经验，在用户理解、召回排序、文本理解中一个或多个领域有深入实践。有国内外优秀论文发表者优先。\n2、熟练掌握机器学习相关算法原理，如逻辑回归、XGboost、深度学习、强化学习、迁移学习等，了解各类算法的优缺点。能够熟练运用机器学习、自然语言处理、匹配技术、预估、强化学习、智能生成等技术解决有挑战性的问题。\n3、良好的数据结构、算法和编程功底，熟练掌握Python/C++、SQL等。熟悉大规模数据处理平台Hadoop/Spark/ODPS等。熟悉主流深度学习工具TensorFlow/Pytorch等。\n4、对数据敏感，善于发现问题，并能够灵活运用数据、模型与算法解决实际的应用问题，有良好的逻辑思维和定义以及解决问题的能力。\n5、良好的口头与书面沟通表达能力，具有很好的团队合作精神。\n6、持续关注前沿进展，对营销推荐、数据挖掘等领域富有极大热情。保持强烈的学习意愿及快速的学习能力。",
    "province": "浙江省",
    "city": "杭州市",
    "district": "西湖区",
    "address": "杭州西湖区蚂蚁集团Z空间7",
    "major": ["计算机", "统计"],
    "neo4j": 10155,
    "company": "蚂蚁集团",
    "logo": "https://img.bosszhipin.com/beijin/mcs/banner/b10345f203d9c0270a26df28e9c00429cfcd208495d565ef66e7dff9f98764da.jpg?x-oss-process=image/resize,w_100,limit_0",
    "match_value": 0.2631733815310496
  },
  {
    "title": "资深后端工程师",
    "salary": "35-55K·14薪",
    "education": "硕士",
    "skill": [
      "Linux",
      "Java",
      "C++",
      "k8s",
      "Python",
      "Docker",
      "视觉系统",
      "Ai",
      "英语"
    ],
    "info": null,
    "kind1": "互联网",
    "kind2": "后端开发",
    "kind3": "后端其他开发",
    "description": "岗位需求：1.计算机、自动化、电子、通信、控制等相关专业硕士学历，3年以上相关工作经验； 2.熟悉软件工程的开发过程、方法和工具，具有较好的执行力，动手能力强，较强的沟通能力和团队意识；3.熟悉Linux 操作系统，并熟练掌握C、Python、C++或Java等一种或多种编程语言，有良好的编程规范；4.有AI相关系统或平台开发经验者优先；5.较好的英语读写能力，能够查阅相关英文文档。岗位职责：1.熟悉计算机视觉的主要任务，进行视觉系统/平台设计，负责项目的后端搭建、优化、调试和模块测试工作； 2.Docker/K8S的技术支持，主要涉及系统环境部署交付与测试，做好项目过程的文档记录； 3.定期进行项目维护和升级，并负责项目的技术支持和管理工作；4.部署与运维过程中，与其他算法及软件开发人员沟通解决与修复。",
    "province": "浙江省",
    "city": "杭州市",
    "district": "西湖区",
    "address": "杭州西湖区云栖未来智造创新基地润丰产业园1栋",
    "major": ["电子", "控制", "计算机", "自动化", "通信"],
    "neo4j": 2271,
    "company": "中电金信软件有限公司",
    "logo": "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
    "match_value": 0.3216177257048692
  },
  {
    "title": "C＋＋",
    "salary": "30-55K·13薪",
    "education": "本科",
    "skill": ["Java", "C++", "分布式技术", "区块链", "C", "Go"],
    "info": "五险一金，餐补，年终奖，定期体检，带薪年假",
    "kind1": "互联网",
    "kind2": "后端开发",
    "kind3": "c/c++",
    "description": "蚂蚁链招人啦，蚂蚁区块链已升级为全新品牌蚂蚁链，蚂蚁链期待重构数字经济的信用体系，解决数字时代的数据和隐私安全问题，风口已至，时不我待，蚂蚁集团区块链平台部真诚欢迎有志之士共同前行。\n岗位名称：区块链技术专家\n工作地点：杭州/北京/上海皆可\n岗位职责：负责主导和参与区块链基础设施平台的架构规划、系统设计及核心研发工作\n岗位需求：\n1、三年以上系统开发经验，对网络、存储、分布式系统、性能优化等经验者优先，对密码学算法、分布式共识算法有研究者优先；\n2、go、c/c++、java开发语言，具有区块链技术经验者优先；\n3、薪资根据面试能力，后续可单独沟通",
    "province": "浙江省",
    "city": "杭州市",
    "district": "西湖区",
    "address": "杭州西湖区黄龙时代广场B座蚂蚁金服",
    "major": [],
    "neo4j": 7479,
    "company": "蚂蚁集团",
    "logo": "https://img.bosszhipin.com/beijin/mcs/banner/b10345f203d9c0270a26df28e9c00429cfcd208495d565ef66e7dff9f98764da.jpg?x-oss-process=image/resize,w_100,limit_0",
    "match_value": 0.3673706722171013
  },
  {
    "title": "前端开发工程师",
    "salary": "20-30K·16薪",
    "education": "大专",
    "skill": [
      "前端",
      "HTTP",
      "Node",
      "CSS",
      "React",
      "Javascript",
      "web",
      "HTML",
      "vue",
      "英文"
    ],
    "info": "生日福利，节日福利，夜班补助，保底工资，团建聚餐，交通补助，员工旅游，带薪年假，五险一金，定期体检，绩效奖金，法定节假日三薪，年终奖，餐补",
    "kind1": "互联网",
    "kind2": "前端/移动开发",
    "kind3": "前端开发工程师",
    "description": "工作职责：负责爱逛直播业务的前端开发和底层技术、工具支持。工作内容：1.参与前端开发；3.参与改进开发、构建、发布、监控等前端工程化体系；4.参与Web性能优化、体验优化；5.参与新技术探索、推进系统架构的演化。任职要求：1.技术栈：React(PC)+Vue(Mobile)+Node(展示层+SSR)；2.扎实的计算机以及网络基础；3.阅读英文技术文档和书籍无障碍；4.HTML、CSS、JavaScript基础扎实，了解HTTP协议以及浏览器原理；5.有大型前端工程化、大型Node项目实施经验加分。成长建议：1.多看别人的代码，学习里面的代码组织和设计思路；2.参与技术项目；3.多了解一些后端以及运维相关的知识；4.培养自己在交互和设计上的敏感性；5.工具化思维，减少重复劳动。",
    "province": "浙江省",
    "city": "杭州市",
    "district": "西湖区",
    "address": "杭州西湖区杭州有赞科技有限公司7号楼",
    "major": [],
    "neo4j": 5155,
    "company": "杭州爱逛网络信息服务有限公司",
    "logo": "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
    "match_value": 0.47757459931642715
  },
  {
    "title": "阿里通义实验室-大模型NLP算法专家",
    "salary": "30-45K·16薪",
    "education": "硕士",
    "skill": [
      "Java",
      "C++",
      "数据结构",
      "query",
      "Python",
      "nlp",
      "搜索/信息检索算法经验",
      "RAG",
      "自然语言处理经验"
    ],
    "info": "五险一金，餐补，补充医疗保险，股票期权，员工旅游，零食下午茶，免费班车，交通补助，节日福利，年终奖",
    "kind1": "AI/数据",
    "kind2": "人工智能",
    "kind3": "搜索算法",
    "description": "算法专家-生成式搜索 (RAG)\n1. 负责基于大模型的生成式搜索训练和研究，研发SOTA的先进性技术，以提高生成式搜索算法的效果和性能\n2. 基于行业场景的海量数据和知识，打造大模型范式下的下一代搜索系统的行业场景和模版\n3. 负责Query理解、Doc理解、召回、相关性等技术的先进性建设和应用落地，探索大模型范式下非结构化、结构化、多模态搜索场景技术\n4. 落地下游实际场景的搜索任务，以应用生成式搜索算法解决实际业务问题\n职位要求\n1. 计算机、电子、数学等相关专业硕士及以上学历；\n2. 熟练掌握Java/C++/Python中的一门语言，有扎实的数据结构和算法基础；\n3. 对搜索技术/nlp技术/大模型技术有系统理解和实践\n4. 具备优秀的分析问题和解决问题的能力、良好的沟通协作能力；能follow前沿技术，具备独立的问题分析和解决、系统落地能力\n5. 具有良好的技术洞察力、业务敏感度和优秀的数据分析能力，能应对复杂的业务算法需求。",
    "province": "浙江省",
    "city": "杭州市",
    "district": "西湖区",
    "address": "杭州西湖区阿里巴巴云谷园区0000",
    "major": ["电子", "计算机", "数学"],
    "neo4j": 10319,
    "company": "阿里巴巴集团",
    "logo": "https://img.bosszhipin.com/beijin/upload/com/workfeel/20220316/7bf6f160950405e9282fe33181a1523803562870c4e2cc4a242ac4eb7bbd10d1694083156ab76fdb.jpg?x-oss-process=image/resize,w_100,limit_0",
    "match_value": 0.29788761732761443
  },
  {
    "title": "Unity游戏开发工程师",
    "salary": "30-50K·13薪",
    "education": "本科",
    "skill": ["IOS", "JavaScript", "Unity3D", "C#", "Android"],
    "info": "员工旅游，节日福利，带薪年假，团建聚餐，意外险，有无线网，零食下午茶，餐补，通讯补贴，生日福利，全勤奖，定期体检，高温补贴，补充医疗保险，年终奖，夜班补助，五险一金，节假日加班费",
    "kind1": "互联网",
    "kind2": "前端/移动开发",
    "kind3": "游戏3D开发",
    "description": "岗位职责:\n1、使用Unity3D引擎开发手机游戏，包括但不局限于核心结构搭建、前后端对接、多平台发布等；\n2、负责Unity3D程序的设计、开发与优化，确保所负责模块的程序稳定性与性能优化；\n3、根据项目需求对各类所需工具进行再开发及调整优化；\n4、负责项目技术团队建设、产品研发、事故问题处理、技术问题解决；\n5、持续优化和改善客户端。\n任职要求:\n1、 本科以上学历，计算机相关专业；\n2、 熟悉Unity3D引擎架构设计，3年以上Unity3D引擎开发经验；\n3、 精通Unity3D游戏引擎和3D动画方面的知识；\n4、 有Unity3D手游戏开发经验，包括iOS和Android平台；\n5、 具备Unity3D客户端架构设计能力和性能优化经验；",
    "province": "浙江省",
    "city": "杭州市",
    "district": "西湖区",
    "address": "杭州西湖区天堂软件园E幢14楼",
    "major": ["计算机"],
    "neo4j": 8739,
    "company": "零壹比特",
    "logo": "https://img.bosszhipin.com/beijin/upload/com/workfeel/20221107/7bf6f160950405e9adb0529be26ca787eb7b5a20e32ba556fc83cbefa32a036c895a946ae5b73a50.jpg?x-oss-process=image/resize,w_100,limit_0",
    "match_value": 0.3443810358024947
  },
  {
    "title": "高级Java开发工程师/技术专家",
    "salary": "25-35K·13薪",
    "education": "本科",
    "skill": ["微服务", "Java", "Spring", "web", "架构师", "银行", "运维"],
    "info": "股票期权，节日福利，通讯补贴，零食下午茶，定期体检，带薪年假，餐补，年终奖，包吃，免费班车，餐补，五险一金，加班补助，交通补助，补充医疗保险，员工旅游",
    "kind1": "互联网",
    "kind2": "后端开发",
    "kind3": "java",
    "description": "1、主导信贷、存款、理财、渠道、客户营销等系统分析与设计工作，承担核心功能或组件的代码编写；\n2、主导技术难题攻关，持续提升系统稳定性和高并发处理能力，扫除技术风险；\n3、主导金融行业基础平台、业务平台的架构设计及落地。\n要求：\n1、扎实的java编程基础，精通Java EE、微服务、消息中间件等相关技术；对各种开源的框架如Spring,消息中间件等有深入的了解；\n2、2年以上大规模高并发访问的Web应用系统设计和开发经验，丰富的线上运维经验；\n3、具备良好的识别和设计通用框架及模块的能力；\n4、具有大型电子商务网站以及银行业核心系统、电信boss系统设计与研发经验背景的优先考虑。",
    "province": "浙江省",
    "city": "杭州市",
    "district": "西湖区",
    "address": "杭州西湖区德力西大厦1号楼12-19层",
    "major": [],
    "neo4j": 7891,
    "company": "网商银行",
    "logo": "https://img.bosszhipin.com/beijin/mcs/chatphoto/20180226/cdcccd257874715c64fecbdc2b5922f2cfcd208495d565ef66e7dff9f98764da.jpg?x-oss-process=image/resize,w_100,limit_0",
    "match_value": 0.46014786797276064
  },
  {
    "title": "前端开发工程师",
    "salary": "25-40K",
    "education": "大专",
    "skill": [
      "Angular",
      "Linux",
      "HTTP",
      "Node",
      "CSS",
      "Javascript",
      "React",
      "web",
      "HTML",
      "C",
      "小程序",
      "vue"
    ],
    "info": "有无线网，带薪年假，绩效奖金，五险一金",
    "kind1": "互联网",
    "kind2": "前端/移动开发",
    "kind3": "前端开发工程师",
    "description": "工作职责：1、负责哈啰出行两轮团队相关业务开发，包括营销体系、用车流程相关的C端及B端系统的前端架构设计、开发与优化，覆盖Web应用、支付宝小程序、微信小程序、多端组件库等多个方向；2、参与团队前端工程化体系建设，提升研发效率、研发质量；3、与其他团队成员合作打造提升公司整体运营效率的产品；4、关注前端前沿技术发展，能够对团队输出新的技术与思想，并落地到现有项目中任职资格：1. 3年相关工作经验，有扎实的计算机基础知识；2. 深入理解Web前端开发技术，包括HTML/CSS/Javascript等；3. 至少熟悉React/Angular/Vue等其中一种主流的前端框架，并了解底层原理；4. 熟悉网站性能优化，了解浏览器实现原理；5. 了解http协议的基本原理，了解常见的web性能优化手段、常见漏洞6. 优秀的团队合作能力，沟通顺畅，追求卓越，乐于创新，敢于尝试加分项：1. 熟悉node开发，能够开发node web, node cli, node desktop等类型的应用2. 熟悉linux及操作系统概念。",
    "province": "浙江省",
    "city": "杭州市",
    "district": "西湖区",
    "address": "杭州西湖区益展商务大厦11楼",
    "major": [],
    "neo4j": 5228,
    "company": "上海哈啰普惠科技有限公司",
    "logo": "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
    "match_value": 0.44503555041581616
  },
  {
    "title": "前端开发工程师",
    "salary": "15-30K",
    "education": "大专",
    "skill": ["CSS", "React", "vue", "JS"],
    "info": "带薪年假，12%公积金，股票期权，定期体检，年终奖，餐补，五险一金，补充医疗保险，节日福利",
    "kind1": "互联网",
    "kind2": "前端/移动开发",
    "kind3": "前端开发工程师",
    "description": "我们的团队：- 在线化客户服务建设- 提供动态化，流程化，智能化的客户服务能力职位描述：- 负责IM即时通讯工具开发- 负责工单系统，反馈平台，帮助中心等开发- 负责内容运营系统开发- 涉及移动端自适应适配职位要求：- 熟悉React或者Vue技术栈及其生态圈- 有扎实的JS和CSS基础- 熟悉常用的设计模式，更够编写良好的代码模块和接口- 有较好的业务理解能力和解决能力",
    "province": "浙江省",
    "city": "杭州市",
    "district": "西湖区",
    "address": "杭州西湖区杭州涂鸦科技有限公司杭州市西湖区华策中心A座",
    "major": [],
    "neo4j": 5252,
    "company": "杭州涂鸦信息技术有限公司",
    "logo": "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
    "match_value": 0.6660526792460265
  },
  {
    "title": "3D前端开发工程师",
    "salary": "15-25K·14薪",
    "education": "大专",
    "skill": [
      "canvas",
      "CSS",
      "Javascript",
      "HTML",
      "JS",
      "WebGL",
      "three.js"
    ],
    "info": "五险一金，股票期权，免费班车，年终奖，补充医疗保险，带薪年假，员工旅游，定期体检，餐补，包吃",
    "kind1": "互联网",
    "kind2": "前端/移动开发",
    "kind3": "前端开发工程师",
    "description": "岗位描述：1. 负责产品的前端的技术方案选型2. 对前端性能有一定的把控与优化手段3. 关注前端前沿技术，能够运用新技术服务产品与团队岗位要求：1. 熟练掌握前端技术（javascript, html, css）2. 熟练掌握vue，react等框架及其周边技术3. 掌握常用的前端动画技术（Canvas，WebGL，SVG）等4. 熟悉至少一种3D渲染框架，如three.js、d3.js，能够熟练应用到业务中5. 具有良好的沟通与合作能力6. 有大屏开发经验，能够接受偶尔的出差",
    "province": "浙江省",
    "city": "杭州市",
    "district": "西湖区",
    "address": "杭州西湖区蒋村商务中心9楼",
    "major": [],
    "neo4j": 5173,
    "company": "浙江讯盟科技有限公司",
    "logo": "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
    "match_value": 0.6166410685733384
  },
  {
    "title": "政务区块链应用研发专家-java方向",
    "salary": "25-45K",
    "education": "本科",
    "skill": [
      "Linux",
      "Java",
      "数据库",
      "Spring",
      "SQL",
      "Unix",
      "Hibernate",
      "架构师",
      "JVM"
    ],
    "info": "带薪年假，餐补，五险一金，定期体检，年终奖",
    "kind1": "互联网",
    "kind2": "后端开发",
    "kind3": "区块链工程师",
    "description": "区块链平台部政务产品团队主要业务范围介绍：利用区块链技术结合其他安全和隐私保护解决方案，对个人或企业在日常生活中产生的托管在政府部门的数据，在进行日常生活应用需要的场景（比如：发票报销，医疗票据理赔等等），进行安全和隐私保护的数据分享和流转，打造数据拥有方在对应的数据使用场景下安全可靠的数据流转和使用通道，对此提供完整的解决方案进行技术研发支撑。\n团队介绍\n1. 解决政务数据在上述使用场景下的解决方案搭建和完善，随着政务数据使用场景的提升，不断提升系统性能，不断对丰富的业务场景的使用，进行研发支持。\n2. 负责解决方案中产品服务的系统分析和架构设计，并主导完成详细设计和编码的任务，确保项目的进度和质量；\n2. 开发和维护政务数据安全分享流转使用的产品和系统，快速定位并修复现有软件缺陷；\n3. 能够有效地对新人或普通开发工程师进行辅导，帮助其快速成长。\n职位要求\n1. JAVA基础扎实：精通多线程编程，熟悉分布式,缓存,消息队列等机制；熟悉JVM，包括内存模型、类加载机制以及性能优化；\n2. 对各种开源的框架如Spring、Hibernate等有深入的了解，精通关系型数据库设计及SQL，精通unix/linux操作系统；\n3. 具备良好的识别业务关键需求和设计领域模型的能力；\n4. 热爱技术，工作认真、严谨，对系统质量有高要求的意识，善于沟通与团队协作；\n5. 有区块链对应项目或者政务数据民生使用系统研发经验者优先。",
    "province": "浙江省",
    "city": "杭州市",
    "district": "西湖区",
    "address": "杭州西湖区阿里中心·杭州Z空间西溪路556号",
    "major": [],
    "neo4j": 8611,
    "company": "蚂蚁集团",
    "logo": "https://img.bosszhipin.com/beijin/mcs/banner/b10345f203d9c0270a26df28e9c00429cfcd208495d565ef66e7dff9f98764da.jpg?x-oss-process=image/resize,w_100,limit_0",
    "match_value": 0.3945898563424142
  },
  {
    "title": "前端开发工程师",
    "salary": "20-25K·13薪",
    "education": "大专",
    "skill": ["web", "前端", "Javascript", "HTML5"],
    "info": "意外险，零食下午茶，带薪年假，股票期权，节日礼品，五险一金，补充医疗保险，交通补助，家庭关爱假，餐补，免费健身设施，年终奖，餐饮及下午茶，就近租房补贴，法定节假日三薪，家属自选保险，团建聚餐，定期体检，弹性工作制，年度体检",
    "kind1": "互联网",
    "kind2": "前端/移动开发",
    "kind3": "前端开发工程师",
    "description": "岗位职责：1. 负责前端开发框架的设计和搭建；2. 根据设计文档、开发规范进行页面开发；3.公司产品线易用性改进和Web界面技术优化；4. 完成领导交代的其他工作；负责公司的PC端项目产品的开发工作；任职要求：1. 计算机相关专业，3年及以上前端区块链开发的工作经验；2. 有vue网站的前端部署和实践经验，代码风格良好；3. 熟练掌握HTML5、CSS3、JavaScript开发；4. 确保web网页能支持指定的浏览器和设备，解决兼容性问题；5. 理解能力强，善于沟通，有责任心和团队精神；",
    "province": "浙江省",
    "city": "杭州市",
    "district": "西湖区",
    "address": "杭州西湖区西溪银泰城2-西写字楼(弘德路)南楼1009",
    "major": ["计算机"],
    "neo4j": 5112,
    "company": "杭州微声科技有限公司",
    "logo": "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
    "match_value": 0.5706162328399005
  },
  {
    "title": "web前端工程师",
    "salary": "16-26K",
    "education": "大专",
    "skill": ["CSS", "Javascript", "web", "JS", "HTML5"],
    "info": null,
    "kind1": "互联网",
    "kind2": "前端/移动开发",
    "kind3": "前端开发工程师",
    "description": "职责描述： 1. 负责公司超级账本项目的网管子系统部分前端页面的开发工作； 2. 负责设计Web前端用户交互流程；3. 对业务需求进行评估，提出解决方案； 4. 配合后台工程师完成应用的整合测试； 5. 学习和钻研新的前端框架、前端技术，不断优化程序质量。任职要求： 1. 不低于2年Web前端项目开发; 2. 熟悉前端开发的基础技术（CSS、HTML5、CSS3等）;3. 熟悉原生js，对JavaScript的底层原理有深刻的理解，熟悉ES6;4. 能够熟练使用VUE，element-ui进行前端页面开发;5. 熟知前端代码在各种浏览器下的差异，并且能做出兼容方案;6. 精通各种前端设计模式，并且有深刻认识;",
    "province": "浙江省",
    "city": "杭州市",
    "district": "西湖区",
    "address": "杭州西湖区西溪明园13幢B楼",
    "major": [],
    "neo4j": 5176,
    "company": "浙江永旗区块链科技有限公司",
    "logo": "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
    "match_value": 0.667297226198856
  },
  {
    "title": "Java高级开发工程师",
    "salary": "20-40K·16薪",
    "education": "本科",
    "skill": [
      "MyBatis",
      "Linux",
      "IOS",
      "Java",
      "后端开发",
      "SpringBoot",
      "Dubbo",
      "Spring",
      "MySQL",
      "软件工程师",
      "Android",
      "架构师",
      "PC端",
      "JVM"
    ],
    "info": "股票期权，年终奖，补充医疗保险，免费班车，包吃，带薪年假，五险一金，定期体检，餐补，员工旅游",
    "kind1": "互联网",
    "kind2": "后端开发",
    "kind3": "java",
    "description": "岗位信息\n我们是阿里巴巴集团菜鸟网络末端技术团队，是菜鸟乃至整个集团的战略性团队，负责菜鸟核心末端物流基础设施建设，未来发展空间巨大。\n岗位工作地在上海和杭州，大部分职位在杭州，上海主要招一些核心TL岗，社保缴纳地域可自由选择（可选择与工作地不同）。\n----------------------------------------------------\n岗位描述\n1. 负责菜鸟末端的平台化产品设计与搭建；大型项目/大促等项目的总体架构设计与风险控制；\n2. 技术预研和技术难点攻关，保障系统可用性、稳定性、和可扩展性；\n3. 快速实现业务业务需求，同时可以形成沉淀和复用架构/服务。\n岗位要求\n1. Java基础扎实，精通核心类库的使用，熟悉JVM原理\n2. 熟悉Spring、MyBatis、Dubbo、SpringBoot等开源框架，了解其原理和机制；熟悉Linux 操作系统和MySQL数据库，有开发和解决问题的经验；\n3. 了解互联网系统的架构，有分布式系统的设计经验；熟悉开源中间件的使用，了解其原理和机制；\n4. 有高并发、高可用性系统设计与开发的经验；有性能调优的经验加分项；\n5. 学习能力强，适应能力好，抗压能力强；\n6. 有做过大型项目的技术主管/架构师优先考虑；",
    "province": "浙江省",
    "city": "杭州市",
    "district": "西湖区",
    "address": "杭州西湖区中节能·西溪首座(西门)B1-1",
    "major": [],
    "neo4j": 7814,
    "company": "菜鸟网络",
    "logo": "https://img.bosszhipin.com/beijin/logo/9a78a57a7671568532763f6913143c85be1bd4a3bd2a63f070bdbdada9aad826.jpg?x-oss-process=image/resize,w_100,limit_0",
    "match_value": 0.3285543698494421
  },
  {
    "title": "商业分析专家",
    "salary": "25-40K·16薪",
    "education": "本科",
    "skill": [
      "ETL",
      "HQL",
      "数据分析",
      "运营",
      "SAS",
      "Python",
      "SQL",
      "数据仓库",
      "商业分析",
      "商业智能",
      "Excel",
      "Tableau",
      "Hive"
    ],
    "info": "住房补贴，带薪年假，员工旅游，餐补，定期体检，全勤奖，年终奖，加班补助，包吃，股票期权，免费班车，零食下午茶，通讯补贴，五险一金，节日福利，交通补助",
    "kind1": "AI/数据",
    "kind2": "数据",
    "kind3": "数据分析师",
    "description": "职位描述\n1. 构建并维护全面的、准确的、能反映服务业务线特征的整体指标体系, 并基于日常指标监控，及时发现并定位业务问题\n2. 通过专题分析，对业务问题进行深入分析，为公司运营决策、产品方向、销售策略提供数据支持\n3. 沉淀分析思路与框架， 提炼数据产品需求，与相关团队（如技术开发团队） 协作并推动数据产品的落地\n4. 与相关团队协作进行数据建模和快速迭代，推动业务部门的数据化运营\n5. 与相关团队协作组织数据技术与产品相关的理念、技能、工具的培训\n职位要求\n1. 统计、数学、信息技术、生物统计等本科以上学历，3-8年相关工作经历\n2. 熟练运用SQL、EXCEL等工具，有丰富的数据分析、挖掘、清洗和建模的经验，能高效的与数据技术团队进行沟通\n3. 良好的数据敏感度,能从海量数据，包括外部数据和定性数据中，提炼核心结果，解决实际问题，创造实际价值\n4. 熟练独立编写商业数据分析报告，能高效的与业务和运营团队进行沟通\n5. 大项目的经验，有丰富的跨团队、部门的项目资源整合能力，能够独立开展研究项目\n6. 有客户数据模型建立和运营经验、数据化运营经验、数据类产品类规划经验，尤其是有互联网公司的运营分析相关经验的优先\n7. 熟悉数据分析工具（SAS、R、Python）、可视化工具（Tableau）、数据工具（ETL, Hive, HQL）、A/B Test设计和测试的优先",
    "province": "浙江省",
    "city": "杭州市",
    "district": "西湖区",
    "address": "杭州西湖区阿里中心·杭州Z空间(西南门)西溪路556号",
    "major": ["数学"],
    "neo4j": 11856,
    "company": "蚂蚁集团",
    "logo": "https://img.bosszhipin.com/beijin/mcs/banner/b10345f203d9c0270a26df28e9c00429cfcd208495d565ef66e7dff9f98764da.jpg?x-oss-process=image/resize,w_100,limit_0",
    "match_value": 0.2877437641177057
  }
])

const relationData_salary = ref([
  [
    {
      "n": {
        "id": "[p]1",
        "title": "[P]1"
      },
      "type(r)": "技能",
      "m": {
        "title": "PHP"
      }
    },
    {
      "n": {
        "id": "[p]1",
        "title": "[P]1"
      },
      "type(r)": "技能",
      "m": {
        "title": "Java"
      }
    },
    {
      "n": {
        "id": "[p]1",
        "title": "[P]1"
      },
      "type(r)": "技能",
      "m": {
        "title": "JS"
      }
    },
    {
      "n": {
        "id": "[p]1",
        "title": "[P]1"
      },
      "type(r)": "技能",
      "m": {
        "title": "HTML"
      }
    },
    {
      "n": {
        "id": "[p]1",
        "title": "[P]1"
      },
      "type(r)": "技能",
      "m": {
        "title": "CSS"
      }
    }
  ],
  [
    {
      "n": {
        "id": "748",
        "title": "高级Java开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "cloud"
      }
    },
    {
      "n": {
        "id": "748",
        "title": "高级Java开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "OceanBase"
      }
    },
    {
      "n": {
        "id": "748",
        "title": "高级Java开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Spring"
      }
    },
    {
      "n": {
        "id": "748",
        "title": "高级Java开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "数据库"
      }
    },
    {
      "n": {
        "id": "748",
        "title": "高级Java开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Java"
      }
    },
    {
      "n": {
        "id": "748",
        "title": "高级Java开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "boot"
      }
    },
    {
      "n": {
        "id": "748",
        "title": "高级Java开发工程师"
      },
      "type(r)": "公司",
      "m": {
        "scale": "1000",
        "title": "支付宝（杭州）信息技术有限公司"
      }
    },
    {
      "n": {
        "id": "748",
        "title": "高级Java开发工程师"
      },
      "type(r)": "薪资",
      "m": {
        "title": "40-70K·16薪"
      }
    },
    {
      "n": {
        "id": "748",
        "title": "高级Java开发工程师"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "硕士"
      }
    },
    {
      "n": {
        "id": "748",
        "title": "高级Java开发工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "西湖区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "748",
        "title": "高级Java开发工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "Java"
      }
    }
  ],
  [
    {
      "n": {
        "id": "8849",
        "title": "Android技术专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "Sdk"
      }
    },
    {
      "n": {
        "id": "8849",
        "title": "Android技术专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "Android"
      }
    },
    {
      "n": {
        "id": "8849",
        "title": "Android技术专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "web"
      }
    },
    {
      "n": {
        "id": "8849",
        "title": "Android技术专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "Android UI"
      }
    },
    {
      "n": {
        "id": "8849",
        "title": "Android技术专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "os"
      }
    },
    {
      "n": {
        "id": "8849",
        "title": "Android技术专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "hybird"
      }
    },
    {
      "n": {
        "id": "8849",
        "title": "Android技术专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "Android SDK"
      }
    },
    {
      "n": {
        "id": "8849",
        "title": "Android技术专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "前端"
      }
    },
    {
      "n": {
        "id": "8849",
        "title": "Android技术专家"
      },
      "type(r)": "公司",
      "m": {
        "scale": "10000",
        "title": "蚂蚁集团"
      }
    },
    {
      "n": {
        "id": "8849",
        "title": "Android技术专家"
      },
      "type(r)": "薪资",
      "m": {
        "title": "30-50K·24薪"
      }
    },
    {
      "n": {
        "id": "8849",
        "title": "Android技术专家"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "本科"
      }
    },
    {
      "n": {
        "id": "8849",
        "title": "Android技术专家"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "西湖区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "8849",
        "title": "Android技术专家"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "移动开发"
      }
    }
  ],
  [
    {
      "n": {
        "id": "7950",
        "title": "资深前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Socket技术"
      }
    },
    {
      "n": {
        "id": "7950",
        "title": "资深前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "vue"
      }
    },
    {
      "n": {
        "id": "7950",
        "title": "资深前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "小程序"
      }
    },
    {
      "n": {
        "id": "7950",
        "title": "资深前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "后端"
      }
    },
    {
      "n": {
        "id": "7950",
        "title": "资深前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "ts"
      }
    },
    {
      "n": {
        "id": "7950",
        "title": "资深前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Redis"
      }
    },
    {
      "n": {
        "id": "7950",
        "title": "资深前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "消息队列"
      }
    },
    {
      "n": {
        "id": "7950",
        "title": "资深前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Node"
      }
    },
    {
      "n": {
        "id": "7950",
        "title": "资深前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Egg.js"
      }
    },
    {
      "n": {
        "id": "7950",
        "title": "资深前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Linux"
      }
    },
    {
      "n": {
        "id": "7950",
        "title": "资深前端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "MongoDB"
      }
    },
    {
      "n": {
        "id": "7950",
        "title": "资深前端工程师"
      },
      "type(r)": "公司",
      "m": {
        "scale": "10000",
        "title": "滴滴出行"
      }
    },
    {
      "n": {
        "id": "7950",
        "title": "资深前端工程师"
      },
      "type(r)": "薪资",
      "m": {
        "title": "35-60K·15薪"
      }
    },
    {
      "n": {
        "id": "7950",
        "title": "资深前端工程师"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "本科"
      }
    },
    {
      "n": {
        "id": "7950",
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
        "id": "7950",
        "title": "资深前端工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "Node.js"
      }
    }
  ],
  [
    {
      "n": {
        "id": "5285",
        "title": "web前端"
      },
      "type(r)": "技能",
      "m": {
        "title": "算法"
      }
    },
    {
      "n": {
        "id": "5285",
        "title": "web前端"
      },
      "type(r)": "技能",
      "m": {
        "title": "H5"
      }
    },
    {
      "n": {
        "id": "5285",
        "title": "web前端"
      },
      "type(r)": "技能",
      "m": {
        "title": "vue"
      }
    },
    {
      "n": {
        "id": "5285",
        "title": "web前端"
      },
      "type(r)": "技能",
      "m": {
        "title": "ap"
      }
    },
    {
      "n": {
        "id": "5285",
        "title": "web前端"
      },
      "type(r)": "技能",
      "m": {
        "title": "WebGL"
      }
    },
    {
      "n": {
        "id": "5285",
        "title": "web前端"
      },
      "type(r)": "技能",
      "m": {
        "title": "JS"
      }
    },
    {
      "n": {
        "id": "5285",
        "title": "web前端"
      },
      "type(r)": "技能",
      "m": {
        "title": "Node.js"
      }
    },
    {
      "n": {
        "id": "5285",
        "title": "web前端"
      },
      "type(r)": "技能",
      "m": {
        "title": "web"
      }
    },
    {
      "n": {
        "id": "5285",
        "title": "web前端"
      },
      "type(r)": "技能",
      "m": {
        "title": "HTML"
      }
    },
    {
      "n": {
        "id": "5285",
        "title": "web前端"
      },
      "type(r)": "技能",
      "m": {
        "title": "数据"
      }
    },
    {
      "n": {
        "id": "5285",
        "title": "web前端"
      },
      "type(r)": "技能",
      "m": {
        "title": "Koa"
      }
    },
    {
      "n": {
        "id": "5285",
        "title": "web前端"
      },
      "type(r)": "技能",
      "m": {
        "title": "React"
      }
    },
    {
      "n": {
        "id": "5285",
        "title": "web前端"
      },
      "type(r)": "技能",
      "m": {
        "title": "游戏"
      }
    },
    {
      "n": {
        "id": "5285",
        "title": "web前端"
      },
      "type(r)": "技能",
      "m": {
        "title": "CSS"
      }
    },
    {
      "n": {
        "id": "5285",
        "title": "web前端"
      },
      "type(r)": "技能",
      "m": {
        "title": "Node"
      }
    },
    {
      "n": {
        "id": "5285",
        "title": "web前端"
      },
      "type(r)": "技能",
      "m": {
        "title": "Webpack"
      }
    },
    {
      "n": {
        "id": "5285",
        "title": "web前端"
      },
      "type(r)": "技能",
      "m": {
        "title": "canvas"
      }
    },
    {
      "n": {
        "id": "5285",
        "title": "web前端"
      },
      "type(r)": "公司",
      "m": {
        "scale": "100",
        "title": "蚂蚁智信（杭州）信息技术有限公司"
      }
    },
    {
      "n": {
        "id": "5285",
        "title": "web前端"
      },
      "type(r)": "薪资",
      "m": {
        "title": "30-60K·13薪"
      }
    },
    {
      "n": {
        "id": "5285",
        "title": "web前端"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "大专"
      }
    },
    {
      "n": {
        "id": "5285",
        "title": "web前端"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "西湖区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "5285",
        "title": "web前端"
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
        "id": "8204",
        "title": "python开发工程师"
      },
      "type(r)": "专业",
      "m": {
        "title": "计算机"
      }
    },
    {
      "n": {
        "id": "8204",
        "title": "python开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "全栈开发经验"
      }
    },
    {
      "n": {
        "id": "8204",
        "title": "python开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "运维开发"
      }
    },
    {
      "n": {
        "id": "8204",
        "title": "python开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "后端"
      }
    },
    {
      "n": {
        "id": "8204",
        "title": "python开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "计算机相关专业"
      }
    },
    {
      "n": {
        "id": "8204",
        "title": "python开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "dns"
      }
    },
    {
      "n": {
        "id": "8204",
        "title": "python开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Python"
      }
    },
    {
      "n": {
        "id": "8204",
        "title": "python开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Shell"
      }
    },
    {
      "n": {
        "id": "8204",
        "title": "python开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "服务端开发经验"
      }
    },
    {
      "n": {
        "id": "8204",
        "title": "python开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Java"
      }
    },
    {
      "n": {
        "id": "8204",
        "title": "python开发工程师"
      },
      "type(r)": "公司",
      "m": {
        "scale": "10000",
        "title": "阿里云"
      }
    },
    {
      "n": {
        "id": "8204",
        "title": "python开发工程师"
      },
      "type(r)": "薪资",
      "m": {
        "title": "30-60K·16薪"
      }
    },
    {
      "n": {
        "id": "8204",
        "title": "python开发工程师"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "本科"
      }
    },
    {
      "n": {
        "id": "8204",
        "title": "python开发工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "西湖区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "8204",
        "title": "python开发工程师"
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
        "id": "10155",
        "title": "数据挖掘专家"
      },
      "type(r)": "专业",
      "m": {
        "title": "统计"
      }
    },
    {
      "n": {
        "id": "10155",
        "title": "数据挖掘专家"
      },
      "type(r)": "专业",
      "m": {
        "title": "计算机"
      }
    },
    {
      "n": {
        "id": "10155",
        "title": "数据挖掘专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "推荐"
      }
    },
    {
      "n": {
        "id": "10155",
        "title": "数据挖掘专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "数据"
      }
    },
    {
      "n": {
        "id": "10155",
        "title": "数据挖掘专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "深度学习"
      }
    },
    {
      "n": {
        "id": "10155",
        "title": "数据挖掘专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "数学/统计相关专业"
      }
    },
    {
      "n": {
        "id": "10155",
        "title": "数据挖掘专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "XGBoost"
      }
    },
    {
      "n": {
        "id": "10155",
        "title": "数据挖掘专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "PyTorch"
      }
    },
    {
      "n": {
        "id": "10155",
        "title": "数据挖掘专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "TensorFlow"
      }
    },
    {
      "n": {
        "id": "10155",
        "title": "数据挖掘专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "计算机相关专业"
      }
    },
    {
      "n": {
        "id": "10155",
        "title": "数据挖掘专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "Hadoop"
      }
    },
    {
      "n": {
        "id": "10155",
        "title": "数据挖掘专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "SQL"
      }
    },
    {
      "n": {
        "id": "10155",
        "title": "数据挖掘专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "Python"
      }
    },
    {
      "n": {
        "id": "10155",
        "title": "数据挖掘专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "Spark"
      }
    },
    {
      "n": {
        "id": "10155",
        "title": "数据挖掘专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "C++"
      }
    },
    {
      "n": {
        "id": "10155",
        "title": "数据挖掘专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "机器学习"
      }
    },
    {
      "n": {
        "id": "10155",
        "title": "数据挖掘专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "数据挖掘"
      }
    },
    {
      "n": {
        "id": "10155",
        "title": "数据挖掘专家"
      },
      "type(r)": "公司",
      "m": {
        "scale": "10000",
        "title": "蚂蚁集团"
      }
    },
    {
      "n": {
        "id": "10155",
        "title": "数据挖掘专家"
      },
      "type(r)": "薪资",
      "m": {
        "title": "30-60K·17薪"
      }
    },
    {
      "n": {
        "id": "10155",
        "title": "数据挖掘专家"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "本科"
      }
    },
    {
      "n": {
        "id": "10155",
        "title": "数据挖掘专家"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "西湖区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "10155",
        "title": "数据挖掘专家"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "数据挖掘"
      }
    }
  ],
  [
    {
      "n": {
        "id": "2271",
        "title": "资深后端工程师"
      },
      "type(r)": "专业",
      "m": {
        "title": "通信"
      }
    },
    {
      "n": {
        "id": "2271",
        "title": "资深后端工程师"
      },
      "type(r)": "专业",
      "m": {
        "title": "自动化"
      }
    },
    {
      "n": {
        "id": "2271",
        "title": "资深后端工程师"
      },
      "type(r)": "专业",
      "m": {
        "title": "计算机"
      }
    },
    {
      "n": {
        "id": "2271",
        "title": "资深后端工程师"
      },
      "type(r)": "专业",
      "m": {
        "title": "控制"
      }
    },
    {
      "n": {
        "id": "2271",
        "title": "资深后端工程师"
      },
      "type(r)": "专业",
      "m": {
        "title": "电子"
      }
    },
    {
      "n": {
        "id": "2271",
        "title": "资深后端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "英语"
      }
    },
    {
      "n": {
        "id": "2271",
        "title": "资深后端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Ai"
      }
    },
    {
      "n": {
        "id": "2271",
        "title": "资深后端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "视觉系统"
      }
    },
    {
      "n": {
        "id": "2271",
        "title": "资深后端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Docker"
      }
    },
    {
      "n": {
        "id": "2271",
        "title": "资深后端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Python"
      }
    },
    {
      "n": {
        "id": "2271",
        "title": "资深后端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "k8s"
      }
    },
    {
      "n": {
        "id": "2271",
        "title": "资深后端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "C++"
      }
    },
    {
      "n": {
        "id": "2271",
        "title": "资深后端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Java"
      }
    },
    {
      "n": {
        "id": "2271",
        "title": "资深后端工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Linux"
      }
    },
    {
      "n": {
        "id": "2271",
        "title": "资深后端工程师"
      },
      "type(r)": "公司",
      "m": {
        "scale": "1000",
        "title": "中电金信软件有限公司"
      }
    },
    {
      "n": {
        "id": "2271",
        "title": "资深后端工程师"
      },
      "type(r)": "薪资",
      "m": {
        "title": "35-55K·14薪"
      }
    },
    {
      "n": {
        "id": "2271",
        "title": "资深后端工程师"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "硕士"
      }
    },
    {
      "n": {
        "id": "2271",
        "title": "资深后端工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "西湖区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "2271",
        "title": "资深后端工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "后端其他开发"
      }
    }
  ],
  [
    {
      "n": {
        "id": "7479",
        "title": "C＋＋"
      },
      "type(r)": "技能",
      "m": {
        "title": "Go"
      }
    },
    {
      "n": {
        "id": "7479",
        "title": "C＋＋"
      },
      "type(r)": "技能",
      "m": {
        "title": "C"
      }
    },
    {
      "n": {
        "id": "7479",
        "title": "C＋＋"
      },
      "type(r)": "技能",
      "m": {
        "title": "区块链"
      }
    },
    {
      "n": {
        "id": "7479",
        "title": "C＋＋"
      },
      "type(r)": "技能",
      "m": {
        "title": "分布式技术"
      }
    },
    {
      "n": {
        "id": "7479",
        "title": "C＋＋"
      },
      "type(r)": "技能",
      "m": {
        "title": "C++"
      }
    },
    {
      "n": {
        "id": "7479",
        "title": "C＋＋"
      },
      "type(r)": "技能",
      "m": {
        "title": "Java"
      }
    },
    {
      "n": {
        "id": "7479",
        "title": "C＋＋"
      },
      "type(r)": "公司",
      "m": {
        "scale": "10000",
        "title": "蚂蚁集团"
      }
    },
    {
      "n": {
        "id": "7479",
        "title": "C＋＋"
      },
      "type(r)": "薪资",
      "m": {
        "title": "30-55K·13薪"
      }
    },
    {
      "n": {
        "id": "7479",
        "title": "C＋＋"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "本科"
      }
    },
    {
      "n": {
        "id": "7479",
        "title": "C＋＋"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "西湖区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "7479",
        "title": "C＋＋"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "c/c++"
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
        "id": "10319",
        "title": "阿里通义实验室-大模型NLP算法专家"
      },
      "type(r)": "专业",
      "m": {
        "title": "数学"
      }
    },
    {
      "n": {
        "id": "10319",
        "title": "阿里通义实验室-大模型NLP算法专家"
      },
      "type(r)": "专业",
      "m": {
        "title": "计算机"
      }
    },
    {
      "n": {
        "id": "10319",
        "title": "阿里通义实验室-大模型NLP算法专家"
      },
      "type(r)": "专业",
      "m": {
        "title": "电子"
      }
    },
    {
      "n": {
        "id": "10319",
        "title": "阿里通义实验室-大模型NLP算法专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "自然语言处理经验"
      }
    },
    {
      "n": {
        "id": "10319",
        "title": "阿里通义实验室-大模型NLP算法专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "RAG"
      }
    },
    {
      "n": {
        "id": "10319",
        "title": "阿里通义实验室-大模型NLP算法专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "搜索/信息检索算法经验"
      }
    },
    {
      "n": {
        "id": "10319",
        "title": "阿里通义实验室-大模型NLP算法专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "nlp"
      }
    },
    {
      "n": {
        "id": "10319",
        "title": "阿里通义实验室-大模型NLP算法专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "Python"
      }
    },
    {
      "n": {
        "id": "10319",
        "title": "阿里通义实验室-大模型NLP算法专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "query"
      }
    },
    {
      "n": {
        "id": "10319",
        "title": "阿里通义实验室-大模型NLP算法专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "数据结构"
      }
    },
    {
      "n": {
        "id": "10319",
        "title": "阿里通义实验室-大模型NLP算法专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "C++"
      }
    },
    {
      "n": {
        "id": "10319",
        "title": "阿里通义实验室-大模型NLP算法专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "Java"
      }
    },
    {
      "n": {
        "id": "10319",
        "title": "阿里通义实验室-大模型NLP算法专家"
      },
      "type(r)": "公司",
      "m": {
        "scale": "10000",
        "title": "阿里巴巴集团"
      }
    },
    {
      "n": {
        "id": "10319",
        "title": "阿里通义实验室-大模型NLP算法专家"
      },
      "type(r)": "薪资",
      "m": {
        "title": "30-45K·16薪"
      }
    },
    {
      "n": {
        "id": "10319",
        "title": "阿里通义实验室-大模型NLP算法专家"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "硕士"
      }
    },
    {
      "n": {
        "id": "10319",
        "title": "阿里通义实验室-大模型NLP算法专家"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "西湖区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "10319",
        "title": "阿里通义实验室-大模型NLP算法专家"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "搜索算法"
      }
    }
  ],
  [
    {
      "n": {
        "id": "8739",
        "title": "Unity游戏开发工程师"
      },
      "type(r)": "专业",
      "m": {
        "title": "计算机"
      }
    },
    {
      "n": {
        "id": "8739",
        "title": "Unity游戏开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Android"
      }
    },
    {
      "n": {
        "id": "8739",
        "title": "Unity游戏开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "C#"
      }
    },
    {
      "n": {
        "id": "8739",
        "title": "Unity游戏开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Unity3D"
      }
    },
    {
      "n": {
        "id": "8739",
        "title": "Unity游戏开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "JavaScript"
      }
    },
    {
      "n": {
        "id": "8739",
        "title": "Unity游戏开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "IOS"
      }
    },
    {
      "n": {
        "id": "8739",
        "title": "Unity游戏开发工程师"
      },
      "type(r)": "公司",
      "m": {
        "scale": "100",
        "title": "零壹比特"
      }
    },
    {
      "n": {
        "id": "8739",
        "title": "Unity游戏开发工程师"
      },
      "type(r)": "薪资",
      "m": {
        "title": "30-50K·13薪"
      }
    },
    {
      "n": {
        "id": "8739",
        "title": "Unity游戏开发工程师"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "本科"
      }
    },
    {
      "n": {
        "id": "8739",
        "title": "Unity游戏开发工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "西湖区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "8739",
        "title": "Unity游戏开发工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "游戏3D开发"
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
  ],
  [
    {
      "n": {
        "id": "5228",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "vue"
      }
    },
    {
      "n": {
        "id": "5228",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "小程序"
      }
    },
    {
      "n": {
        "id": "5228",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "C"
      }
    },
    {
      "n": {
        "id": "5228",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "HTML"
      }
    },
    {
      "n": {
        "id": "5228",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "web"
      }
    },
    {
      "n": {
        "id": "5228",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "React"
      }
    },
    {
      "n": {
        "id": "5228",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Javascript"
      }
    },
    {
      "n": {
        "id": "5228",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "CSS"
      }
    },
    {
      "n": {
        "id": "5228",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Node"
      }
    },
    {
      "n": {
        "id": "5228",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "HTTP"
      }
    },
    {
      "n": {
        "id": "5228",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Linux"
      }
    },
    {
      "n": {
        "id": "5228",
        "title": "前端开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Angular"
      }
    },
    {
      "n": {
        "id": "5228",
        "title": "前端开发工程师"
      },
      "type(r)": "公司",
      "m": {
        "scale": "1000",
        "title": "上海哈啰普惠科技有限公司"
      }
    },
    {
      "n": {
        "id": "5228",
        "title": "前端开发工程师"
      },
      "type(r)": "薪资",
      "m": {
        "title": "25-40K"
      }
    },
    {
      "n": {
        "id": "5228",
        "title": "前端开发工程师"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "大专"
      }
    },
    {
      "n": {
        "id": "5228",
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
        "id": "5228",
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
        "id": "8611",
        "title": "政务区块链应用研发专家-java方向"
      },
      "type(r)": "技能",
      "m": {
        "title": "JVM"
      }
    },
    {
      "n": {
        "id": "8611",
        "title": "政务区块链应用研发专家-java方向"
      },
      "type(r)": "技能",
      "m": {
        "title": "架构师"
      }
    },
    {
      "n": {
        "id": "8611",
        "title": "政务区块链应用研发专家-java方向"
      },
      "type(r)": "技能",
      "m": {
        "title": "Hibernate"
      }
    },
    {
      "n": {
        "id": "8611",
        "title": "政务区块链应用研发专家-java方向"
      },
      "type(r)": "技能",
      "m": {
        "title": "Unix"
      }
    },
    {
      "n": {
        "id": "8611",
        "title": "政务区块链应用研发专家-java方向"
      },
      "type(r)": "技能",
      "m": {
        "title": "SQL"
      }
    },
    {
      "n": {
        "id": "8611",
        "title": "政务区块链应用研发专家-java方向"
      },
      "type(r)": "技能",
      "m": {
        "title": "Spring"
      }
    },
    {
      "n": {
        "id": "8611",
        "title": "政务区块链应用研发专家-java方向"
      },
      "type(r)": "技能",
      "m": {
        "title": "数据库"
      }
    },
    {
      "n": {
        "id": "8611",
        "title": "政务区块链应用研发专家-java方向"
      },
      "type(r)": "技能",
      "m": {
        "title": "Java"
      }
    },
    {
      "n": {
        "id": "8611",
        "title": "政务区块链应用研发专家-java方向"
      },
      "type(r)": "技能",
      "m": {
        "title": "Linux"
      }
    },
    {
      "n": {
        "id": "8611",
        "title": "政务区块链应用研发专家-java方向"
      },
      "type(r)": "公司",
      "m": {
        "scale": "10000",
        "title": "蚂蚁集团"
      }
    },
    {
      "n": {
        "id": "8611",
        "title": "政务区块链应用研发专家-java方向"
      },
      "type(r)": "薪资",
      "m": {
        "title": "25-45K"
      }
    },
    {
      "n": {
        "id": "8611",
        "title": "政务区块链应用研发专家-java方向"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "本科"
      }
    },
    {
      "n": {
        "id": "8611",
        "title": "政务区块链应用研发专家-java方向"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "西湖区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "8611",
        "title": "政务区块链应用研发专家-java方向"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "区块链工程师"
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
        "id": "7814",
        "title": "Java高级开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "JVM"
      }
    },
    {
      "n": {
        "id": "7814",
        "title": "Java高级开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "PC端"
      }
    },
    {
      "n": {
        "id": "7814",
        "title": "Java高级开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "架构师"
      }
    },
    {
      "n": {
        "id": "7814",
        "title": "Java高级开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Android"
      }
    },
    {
      "n": {
        "id": "7814",
        "title": "Java高级开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "软件工程师"
      }
    },
    {
      "n": {
        "id": "7814",
        "title": "Java高级开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "MySQL"
      }
    },
    {
      "n": {
        "id": "7814",
        "title": "Java高级开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Spring"
      }
    },
    {
      "n": {
        "id": "7814",
        "title": "Java高级开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Dubbo"
      }
    },
    {
      "n": {
        "id": "7814",
        "title": "Java高级开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "SpringBoot"
      }
    },
    {
      "n": {
        "id": "7814",
        "title": "Java高级开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "后端开发"
      }
    },
    {
      "n": {
        "id": "7814",
        "title": "Java高级开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Java"
      }
    },
    {
      "n": {
        "id": "7814",
        "title": "Java高级开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "IOS"
      }
    },
    {
      "n": {
        "id": "7814",
        "title": "Java高级开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "Linux"
      }
    },
    {
      "n": {
        "id": "7814",
        "title": "Java高级开发工程师"
      },
      "type(r)": "技能",
      "m": {
        "title": "MyBatis"
      }
    },
    {
      "n": {
        "id": "7814",
        "title": "Java高级开发工程师"
      },
      "type(r)": "公司",
      "m": {
        "scale": "1000",
        "title": "菜鸟网络"
      }
    },
    {
      "n": {
        "id": "7814",
        "title": "Java高级开发工程师"
      },
      "type(r)": "薪资",
      "m": {
        "title": "20-40K·16薪"
      }
    },
    {
      "n": {
        "id": "7814",
        "title": "Java高级开发工程师"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "本科"
      }
    },
    {
      "n": {
        "id": "7814",
        "title": "Java高级开发工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "西湖区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "7814",
        "title": "Java高级开发工程师"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "java"
      }
    }
  ],
  [
    {
      "n": {
        "id": "11856",
        "title": "商业分析专家"
      },
      "type(r)": "专业",
      "m": {
        "title": "数学"
      }
    },
    {
      "n": {
        "id": "11856",
        "title": "商业分析专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "Hive"
      }
    },
    {
      "n": {
        "id": "11856",
        "title": "商业分析专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "Tableau"
      }
    },
    {
      "n": {
        "id": "11856",
        "title": "商业分析专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "Excel"
      }
    },
    {
      "n": {
        "id": "11856",
        "title": "商业分析专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "商业智能"
      }
    },
    {
      "n": {
        "id": "11856",
        "title": "商业分析专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "商业分析"
      }
    },
    {
      "n": {
        "id": "11856",
        "title": "商业分析专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "数据仓库"
      }
    },
    {
      "n": {
        "id": "11856",
        "title": "商业分析专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "SQL"
      }
    },
    {
      "n": {
        "id": "11856",
        "title": "商业分析专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "Python"
      }
    },
    {
      "n": {
        "id": "11856",
        "title": "商业分析专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "SAS"
      }
    },
    {
      "n": {
        "id": "11856",
        "title": "商业分析专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "运营"
      }
    },
    {
      "n": {
        "id": "11856",
        "title": "商业分析专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "数据分析"
      }
    },
    {
      "n": {
        "id": "11856",
        "title": "商业分析专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "HQL"
      }
    },
    {
      "n": {
        "id": "11856",
        "title": "商业分析专家"
      },
      "type(r)": "技能",
      "m": {
        "title": "ETL"
      }
    },
    {
      "n": {
        "id": "11856",
        "title": "商业分析专家"
      },
      "type(r)": "公司",
      "m": {
        "scale": "10000",
        "title": "蚂蚁集团"
      }
    },
    {
      "n": {
        "id": "11856",
        "title": "商业分析专家"
      },
      "type(r)": "薪资",
      "m": {
        "title": "25-40K·16薪"
      }
    },
    {
      "n": {
        "id": "11856",
        "title": "商业分析专家"
      },
      "type(r)": "学历需求",
      "m": {
        "title": "本科"
      }
    },
    {
      "n": {
        "id": "11856",
        "title": "商业分析专家"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "西湖区",
        "Superior": "杭州市"
      }
    },
    {
      "n": {
        "id": "11856",
        "title": "商业分析专家"
      },
      "type(r)": "包含职位",
      "m": {
        "title": "数据分析师"
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
