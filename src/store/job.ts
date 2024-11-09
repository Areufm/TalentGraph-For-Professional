import { defineStore } from "pinia";
import { store } from "@/store";
import { ref } from "vue";
import type { WorkInfo } from "@/types/work";

export const jobStore = defineStore("jobStore", () => {
  const currentJob = ref<WorkInfo>({
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
  });

  const getCurrentJob = () => {
    return currentJob;
  };

  const selectJob = (job: WorkInfo) => {
    currentJob.value = job;
  };

  return {
    currentJob,
    getCurrentJob,
    selectJob,
  };
});

export function useJobStore() {
  return jobStore(store);
}
