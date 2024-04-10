// stores/job.js
import { defineStore } from "pinia";

export const useJobStore = defineStore("job", {
  state: () => ({
    currentJob: {
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
      address: "安徽合肥市瑶海区都市科技工业园C6栋101",
      major: ["GIT", "vue3", "Javascript", "web", "vue2", "HTML5", "vue"],
      neo4j: 8852,
      company: "统旭智慧科技",
      logo: "https://img.bosszhipin.com/beijin/upload/com/logo/20220926/7b5b554d84f9729c157fc655c4aecc0c8cf8e49fb37c6801ccd75b28d7f169b2a9c7a6bce39fbdca.png?x-oss-process=image/resize,w_100,limit_0",
    },
    currentNum: 10,
  }),
  getters: {
    // 如果当前有选中的职位，返回它，否则返回null
    getCurrentJob: (state) => state.currentJob,
    getCurrentNum: (state) => state.currentNum,
  },
  actions: {
    selectJob(job) {
      this.currentJob = job;
      console.log("this.currentJob: ", this.currentJob);
    },
    addNum() {
      this.currentNum++;
      console.log(this.currentNum);
    },
  },
});
