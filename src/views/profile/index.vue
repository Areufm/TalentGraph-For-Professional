<template>
  <HeaderBar />
  <el-form class="container" :model="formData" :rules="formRules" ref="formRef">
    <div class="left">
      <div class="item-card">
        <div class="top">
          <!-- <img src="../../assets/xue.jpg" alt="Profile Picture" /> -->
          <!-- <PersonCard /> -->
          <div class="profile-card">
            <div class="profile-top">
              <img :src="xue" alt="Profile Picture" />

              <div class="profile-name">
                <h3>{{ formData.name }}</h3>
                <p>我的简历完成度: <span>77%</span></p>
              </div>
            </div>
          </div>
          <div class="profile-name-right">
            <div style="display: flex; margin: 10px">
              <el-form-item label="姓名:" prop="name">
                <el-input v-model="formData.name" style="margin: 0 10px" />
              </el-form-item>
              <el-form-item label="年龄:" prop="age">
                <el-input
                  v-model="formData.age"
                  type="number"
                  style="margin: 0 10px"
                />
              </el-form-item>
            </div>
            <div style="display: flex; margin: 10px">
              <el-form-item label="电话:" prop="phone">
                <el-input
                  v-model="formData.phone"
                  type="tel"
                  style="margin: 0 10px"
                />
              </el-form-item>
              <el-form-item label="邮箱:" prop="email">
                <el-input v-model="formData.email" style="margin: 0 10px" />
              </el-form-item>
            </div>
            <div style="display: flex; margin: 10px">
              <el-form-item label="求职地区">
                <SelectArea />
              </el-form-item>
            </div>
            <div style="display: flex; margin: 10px">
              <el-form-item label="求职岗位">
                <!-- <SelectWork style="width: auto;" /> -->
                <el-cascader
                  style="width: auto"
                  v-model="jobSearch"
                  :options="jobSearchOptions"
                  :props="props1"
                  :show-all-levels="false"
                  @change="handleChange"
                  placeholder="请选择你的求职岗位"
                />
              </el-form-item>
              <el-button type="danger" style="margin-left: auto"
                >取消</el-button
              >
              <el-button type="primary" @click="submitForm">保存</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="item-card">
        <h3>教育经历</h3>
        <div
          v-for="(item, index) in formData.education"
          :key="index"
          class="list-form"
        >
          <div style="display: flex">
            <el-form-item
              class="form-style"
              label="学校名称"
              :rules="[
                {
                  required: true,
                  message: '学校名称不能为空',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                v-model="formData.education[index].school_name"
                placeholder="请填写学校名称"
                style="width: 130px"
              />
            </el-form-item>
            <el-form-item
              class="form-style"
              label="时间"
              style="width: 250px"
              :rules="[
                {
                  required: true,
                  message: '就读日期不能为空',
                  trigger: 'blur',
                },
              ]"
            >
              <el-date-picker
                v-model="formData.education[index].school_time"
                style="margin-left: auto"
                type="monthrange"
                range-separator="To"
                start-placeholder="Start"
                end-placeholder="End"
              />
            </el-form-item>
            <el-form-item
              style="width: 150px"
              label="学历"
              :rules="[
                { required: true, message: '学历不能为空', trigger: 'blur' },
              ]"
            >
              <el-select
                v-model="formData.education[index].school_degree"
                placeholder="请选择你的学历"
              >
                <el-option label="专科" value="专科" />
                <el-option label="本科" value="本科" />
                <el-option label="硕士" value="硕士" />
                <el-option label="博士" value="博士" />
              </el-select>
            </el-form-item>
          </div>

          <el-form-item label-width="0" class="form-button">
            <el-button
              v-if="index + 1 == formData.education.length"
              type="primary"
              @click="addItem()"
            >
              +
            </el-button>
            <el-button
              v-if="index !== 0"
              type="danger"
              @click="deleteItem(item, index)"
            >
              -
            </el-button>
          </el-form-item>
        </div>
      </div>
      <div class="item-card">
        <h3>个人介绍</h3>
        <p style="text-indent: 32px">{{ formData.info }}</p>
      </div>
      <div class="item-card">
        <h3>技能点</h3>
        <!-- 如果没有技能点，显示一个添加按钮 -->
        <div v-if="!formData.skill?.length" class="list-form">
          <el-button type="primary" @click="formData.skill.push('')">
            添加技能点
          </el-button>
        </div>
        <!-- 有技能点时的列表渲染 -->
        <div
          v-for="(item, index) in formData.skill"
          :key="index"
          class="list-form"
        >
          <div style="display: flex">
            <el-form-item
              class="form-style"
              label="技能点"
              :rules="[
                { required: true, message: '技能点不能为空', trigger: 'blur' },
              ]"
            >
              <el-input
                v-model="formData.skill[index]"
                placeholder="请填写技能点"
                style="width: 130px"
              />
            </el-form-item>
          </div>

          <el-form-item label-width="0" class="form-button">
            <!-- 添加新技能点 -->
            <el-button
              v-if="index + 1 == formData.skill.length"
              type="primary"
              @click="formData.skill.push('')"
            >
              +
            </el-button>
            <!-- 删除技能点 -->
            <el-button
              v-if="formData.skill.length >= 1"
              type="danger"
              @click="formData.skill.splice(index, 1)"
            >
              -
            </el-button>
          </el-form-item>
        </div>
      </div>
      <div class="item-card graph" style="height: 500px">
        <h3>个人图谱</h3>
        <Relationship />
      </div>
    </div>
    <div class="right">
      <div>
        <Text />
      </div>
      <div class="item-card">
        <div style="display: flex; justify-content: space-between">
          <h4>上传简历附件</h4>
          <div class="input-div">
            <input class="input" name="file" type="file" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              stroke-linejoin="round"
              stroke-linecap="round"
              viewBox="0 0 24 24"
              stroke-width="2"
              fill="none"
              stroke="currentColor"
              class="icon"
            >
              <polyline points="16 16 12 12 8 16"></polyline>
              <line y2="21" x2="12" y1="12" x1="12"></line>
              <path
                d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"
              ></path>
              <polyline points="16 16 12 12 8 16"></polyline>
            </svg>
          </div>
        </div>
        <p>在简历中显示更多优势与特长</p>
      </div>

      <div class="item-card">
        <h4>个人隐私项</h4>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <p>姓名</p>
          <el-switch
            v-model="hideValue1"
            class="mt-2"
            style="margin-left: 24px"
            inline-prompt
            :active-icon="Check"
            :inactive-icon="Close"
          />
        </div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <p>年龄</p>
          <el-switch
            v-model="hideValue2"
            class="mt-2"
            style="margin-left: 24px"
            inline-prompt
            :active-icon="Check"
            :inactive-icon="Close"
          />
        </div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <p>电话号码</p>
          <el-switch
            v-model="hideValue3"
            class="mt-2"
            style="margin-left: 24px"
            inline-prompt
            :active-icon="Check"
            :inactive-icon="Close"
          />
        </div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <p>详细地址</p>
          <el-switch
            v-model="hideValue4"
            class="mt-2"
            style="margin-left: 24px"
            inline-prompt
            :active-icon="Check"
            :inactive-icon="Close"
          />
        </div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <p>邮箱</p>
          <el-switch
            v-model="hideValue5"
            class="mt-2"
            style="margin-left: 24px"
            inline-prompt
            :active-icon="Check"
            :inactive-icon="Close"
          />
        </div>
      </div>
      <div class="item-card">
        <!-- <h4>能力数据图</h4> -->
        <div style="height: 400px; padding: 5px 0">
          <Radar />
        </div>
        <!-- <China /> -->
      </div>
      <div class="item-card">
        <!-- <Radar /> -->
        <div style="height: 400px; padding: 0 0 20px 0">
          <China />
        </div>
      </div>
      <div class="item-card">
        <h4>评价推荐结果</h4>
        <el-rate
          v-model="star"
          :texts="['不满意', '一般', '还行', '很棒', '非常满意']"
          show-text
          size="large"
        />
      </div>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
const jobSearch = ref([
  "Internet",
  "Front-end & Mobile development",
  "Front-end dev",
]);

import type { CascaderValue } from "element-plus";

const handleChange = (value: CascaderValue) => {
  console.log(value);
};

// 求职岗位选项数据
const jobSearchOptions = [
  {
    value: "Internet",
    label: "互联网",
    children: [
      {
        value: "Back-end development",
        label: "后端开发",
        children: [
          { value: "Java", label: "Java 开发工程师" },
          { value: "C/C++", label: "C/C++ 开发工程师" },
          { value: "PHP", label: "PHP 开发工程师" },
          { value: "Python", label: "Python 开发工程师" },
          { value: "C#", label: "C# 开发工程师" },
          { value: "Golang", label: "Golang 开发工程师" },
          { value: "Node.js", label: "Node.js 开发工程师" },
          { value: "Hadoop", label: "Hadoop 工程师" },
          { value: "Blockchain engineer", label: "区块链工程师" },
          { value: "Full-stack engineer", label: "全栈工程师" },
          { value: "Other", label: "其他" },
        ],
      },
      {
        value: "Front-end & Mobile development",
        label: "前端/移动开发",
        children: [
          { value: "Front-end dev", label: "前端开发工程师" },
          { value: "Android", label: "Android 开发工程师" },
          { value: "iOS", label: "iOS 开发工程师" },
          { value: "U3D", label: "Unity 3D 开发工程师" },
          { value: "UE4", label: "Unreal Engine 4 开发工程师" },
          { value: "JavaScript", label: "JavaScript 开发工程师" },
          { value: "Other", label: "其他" },
        ],
      },
      {
        value: "Testing",
        label: "测试",
        children: [
          { value: "Test engineer", label: "测试工程师" },
          { value: "Software testing", label: "软件测试工程师" },
          { value: "Automation testing", label: "自动化测试工程师" },
          { value: "Functional testing", label: "功能测试工程师" },
          { value: "Test development", label: "测试开发工程师" },
          { value: "Hardware testing", label: "硬件测试工程师" },
          { value: "Game testing", label: "游戏测试工程师" },
          { value: "Performance testing", label: "性能测试工程师" },
          { value: "Penetration testing", label: "渗透测试工程师" },
          { value: "Other", label: "其他" },
        ],
      },
      {
        value: "Operations & Technical Support",
        label: "运维/技术支持",
        children: [
          { value: "Ops engineer", label: "运维工程师" },
          { value: "Network engineer", label: "网络工程师" },
          { value: "Cybersecurity", label: "网络安全工程师" },
          { value: "System engineer", label: "系统工程师" },
          { value: "DevOps engineer", label: "运维开发工程师" },
          { value: "System administrator", label: "系统管理员" },
          { value: "DBA", label: "数据库管理员(DBA)" },
          { value: "System security", label: "系统安全工程师" },
          { value: "Technical documentation", label: "技术文档工程师" },
          { value: "Other", label: "其他" },
        ],
      },
      {
        value: "Sales Technical Support",
        label: "销售技术支持",
        children: [
          { value: "Pre-sales support", label: "售前技术支持" },
          { value: "Post-sales support", label: "售后技术支持" },
          { value: "Sales technical support", label: "销售技术支持工程师" },
          { value: "Other", label: "其他" },
        ],
      },
    ],
  },
  {
    value: "AI/Data",
    label: "AI/数据",
    children: [
      {
        value: "Artificial Intelligence",
        label: "人工智能",
        children: [
          { value: "Image Algorithm", label: "图像算法" },
          { value: "Natural Language Processing", label: "自然语言处理算法" },
          { value: "Big Model Algorithm", label: "大模型算法" },
          { value: "Data Mining", label: "数据挖掘" },
          { value: "SLAM Algorithm", label: "SLAM算法" },
          { value: "Recommendation Algorithm", label: "推荐算法" },
          { value: "Search Algorithm", label: "搜索算法" },
          { value: "Voice Algorithm", label: "语音算法" },
          {
            value: "Autonomous Driving System Engineer",
            label: "自动驾驶系统工程师",
          },
          { value: "Other", label: "其他" },
        ],
      },
      {
        value: "Data",
        label: "数据",
        children: [
          { value: "Data Analyst", label: "数据分析师" },
          { value: "Data Development", label: "数据开发" },
          { value: "Data Warehouse", label: "数据仓库" },
          { value: "Data Mining", label: "数据挖掘" },
          { value: "Data Architect", label: "数据架构师" },
          { value: "Other", label: "其他" },
        ],
      },
    ],
  },
  {
    value: "Electronics",
    label: "电子",
    children: [
      {
        value: "Electronics/Hardware Development",
        label: "电子/硬件开发",
        children: [
          { value: "Electronics Engineer", label: "电子工程师" },
          { value: "Hardware Engineer", label: "硬件工程师" },
          { value: "Embedded Software Engineer", label: "嵌入式软件工程师" },
          { value: "FPGA Development", label: "FPGA开发" },
          { value: "MCU", label: "单片机" },
          { value: "Driver Development Engineer", label: "驱动开发工程师" },
          { value: "PCB Engineer", label: "PCB工程师" },
          {
            value: "Electronic Maintenance Technician",
            label: "电子维修技术员",
          },
          { value: "RF Engineer", label: "射频工程师" },
          { value: "Circuit Design", label: "电路设计" },
          { value: "System Integration", label: "系统集成" },
          { value: "Optical Engineer", label: "光学工程师" },
          { value: "DSP Development", label: "DSP开发" },
          { value: "ARM Development", label: "ARM开发" },
          { value: "Other", label: "其他" },
        ],
      },
      {
        value: "Semiconductor/Chip",
        label: "半导体/芯片",
        children: [
          { value: "Integrated Circuit IC Design", label: "集成电路IC设计" },
          {
            value: "Digital IC Verification Engineer",
            label: "数字IC验证工程师",
          },
          {
            value: "Analog Layout Design Engineer",
            label: "模拟版图设计工程师",
          },
          { value: "Chip Test Engineer", label: "芯片测试工程师" },
          { value: "DFT Engineer", label: "DFT工程师" },
          { value: "FAE", label: "FAE" },
          { value: "Digital Frontend Designer", label: "数字前端设计师" },
          { value: "Digital Backend Engineer", label: "数字后端工程师" },
          { value: "Analog IC Design Engineer", label: "模拟IC设计工程师" },
          { value: "Other", label: "其他" },
        ],
      },
    ],
  },
  {
    value: "Electrical",
    label: "电气",
    children: [
      {
        value: "Electrical/Automation",
        label: "电气/自动化",
        children: [
          { value: "Electrical Engineer", label: "电气工程师" },
          { value: "Electrical Design Engineer", label: "电气设计工程师" },
          { value: "Automation", label: "自动化" },
          { value: "Mechatronics Engineer", label: "机电工程师" },
          {
            value: "Building Electromechanical Engineer",
            label: "建筑机电工程师",
          },
          { value: "Other", label: "其他" },
        ],
      },
    ],
    // children: [
    //   { value: "Electrical Engineer", label: "电气工程师" },
    //   { value: "Electrical Design Engineer", label: "电气设计工程师" },
    //   { value: "Automation", label: "自动化" },
    //   { value: "Mechatronics Engineer", label: "机电工程师" },
    //   { value: "Building Electromechanical Engineer", label: "建筑机电工程师" },
    //   { value: "Other", label: "其他" },
    // ],
  },
  {
    value: "Telecommunications",
    label: "通信",
    children: [
      {
        value: "Electrical/Automation",
        label: "通信",
        children: [
          { value: "Telecom Specialist", label: "通信项目专员" },
          { value: "Telecom Project Manager", label: "通信项目经理" },
          { value: "Telecom Technology Engineer", label: "通信技术工程师" },
          { value: "Telecom R&D Engineer", label: "通信研发工程师" },
          {
            value: "Wireless/Radio Frequency Engineer",
            label: "无线/射频通信工程师",
          },
          { value: "Mobile Communication Engineer", label: "移动通信工程师" },
          { value: "Telecom Network Engineer", label: "电信网络工程师" },
          { value: "Data Communication Engineer", label: "数据通信工程师" },
          { value: "Telecommunication Test Engineer", label: "通信测试工程师" },
          { value: "Optical Communication Engineer", label: "光通信工程师" },
          { value: "Optical Transmission Engineer", label: "光传输工程师" },
          { value: "Optical Network Engineer", label: "光网络工程师" },
          { value: "Telecom Power Supply Engineer", label: "通信电源工程师" },
          { value: "Wired Transmission Engineer", label: "有线传输工程师" },
          { value: "Telecom Equipment Engineer", label: "通信设备工程师" },
          { value: "Core Network Engineer", label: "核心网工程师" },
          {
            value: "Telecommunication Standardization Engineer",
            label: "通信标准化工程师",
          },
          { value: "Other", label: "其他" },
        ],
      },
    ],
  },
];

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  details: {
    type: Object,
    default: () => {},
  },
});
const props1 = {
  expandTrigger: "hover" as const,
};
const form = ref({
  hdmc: "",
  list: [
    {
      caseId: "",
      zaj: "",
    },
  ],
});
const beforeClose = () => {
  if (!formRef.value) return;
  formRef.value.resetFields();
  form.value.hdmc = "";
  emit("update:modelValue", false);
};
const dialogClose = () => {
  if (!formRef.value) return;
  formRef.value.resetFields();
  form.value.hdmc = "";
  emit("update:modelValue", false);
};
const dialogSuccess = () => {
  if (!formRef.value) return;
  formRef.value.validate((valid, fields) => {
    if (valid) {
      // 判单新增或者编辑
      console.log(form.value);
      emit("update:modelValue", false);
    } else {
      console.log("error submit!", fields);
    }
  });
};
const addItem = () => {
  formData.education.push({
    school_name: "",
    school_time: ["", ""],
    school_degree: "",
  });
};
const deleteItem = (item: any, index: number) => {
  formData?.education?.splice(index, 1);
};

import { reactive, ref, onBeforeMount } from "vue";
import Radar from "@/components/Chart/Radar.vue";
import China from "@/components/Chart/China.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import Text from "./components/Text.vue";
import SelectWork from "@/components/SelectWork.vue";
import SelectArea from "@/components/SelectArea.vue";
import Relationship from "./components/Relationship.vue";
import { Check, Close, Minus, Plus } from "@element-plus/icons-vue";
import { useAuthStore } from "@/store/auth";
import { storage } from "@/utils/storage";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import xue from "@/assets/img/xue.jpg";

const router = useRouter();

const authStore = useAuthStore();
onBeforeMount(() => {
  // 初始化时从本地存储恢复登录状态
  const storedIsLoggedIn = storage.get("isLoggedIn");
  if (storedIsLoggedIn === "true") {
    authStore.isLogin = true;
  }
  if (!authStore.isLogin) {
    ElMessage.error("请先登录账户！");
    router.push("/login");
  }
});

const hideValue1 = ref(true);
const hideValue2 = ref(false);
const hideValue3 = ref(true);
const hideValue4 = ref(true);
const hideValue5 = ref(false);

const star = ref(0); //评价星星
const formData = reactive(authStore.userInfo);

const formRules = {
  name: { required: true, message: "姓名不能为空", trigger: "blur" },
  age: { required: true, message: "年龄不能为空", trigger: "blur" },
  phone: { required: true, message: "电话不能为空", trigger: "blur" },
  // ... 其他表单字段的验证规则
};

const avatarUrl = ref("");
const handleAvatarSuccess = (response: any, file: File) => {
  avatarUrl.value = response.url;
};

const beforeAvatarUpload = (file: File) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJpgOrPng) {
    ElMessage.error("只能上传jpg/png格式的图片!");
  }
  if (!isLt2M) {
    ElMessage.error("上传图片大小不能超过2MB!");
  }

  return isJpgOrPng && isLt2M;
};

const resumeUrl = ref("");
const resumeName = ref("");
const handleResumeSuccess = (response: any, file: File) => {
  resumeUrl.value = response.url;
  resumeName.value = file.name;
};

const beforeResumeUpload = (file: File) => {
  const isPdfOrDoc = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ].includes(file.type);
  const isLt5M = file.size / 1024 / 1024 < 5;

  if (!isPdfOrDoc) {
    ElMessage.error("只能上传PDF或DOC(X)格式的文件!");
  }
  if (!isLt5M) {
    ElMessage.error("上传文件大小不能超过5MB!");
  }

  return isPdfOrDoc && isLt5M;
};

import type { FormInstance } from "element-plus";

const formRef = ref<FormInstance | null>(null);

const submitForm = () => {
  if (!formRef.value) return;
  formRef.value
    .validate()
    .then(() => {
      // 表单验证通过后执行提交逻辑
      console.log("表单提交:", formData);
    })
    .catch((err: Error) => {
      console.error("表单验证失败:", err);
    });
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
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
  width: 100%;
  overflow: auto;
  padding: 0 100px;

  .left {
    display: flex;
    flex-direction: column;
    flex: 2;
    padding: 10px;
  }

  .right {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 10px;
  }

  .item-card {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    font-family: Arial, sans-serif;
    margin: 5px 0;

    .top {
      display: flex;
      margin: 20px;

      .profile-card {
        width: 200px;
        background: linear-gradient(
          to bottom,
          rgba(192, 230, 245, 0.818) 2%,
          rgba(188, 228, 244, 0.616) 8%,
          rgb(211, 238, 248) 15%,
          rgb(221, 239, 245) 20%,
          rgb(225, 238, 242) 30%,
          white
        );
        padding: 0;
        border-radius: 15px;
        box-shadow: 0 2px 18px rgba(0, 0, 0, 0.5);
        text-align: center;
        font-family: Arial, sans-serif;

        .profile-top {
          margin: 20px;
          justify-content: center;

          img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin-bottom: 10px;
          }

          .profile-name {
            margin: auto 20px;
            text-align: center;

            h3 {
              margin: 0;
              font-size: 20px;
              color: #333;
            }

            p {
              margin: 10px 0;
              font-size: 12px;
              color: #666;

              span {
                font-weight: bold;
                color: #ff6600;
              }
            }
          }
        }
      }

      .profile-name-right {
        margin: auto 20px;
      }
    }

    .input-div {
      position: relative;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 2px solid rgb(1, 235, 252);
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      box-shadow: 0px 0px 100px rgba(1, 235, 252, 0.425),
        inset 0px 0px 10px rgb(1, 235, 252), 0px 0px 5px rgb(255, 255, 255);

      .input {
        position: absolute;
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer !important;
      }

      .icon {
        color: rgb(1, 235, 252);
        font-size: 2rem;
        cursor: pointer;
      }
    }

    .list-form {
      display: flex;
      align-items: center;
      width: 100%;
    }

    .form-button {
      margin-left: 10px;
    }
  }
}
</style>
