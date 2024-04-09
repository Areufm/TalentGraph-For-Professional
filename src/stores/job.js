// stores/job.js
import { defineStore } from "pinia";

export const useJobStore = defineStore("job", {
  state: () => ({
    currentJob: null,
  }),
  getters: {
    // 如果当前有选中的职位，返回它，否则返回null
  },
  actions: {
    selectJob(job) {
      this.currentJob = job;
      console.log(this.currentJob);
    },
    getCurrentJob() {
      return this.currentJob;
    },
  },
});
