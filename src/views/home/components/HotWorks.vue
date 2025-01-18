<template>
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
        <div style="display: flex; gap: 10px; max-width: 320px; overflow: auto">
          <el-tag
            type="primary"
            v-for="(keyword, i) in job?.skill?.slice(0, 4)"
            :key="i"
          >
            {{ keyword }}
          </el-tag>
        </div>
        <div style="display: flex; align-items: center">
          <img
            v-lazy="job?.logo || undefined"
            alt=""
            style="
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin-right: 10px;
            "
          />
          <p class="text-body">
            {{ job.company }}
          </p>
          <p class="text-body" style="margin-left: auto">
            {{ job.kind2 }}
          </p>
        </div>
      </div>
      <button class="card-button" @click="getMore(job.neo4j)">More info</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { getHotWorks } from "@/api/work";
import { ref, onMounted, watch } from "vue";
import { WorkInfo } from "@/types/work";

const props = defineProps<{
  label: string;
}>();

const router = useRouter();

const jobsData = ref<WorkInfo[]>([]);

const getJobs = async (label: string) => {
  try {
    const res = await getHotWorks({ label });
    console.log("jobsData res--->", res);
    jobsData.value = res.data;
  } catch (error) {
    console.error("Error fetching jobs data:", error);
  }
};

onMounted(() => {
  getJobs(props.label);
});
// 监听 label 的变化
watch(
  () => props.label,
  (newLabel) => {
    console.log("newLabel", newLabel);

    getJobs(newLabel);
  }
);

const getMore = (neo4j: number) => {
  const href = router.resolve({
    name: "WorkInfo",
    params: { neo4j },
  });
  window.open(href.href, "_blank");
};
</script>

<style scoped lang="scss">
.cards-container {
  margin: 0 80px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(390px, 1fr));
  grid-gap: 20px;
  justify-items: center;
}

.card {
  width: 360px;
  height: 180px;
  border-radius: 20px;
  position: relative;
  padding: 20px;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.5);
  transition: 0.5s ease-out;
  overflow: visible;

  .card-details {
    color: black;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 5px;
  }

  .card-button {
    position: absolute;
    bottom: 0;
    left: 110px;
    width: 140px;
    border-radius: 50px;
    border: none;
    background-color: #008df89c;
    color: #fff;
    font-size: 14px;
    padding: 0.5rem 1rem;
    margin-top: auto;
    opacity: 0;
    transition: 0.3s ease-out;
  }

  .text-body {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 16px;
    color: rgb(134, 134, 134);
  }

  .work_name {
    font-size: 20px;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .work_salary {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-left: auto;
    font-size: 20px;
    font-weight: bold;
    color: red;
  }

  /*Hover*/
  &:hover {
    border-color: #008df8a5;
    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);

    .card-button {
      transform: translate(0%, -10%);
      opacity: 1;
    }
  }
}
</style>
