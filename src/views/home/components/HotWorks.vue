﻿<template>
  <div class="cards-container">
    <div
      class="card"
      v-for="(job, index) in jobsData"
      :key="index"
      :class="{ 'last-in-row': (index + 1) % 3 === 0 }"
    >
      <div class="card-details">
        <div style="display: flex">
          <p class="work_name">{{ job.title }}</p>
          <p class="work_salary">{{ job.salary }}</p>
        </div>
        <div style="display: flex">
          <p
            v-for="(keyword, i) in job.skill.slice(0, 4)"
            :key="i"
            style="margin: 10px"
          >
            {{ keyword }}
          </p>
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
      <button class="card-button" @click="getMore">More info</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { getHotWorks } from "@/api/info";
import { ref, onMounted, watch } from "vue";

onMounted(() => {
  getJobs(label);
});

const { label } = defineProps(["label"]);
const router = useRouter();

const jobsData = ref([]);
const getJobs = async (label) => {
  try {
    const res = await getHotWorks(label);
    console.log("jobsData res", res);
    jobsData.value = res.data;
  } catch (error) {
    console.error("Error fetching jobs data:", error);
  }
};

// 监听 label 的变化
watch(
  () => label,
  (newLabel) => {
    console.log("newLabel", newLabel);

    getJobs(newLabel);
  }
);

const getMore = () => {
  const href = router.resolve({
    name: "WorkInfo",
    path: "/workInfo",
  });
  window.open(href.href, "_blank");
};
</script>

<style scoped lang="scss">
.cards-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}

.card {
  max-width: 400px;
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
