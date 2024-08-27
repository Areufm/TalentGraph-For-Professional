<!-- <template>
  
  <div style="display: flex; justify-content: space-between; margin: 0 100px">
    
    <div class="card">
      <div class="card-details">
        <div style="display: flex">
          <p class="work_name">工作名称</p>
          <p class="work_salary">薪资</p>
        </div>
        <div style="display: flex">
          <p style="margin: 10px">关键词1</p>
          <p style="margin: 10px">关键词2</p>
          <p style="margin: 10px">关键词3</p>
        </div>
        <div style="display: flex">
          <img
            src="../../../assets/xue.jpg"
            alt=""
            style="
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin-right: 10px;
            "
          />
          <p class="text-body">企业名</p>
          <p class="text-body" style="margin-left: auto">职业类型</p>
        </div>
      </div>
      <button class="card-button" @click="getMore">More info</button>
    </div>
    <div class="card">
      <div class="card-details">
        <p class="text-title">Card title</p>
        <p class="text-body">Here are the details of the card</p>
      </div>
      <button class="card-button">More info</button>
    </div>
    <div class="card">
      <div class="card-details">
        <p class="text-title">Card title</p>
        <p class="text-body">Here are the details of the card</p>
      </div>
      <button class="card-button">More info</button>
    </div>
  </div>
  <div style="display: flex; justify-content: space-between; margin: 0 100px">
    <div class="card">
      <div class="card-details">
        <div style="display: flex; top: 0">
          <p class="work_name">工作名称</p>
          <p class="work_salary">薪资</p>
        </div>
        <div style="display: flex">
          <p style="margin: 10px">关键词1</p>
          <p style="margin: 10px">关键词2</p>
          <p style="margin: 10px">关键词3</p>
        </div>
        <div style="display: flex">
          <p class="text-body">企业名</p>
          <p class="text-body" style="margin-left: auto">职业类型</p>
        </div>
      </div>
      <button class="card-button" @click="getMore">More info</button>
    </div>
    <div class="card">
      <div class="card-details">
        <p class="text-title">Card title</p>
        <p class="text-body">Here are the details of the card</p>
      </div>
      <button class="card-button">More info</button>
    </div>
    <div class="card">
      <div class="card-details">
        <p class="text-title">Card title</p>
        <p class="text-body">Here are the details of the card</p>
      </div>
      <button class="card-button">More info</button>
    </div>
  </div>
  <div style="display: flex; justify-content: space-between; margin: 0 100px">
    <div class="card">
      <div class="card-details">
        <div style="display: flex; top: 0">
          <p class="work_name">工作名称</p>
          <p class="work_salary">薪资</p>
        </div>
        <div style="display: flex">
          <p style="margin: 10px">关键词1</p>
          <p style="margin: 10px">关键词2</p>
          <p style="margin: 10px">关键词3</p>
        </div>
        <div style="display: flex">
          <p class="text-body">企业名</p>
          <p class="text-body" style="margin-left: auto">职业类型</p>
        </div>
      </div>
      <button class="card-button" @click="getMore">More info</button>
    </div>
    <div class="card">
      <div class="card-details">
        <p class="text-title">Card title</p>
        <p class="text-body">Here are the details of the card</p>
      </div>
      <button class="card-button">More info</button>
    </div>
    <div class="card">
      <div class="card-details">
        <p class="text-title">Card title</p>
        <p class="text-body">Here are the details of the card</p>
      </div>
      <button class="card-button">More info</button>
    </div>
  </div>
</template> -->

<template>
  <div class="cards-container">
    <div class="card" v-for="(job, index) in jobsData" :key="index" :class="{ 'last-in-row': (index + 1) % 3 === 0 }">
      <div class="card-details">
        <div style="display: flex">
          <p class="work_name">{{ job.title }}</p>
          <p class="work_salary">{{ job.salary }}</p>
        </div>
        <div style="display: flex">
          <p v-for="(keyword, i) in job.skill.slice(0, 4)" :key="i" style="margin: 10px">
            {{ keyword }}
          </p>
        </div>
        <div style="display: flex">
          <img :src="job.logo" alt="" style="
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin-right: 10px;
            " />
          <p class="text-body">{{ job.company }}</p>
          <p class="text-body" style="margin-left: auto">{{ job.kind2 }}</p>
        </div>
      </div>
      <button class="card-button" @click="getMore">More info</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const { jobs } = defineProps(["jobsData"]);
const router = useRouter();

const getMore = () => {
  const href = router.resolve({
    name: "WorkInfo",
    path: "/workInfo",
  });
  window.open(href.href, "_blank");
};

const jobsData = [
  {
    title: "资深Java开发工程师",
    salary: "30-60K·16薪",
    education: "大专",
    skill: [
      "MyBatis",
      "NoSQL",
      "zookeeper",
      "Java",
      "Netty",
      "MongoDB",
      "SpringBoot",
      "数据结构",
      "Redis",
      "Dubbo",
      "SQL",
      "Kafka",
      "rocketmq",
      "IO",
      "RabbitMQ",
      "springcloud",
      "网络",
      "JVM",
    ],
    info: "交通补助，年终奖，五险一金，员工旅游，零食下午茶，餐补，带薪年假，节日福利，通讯补贴",
    kind1: "互联网",
    kind2: "后端开发",
    kind3: "Java",
    description:
      "职位要求：1.专科及以上学历，计算机相关专业，3-8年工作经验；2.Java基础扎实，精通多线程、并发、集合、网络、io等基础知识，熟悉JVM；3.熟练掌握各类算法、常用数据结构、设计模式和DDD领域建模；4.精通Apache DolphinScheduler等大数据分布式调度引擎；5.深入理解SpringBoot、SpringCloud、Dubbo、Netty、MyBatis、Sentinel、Nacos、Apollo等开源框架或产品（至少满足2项）的机制与代码；6.熟悉SQL、NoSQL、缓存、消息通信、队列、异步框架等技术；7.熟悉高性能、高并发系统设计方案，如分布式缓存、消息队列等；8.对典型的分布式场景有设计经验，掌握分布式键、分布式锁、分布式事务等关键技术，并能熟练应用；9.熟悉各类中间件（至少满足2项），如ZooKeeper、Redis、InfluxDB、MongoDB、RabbitMQ、Kafka、RocketMQ等；10.思路清晰，具有优秀的分析与沟通能力，编码规范。",
    province: "上海市",
    city: "市辖区",
    district: "杨浦区",
    address: "上海杨浦区互联宝地c2",
    major: ["计算机"],
    neo4j: 626,
    company: "上海识装信息科技有限公司",
    logo: "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
  },
  {
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
      "岗位职责：\n1、 从事安卓APP移动平台客户端软件的功能设计、开发和实现；\n2、 根据产品功能模块设计，编码实现各模块功能，并确保开发质量与进度；\n3、 对于产品的BUG进行问题的修正；\n4、 对移动端应用做出系统优化和数据优化；\n5、 产品的迭代和维护；\n岗位要求：\n1、熟练掌握Java, 熟悉面向对象思想，熟悉常用设计模式，编程习惯良好；\n2、熟练掌握安卓应用开发技术（包括UI、网络、存储、多线程等方面）、开发工具和测试工具；\n3、熟练掌握Android开发平台及框架原理，精通系统组件的使用，能进行自定义控件的封装；\n4、熟悉android屏幕适配，有APP性能优化的经验；\n5、有独立完整开发 App 经验优先，有个人上架 App 优先；\n6、良好的沟通及人际技巧，与团队成员高效协作；\n7.熟悉安卓各大市场APP上线流程",
    province: "安徽省",
    city: "合肥市",
    district: "瑶海区",
    address: "合肥合肥市瑶海区都市科技工业园C6栋101",
    major: [],
    neo4j: 8852,
    company: "统旭智慧科技",
    logo: "https://img.bosszhipin.com/beijin/upload/com/logo/20220926/7b5b554d84f9729c157fc655c4aecc0c8cf8e49fb37c6801ccd75b28d7f169b2a9c7a6bce39fbdca.png?x-oss-process=image/resize,w_100,limit_0",
  },
  {
    title: "小程序开发工程师",
    salary: "2-3K",
    education: "大专",
    skill: ["CSS", "Javascript", "HTML", "web", "小程序", "vuejs", "uni-app"],
    info: "全勤奖，五险一金，通讯补贴，带薪年假，生日福利，加班补助，年终奖，节日福利",
    kind1: "互联网",
    kind2: "前端/移动开发",
    kind3: "移动开发",
    description:
      "只要实习生，只要实习生，只要实习生！1、与后台工程师、设计师密切合作，参与前端产品的方案设计;2、参与公司项目设计、项目测试以及后期迭代的整个周期当中。任职要求:1、熟练掌握HTML、css、JavaScript;1到3年左右前端工作经验;2、熟悉Bootstr、Vuejs框架、uni-app前端应用框架;3、至少参与过一个完整Web项目开发。加分条件:1.熟悉uni-app框架;2.参与开发过微信小程序或者微信公众号的开发:3.有自己的作品展示。",
    province: "云南省",
    city: "曲靖市",
    district: "麒麟区",
    address: "曲靖麒麟区闽南建材城3区466号",
    major: [],
    neo4j: 6749,
    company: "上海酷柒网络技术有限公司",
    logo: "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
  },
  {
    title: "软件实施工程师",
    salary: "4-6K",
    education: "大专",
    skill: ["SaaS"],
    info: null,
    kind1: "互联网",
    kind2: "后端开发",
    kind3: "后端其他开发",
    description:
      "公司招聘：1、人事行政专员1名                    2、售后人员1名                    3、软件实施工程师2名薪资均4—6k，具体可以面谈需要相关工作经验至少半年企业介绍：四川仲医达医疗科技有限公司成立于2022年1月，是一家专业的SAAS服务供应商，股东背景为上市企业四川合纵药易购，公司强有力的上游供应链资源和阿里AI智能明星团队，将把基层医疗机构搭建为生态大平台。想要加入我们的小伙伴，快快联系吧。公司法定假日+五险一金+周末双休加分项有以下行业经验：医疗健康·计算机软件·计算机服务",
    province: "四川省",
    city: "成都市",
    district: "金牛区",
    address: "成都金牛区成都健康智谷7号楼15楼",
    major: ["计算机"],
    neo4j: 1045,
    company: "四川仲医达医疗科技有限公司",
    logo: "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
  },
  {
    title: "初级前端",
    salary: "2-3K",
    education: "大专",
    skill: ["GIT", "vue3", "Javascript", "web", "vue2", "HTML5", "vue"],
    info: "定期体检，通讯补贴，员工旅游，年假递增，餐补，补充医疗保险，节日福利，带薪年假，五险一金，加班补助，年终奖，股票期权",
    kind1: "互联网",
    kind2: "前端/移动开发",
    kind3: "前端开发工程师",
    description:
      "工作职责：1.根据项目要求，原型设计要求，完成系统前端开发工作；2.负责Web平台的前端技术框架研究和开发3.按照公司规范开发，保证交付代码质量，持续改进重构；4.配合产品、完成项目迭代，不断优化和提升用户体验5.深入分析和解决前端遇到的各种技术、性能、跨终端兼容问题6. 负责实现产品前端页面设计、开发，并整合前端与服务端代码任职要求：1.专科以上学历，只收24届应届生。最少时间 一年，固定1周至少5天可上岗，有项目经验请提供项目2.熟悉使用Javascript、Html5、CSS3、vue等前端开发技术栈。会Vue2/Vue3 ，熟悉git 的应届生优先考虑3.拥有良好的代码习惯，要求结构清晰，命名规范，逻辑性强，代码冗余率低4.具有快速学习和解决问题的能力。                                                            5.上班时间 朝九晚六，等福利，地铁口附近6.具备今日事今日毕的良好习惯",
    province: "福建省",
    city: "厦门市",
    district: "思明区",
    address: "厦门思明区观音山国际商务营运中心6号楼1",
    major: [],
    neo4j: 4244,
    company: "易视线（厦门）科技有限公司",
    logo: "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
  },
  {
    title: "网络安全工程师",
    salary: "8-12K·16薪",
    education: "大专",
    skill: ["华为", "ITIL"],
    info: "带薪年假，五险",
    kind1: "互联网",
    kind2: "运维/技术支持",
    kind3: "网络安全",
    description:
      "工作职责：1.完成客户网站、业务系统的等保安全评估工作；2.对客户各类信息化系统进行安全加固；3.对客户安全事件及时响应，清理后门，根据日志分析攻击途径；4.跟踪最近安全漏洞信息，进行安全技术研究，包括安全防范技术，黑客技术等；5.定期为客户交付安全类评估与漏扫报告；6.负责为客户及团队开展信息安全技术与管理领域相关培训；任职要求：1.计算机、网络空间安全或相关专业专科及以上学历；2.具有1年以上相关工作经历；3. 熟悉华为网络设备技术；4. 熟悉客户网络系统与防火墙、具备故障分析诊断、系统应急处理、网络优化及建议等二线技术支持能力。5.具有CISP-PTE/红帽/ITIL/思科/华为/等中高级认证者优先；6. 具有良好的沟通能力和问题处理经验。",
    province: "山东省",
    city: "淄博市",
    district: "张店区",
    address: "淄博张店区齐赛大厦(齐赛三期)A座6",
    major: ["计算机", "网络空间安全"],
    neo4j: 5679,
    company: "维安（山东）数字技术有限公司",
    logo: "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
  },
  {
    title: "数据库工程师",
    salary: "15-30K",
    education: "大专",
    skill: [
      "PostgreSQL",
      "MongoDB",
      "Linux",
      "数据库",
      "flash",
      "Redis",
      "SSD",
      "Oracle",
      "MySQL",
      "OceanBase",
      "DM",
      "Unix",
      "DBA工作经验",
      "OCP",
      "OCM",
    ],
    info: "双休，定期体检，节假日加班费，法定节假日三薪，节日福利，餐补，晋升机制，学习分享，年终奖，意外险，股票期权，五险一金，员工旅游，团建聚餐，带薪年假",
    kind1: "互联网",
    kind2: "运维/技术支持",
    kind3: "DBA",
    description:
      "岗位职责：\n1、负责公司数据库服务项目及数据库产品(QFusion私有云平台、QData高性能数据库一体机、QBackup备份一体机等)项目的整体规划、技术方案制定、项目工作计划安排；\n2、协调项目干系人召开项目启动会，梳理项目背景、客户需求、项目目标、项目规划；\n3、协调公司资源，完成项目测试、实施、培训等各阶段工作，实现项目目标，为项目结果负责；\n4、项目信息记录，完善项目资料及公司产品后续故障bug跟踪反馈。\n5、客户售后数据库技术支持。\n6、公司产品数据库原型技术支持。\n7、数据库多元化技术预研。（Oracle/MySQL/PostgreSQL/Redis/MongoDB/MSSQL/DM/OceanBase/GaussDB等）\n任职资格：\n1、1-3年以上数据库从业经验；\n2、深入理解Oracle、MySQL、PostgreSQL、GaussDB、OceanBase等一种以上数据库体系架构，对构设计有较深入的研究和实践经验；\n3、精通Oracle、MySQL、PostgreSQL、GaussDB、OceanBase等一种以上数据库高可用技术，对其备份恢复、数据迁移、扩缩容等机制有实践经验；\n4、熟悉Oracle、MySQL、PostgreSQL、GaussDB、OceanBase等一种以上数据库优化方法论，对性能指标有深入研究，可独立对其进行优化工作；\n5、熟悉Oracle、MySQL、PostgreSQL、GaussDB、OceanBase等一种以上数据库故障诊断方法论，对其日志体系及错误信息有深入研究；\n6、了解主流Flash/SSD硬件技术，熟悉Linux/UNIX的日常操作；\n7、具备良好的沟通协作能力，有开拓进取的创新精神，能够承受较大的工作压力；\n8、同时具备多种数据库技能者优先；\n9、有乙方经验者优先。\n我们是一个数据库多元化的团队，团队中的每位同学均身兼多种数据库技能，如果你想挑战更多的数据库技能，欢迎你的加入！",
    province: "浙江省",
    city: "杭州市",
    district: "滨江区",
    address: "杭州滨江区智汇中心A座1103室",
    major: [],
    neo4j: 9621,
    company: "沃趣科技",
    logo: "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
  },
  {
    title: "前端实习生",
    salary: "50-100元/天",
    education: "硕士",
    skill: ["英文", "英语", "GIS", "vue", "vue.js"],
    info: "五险一金，带薪年假，餐补",
    kind1: "互联网",
    kind2: "运维/技术支持",
    kind3: "技术文档工程师",
    description:
      "职责描述:\n1、负责项目前端代码编写、研发等，进行前端代码的架构设计及优化工作;\n2、配合系统后端人员进行后台应用与前端页面的集成;\n3、负责撰写相关技术文档。\n任职要求:\n1、计算机、GIS等相关专业硕士学历；\n2、有vue.js项目开发经验，文档撰写能力佳着优先；\n3、有良好的中英文读写能力、英语口语流利者优先。",
    province: "重庆市",
    city: "市辖区",
    district: "沙坪坝区",
    address: "重庆沙坪坝区西永微电园沙坪坝区学城大道62-1研发楼一期B1栋902",
    major: ["计算机"],
    neo4j: 9070,
    company: "翌智航",
    logo: "https://img.bosszhipin.com/beijin/mcs/chatphoto/20200601/a7aaf773547b4b34ac4012225707f0e54d4dbf9cfb6155012d947907f184d504_s.jpg?x-oss-process=image/resize,w_100,limit_0",
  },
  {
    title: "软件工程师",
    salary: "14-18K·16薪",
    education: "大专",
    skill: ["ERP", "MES"],
    info: "定期体检，节日福利，全勤奖，五险一金",
    kind1: "互联网",
    kind2: "后端开发",
    kind3: "后端其他开发",
    description:
      "岗位职责：1：负责公司MES系统的管理与维护，与ERP接口的管理与维护2：配合MES系统供应商，进行系统二次开发3：监督MES系统操作，协调处理问题4：负责系统技术资料及各项资料的维护工作5：对公司软件的安装，维护，升级等进行管控6：领导交代的其他事项任职资格：1：大专及以上学历，计算机相关专业2：精通MES系统，金蝶K3云星空和ERP系统3：有制造业MES系统管理和金蝶K3云星空，ERP管理工作经验优先4：具有企业管理软件后台开发能力的优先5：爱岗敬业，态度认真，吃苦耐劳",
    province: "江苏省",
    city: "苏州市",
    district: "虎丘区",
    address: "苏州虎丘区江苏纳通能源技术有限公司C14",
    major: ["计算机"],
    neo4j: 1173,
    company: "江苏纳通能源技术有限公司",
    logo: "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0",
  },
];
</script>

<style scoped lang="scss">
.cards-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}

.card {
  width: 80%;
  height: 154px;
  border-radius: 20px;
  position: relative;
  padding: 1.8rem;
  border: 1px solid #c3c6ce;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.5);
  transition: 0.5s ease-out;
  overflow: visible;
  margin: 10px;

  .card-details {
    color: black;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  .card-button {
    width: 100%;
    border-radius: 1rem;
    border: none;
    background-color: #008bf8;
    color: #fff;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    margin-top: auto;
    opacity: 0;
    transition: 0.3s ease-out;
  }

  .text-body {
    color: rgb(134, 134, 134);
  }

  .text-title {
    font-size: 1.5em;
    font-weight: bold;
  }

  /*Text*/
  .work_name {
    font-size: 1.5em;
    font-weight: bold;
  }

  .work_salary {
    margin-left: auto;
    font-size: 1.5em;
    font-weight: bold;
    color: red;
  }

  /*Hover*/
  &:hover {
    border-color: #008bf8;
    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);

    .card-button {
      transform: translate(0%, -10%);
      opacity: 1;
    }
  }
}
</style>

<!-- <style scoped>
.card {
  /* width: 350px; */
  width: 30%;
  height: 154px;
  border-radius: 20px;
  /* background: #f5f5f5; */
  position: relative;
  padding: 1.8rem;
  /* padding: 1.8rem; */
  border: 2px solid #c3c6ce;
  transition: 0.5s ease-out;
  overflow: visible;
  margin: 10px;
}

.card-details {
  color: black;
  height: 100%;
  gap: 0.5em;
  display: grid;
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
  padding: 0.5rem 1rem;
  position: absolute;
  left: 50%;
  bottom: 0;
  opacity: 0;
  transition: 0.3s ease-out;
}

.text-body {
  color: rgb(134, 134, 134);
}

.text-title {
  font-size: 1.5em;
  font-weight: bold;
}

/*Text*/
.work_name {
  font-size: 1.5em;
  font-weight: bold;
}

.work_salary {
  margin-left: auto;
  font-size: 1.5em;
  font-weight: bold;
  color: red;
}

/*Hover*/
.card:hover {
  border-color: #008bf8;
  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
}

.card:hover .card-button {
  transform: translate(-50%, 50%);
  opacity: 1;
}
</style> -->
