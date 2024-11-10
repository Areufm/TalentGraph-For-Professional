<template>
  <div v-if="currentJob" class="container">
    <div class="job-header">
      <div>
        <h1 class="job-title">{{ currentJob.title }}</h1>
        <h2 style="color: red">薪资范围： {{ currentJob.salary }}</h2>
      </div>
      <div class="job-details">
        <div style="display: flex; align-items: center">
          <img
            :src="currentJob?.logo || undefined"
            alt=""
            style="
              border-radius: 50%;
              width: 40px;
              height: 40px;
              margin-right: 15px;
            "
          />
          <p class="company-name">{{ currentJob.company }}</p>
        </div>
        <p>
          工作地点： {{ currentJob.province }} - {{ currentJob.city }} -
          {{ currentJob.district }} -
          {{ currentJob.address }}
        </p>

        <p>公司福利： {{ currentJob.info }}</p>
        <p style="display: flex; align-items: center">
          推荐评价：
          <el-rate
            v-model="rateValue"
            :texts="['不满意', '一般', '还行', '很棒', '非常满意']"
            show-text
          />
        </p>
        <button class="send-button">
          <div class="svg-wrapper-1">
            <div class="svg-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                ></path>
              </svg>
            </div>
          </div>
          <span>投递简历</span>
        </button>
      </div>
    </div>

    <div class="job-card">
      <div class="job-info">
        <h2 v-if="currentJob.major && currentJob?.major?.length > 0">
          专业方向
        </h2>
        <ul v-for="(majorInfo, i) in currentJob?.major?.slice(0, 5)" :key="i">
          <li>{{ majorInfo }}</li>
        </ul>
        <h2>要求和技能</h2>

        <div class="flex">
          <p
            class="job-description-card"
            v-for="(keyword, i) in currentJob?.skill?.slice(0, 5)"
            :key="i"
          >
            {{ keyword }}
          </p>
        </div>
        <h2>职位描述</h2>
        <p style="white-space: pre-wrap">{{ currentJob.description }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { getWorkInfo } from "@/api/work";
import { WorkInfo } from "@/types/work";

const rateValue = ref(); // 评分
const route = useRoute();
const currentJob = ref<WorkInfo>();

// 获取工作详细信息
const fetchWorkInfo = async (neo4j: number) => {
  try {
    const res = await getWorkInfo(neo4j);
    console.log("fetchData res--->", res);
    currentJob.value = res.data;
    if (currentJob.value && currentJob.value.title) {
      document.title = currentJob.value.title + "工作详情-职业猫";
    }
  } catch (error) {
    console.error("请求失败：", error);
  }
};

onBeforeMount(() => {
  const neo4j: number = Number(route.params.neo4j);
  if (neo4j) {
    fetchWorkInfo(neo4j);
  }
});
</script>

<style scoped lang="scss">
.container {
  padding: 50px;
  background: linear-gradient(
    to bottom,
    rgba(192, 230, 245, 0.818) 2%,
    rgba(188, 228, 244, 0.616) 8%,
    rgb(211, 238, 248) 15%,
    rgb(221, 239, 245) 20%,
    rgb(225, 238, 242) 40%,
    white
  );
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 100%;
}

.job-header {
  flex: 1;
  height: 80%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;

  p {
    margin: 0;
    margin-bottom: 10px;
    font-size: medium;
  }
}

.job-card {
  align-items: center;
  justify-content: center;
  width: 700px;
  height: 550px;
}

.job-info {
  border-radius: 30px;
  box-shadow: 5px 10px 20px rgba(0, 0, 0, 0.5);
  padding: 40px 50px;
  height: 100%;
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

  &:nth-child(1) {
    margin-left: 0;
  }
}

.send-button {
  width: 115px;
  font-family: inherit;
  font-size: 15px;
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

  span {
    display: block;
    margin-left: 0.3em;
    transition: all 0.3s ease-in-out;
  }

  svg {
    display: block;
    transform-origin: center center;
    transition: transform 0.3s ease-in-out;
  }

  &:hover {
    .svg-wrapper {
      animation: fly-1 0.6s ease-in-out infinite alternate;
    }

    svg {
      transform: translateX(1.2em) rotate(45deg) scale(1.1);
    }

    span {
      transform: translateX(5em);
    }
  }

  &:active {
    transform: scale(0.95);
  }
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
