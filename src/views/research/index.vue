<template>
  <div class="container">
    <div class="search">
      <SearchBar :searchValue="searchValue" />
    </div>
    <div v-if="jobsData" class="center">
      <div class="left">
        <div class="card" v-for="(job, index) in currentJobs" :key="index">
          <div class="card-details">
            <div style="display: flex">
              <p class="work_name">{{ job.title }}</p>
              <p class="work_salary">{{ job.salary }}</p>
            </div>
            <div style="display: flex; font-size: 1.2em">
              <p
                v-for="(keyword, i) in job?.skill?.slice(0, 5)"
                :key="i"
                style="margin: 10px"
              >
                {{ keyword }}
              </p>
            </div>
            <div style="display: flex; align-items: center">
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
        </div>
        <div style="margin: 30px auto">
          <el-pagination
            :page-size="pageSize"
            :pager-count="7"
            layout="prev, pager, next"
            :total="total"
            @current-change="changePage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import { WorkInfo } from "@/types/work";
import { getSearchWorks } from "@/api/work";

const route = useRoute();
const currentPage = ref<number>(1); // 当前页码
const pageSize = ref<number>(10); // 每页显示的数据条数
const jobsData = ref<WorkInfo[]>(); // 存储所有职位数据
const total = ref<number>(0); // 假设总共有100条数据

const currentJobs = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return jobsData?.value?.slice(start, end);
});

const changePage = (newPage: number) => {
  currentPage.value = newPage;
};

const fetchSearchWorks = async (query: string) => {
  try {
    const res = await getSearchWorks(query);

    jobsData.value = res.data;
    total.value = res.data.length;
  } catch (e) {
    ElMessage.error("未获取到数据");
    console.log(e);
  }
};

onBeforeMount(() => {
  const query = route.params.query as string;
  if (query) {
    searchValue.value = query;
    fetchSearchWorks(query);
  }
});
const router = useRouter();

const searchValue = ref<string>();

const getMore = () => {
  const href = router.resolve({
    name: "WorkInfo",
  });
  window.open(href.href, "_blank");
};
</script>

<style scoped>
.container {
  background: linear-gradient(
    to bottom,
    rgba(192, 230, 245, 0.818) 2%,
    rgba(188, 228, 244, 0.616) 8%,
    rgb(211, 238, 248) 15%,
    rgb(221, 239, 245) 20%,
    rgb(225, 238, 242) 30%,
    white
  );
  height: 100%;
  overflow-y: auto;
  justify-content: center;
}

.search {
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  margin: 20px auto;
}

.center {
  display: flex;
}

.left {
  /* border: 2px black solid; */
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 0 auto;
  /* margin-left: 150px; */
}

.card {
  /* width: 350px; */
  /* width: 30%; */
  height: 184px;
  border-radius: 20px;
  /* background: #f5f5f5; */
  position: relative;
  padding: 1.8rem;
  border: 2px solid #c3c6ce;
  transition: 0.5s ease-out;
  overflow: visible;
  margin: 5px 10px;
}

.card-details {
  color: black;
  height: 100%;
  gap: 0.5em;
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
  padding: 0.5rem 1rem;
  position: absolute;
  left: 50%;
  bottom: 0;
  opacity: 0;
  transition: 0.3s ease-out;
}

.company_name {
  color: rgb(134, 134, 134);
  margin-left: 10px;
}

.job {
  margin-right: 10px;
}

.text-body {
  font-size: 1.3em;
  font-weight: bold;
}

/*Text*/
.work_name {
  font-size: 2em;
  font-weight: bold;
  margin-top: -10px;
  margin-left: 10px;
}

.work_salary {
  /* margin-right: 10px; */
  margin-left: auto;
  margin-top: -10px;
  font-size: 2em;
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
</style>
