// stores/job.js
import { defineStore } from "pinia";

export const useJobStore = defineStore("job", {
  state: () => ({
    currentJob: null,
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
