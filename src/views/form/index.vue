<template>
  <!-- <HeaderBar /> -->
  <div class="container">
    <div class="card">
      <div style="
          width: 40%;
          /* margin-right: 20px; */
          justify-content: center;
          align-items: center;
        ">
        <img src="../../assets/login2.png" alt="" style="width: 100%; border-radius: 20px" @click="clickImg" />
      </div>
      <div class="form">
        <el-form :model="form" label-width="auto" style="width: 100%">
          <div v-if="active == 0" style="width: 70%; margin: 0 auto">
            <el-upload class="upload-demo" drag action="" style="background-color: transparent" accept=".docx, .pdf"
              :before-upload="beforeUpload" @progress="simulateSuccess">
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                拖拽文件到此 或者 <em>点击上传文件</em>
              </div>
              <template #tip>
                <div class="el-upload__tip">pdf / docx 文件大小限制 2 MB</div>
              </template>
            </el-upload>
          </div>
          <div v-if="active == 1" style="width: 70%; margin: 0 auto">
            <el-form-item label="姓名" style="text-align: center">
              <el-input v-model="form.name" clearable style="margin: 0 auto;" />
            </el-form-item>
            <el-form-item label="年龄">
              <!-- <el-input v-model="form.age" clearable /> -->
              <el-input v-model="form.age" type="number" style="margin: 0 10px" />

              <!-- <el-input-number v-model="form.age" controls-position="right" style="width: 500px">
              </el-input-number> -->
            </el-form-item>
            <el-form-item label="电话号码">
              <el-input v-model="form.phone" clearable />
            </el-form-item>
          </div>
          <div v-if="active == 2" style="width: 70%; margin: 0 auto">
            <el-form-item label="邮箱">
              <el-input v-model="form.email" clearable />
            </el-form-item>
            <el-form-item label="地区">
              <el-cascader style="width: 500px" placeholder="请选择求职地区" size="default" :options="regionData"
                v-model="form.area" @change="handleChange">
              </el-cascader>
            </el-form-item>
            <el-form-item label="学历">
              <el-select v-model="form.education" placeholder="请选择你的学历">
                <el-option label="专科" value="专科" />
                <el-option label="本科" value="本科" />
                <el-option label="硕士" value="硕士" />
                <el-option label="博士" value="博士" />
              </el-select>
            </el-form-item>
          </div>
          <div v-if="active == 3" style="width: 70%; margin: 0 auto; max-height: 350px">
            <el-form-item label="求职岗位">
              <SelectWork />
            </el-form-item>
            <el-form-item label="技能点">
              <el-input v-model="form.skill" clearable />
            </el-form-item>
            <el-form-item label="个人信息描述">
              <el-input v-model="form.info" :autosize="{ minRows: 5, maxRows: 11 }" type="textarea"
                placeholder="请输入你的个人信息" clearable />
            </el-form-item>
          </div>
        </el-form>

        <div v-if="active != 0" style="display: flex">
          <el-button @click="active-- ? (active) => 0 : (active = 0)">上一步</el-button>
          <el-button v-if="active < 3" @click="active++">下一步</el-button>
          <el-button v-else @click="submit">提交</el-button>
        </div>
        <!-- <el-steps
          class="mb-4"
          style="width: 80%; margin-top: 20px"
          :space="200"
          :active="active"
          simple
        >
          <el-step title="Step 1" :icon="Edit" />
          <el-step title="Step 2" :icon="UploadFilled" />
          <el-step title="Step 3" :icon="Picture" />
        </el-steps> -->
        <el-steps style="width: 80%; margin-top: 20px" :active="active" align-center :space="200">
          <el-step title="Step 1" description="" />
          <el-step title="Step 2" description="" />
          <el-step title="Step 3" description="" />
        </el-steps>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import SelectWork from "@/components/SelectWork.vue"
import HeaderBar from "@/components/HeaderBar.vue";
import {
  Edit,
  Picture,
  UploadFilled,
  Upload,
  Minus,
  Plus,
} from "@element-plus/icons-vue";
import { regionData } from "element-china-area-data";
import { h } from "vue";
// import { ElNotification } from "element-plus";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const handleChange = (value) => {
  console.log(value);
};

const form = reactive({
  name: "猫猫鼠",
  age: "19",
  phone: "18472638093",
  email: "",
  area: "",
  education: "",
  work: "",
  skill: "",
  info: "",
});

const active = ref(0);

const submit = () => {
  ElNotification({
    title: "提交成功",
    message: h("i", { style: "color: teal" }, "恭喜你提交成功！"),
    offset: 50,
  });
  router.push("/");
};

const value = ref([]);

const props = {
  expandTrigger: "hover" as const,
};

// 求职岗位选项数据
const options = [
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

const uploadFile = (response, file, fileList) => {
  // 假设这是一个模拟成功的响应对象
  const mockResponse = {
    code: 1,
    message: "上传成功",
    data: {
      filename: file.name,
      size: file.size,
      type: file.type,
    },
  };

  // 如果响应码表示上传成功
  if (mockResponse.code === 1) {
    // 显示上传成功的提示信息
    ElNotification({
      title: "简历上传成功",
      message: h("i", { style: "color: teal" }, "简历正在解析中..."),
      offset: 50,
    });

    // 设置一个3秒后执行的定时器
    setTimeout(() => {
      // 在这里将active赋值
      active.value = 1;
    }, 3000); // 3000毫秒即3秒
  } else {
    ElNotification({
      title: "上传失败！",
      message: h("i", { style: "color: teal" }, "简历上传失败，请重新上传！"),
      type: "error",
      offset: 50,
    });
  }
};

const simulateSuccess = (file, fileList) => {
  // 模拟上传成功，直接调用原本的on-success回调
  uploadFile(null, file, fileList);
};
const beforeUpload = (file) => {
  // 忽略实际上传，直接返回true
  return true;
};

const authStore = useAuthStore();
const router = useRouter();

const clickImg = () => {
  if (authStore.isLogin) {
    authStore.logout();
  }
  router.push("/");
};
</script>

<style scoped>
.upload-demo :deep(.el-upload-dragger) {
  border-radius: 30px;
  background-color: transparent;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.container {
  /* margin-top: 50px; */
  width: 100%;
  height: 90vh;
  background: linear-gradient(to bottom,
      rgba(192, 230, 245, 0.818) 2%,
      rgba(188, 228, 244, 0.616) 8%,
      rgb(211, 238, 248) 15%,
      rgb(221, 239, 245) 20%,
      rgb(225, 238, 242) 30%,
      white);
}

.card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70vw;
  height: 60vh;
  padding: 30px;
  border-radius: 30px;
  /* background: #fef6f6aa; */
  box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff;
  align-items: center;
  justify-content: center;
  display: flex;
}

.form {
  display: flex;
  flex-direction: column;
  width: 60%;
  padding: 10px;
  align-items: center;
  justify-content: center;
  text-align: center;
  /* max-height: 500px; */
}
</style>
