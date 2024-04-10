<template>
  <HeaderBar />
  <div class="container">
    <div class="top">
      <div style="display: flex">
        <svg
          style="width: 30px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          data-v-ea893728=""
        >
          <path
            fill="currentColor"
            d="M288 128h608L736 384l160 256H288v320h-96V64h96z"
          ></path>
        </svg>
        <h2>求职岗位： {{ recommendWork }}</h2>
      </div>
      <div class="sort">
        <p style="font-size: 17px; font-weight: bold">请选择推荐方式:</p>
        <!-- <el-button type="primary" style="margin: auto 20px">名企优先</el-button>
        <el-button type="primary" style="margin: auto 20px">薪资优先</el-button>
        <el-button type="primary" style="margin: auto 20px">同城优先</el-button>
        <el-button type="primary" style="margin: auto 20px">技能优先</el-button> -->
        <sort-button type="primary" style="margin: auto 20px"
          >技能优先</sort-button
        >
        <sort-button type="primary" style="margin: auto 20px"
          >名企优先</sort-button
        >
        <sort-button type="primary" style="margin: auto 20px"
          >薪资优先</sort-button
        >
        <sort-button type="primary" style="margin: auto 20px"
          >同城优先</sort-button
        >
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
    <el-drawer v-model="drawer" direction="rtl" size="60%">
      <template #header>
        <h1>职位具体信息</h1>
      </template>
      <template #default>
        <Info />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">cancel</el-button>
          <el-button type="primary" @click="confirmClick">confirm</el-button>
        </div>
      </template>
    </el-drawer>
    <div class="some">
      <div class="left">
        <!-- <Card :toggle-drawer="toggleDrawer" @mouseover="handleCardHover(0)" />
        <Card :toggle-drawer="toggleDrawer" @mouseover="handleCardHover(1)" />
        <Card :toggle-drawer="toggleDrawer" @mouseover="handleCardHover(2)" />
        <Card :toggle-drawer="toggleDrawer" @mouseover="handleCardHover(3)" /> -->

        <!-- <div
          class="card"
          v-for="(job, index) in currentJobs"
          :key="index"
          @click="selectJob(job)"
        >
          <div class="card-details">
            <div style="display: flex">
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  top: 0;
                  width: 170px;
                  /* justify-content: center; */
                "
              >
                <p class="work_name">{{ job.title }}</p>
                <p class="work_salary">{{ job.salary }}</p>
              </div>
              <el-progress type="dashboard" :percentage="80" :width="80">
                <template #default="{ percentage }">
                  <span class="percentage-value">{{ percentage }}%</span>
                  <span class="percentage-label">岗位匹配度</span>
                </template>
              </el-progress>
            </div>
            <div style="display: flex">
              <img
                :src="job.logo"
                alt=""
                style="
                  width: 40px;
                  height: 40px;
                  border-radius: 50%;
                  margin-right: 10px;
                "
              />
              <p class="text-body">{{ job.company }}</p>
              <p class="text-body" style="margin-left: auto">{{ job.kind2 }}</p>
            </div>
          </div>
          <button class="card-button" @click.prevent="getMore">
            More info
          </button>
        </div> -->

        <div
          class="card"
          v-for="(job, index) in currentJobs"
          :key="index"
          @click="selectJob(job)"
        >
          <div class="card-details">
            <div
              style="display: flex; align-items: center; padding-right: 10px"
            >
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  top: 0;
                  width: 170px;
                  /* justify-content: center; */
                "
              >
                <p class="work_name">{{ job.title }}</p>
                <p class="work_salary">{{ job.salary }}</p>
              </div>
              <el-progress
                class="custom-progress"
                type="dashboard"
                :percentage="(job.match_value * 100).toFixed(1)"
                :width="70"
              >
                <template #default="{ percentage }">
                  <span class="percentage-value">{{ percentage }}%</span>
                  <span class="percentage-label">岗位匹配度</span>
                </template>
              </el-progress>
            </div>

            <div
              style="display: flex; align-items: center; padding-right: 10px"
            >
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

const relationshipRef = ref();

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

const authStore = useAuthStore();
const router = useRouter();
const drawer = ref(false);
const recommendWork = ref("前端开发");

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

function cancelClick() {
  drawer.value = false;
}

function confirmClick() {
  ElMessageBox.confirm(
    "proxy will permanently delete the file. Continue?",
    "Warning",
    {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning",
    }
  )
    .then(() => {
      ElMessage({
        type: "success",
        message: "Delete completed",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
}

const currentPage = ref(1); // 当前页码
const pageSize = ref(4); // 每页显示的数据条数
const total = ref(20); // 假设总共有100条数据
const jobsData = ref([
  {
    title: "数据研发工程师",
    salary: "30-35K·15薪",
    education: "本科",
    skill:
      "['HIVE', 'IO', 'Java', 'Spark', '数据结构', 'Kafka', '多线程', 'Flink', 'GIT', 'Linux', 'Redis', 'Hbase', '数据', 'JVM', 'Hive', 'ElasticSearch', 'ETL', 'MySQL', '算法']",
    info: "定期体检，五险一金，节日福利，绩效奖金，带薪年假，年终奖，餐补，免费班车",
    kind1: "AI/数据",
    kind2: "数据",
    kind3: "数据开发",
    description:
      "工作地点\n杭州、北京\n工作年限\n2-5年\n学历\n本科以上\n岗位描述\n1、 参与块存储业务数据中台研发、维护、架构设计；包括不限于 稳定性建设、性能优化、承接业务数据需求\n2、负责数据建模, ETL规范设计和实时/离线数仓开发工作, 包括但不限于宽表建模/数据治理/质量监控与优化\n3、预研业界大数据平台建设解决方案及开源技术，参与平台设计与开发，共同建设有前瞻性的大数据平台解决方案\n岗位要求\n1、 计算机相关专业，2年以上大数据系统开发经验；掌握常用数据结构、算法、设计模式，具有扎实的计算机技术基础；\n2、Java基础扎实，对IO、多线程、JVM等有一定了解，具有良好的代码风格、良好的接口设计规范\n3、 熟悉基于MySQL 数据库的设计和开发，熟练Linux操作、Git操作\n4、了解大数据引擎的基本原理，并有一定的使用经验，如Elasticsearch、Flink、Hive、Spark、Kafka、Hbase、Redis等。\n5、需要较强的逻辑分析、数据分析能力、问题排查能力，工作主动，学习能力强，具备丰富想象力和创造力\n6、做事严谨踏实，责任心强，良好的团队合作精神，较强的沟通能力，较好的团队间协同能力\n7.、有相关数据平台相关研发经验或者参与过大型分布式系统研发及设计者优先",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区阿里云飞天园区199",
    major: "['计算机']",
    neo4j: 11923,
    match_value: 0.6275348777875525,
  },
  {
    title: "Java开发工程师(高级)",
    salary: "17-30K·14薪",
    education: "本科",
    skill:
      "['MyBatis', 'NoSQL', '数据库', 'Weblogic', 'HTML', 'Java', 'JQuery', 'MVC', '微服务架构', '分布式技术', 'SQL Server', 'Dubbo', 'Oracle', 'Spring', '多线程', 'JS', 'Tomcat', 'Websphere', 'springcloud', 'XML', '后端开发', 'MySQL']",
    info: "专业培训，五险一金，高温补贴，免费班车，13薪，包住，带薪年假，工作餐，年终奖，节日福利",
    kind1: "互联网",
    kind2: "后端开发",
    kind3: "java",
    description:
      "一、Java高级开发工程师\n岗位职责：\n1．进行系统框架搭建和设计，对关键技术进行攻关和研究；\n2．对商城前台及后台的新需求及优化需求的分析与代码开发，内部系统接口等新需求与优化需求的分析与代码的开发；\n3．编制项目开发计划、识别和控制项目风险，有效控制项目开发整个过程及关键环节；\n4．对项目进行规范化管理，做好项目质量管控，完成项目各阶段的文档；\n5．开发团队的组建和管理，制定相关制度和规范，承担代码开发工作。\n6．参与技术架构的讨论和评审，参与核心代码的编写；\n7．团队管理及对其团队人员工作质量与效率的把控。\n任职要求：\n1、计算机及相关专业，本科及以上学历\n2、5年以上java开发经验，2年及以上电商项目开发经验；\n3、有一定的算法基础，具有较强的独立解决问题能力和文档编写能力；\n4、精通微服务架构和技术，如springcloud或dubbo等；\n4、熟悉开源框架或技术，如spring mvc、mybatis、XML等技术；\n5、熟悉js、jquery、jstl、div+css、Html等前端技术；\n6、深入理解OOP、OOD思想，熟悉常用数据结构，理解常用设计模式；\n7、至少熟悉Weblogic、Jboss、Websphere、Tomcat等一种应用服务器；\n8、熟悉oracle、mysql、SQL Server等一种关系型数据库，了解nosql数据库；\n9、具有良好的团队协作精神，有较强的业务模型分析能力；\n10、做事主动认真，对互联网技术研发具有浓厚的兴趣；\n11、善于与人沟通，能承担一定的工作压力，有强烈的责任心和主人翁精神。",
    province: "浙江省",
    city: "杭州市",
    district: "上城区",
    address: "杭州上城区高德置地广场45号",
    major: "['计算机']",
    neo4j: 7878,
    match_value: 0.6001151057262459,
  },
  {
    title: "Java高级开发工程师",
    salary: "20-40K·16薪",
    education: "本科",
    skill:
      "['MyBatis', 'Linux', 'IOS', 'Java', '后端开发', 'SpringBoot', 'Dubbo', 'Spring', 'MySQL', '软件工程师', 'Android', '架构师', 'PC端', 'JVM']",
    info: "股票期权，年终奖，补充医疗保险，免费班车，包吃，带薪年假，五险一金，定期体检，餐补，员工旅游",
    kind1: "互联网",
    kind2: "后端开发",
    kind3: "java",
    description:
      "岗位信息\n我们是阿里巴巴集团菜鸟网络末端技术团队，是菜鸟乃至整个集团的战略性团队，负责菜鸟核心末端物流基础设施建设，未来发展空间巨大。\n岗位工作地在上海和杭州，大部分职位在杭州，上海主要招一些核心TL岗，社保缴纳地域可自由选择（可选择与工作地不同）。\n----------------------------------------------------\n岗位描述\n1. 负责菜鸟末端的平台化产品设计与搭建；大型项目/大促等项目的总体架构设计与风险控制；\n2. 技术预研和技术难点攻关，保障系统可用性、稳定性、和可扩展性；\n3. 快速实现业务业务需求，同时可以形成沉淀和复用架构/服务。\n岗位要求\n1. Java基础扎实，精通核心类库的使用，熟悉JVM原理\n2. 熟悉Spring、MyBatis、Dubbo、SpringBoot等开源框架，了解其原理和机制；熟悉Linux 操作系统和MySQL数据库，有开发和解决问题的经验；\n3. 了解互联网系统的架构，有分布式系统的设计经验；熟悉开源中间件的使用，了解其原理和机制；\n4. 有高并发、高可用性系统设计与开发的经验；有性能调优的经验加分项；\n5. 学习能力强，适应能力好，抗压能力强；\n6. 有做过大型项目的技术主管/架构师优先考虑；",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区中节能·西溪首座(西门)B1-1",
    major: "[]",
    neo4j: 7814,
    match_value: 0.5786951130032643,
  },
  {
    title: "Java高级开发工程师",
    salary: "20-40K",
    education: "本科",
    skill:
      "['Java', '后端开发', '高级软件工程师', '分布式技术', 'Redis', 'Spring', 'MySQL', '多线程', '中级软件工程师', 'IO', 'JVM']",
    info: "五险一金，定期体检，带薪年假，补充医疗保险，节日福利，年终奖，加班补助，员工旅游，免费班车，股票期权，餐补",
    kind1: "互联网",
    kind2: "后端开发",
    kind3: "java",
    description:
      "JAVA基础扎实，理解io、多线程、集合等基础框架，对JVM原理有一定的了解",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区菜鸟西溪首座",
    major: "[]",
    neo4j: 7880,
    match_value: 0.5731043012004318,
  },
  {
    title: "政务区块链应用研发专家-java方向",
    salary: "25-45K",
    education: "本科",
    skill:
      "['Linux', 'Java', '数据库', 'Spring', 'SQL', 'Unix', 'Hibernate', '架构师', 'JVM']",
    info: "带薪年假，餐补，五险一金，定期体检，年终奖",
    kind1: "互联网",
    kind2: "后端开发",
    kind3: "区块链工程师",
    description:
      "区块链平台部政务产品团队主要业务范围介绍：利用区块链技术结合其他安全和隐私保护解决方案，对个人或企业在日常生活中产生的托管在政府部门的数据，在进行日常生活应用需要的场景（比如：发票报销，医疗票据理赔等等），进行安全和隐私保护的数据分享和流转，打造数据拥有方在对应的数据使用场景下安全可靠的数据流转和使用通道，对此提供完整的解决方案进行技术研发支撑。\n团队介绍\n1. 解决政务数据在上述使用场景下的解决方案搭建和完善，随着政务数据使用场景的提升，不断提升系统性能，不断对丰富的业务场景的使用，进行研发支持。\n2. 负责解决方案中产品服务的系统分析和架构设计，并主导完成详细设计和编码的任务，确保项目的进度和质量；\n2. 开发和维护政务数据安全分享流转使用的产品和系统，快速定位并修复现有软件缺陷；\n3. 能够有效地对新人或普通开发工程师进行辅导，帮助其快速成长。\n职位要求\n1. JAVA基础扎实：精通多线程编程，熟悉分布式,缓存,消息队列等机制；熟悉JVM，包括内存模型、类加载机制以及性能优化；\n2. 对各种开源的框架如Spring、Hibernate等有深入的了解，精通关系型数据库设计及SQL，精通unix/linux操作系统；\n3. 具备良好的识别业务关键需求和设计领域模型的能力；\n4. 热爱技术，工作认真、严谨，对系统质量有高要求的意识，善于沟通与团队协作；\n5. 有区块链对应项目或者政务数据民生使用系统研发经验者优先。",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区阿里中心·杭州Z空间西溪路556号",
    major: "[]",
    neo4j: 8611,
    match_value: 0.5355679954889293,
  },
  {
    title: "爬虫工程师-海外电商平台-兼职",
    salary: "15-20K·15薪",
    education: "本科",
    skill:
      "['MongoDB', 'Java', '数据库', 'HTTP', '数据结构', 'Redis', '爬虫', 'Python', 'MySQL', 'app', '后端', 'Scrapy', '数据', '数据开发', '算法']",
    info: null,
    kind1: "AI/数据",
    kind2: "数据",
    kind3: "爬虫工程师",
    description:
      "岗位职责：\n1、负责跨境电商平台网络爬虫系统的设计与开发；\n2、设计爬虫策略和防屏蔽规则，提升网页抓取的效率和质量；\n3、针对需要的数据，寻找网站或app内可用的数据或接口；\n4、研究主流网站和app反爬机制，寻找应对方案。\n任职要求：\n1、本科及以上学历，计算机相关专业，1-3年电商公司相关工作经验，业务场景应用中有爬虫、反爬虫工作经验或大数据+电商平台爬取数据分析经验者优先考虑；\n2、熟悉Java、Python开发，熟悉数据结构、算法、设计模式、http协议，有其他后端语言经验也可考虑；\n3、熟悉爬虫开发，掌握常用爬虫框架如：requests、xpath、beautifulsoup、scrapy、selenuim等，了解常见的反爬手段及其应对措施；\n4、熟悉常用数据库，包括MySQL、Redis、MongoDB等；\n5、此岗位为兼职，要求工作时间内能够有效沟通，可以利用下班时间或周末时间进行开发，可以作为您的一个副业，自由职业者尤佳。",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区西溪银座(弘德路)2幢3层391室",
    major: "['计算机']",
    neo4j: 11664,
    match_value: 0.5263146288754049,
  },
  {
    title: "DBA",
    salary: "15-20K·16薪",
    education: "本科",
    skill:
      "['ElasticSearch', 'MongoDB', 'elasticsearch', '数据库', 'Redis', 'Shell', 'MySQL', 'Python', 'DBA工作经验', 'rocketmq', 'shell']",
    info: "带薪年假，节日福利，餐补，五险一金，通讯补贴，年终奖，交通补助，定期体检",
    kind1: "互联网",
    kind2: "运维/技术支持",
    kind3: "DBA",
    description:
      "工作内容：\n1、负责维护公司mysql、canal、elastic search、rocketmq等数据库、中间件的维护和升级，保障公司信息化系统数据链路稳定性与可靠性。\n2、负责数据链路相关的数据库、中间件监控系统建设，保障整个数据链路稳定运行。\n3、参与数据链路相关组件技术标准、迭代方案设计以及落地实施。\n任职要求：\n1. 熟悉mysql体系结构、Innodb存储引擎及底层数据结构，熟悉业界常用的mysql高可用方案和实现原理，2年以上生产运维经验。\n2. 熟悉canal、elasticsearch、rocketMQ等数据中间件的原理，2年以上canal、elasticsearch、rocketMQ等数据中间件的生产运维经验。\n3. 有大规模elasticsearch、rocketMQ、mongodb非关系型数据库或数据中间件集群的生产运维经验者优先考虑。\n4. 熟悉shell、python等脚本语言，有自动化运维平台设计、开发经验。\n5. 熟悉Prometheus监控系统中的任意一种，有自定义监控开发、集成经验。\n6. 高度责任心，极富团队精神，良好的沟通能力、分析能力、逻辑思考能力。\n7.本科及以上学历。",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区农夫山泉股份有限公司3号楼3层",
    major: "[]",
    neo4j: 9619,
    match_value: 0.49193463551475164,
  },
  {
    title: "区块链研发工程师",
    salary: "20-30K",
    education: "本科",
    skill:
      "['Java', 'C++', '数据结构', 'Golang服务端开发经验', '多线程', 'Go', 'IO', '网络编程', 'nodeJS', 'Golang']",
    info: "定期体检，五险一金，股票期权，零食下午茶，全勤奖，年终奖，节日福利，带薪年假",
    kind1: "互联网",
    kind2: "后端开发",
    kind3: "区块链工程师",
    description:
      "岗位描述\n1、参与公司区块链技术的研究，承担区块链应用产品的开发；\n2、为大型复杂软件提供深入需求分析和架构设计；\n3、从事架构，核心代码编写、指导和培训工程师；\n4、可独立完成相关工作。\n任职要求：\n1、计算机基础扎实，对技术有热情，有很强的学习能力和潜力；\n2、逻辑能力强、视野开阔，有创新精神，接受新事物能力强；\n3、性格乐观，皮实，自省，责任心强，积极主动，善于沟通，具有团队精神；\n4、熟练掌握go/C++/JAVA/nodejs语言至少一种；\n5、熟悉数据库（MySql，Oracle）使用，设计，调优；\n6、熟悉多线程模型编程，熟悉网络编程和IO模型；\n7、熟练掌握各类常用数据结构和相关算法；\n8、熟悉分布式系统的设计和应用，熟悉分布式缓存、消息等机制；并能合理应用分布式技术，解决问题。\n[符合以下条件者优先]\n有区块链，大数据，密码学，AI，云计算，搜索，广告，安全等领域研发经验；\n熟悉设计模式，有项目管理经验；\n热衷开源社区代码贡献。",
    province: "浙江省",
    city: "杭州市",
    district: "上城区",
    address: "杭州上城区中国银行保险监督管理委员会浙江监管局(东门)19楼",
    major: "['计算机']",
    neo4j: 8646,
    match_value: 0.4658985770763358,
  },
  {
    title: "高级数据仓库开发工程师",
    salary: "20-35K·16薪",
    education: "本科",
    skill:
      "['Java', 'Impala', 'Spark', 'Python', 'Hbase', 'Kafka', 'Hadoop', 'SQL', 'Scala', 'Flink', '数据', 'Hive']",
    info: null,
    kind1: "AI/数据",
    kind2: "数据",
    kind3: "数据仓库",
    description:
      "1、有大数据工作经验，了解大数据环境的搭建、开发、维护，对大数据生态有完整的认识;\n2、熟悉大数据生态技术产品Hadoop、Flink、HBase、Hive、Impala、Spark、Kafka等；\n3、熟悉阿里云的大数据产品，dataworks，maxcompute，quickBI等；\n4、熟悉sql，并可以使用java，python，scala语言，编写自定义函数；\n5、理解维度建模理论，参与过离线数据仓库建设的优先；\n6、使用spark，flink做过实时项目或实时数仓的优先；\n7、理解日志数据的埋点理论，参与过用户行为数据分析的优先；\n8、有积极乐观的心态，并有良好的沟通表达能力；",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区中节能·西溪首座西溪首座",
    major: "[]",
    neo4j: 11687,
    match_value: 0.464901335275902,
  },
  {
    title: "高级Java开发工程师",
    salary: "40-70K·16薪",
    education: "硕士",
    skill: "['boot', 'Java', '数据库', 'Spring', 'OceanBase', 'cloud']",
    info: "五险一金，餐补，带薪年假，免费班车，补充医疗保险，年终奖，定期体检，员工旅游，股票期权，交通补助，节日福利",
    kind1: "互联网",
    kind2: "后端开发",
    kind3: "Java",
    description:
      "团队介绍：OceanBase 是由蚂蚁集团/阿里巴巴自主研发的分布式关系型数据库。具有数据“零”丢失、可扩展、高性能、持续可用、高兼容性等特点，现已广泛应用在阿里巴巴、蚂蚁集团以及外部银行保险等领域的核心业务中。十年来，OceanBase 已经支撑了支付宝全部核心业务数据库，一次次刷新双十一交易峰值，2019 年在业界公认的 TPC-C 性能评测中成为第一个排名第一的分布式数据库和第一个上榜的中国人完全自主开发的数据库。2020年我们开始启动商业化运作，走向市场，成立北京奥星贝斯科技有限公司，未来我们也会服务于更广大的商业市场。更多信息请看我们的官网 www.oceanbase.com职位描述：1、负责 OceanBase 数据库商业化产品和工具链的研发。构建 OceanBase 商业产品生态，与业内顶尖的数据库内核及企业软件专家一起把 OceanBase 打造为一个成功的商业数据库；2、 加入 OceanBase，你将充分学习到 ToB 产品的灵魂，与技术小伙伴们一起搭建稳定可靠、强大灵活和高安全的系统架构。你将深入到技术细节中，用代码去改写中国数据库的未来；3、此岗位 P6/P7/P8 均有需求。职位要求：1、Java基础扎实，编码能力强，熟悉常用的设计模式，熟悉并发编程；2、精通 Spring Boot/Spring Cloud 相关的技术栈和工具集合，对框架背后的机制和原理有深入理解；3、自驱力强、优秀的团队合作能力和沟通能力，对新技术有好奇心，学习能力和主动性强，有钻研精神，充满激情，乐于接受挑战；4、有云产品、中间件、复杂企业软件开发经验经验者优先；5、熟悉关系数据库原理或有相关运维经验者优先。",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区黄龙国际中心5楼",
    major: "[]",
    neo4j: 748,
    match_value: 0.4442487644677149,
  },
  {
    title: "数据开发工程师",
    salary: "20-30K",
    education: "本科",
    skill:
      "['数据治理', 'Java', 'ETL', 'Oracle', 'MySQL', 'Python', 'SQL', 'Hadoop', 'Hbase', 'Perl', '数据仓库', '大数据', '数据', '数据开发', 'Hive']",
    info: "包吃，股票期权，餐补，年终奖，免费班车，定期体检，五险一金，补充医疗保险，带薪年假，员工旅游",
    kind1: "AI/数据",
    kind2: "数据",
    kind3: "数据开发",
    description:
      "大数据的采集、存储、处理，通过分布式大数据平台处理数据，支持业务管理决策， 大数据体系的设计、开发、维护，通过数据仓库、元数据、质量体系有效的管理和组织几百P的数据。\n熟悉一门数据处理语言，如SQL、JAVA、Python、Perl等；熟悉大型关系型数据库如mysql，oracle等，或分布式数据库 如GP/HIVE等； 参与过数据处理、分析、挖掘等相关项目； 对Hadoop、Hive、Hbase等分布式平台有一定的理解。",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区中节能·西溪首座B1-2",
    major: "[]",
    neo4j: 11974,
    match_value: 0.4409179109366983,
  },
  {
    title: "Golang",
    salary: "30-40K",
    education: "硕士",
    skill:
      "['Linux', 'Java', '数据分析', '调度算法', 'os', 'k8s', 'Python', 'PaaS', 'Docker', 'Kubernetes', 'kubernetes', '深度学习', 'Yarn', 'Devops', 'Golang']",
    info: "餐补，带薪年假，五险一金，年终奖，定期体检",
    kind1: "互联网",
    kind2: "后端开发",
    kind3: "Golang",
    description:
      "岗位描述\n蚂蚁Sigma平台为蚂蚁金服上层业务提供标准容器服务和全局资源动态分配，调度节点单集群规模超过万台，同时致力于在系统、业务多个层面，包括os/kernel、容器/paas、智能调度/仿真容量等进行技术突破，提高容器系统规模化的资源利用效率，降低大促等各种大规模复杂业务场景下的资源成本，打造智能、高效、稳定的金融级基础系统，助力蚂蚁科技金融。\n职位要求\n负责蚂蚁金服容器调度技术设计和研发。\n1. 设计和实现大规模、高效、智能的基于Kubernetes平台的新一代调度体系\n2. 提高资源利用效率，降低成本，设计和研发混部、VPA、cpushare等技术\n3. 建设智能调度，结合动态运行数据、深度学习、强化学习等技术打造下一代智能化、可视化的调度技术\n4. 支持计算类、大数据类的资源调度，设计和研发高并发、低延迟、大规模的调度技术\n能力要求\n1. 熟练掌握golang语言开发，具备python、java等其他一种或多种语言开发经验\n2. 熟悉kubernetes/docker生态，熟练掌握kubernetes/容器技术和相关项目代码实现，有贡献kubernetes/docker相关开源项目者优先\n3. 有k8s、yarn、mesos和swarm等平台调度技术研发经验者优先，有搜索算法和数据分析经验者会有额外加分\n4. 对linux系统有深入的理解，特别对cgroup、cpu share、memory share等资源相关技术有相关经验者优先\n5. 具备一定的生产运维经验，熟悉Devops研发流程\n6. 具备较强的团队沟通协作能力、自驱力和技术热情，具备实际的项目落地经验",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区黄龙万科中心I座",
    major: "['计算机']",
    neo4j: 7621,
    match_value: 0.44009120759458287,
  },
  {
    title: "OceanBase数据库SQL引擎研发工程师",
    salary: "20-35K·16薪",
    education: "学历不限",
    skill:
      "['PostgreSQL', 'C++', '分布式技术', 'SQL Server', 'Oracle', 'MySQL', 'OceanBase', 'SQL', '数据库开发']",
    info: "年终奖，零食下午茶，夜班补助，补充医疗保险，全勤奖，员工旅游，股票期权，带薪年假，住房补贴，节假日加班费，交通补助，包吃，定期体检，加班补助，通讯补贴，意外险，五险一金，节日福利，餐补，免费班车",
    kind1: "互联网",
    kind2: "后端开发",
    kind3: "c/c++",
    description:
      "1. 参与OceanBase SQL模块的研发工作，打造全面支持HTAP场景的新一代SQL引擎，包括但不限于查询优化、向量化执行引擎、分布式执行，并行执行,数据库功能，安全功能等方面的开发工作与性能调优\n2. 参与产品功能的调研、方案设计、开发和测试的整体研发流程\n3. 有相关数据库内核开发经验优先\n此职位提供P5 P6层级岗位",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区黄龙万科中心",
    major: "[]",
    neo4j: 7361,
    match_value: 0.43006684727319006,
  },
  {
    title: "Golang开发工程师",
    salary: "18-26K",
    education: "本科",
    skill:
      "['Linux', '数据库', 'C++', '后端开发', '数据结构', 'Shell', '操作系统', 'Python', 'Docker', 'K8S', 'GoLang', '算法', '网络', 'Golang']",
    info: "五险一金，零食下午茶，加班补助，年终奖，股票期权，带薪年假，通讯补贴，餐补，包吃，免费班车，定期体检，节日福利",
    kind1: "互联网",
    kind2: "后端开发",
    kind3: "Golang",
    description:
      "岗位职责\n1.参与云端及边缘端的后台服务开发\n2.参与需求讨论和方案制订，高质量完成开发和测试上线工作\n3.日常性能优化和问题定位与修复\n任职条件\n1.本科及以上学历，计算机相关专业\n2.3年Golang/c++开发经验，优秀应届生亦可\n3.了解计算机体系结构、数据结构和算法、操作系统、数据库、网络等基础原理\n4.优秀的沟通协作能力、分析解决问题能力和学习能力，具有良好的主观能动性\n5.熟练Linux操作和命令，掌握至少一门脚本语言，如python/bash等\n6.了解消息系统，了解分布式系统, 了解Docker&K8s",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区中大银座2号楼4楼",
    major: "['计算机']",
    neo4j: 7663,
    match_value: 0.4242246504127627,
  },
  {
    title: "阿里云事业群-技术专家-IOT",
    salary: "20-40K·16薪",
    education: "本科",
    skill:
      "['运营', 'IoT', '物联网', 'Dubbo', 'Spring', 'Docker', 'Kubernetes', 'Istio', 'cloud']",
    info: "年终奖，股票期权",
    kind1: "互联网",
    kind2: "后端开发",
    kind3: "java",
    description:
      "一、团队介绍：阿里云IoT企业应用团队，致力于打造稳定、高效、领先的企业应用基础设施。团队负责提供企业应用上云、托管、集成和开箱技术解决方案，并提供商业化和生态运营能力。帮助企业应用生态合作伙伴实现数字化转型\n二、岗位职责\n1、负责IoT企业应用托管平台的架构设计和系统研发工作，面向软件开发商提供企业应用上云、应用托管技术解决方案，包括应用接入、异构托管、多形态部署、应用运维能力，提升应用接入和托管效率\n2、负责IoT企业应用集成平台的架构设计和系统研发工作，面向软件开发商、硬件开发商、系统集成商提供企业应用集成和开箱技术解决方案，包括服务集成、数据集成、设备集成和软硬一体、软硬分离模式开箱能力，提升应用集成和开箱效率\n3、负责IoT企业应用商业化平台的架构设计和系统研发工作，面向软件开发商、硬件开发商、系统集成商提供应用和标准解决方案商业化能力以及面向运营商提供生态运营能力，帮助扩大企业应用规模、构建企业应用生态\n三、岗位要求\n1、具备JavaEE和分布式系统设计开发经验\n2、熟悉Kubernetes容器技术和应用开发，对Docker、Kubernetes、Istio等相关开源项目有深入了解者优先\n3、熟悉开源微服务框架如Spring Cloud、Apache Dubbo、Service Mesh等\n4、具备良好的学习能力，较强的沟通协作能力和较强的自我驱动力",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区阿里云飞天园区",
    major: "[]",
    neo4j: 7818,
    match_value: 0.41997582662558397,
  },
  {
    title: "全栈开发工程师",
    salary: "12-20K",
    education: "本科",
    skill:
      "['Java', '数据库', 'JavaScript', '后端开发经验', 'Spring/Spring Boot', 'Spring', '全栈侧重后端', 'web', '全栈项目经验', '小程序', '数据', 'vue']",
    info: null,
    kind1: "互联网",
    kind2: "后端开发",
    kind3: "全栈工程师",
    description:
      "【岗位职责】\n参与公司产品的系统设计、开发和维护工作\n参与技术评审、制定架构规范、编写架构文档和预研新技术等，解决项目中的关键架构问题和技术难题；\n发掘和分析业务需求，设计技术方案和系统架构，解决团队开发过程中遇到的疑难问题，帮助团队提高效率\n与开发团队一起进行关键技术研究，提升团队整体技术能力，主动思考并提出对现有系统的优化方案并实施\n完成上级领导安排的其他工作。\n【岗位要求】\n具有3年以上的工作经验，能力突出者可以适当放宽。\n熟练掌握Java编程语言和相关的开发工具和框架，如Spring、Spring Boot等。\n熟练使用vue进行web端开发，熟练掌握各种应用框架，有小程序开发经验优先。\n有数字化、可视化、信息化相关开发经验优先。\n熟悉非关系型数据库和各种中间件\n具有较强的沟通协调能力和团队合作精神，优秀的文档撰写能力，乐于分享，善于学习。\n有扎实的编程能力、计算机体系结构、软件工程基础，基本的算法和数据结构功底\n具有较强的沟通协调能力和团队合作精神，优秀的文档撰写能力，乐于分享，善于学习新知识新技术。\n对代码整洁度和质量有较高的要求",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区浙江开放大学教工路校区B区",
    major: "['计算机', '信息化', '软件工程', '数字化']",
    neo4j: 8492,
    match_value: 0.40736232838775127,
  },
  {
    title: "全栈web开发工程师",
    salary: "11-18K",
    education: "大专",
    skill:
      "['数据库', 'JQuery', 'MVC', 'ASP.NET', 'CSS', 'Javascript', 'MySQL', 'HTML', 'SQL', 'NET', 'C#', 'core', 'HTML5', 'ajax', 'WebAPI', 'websocket']",
    info: null,
    kind1: "互联网",
    kind2: "后端开发",
    kind3: "C#",
    description:
      "1、计算机及相关专业毕业，大学专科以上学历；\n2. 有3年以上asp.net项目开发经验，精通HTML/HTML5、JavaScript、CSS/CSS3、PostgreSQL+Redis、C#语言及SQL；\n3. 熟悉WebSocket、AJAX、jquery等技术；\n4. 熟悉asp.net、asp.net mvc、WebApi、.net core mvc、等技术；\n5. 熟悉数据库设计，了解数据库性能优化，熟练使用MySQL和PGSQL；\n6. 有较强的沟通协调能力、团队合作精神及高度责任心；\n7. 具有撰写技术文档和手册能力，能主动学习新技术；\n8. 熟悉移动端应用开发者优先考虑。",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区绿城.西溪世纪中心2号楼7楼716",
    major: "['计算机']",
    neo4j: 7289,
    match_value: 0.3983017718143743,
  },
  {
    title: "资深前端工程师",
    salary: "35-60K·15薪",
    education: "本科",
    skill:
      "['MongoDB', 'Linux', 'Egg.js', 'Node', '消息队列', 'Redis', 'ts', '后端', '小程序', 'vue', 'Socket技术']",
    info: "股票期权，补充医疗保险，带薪年假，节日福利，交通补助，年终奖，五险一金，定期体检，零食下午茶，免费班车",
    kind1: "互联网",
    kind2: "后端开发",
    kind3: "Node.js",
    description:
      "负责滴滴小桔问卷系统的前端及Node服务研发工作。\n在这里，你可以直接参与问卷No-code开发平台闭环系统的建设，用技术创造世界;\n在这里，你也可以深入业务，与产运团队一同探索新的玩法与产品形态，感受技术驱动创新与成长；\n在这里，你还可以参与到团队的NodeX体系建设，数据生态建设，以及面对复杂业务的技术挑战。\n团队技术栈全面，在Vue、小程序、TS、Node服务、MongoDB、消息队列、Hive离线应用等都有深入使用与应用；\n团队能力涵盖全面，团队内闭环业务及自驱项目，职能涵盖服务端、产品、设计与交互、项目管理等多方向的能力；\n我们是一个年轻、热爱技术、热爱分享、积极创新的团队，推崇用极客的方式提升效率、性能和稳定性；\n部门氛围开放，成长没有天花板，期待心里有火、眼里有光的你加入我们。\n工作内容：\n1. 滴滴问卷业务研发工作：包括问卷编辑端、渲染端；\n2. 闭环业务的全栈研发工作，包括前端与服务端研发、稳定性保障等",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区云起·西溪谷国际商务中心G座G座8楼",
    major: "[]",
    neo4j: 7950,
    match_value: 0.3977505769541178,
  },
  {
    title: "高级Java开发工程师/技术专家",
    salary: "25-35K·13薪",
    education: "本科",
    skill: "['微服务', 'Java', 'Spring', 'web', '架构师', '银行', '运维']",
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
    major: "[]",
    neo4j: 7891,
    match_value: 0.38935898935349395,
  },
  {
    title: "数据开发工程师",
    salary: "20-25K·14薪",
    education: "本科",
    skill:
      "['Java', 'ETL', '数据分析', 'Spark', 'Python', 'Hadoop', '数据建模', 'Flink', '数据处理', '数据采集', '数据', 'BI', '数据开发']",
    info: "零食下午茶，节日福利，五险一金，免费班车，年终奖，交通补助，员工旅游，带薪年假，餐补，通讯补贴，股票期权，包吃，公司团建，定期体检，补充医疗保险",
    kind1: "AI/数据",
    kind2: "数据",
    kind3: "数据开发",
    description:
      "1. 负责数据研发工作，针对业务诉求和实际数据情况，能独立完成项目的系统分析，根据开发规范和数据模型设计实现数据开发任务，保证数据质量；\n2. 基于阿里云自主研发离线计算MaxCompute平台与实时计算Blink平台，进行海量数据模型设计、数据ETL开发，整合和处理海量数据；\n3.数据系统建设和构建数据应用，包括数据采集、提取、分析与数据产品化，以及模型架构设计及优化工作；\n4. 同产品、BI等团队协作深度挖掘数据商业价值，建设公共数据服务，实现高质量数据共享，推动部门数据应用能力；\n职位要求：\n具有丰富的数据研发经验，对数据处理、数据建模、数据分析等有深刻认识和实战经验。\n较为丰富的数据仓库及数据平台的架构经验，精通数据仓库建模及ETL设计开发；有较为系统的海量数据性能处理经验；\n有从事分布式数据存储与计算平台应用开发经验，有Hadoop、Spark、Flink 等离线计算、实时计算数据研发经验，对Flink、Beam有一定了解者优先。\n具备较扎实的理论基础和工程能力，具备一定的JAVA、Python语言的开发能力，具备机器学习算法能力尤佳；\n责任心强，做事细致，具备较强的沟通协作能力和快速学习能力",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区阿里中心·杭州Z空间a座3楼",
    major: "[]",
    neo4j: 11909,
    match_value: 0.38628908648659505,
  },
  {
    title: "js区块链开发工程师（高级）",
    salary: "23-30K",
    education: "本科",
    skill:
      "['MongoDB', 'SQL Server', 'Javascript', '区块链', 'MySQL', 'Oracle', 'Node.js', 'nodeJS']",
    info: "五险一金",
    kind1: "互联网",
    kind2: "后端开发",
    kind3: "区块链工程师",
    description:
      '岗位职责\n"1、负责区块链底层中功能模块的研发；\n2、负责参与交易平台功能模块的研发；\n3、基于Node.js的应用研发工作；\n4、进行相关产品的前端技术文档编写，方案设计。"\n岗位要求：\n"1、精通nodejs或javascript\n2、能使用其他语言解决高级问题\n3、深入了解数据库，如Mysql、SQL Server、Mongodb、Oracle等"',
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区钱江浙商创投中心创投中心2号楼701",
    major: "[]",
    neo4j: 8697,
    match_value: 0.38455753196174136,
  },
  {
    title: "数据挖掘工程师/算法工程师",
    salary: "2-3K",
    education: "硕士",
    skill:
      "['数据挖掘', '机器学习', 'Spark', 'R', 'Python', 'Storm', 'SQL', 'Hadoop', 'Hbase', '深度学习', 'Hive']",
    info: "五险一金，餐补",
    kind1: "AI/数据",
    kind2: "人工智能",
    kind3: "其他AI",
    description:
      "我们提供真实的海量交易数据，海内外上亿级别消费者的商业行为，数百万级外部商户真实数据；我们面对的是动态、复杂、多变的各式欺诈风险，如盗用、作弊、套现等等；我们不仅应用和优化各种成熟的风控模型使之适用于各类场景，更积极探索和拓展最前沿的机器学习算法，包括Deep Learning、Transfer Learning、图计算、增强学习、时序挖掘等等，来更加主动和敏捷地应对挑战。?        如果你对风控和安全感兴趣，如果你致力于用大数据产生价值，如果你希望真正踏入这人工智能让万物互联的时代大潮，请加入我们。?岗位描述：?基于历史风险和专家经验，通过有监督和无监督的方法结合，建立针对欺诈行为的预测模型，并且持续优化；?与风险策略分析师紧密合作，通过分析和挖掘数据，探索业务机会点，并能利用算法工具解决实际业务问题；平衡体验的便捷和安全，通过优化理论和方法，设计并实施风险-收益最优化的决策。岗位要求:计算机、数学、统计、金融等相关专业的硕士或以上学历；?三年以上数据挖掘或者机器学习相关工作经验；?熟练掌握机器学习算法（或者对于最优化理论和方法有所研究和实践），熟练运用SQL、R、Python等工具；?突出的分析问题和解决问题能力，自我驱动，并且具备较强的学习能力、创新应用能力及沟通协调能力；?拥有分布式图计算，实时流计算（Spark/Storm）、海量数据处理（Hadoop/Hbase/Hive）经验者优先；有盗用欺诈作弊套现等风险识别工作经验者优先；有深度学习研究经验者优先。",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区黄龙时代广场B座万塘路18号",
    major: "['计算机', '统计', '数学', '金融']",
    neo4j: 2422,
    match_value: 0.3820233350429077,
  },
  {
    title: ".NET",
    salary: "8-13K",
    education: "大专",
    skill:
      "['web', 'HTML', 'SQL', 'HTML5', 'WCF', 'JQuery', 'MVC', 'CSS', 'ui', 'SQL Server', 'core', 'JS', 'ASP.NET', '.NET', 'Javascript', '.NET MVC', 'MVC开发', 'WebService', '软件工程师', 'api', 'MySQL', 'NET', '.NET Core', 'C#', 'websocket', 'vuejs', 'SQLServer']",
    info: "生日福利，零食下午茶，夜班补助，绩效奖金，带薪年假，团建聚餐，员工旅游，意外险，年终奖，节日福利，五险一金",
    kind1: "互联网",
    kind2: "后端开发",
    kind3: "C#",
    description:
      "1. 从事粮库生产过程管理类软件产品的Web开发；\n2. 参与或负责公司项目和产品的开发，包括前端业务、服务端C#代码、数据库、业务逻辑等实现；\n3. 负责产品功能模块代码的编写和模块相关技术文档编写；\n4.完成代码的自我检查和自我测试；\n岗位要求：\n1. 计算机软件相关专业，二年及以上.Net平台上Web开发工作经验；\n2. 熟悉.Net框架相关技术，熟悉C#、ASP.NET MVC、Web API、Wcf、LINQ，EnityFramework、FluentData ORM、WebService、WebSocket等技术；有.Net Core经验优先；\n3. 掌握Mysql、SqlServer数据库开发，熟悉SQL编写及数据库优化；\n4. 掌握Html、Html5、CSS、JavaScript、 Jquery、knockout.js等前端技术；熟悉Easyui、Vuejs、Ant Design等前端UI框架优先；\n5. 热衷于技术研发，喜欢研究新技术，善于交流沟通、具有良好的团队精神，具有较强的学习能力，能承受一定的工作压力，能够适应短期出差。",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区紫金创业园B座4楼401-5",
    major: "['计算机']",
    neo4j: 7277,
    match_value: 0.36801057883386773,
  },
  {
    title: "php开发工程师",
    salary: "6-10K·13薪",
    education: "学历不限",
    skill:
      "['Java', 'CSS', 'Javascript', 'MySQL', 'PHP', 'web', 'HTML5', 'Golang']",
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
    major: "['计算机']",
    neo4j: 8025,
    match_value: 0.3658079056259538,
  },
  {
    title: "前端工程师",
    salary: "15-25K",
    education: "大专",
    skill:
      "['前端', 'Angular', 'Java', 'C++', 'React', 'Python', 'PHP', 'web', 'app', 'Node.js', 'C', 'Ruby']",
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
    major: "[]",
    neo4j: 5240,
    match_value: 0.36440120579645074,
  },
  {
    title: "数据挖掘",
    salary: "20-40K",
    education: "本科",
    skill:
      "['数据挖掘', 'Java', '机器学习', 'C++', '数据分析', 'Python', 'SQL', '数据建模', 'shell', '自然语言处理经验', '文本挖掘']",
    info: "定期体检，餐补，年终奖，住房补贴，补充医疗保险，五险一金，股票期权，法定节假日三薪，团建聚餐，免费班车，员工旅游，带薪年假",
    kind1: "AI/数据",
    kind2: "人工智能",
    kind3: "数据挖掘",
    description:
      "为蚂蚁金服的内容相关产品（即时通讯服务、金融社区等）提供智能、高效的内容风险防控能力，基于对风险的理解，通过数据分析和挖掘，应用大数据风控系统，建设完备的风险防控策略体系，提升用户内容体验和安全感，为蚂蚁金服的内容安全保驾护航，创建健康安全的内容环境。\n工作职责：\n1.基于历史数据和专家经验，以数据定量分析和挖掘的方式感知风险，建立前瞻性的风控策略，并结合风控系统进行策略实施，对风险进行处置，保证安全大盘可控；\n3.及时响应风险、舆情案件，快速定位风险，梳理利益链条和攻击模式，并能快速制订策略应对；\n4.与数据、产品、技术团队深度合作，完善风险引擎中台能力。\n职位要求：\n1.数学、统计、计算机等相关专业本科及以上学历；\n2.有两年以上数据分析相关工作经验；数据挖掘、数据化运营经验者优先；\n3.熟练的SQL数据处理能力；能熟练应用至少一门语言进行工程开发（如Python、shell、c++、java），有开发经验者优先；\n4.掌握常规机器学习算法（如逻辑回归、决策树、聚类等）的应用实践；\n5.良好的分析问题和解决问题能力，自我驱动，并且具备较强的学习能力、创新应用能力及沟通协调能力。",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区浙江省杭州市西湖区翠苑街道中融城市花园黄龙时代广场B座",
    major: "['计算机', '数学']",
    neo4j: 10122,
    match_value: 0.3623046280732161,
  },
  {
    title: "数据采集工程师（初级）",
    salary: "4-8K",
    education: "大专",
    skill:
      "['XPath/CSS', 'Linux', 'Java', 'Pyspider', '爬虫工程师', 'MySQL', 'Python', '计算机相关专业', 'Scrapy', '爬虫开发经验', '数据处理经验']",
    info: "员工旅游，绩效奖金，节日福利，定期体检，工龄奖，团建聚餐，零食下午茶，交通补助，有无线网，年终奖，五险一金，股票期权，加班补助，带薪年假，底薪加提成，免费班车，生日福利",
    kind1: "AI/数据",
    kind2: "数据",
    kind3: "爬虫工程师",
    description:
      "岗位职责：\n1.负责设计和开发分布式爬虫系统，进行多平台多终端信息的抓取和分析；\n2.建立完整的数据获取、解析、入库和监控流程，优化系统瓶颈，不断迭代完善；\n3.有验证码破解、反扒、分布式爬虫架构经验；\n4.研究优化算法，提升爬虫系统的稳定性和可扩展性；\n5.快速支撑产品所需数据落地；\n任职要求：\n1、本科学历计算机、电子、数学、统计学等相关专业及本科以上学历；\n2.基础扎实，熟练使用pyth或Java，熟悉linux对应的开发环境\n3.熟悉反扒机制；\n4.精通爬虫原理、熟悉scrapy、pyspider等框架；\n5.熟悉mysql等数据库\n6.优秀的分析、解决问题能力，对未知的、挑战性问题充满激情；\n7.人品正直，有原则，有一颗奋斗拼搏的心。",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区华策中心A座6F",
    major: "['电子', '计算机', '统计学', '数学']",
    neo4j: 11654,
    match_value: 0.36157125068030704,
  },
  {
    title: "资深后端工程师",
    salary: "35-55K·14薪",
    education: "硕士",
    skill:
      "['Linux', 'Java', 'C++', 'k8s', 'Python', 'Docker', '视觉系统', 'Ai', '英语']",
    info: null,
    kind1: "互联网",
    kind2: "后端开发",
    kind3: "后端其他开发",
    description:
      "岗位需求：1.计算机、自动化、电子、通信、控制等相关专业硕士学历，3年以上相关工作经验； 2.熟悉软件工程的开发过程、方法和工具，具有较好的执行力，动手能力强，较强的沟通能力和团队意识；3.熟悉Linux 操作系统，并熟练掌握C、Python、C++或Java等一种或多种编程语言，有良好的编程规范；4.有AI相关系统或平台开发经验者优先；5.较好的英语读写能力，能够查阅相关英文文档。岗位职责：1.熟悉计算机视觉的主要任务，进行视觉系统/平台设计，负责项目的后端搭建、优化、调试和模块测试工作； 2.Docker/K8S的技术支持，主要涉及系统环境部署交付与测试，做好项目过程的文档记录； 3.定期进行项目维护和升级，并负责项目的技术支持和管理工作；4.部署与运维过程中，与其他算法及软件开发人员沟通解决与修复。",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区云栖未来智造创新基地润丰产业园1栋",
    major: "['电子', '控制', '计算机', '自动化', '通信']",
    neo4j: 2271,
    match_value: 0.35664402442841947,
  },
  {
    title: "Node.js",
    salary: "12-18K·13薪",
    education: "大专",
    skill:
      "['JavaScript/TypeScript', 'nodeJS', '服务端开发经验', 'JavaScript', 'MySQL/Redis/MongoDB', 'SQL', 'Node.js', '后端', '计算机/软件工程相关专业', 'Node.js开发经验', 'TypeScript']",
    info: "五险一金，节日福利，通讯补贴，年终奖，带薪年假，餐补，交通补助",
    kind1: "互联网",
    kind2: "后端开发",
    kind3: "Node.js",
    description: "Nodejs工作经验2年以上，工作经验3年以上",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区西港·新界西区协力大厦301",
    major: "[]",
    neo4j: 7963,
    match_value: 0.35583863976757946,
  },
  {
    title: "资深前端工程师",
    salary: "17-23K·13薪",
    education: "大专",
    skill:
      "['Java', 'C++', 'Node', 'Python', 'PHP', 'Ruby', '小程序', 'C', 'vue', 'H5']",
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
    major: "[]",
    neo4j: 5122,
    match_value: 0.3479833038399064,
  },
  {
    title: "全栈工程师",
    salary: "15-20K·13薪",
    education: "本科",
    skill:
      "['Java', 'Vue', 'JavaScript', 'Swift', '全栈无侧重', 'HTML', '全栈项目经验', '计算机相关专业', 'C', '小程序', 'Kotlin']",
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
    major: "['计算机', '通信']",
    neo4j: 8411,
    match_value: 0.3421233845998033,
  },
  {
    title: "游戏服务器开发",
    salary: "15-20K",
    education: "学历不限",
    skill:
      "['AWS', 'C++', 'Redis', '游戏', 'MySQL', '服务器', 'Node.js', 'C/C++', 'nodeJS']",
    info: "五险一金，年终奖，带薪年假，员工旅游，餐补，节日福利，零食下午茶",
    kind1: "互联网",
    kind2: "后端开发",
    kind3: "Node.js",
    description:
      "岗位描述：\n1. 负责游戏服务端设计开发；\n2. 配合游戏前端进行各个功能模块的联调；\n3. 负责游戏项目上线前各种调试，性能优化，以及上线后的各种版本开发。\n岗位要求：\n1. 精通C++或者Nodejs，MySQL，redis；\n2. 有大型游戏服务器经验，能独立完成服务器架构设计与搭建；\n3. 有aws经验者优先；\n4. 有pomelo经验者优先。",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区华星时代广场A座1501",
    major: "[]",
    neo4j: 7903,
    match_value: 0.34147416236178496,
  },
  {
    title: "python开发工程师",
    salary: "30-60K·16薪",
    education: "本科",
    skill:
      "['Java', '服务端开发经验', 'Shell', 'Python', 'dns', '计算机相关专业', '后端', '运维开发', '全栈开发经验']",
    info: "节日福利，餐补，免费班车，五险一金，年终奖，定期体检，绩效奖金，带薪年假",
    kind1: "互联网",
    kind2: "后端开发",
    kind3: "Python",
    description:
      "符合以下条件之一的即可：\n1、有云计算相关研发/运维经验\n2、安全&DNS方向\n3、熟悉计算机网络\n4、有管控研发经验",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区阿里巴巴云谷园区1号楼",
    major: "['计算机']",
    neo4j: 8204,
    match_value: 0.33830739366870277,
  },
  {
    title: "web前端",
    salary: "30-60K·13薪",
    education: "大专",
    skill:
      "['canvas', 'Webpack', 'Node', 'CSS', '游戏', 'React', 'Koa', '数据', 'HTML', 'web', 'Node.js', 'JS', 'WebGL', 'ap', 'vue', 'H5', '算法']",
    info: "团建聚餐，定期体检，五险一金，带薪年假，零食下午茶，年终奖，节日福利，补充医疗保险，股票期权",
    kind1: "互联网",
    kind2: "前端/移动开发",
    kind3: "前端开发工程师",
    description:
      "花呗借呗前端团队（RichLab）工作地点：杭州、北京、重庆前端工程师（基础要求）? 3 年及以上工作经验。如果你觉得自己特别优秀，2 年经验同样欢迎。? 具备良好的 HTML/CSS/JS 前端基础，有 React/Vue 等主流框架开发经验，并深入理解其原理，熟悉 Webpack；? 对互联网产品和 Web 技术有浓厚兴趣，有强大的自我驱动能力、学习能力和强烈的进取心；? 良好的沟通能力和团队合作精神，良好的分析问题和解决问题的能力；在上述基础要求的基础上，设置 5 大方向：1. 移动前端方向：? 需熟练掌握移动端 H5/hybrid 开发；? 对移动前端性能优化有充足的实践和方法；? 有小程序开发经验优先。 2. Node.js 全栈方向? 熟悉 Node.js 异步编程，对 koa/co/async 等原理机制了解透彻；? 熟悉 Node.js 以及 V8 的性能和稳定性优化，能对系统整体性能进行评估，解决内存瓶颈；? 熟悉监控和运维体系，有大流量高并发经验优先。3. 互动技术方向? 精通 Canvas/WebGL/SVG/CSS3，并能够使用原生 API 绘制图形动画；? 熟悉业界流行渲染引擎或游戏开发框架，熟练掌握其中至少一种并具备实际开发经验；? 有 3D 游戏开发经验优先。4. 基础架构方向? 具备良好的抽象能力和架构设计经验，至少以架构角色参与过一个中大型前端开发项目；? 扎实的数据结构、算法和编程基本功；? 有良好的开源作品和社区参与经验，关注新技术。5. 中后台方向? 精通主流 Web 技术，主导与组织过复杂的 Web 项目开发；? 对前端工程化、标准化、组件化有充足的实践和方法；? 有可视化搭建经验优先。",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区蚂蚁集团元空间",
    major: "[]",
    neo4j: 5285,
    match_value: 0.33354425614714023,
  },
  {
    title: "阿里通义实验室-大模型NLP算法专家",
    salary: "30-45K·16薪",
    education: "硕士",
    skill:
      "['Java', 'C++', '数据结构', 'query', 'Python', 'nlp', '搜索/信息检索算法经验', 'RAG', '自然语言处理经验']",
    info: "五险一金，餐补，补充医疗保险，股票期权，员工旅游，零食下午茶，免费班车，交通补助，节日福利，年终奖",
    kind1: "AI/数据",
    kind2: "人工智能",
    kind3: "搜索算法",
    description:
      "算法专家-生成式搜索 (RAG)\n1. 负责基于大模型的生成式搜索训练和研究，研发SOTA的先进性技术，以提高生成式搜索算法的效果和性能\n2. 基于行业场景的海量数据和知识，打造大模型范式下的下一代搜索系统的行业场景和模版\n3. 负责Query理解、Doc理解、召回、相关性等技术的先进性建设和应用落地，探索大模型范式下非结构化、结构化、多模态搜索场景技术\n4. 落地下游实际场景的搜索任务，以应用生成式搜索算法解决实际业务问题\n职位要求\n1. 计算机、电子、数学等相关专业硕士及以上学历；\n2. 熟练掌握Java/C++/Python中的一门语言，有扎实的数据结构和算法基础；\n3. 对搜索技术/nlp技术/大模型技术有系统理解和实践\n4. 具备优秀的分析问题和解决问题的能力、良好的沟通协作能力；能follow前沿技术，具备独立的问题分析和解决、系统落地能力\n5. 具有良好的技术洞察力、业务敏感度和优秀的数据分析能力，能应对复杂的业务算法需求。",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区阿里巴巴云谷园区0000",
    major: "['电子', '计算机', '数学']",
    neo4j: 10319,
    match_value: 0.3289075872331192,
  },
  {
    title: "前端开发工程师",
    salary: "25-40K",
    education: "大专",
    skill:
      "['Angular', 'Linux', 'HTTP', 'Node', 'CSS', 'Javascript', 'React', 'web', 'HTML', 'C', '小程序', 'vue']",
    info: "有无线网，带薪年假，绩效奖金，五险一金",
    kind1: "互联网",
    kind2: "前端/移动开发",
    kind3: "前端开发工程师",
    description:
      "工作职责：1、负责哈啰出行两轮团队相关业务开发，包括营销体系、用车流程相关的C端及B端系统的前端架构设计、开发与优化，覆盖Web应用、支付宝小程序、微信小程序、多端组件库等多个方向；2、参与团队前端工程化体系建设，提升研发效率、研发质量；3、与其他团队成员合作打造提升公司整体运营效率的产品；4、关注前端前沿技术发展，能够对团队输出新的技术与思想，并落地到现有项目中任职资格：1. 3年相关工作经验，有扎实的计算机基础知识；2. 深入理解Web前端开发技术，包括HTML/CSS/Javascript等；3. 至少熟悉React/Angular/Vue等其中一种主流的前端框架，并了解底层原理；4. 熟悉网站性能优化，了解浏览器实现原理；5. 了解http协议的基本原理，了解常见的web性能优化手段、常见漏洞6. 优秀的团队合作能力，沟通顺畅，追求卓越，乐于创新，敢于尝试加分项：1. 熟悉node开发，能够开发node web, node cli, node desktop等类型的应用2. 熟悉linux及操作系统概念。",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区益展商务大厦11楼",
    major: "[]",
    neo4j: 5228,
    match_value: 0.32258164561561037,
  },
  {
    title: "信息安全工程师",
    salary: "7-12K·13薪",
    education: "本科",
    skill:
      "['Linux', '信息安全', 'Java', '网络安全', 'C++', 'Python', '计算机/信息安全相关专业', '系统安全', 'C', 'Windows', 'Go']",
    info: "餐补，节日福利，团建聚餐，员工旅游，五险一金，年终奖，全勤奖，意外险，住房补贴，生日福利，定期体检",
    kind1: "互联网",
    kind2: "运维/技术支持",
    kind3: "系统安全",
    description:
      "岗位要求：\n1.计算机、信息安全、网络安全相关专业，具有全日制本科及以上学历；\n2.扎实的计算机基础知识，熟悉Windows/Linux操作系统基本原理，熟悉TCP/IP网络基础协议；\n3.对主流产品的安全功能有一定的了解，如：授权与访问控制、审计、加密等；\n4.熟悉C，C++，Java，Python，Go等至少一门语言，可达到阅读和分析代码。\n5.熟悉国内安全标准，或有安全行业认证工作优先；英语CET-6优先；有技术报告或文档写作经验优先；\n6.具备良好的沟通能力，团队合作精神；\n7.具备良好的学习能力，积极主动的学习信息安全方面知识。\n岗位职责：\n1.信息安全技术标准的研究；\n2.经过公司培训，完成产品的安全分析、测评以及技术报告的撰写；\n3.阅读和分析代码\n4.参与或负责国内外客户与测评机构的沟通协调、项目实施；\n5.参与信息安全相关的客户培训工作。\n福利待遇：\n1、入职缴纳六险一金\n2、公司提供餐补、全勤、健身房\n3、节假日发放员工福利，提供年终奖\n4、丰富的团建活动\n5、每年调薪，收入提升有保障",
    province: "浙江省",
    city: "绍兴市",
    district: "柯桥区",
    address: "绍兴柯桥区科创大厦B座1411",
    major: "['计算机', '信息安全', '网络安全']",
    neo4j: 9343,
    match_value: 0.3208962276335489,
  },
  {
    title: "C++开发-杭州",
    salary: "13-26K·14薪",
    education: "本科",
    skill:
      "['socket', 'Linux', 'tcp', '数据库', 'C++', '客户端开发', '数据结构', 'QT', 'C', 'Windows', 'ip', '服务器端开发', 'VC++', 'vs', '数据']",
    info: "定期体检，带薪年假，股票期权，员工培训，奖金，员工旅游，应届生安家补，礼金，五险一金，免费健身区，节日福利，通讯补贴，法定假日，年终奖，应届生房贴，零食下午茶",
    kind1: "互联网",
    kind2: "后端开发",
    kind3: "c/c++",
    description:
      "容灾备份岗位、\n职责描述：\n1.电子、通信、计算机、自动化等相关专业本科，3年以上软件开发经验\n2.精通C与C++编程，熟悉常用数据结构和算法设计\n3.具有Linux平台下使用C/C++开发经验\n4.深入理解面向对象编程技术，清晰、良好的面向对象的概念\n5.至少熟悉一门常见主流数据库。\n6.了解多线程、socket网络编程、TCP/IP协议\n7.了解Windows(或Linux)下GUI编程\n8.至少参与过一个较大型项目的开发设计。\n9.具有良好的技术理解、交流、沟通能力，有较强的责任心与敬业精神\n10.有数据库同步、数据库复制、数据库迁移、数据库灾备经验优先；或有数据备份、数据同步、数据灾备。\n所涉及部分产品介绍：\n英方数据库灾备管理软件 i2Active?结构化数据同步软件。在数据库高并发事务场景下，实现从生产数据库到灾备数据库的全量同步和增量同步。 帮助用户在复杂的应用环境下，完成数据库的容灾备份、数据迁移、数据分发、构建数据仓库等数据整合工作。\n共享产品岗位、\n1、5年及以上客户端开发工作经验。\n2、精通C/C++开发。\n3、精通QT开发。具备跨平台开发经验。\n4、熟练掌握VS开发工具。\n5、熟悉MingW64框架开发。\n6、大学本科及以上学历。\n7、企业网盘、文件共享经验优先。\ni2Share产品介绍：\n英方文件共享和管理软件 i2Share数据备份与分享管理软件。可集中存储与管理企业办公桌面的各类文档，支持办公电脑和移动终端间的文件同步，实现企业数据内外共享、业务化的文档管理以及移动办公和数据安全管控。",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区浙江中小企业大厦1009号",
    major: "['电子', '计算机', '自动化', '通信']",
    neo4j: 7385,
    match_value: 0.31557537624284765,
  },
  {
    title: "C＋＋",
    salary: "30-55K·13薪",
    education: "本科",
    skill: "['Java', 'C++', '分布式技术', '区块链', 'C', 'Go']",
    info: "五险一金，餐补，年终奖，定期体检，带薪年假",
    kind1: "互联网",
    kind2: "后端开发",
    kind3: "c/c++",
    description:
      "蚂蚁链招人啦，蚂蚁区块链已升级为全新品牌蚂蚁链，蚂蚁链期待重构数字经济的信用体系，解决数字时代的数据和隐私安全问题，风口已至，时不我待，蚂蚁集团区块链平台部真诚欢迎有志之士共同前行。\n岗位名称：区块链技术专家\n工作地点：杭州/北京/上海皆可\n岗位职责：负责主导和参与区块链基础设施平台的架构规划、系统设计及核心研发工作\n岗位需求：\n1、三年以上系统开发经验，对网络、存储、分布式系统、性能优化等经验者优先，对密码学算法、分布式共识算法有研究者优先；\n2、go、c/c++、java开发语言，具有区块链技术经验者优先；\n3、薪资根据面试能力，后续可单独沟通",
    province: "浙江省",
    city: "杭州市",
    district: "西湖区",
    address: "杭州西湖区黄龙时代广场B座蚂蚁金服",
    major: "[]",
    neo4j: 7479,
    match_value: 0.31210130659226376,
  },
  {
    title: "前端开发工程师",
    salary: "5-10K",
    education: "大专",
    skill:
      "['GIT', '前端', 'Webpack', 'gulp', 'CSS', 'web', 'app', 'SVN', 'HTML', 'JS', 'vue', 'H5']",
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
    major: "[]",
    neo4j: 4840,
    match_value: 0.31190960619472186,
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
  background: linear-gradient(
    to bottom,
    rgba(192, 230, 245, 0.818),
    rgba(188, 228, 244, 0.616),
    rgb(211, 238, 248),
    rgb(221, 239, 245),
    rgb(225, 238, 242),
    white
  );
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
  overflow-y: auto;
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
  position: relative; /* 使内部元素能够基于此容器进行定位 */
}

.percentage-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  font-size: 20px;
  margin-top: 0; /* 移除不必要的上外边距 */
}

.percentage-label {
  /* position: absolute;
  left: 50%;
  transform: translateX(-50%); */
  display: block;
  font-size: 12px;
  margin-top: 80px; /* 移除不必要的上外边距 */
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
  /* font-size: 1.5em; */
  /* font-size: 20px; */
  font-weight: bold;
  margin-left: 10px;
  display: block;
  width: 150px;
  overflow: hidden;
  /* 超出部分隐藏 */
  text-overflow: ellipsis;
  /* 超出部分以省略号显示 */
  white-space: nowrap;
  /* 禁止文本换行 */
}

.work_salary {
  margin-left: 15px;
  /* font-size: 1.5em; */
  /* font-size: 20px; */
  font-weight: bold;
  color: red;
  display: flex;
}
</style>
