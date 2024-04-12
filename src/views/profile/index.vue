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
              <img src="../../assets/zkn.jpg" alt="Profile Picture" />

              <div class="profile-name">
                <h3>{{ formData.name }}</h3>
                <p>我的简历完成度: <span>77%</span></p>
              </div>
            </div>
          </div>
          <div class="profile-name">
            <div style="display: flex; margin: 10px">
              <el-form-item label="姓名:" prop="name">
                <el-input v-model="formData.name" style="margin: 0 10px" />
              </el-form-item>
              <el-form-item label="年龄:" prop="age">
                <el-input v-model="formData.age" type="number" style="margin: 0 10px" />

              </el-form-item>
            </div>
            <div style="display: flex; margin: 10px">
              <el-form-item label="电话:" prop="phone">
                <el-input v-model="formData.phone" type="tel" style="margin: 0 10px" />
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
                <el-cascader style="width: auto" v-model="value" :options="options" :props="props1"
                  :show-all-levels="false" @change="handleChange" placeholder="请选择你的求职岗位" />
              </el-form-item>
              <el-button type="danger" style="margin-left: auto;">取消</el-button>
              <el-button type="primary" @click="submitForm">保存</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="item-card">
        <h3>教育经历</h3>
        <div v-for="(item, index) in formData.education" :key="index" class="list-form">
          <div style="display: flex">
            <el-form-item class="form-style" label="学校名称" :rules="[
    { required: true, message: '学校名称不能为空', trigger: 'blur' },
  ]">
              <el-input v-model="formData.education[index].school_name" placeholder="请填写学校名称" style="width: 130px" />
            </el-form-item>
            <el-form-item class="form-style" label="时间" style="width: 250px;" :rules="[
    { required: true, message: '就读日期不能为空', trigger: 'blur' },
  ]">
              <el-date-picker v-model="formData.education[index].school_time" style="margin-left: auto;"
                type="monthrange" range-separator="To" start-placeholder="Start" end-placeholder="End" />
            </el-form-item>
            <el-form-item style="width: 130px;" label="学历" :rules="[
    { required: true, message: '学历不能为空', trigger: 'blur' },
  ]">
              <el-select v-model="formData.education[index].school_degree" placeholder="请选择你的学历">
                <el-option label="专科" value="专科" />
                <el-option label="本科" value="本科" />
                <el-option label="硕士" value="硕士" />
                <el-option label="博士" value="博士" />
              </el-select>
            </el-form-item>
          </div>

          <el-form-item label-width="0" class="form-button">
            <el-button v-if="index + 1 == formData.education.length" type="primary" @click="addItem(form.list.length)">
              +
            </el-button>
            <el-button v-if="index !== 0" type="danger" @click="deleteItem(item, index)">
              -
            </el-button>
          </el-form-item>
        </div>
      </div>
      <div class="item-card ">
        <h3>个人介绍</h3>
        <p style="text-indent: 32px;">{{ formData.info }}</p>
      </div>
      <div class="item-card">
        <h3>技能点</h3>
        <div v-for="(item, index) in formData.skill" :key="index" class="list-form">
          <div style="display: flex">
            <el-form-item class="form-style" label="技能点" :rules="[
    { required: true, message: '技能点不能为空', trigger: 'blur' },
  ]">
              <el-input v-model="formData.skill[index]" placeholder="请填写技能点" style="width: 130px" />
            </el-form-item>
          </div>

          <el-form-item label-width="0" class="form-button">
            <el-button v-if="index + 1 == formData.skill.length" type="primary" @click="formData.skill.push('')">
              +
            </el-button>
            <el-button v-if="index !== 0" type="danger" @click="formData.skill.splice(index, 1);">
              -
            </el-button>
          </el-form-item>
        </div>
      </div>
      <div class="item-card graph" style="height: 500px;">
        <h3>个人图谱</h3>
        <Relationship />
      </div>

    </div>
    <div class="right">
      <Text />
      <div class="item-card">
        <div style="display: flex; justify-content: space-between">
          <h4>上传简历附件</h4>
          <div class="input-div">
            <input class="input" name="file" type="file" />
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" stroke-linejoin="round"
              stroke-linecap="round" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor"
              class="icon">
              <polyline points="16 16 12 12 8 16"></polyline>
              <line y2="21" x2="12" y1="12" x1="12"></line>
              <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
              <polyline points="16 16 12 12 8 16"></polyline>
            </svg>
          </div>
        </div>
        <p>在简历中显示更多优势与特长</p>
      </div>

      <div class="item-card">
        <h4>个人隐私项</h4>
        <div style="display: flex;justify-content: space-between;align-items: center">
          <p>姓名</p>
          <el-switch v-model="hideValue1" class="mt-2" style="margin-left: 24px" inline-prompt :active-icon="Check"
            :inactive-icon="Close" />
        </div>
        <div style="display: flex;justify-content: space-between;align-items: center">
          <p>年龄</p>
          <el-switch v-model="hideValue2" class="mt-2" style="margin-left: 24px" inline-prompt :active-icon="Check"
            :inactive-icon="Close" />
        </div>
        <div style="display: flex;justify-content: space-between;align-items: center">
          <p>电话号码</p>
          <el-switch v-model="hideValue3" class="mt-2" style="margin-left: 24px" inline-prompt :active-icon="Check"
            :inactive-icon="Close" />
        </div>
        <div style="display: flex;justify-content: space-between;align-items: center">
          <p>详细地址</p>
          <el-switch v-model="hideValue4" class="mt-2" style="margin-left: 24px" inline-prompt :active-icon="Check"
            :inactive-icon="Close" />
        </div>
        <div style="display: flex;justify-content: space-between;align-items: center">
          <p>邮箱</p>
          <el-switch v-model="hideValue5" class="mt-2" style="margin-left: 24px" inline-prompt :active-icon="Check"
            :inactive-icon="Close" />
        </div>

      </div>
      <div class="item-card" style="height: 400px;padding:5px  0">
        <!-- <h4>能力数据图</h4> -->
        <Radar />
        <!-- <China /> -->
      </div>
      <div class="item-card" style="height: 400px;padding:0 0 20px 0">
        <!-- <Radar /> -->
        <China />
      </div>
      <div class="item-card">
        <h4>评价推荐结果</h4>
        <el-rate v-model="star" :texts="['不满意', '一般', '还行', '很棒', '非常满意']" show-text size="large" />
      </div>
    </div>
  </el-form>
</template>



<script setup>
const value = ref(["Internet", "Front-end & Mobile development", "Front-end dev"])

const handleChange = (value) => {
  console.log(value);
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


const { proxy } = getCurrentInstance();
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  details: {
    type: Object,
    default: () => { },
  },
});
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
    school_time: "",
    school_degree: ""
  });
};
const deleteItem = (item, index) => {
  formData.education.splice(index, 1);
};


import { reactive, ref } from 'vue';
import Radar from "@/components/Chart/Radar.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import Text from './components/Text.vue';
import SelectWork from '@/components/SelectWork.vue';
import SelectArea from "@/components/SelectArea.vue"
import Relationship from './components/Relationship.vue';
import { Check, Close, Minus, Plus } from '@element-plus/icons-vue'
import China from "./components/China.vue"
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
onBeforeMount(() => {
  // 初始化时从本地存储恢复登录状态
  const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
  if (storedIsLoggedIn === "true") {
    authStore.isLogin = true;
  }
  console.log(authStore.isLogin);
  if (!authStore.isLogin) {
    ElMessage.error("请先登录账户！");
    router.push("/login");
  }
});

const hideValue1 = ref(true)
const hideValue2 = ref(false)
const hideValue3 = ref(true)
const hideValue4 = ref(true)
const hideValue5 = ref(false)

const star = ref(null); //评价星星
const formData = reactive({
  name: '猫猫鼠',
  location: '杭州',
  age: '19',
  email: '',
  phone: '18472638093',
  education: [
    {
      school_name: "",
      school_time: ["", ""],
      school_degree: ""
    }
  ],
  skill: [""],
  info: "尊敬的各位老师、同学们，大家好！我是来自XX大学XX学院XX专业的XXX，非常荣幸有机会在此向大家作一个详细的自我介绍。首先，关于我的基本情况。我出生于美丽的XX省XX市，自小在父母的悉心教诲和良好家庭氛围的影响下，养成了积极向上、勤奋刻苦的生活态度。高中时期，我凭借优异的成绩考入了心仪的XX大学，开始了我的大学生涯。现就读于XX专业，年级排名前X%，对所学专业怀有深厚的兴趣和热情。在学术方面，我始终秉持严谨治学的精神，积极参与各类专业课程的学习与实践。我对XX领域的理论知识进行了深入研究，尤其对XX专题有独到的理解和探索。此外，我还通过阅读专业文献、参加学术讲座和研讨会，不断拓宽视野，紧跟学科前沿动态。至今，我在导师的指导下参与了一项校级科研项目——“XXX”，负责XX部分的工作，项目成果已发表于《XX期刊》。这些学术经历不仅提升了我的专业知识水平，也锻炼了我的独立思考和团队协作能力。在实践能力方面，我深知理论与实践相结合的重要性。在校期间，我积极参与各类实践活动以提升自己的综合素质。曾担任XX社团的副社长，组织策划了多次大型活动，如“XX文化节”、“XX论坛”，在活动筹备过程中，我提升了组织协调、沟通交流以及危机应对的能力。同时，我利用寒暑假时间进行了与专业相关的实习，曾在XX公司担任XX岗位实习生，负责XX工作。实习期间，我将所学知识应用于实际工作中，深化了对专业知识的理解，也积累了宝贵的社会工作经验。对于个人兴趣爱好，我热衷于XX（比如阅读、摄影、运动等）。阅读让我在快节奏的学习生活中保持内心的宁静，从各类书籍中汲取知识、启迪思维；摄影则帮助我捕捉生活中的美好瞬间，培养了我观察事物的独特视角；而定期的体育锻炼，如跑步、篮球等，既强健了体魄，也磨炼了意志，使我更好地应对学习和生活的挑战。展望未来，我深感责任重大、使命光荣。我计划在完成本科学业后继续深造，攻读XX方向的研究生学位，进一步提升专业素养，致力于在XX领域做出自己的贡献。同时，我也期待在未来的学术研究和职业发展中，能够与志同道合的伙伴们携手共进，共同推动行业进步，服务社会。最后，我想说，我是一个热爱生活、积极进取的人，始终坚信“学无止境，行者无疆”。在接下来的大学生活中，我将继续努力学习，全面提升自己，以期在未来的人生道路上，实现自我价值，为社会的发展贡献自己的一份力量。谢谢大家！以上就是我的自我介绍，如果有任何问题或想要进一步了解我，非常欢迎各位老师和同学随时与我交流。再次感谢大家的倾听！"
});

const formRules = {
  name: { required: true, message: '姓名不能为空', trigger: 'blur' },
  age: { required: true, message: '年龄不能为空', trigger: 'blur' },
  phone: { required: true, message: '电话不能为空', trigger: 'blur' },
  // ... 其他表单字段的验证规则
};

const avatarUrl = ref('');
const handleAvatarSuccess = (response, file) => {
  avatarUrl.value = response.url;
};

const beforeAvatarUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJpgOrPng) {
    ElMessage.error('只能上传jpg/png格式的图片!');
  }
  if (!isLt2M) {
    ElMessage.error('上传图片大小不能超过2MB!');
  }

  return isJpgOrPng && isLt2M;
};

const resumeUrl = ref('');
const resumeName = ref('');
const handleResumeSuccess = (response, file) => {
  resumeUrl.value = response.url;
  resumeName.value = file.name;
};

const beforeResumeUpload = (file) => {
  const isPdfOrDoc = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type);
  const isLt5M = file.size / 1024 / 1024 < 5;

  if (!isPdfOrDoc) {
    ElMessage.error('只能上传PDF或DOC(X)格式的文件!');
  }
  if (!isLt5M) {
    ElMessage.error('上传文件大小不能超过5MB!');
  }

  return isPdfOrDoc && isLt5M;
};

const formRef = ref(null);

const submitForm = () => {
  formRef.value.validate().then(() => {
    // 表单验证通过后执行提交逻辑
    console.log('表单提交:', formData);
  }).catch((err) => {
    console.error('表单验证失败:', err);
  });
};
</script>

<style scoped>
.profile-top {
  /* display: flex; */
  margin: 20px;
  justify-content: center;
}

.profile-name {
  margin: auto 20px;
}

.profile-card {
  width: 200px;
  /* width: 30%; */
  /* height: 100%; */
  /* background-color: #ffffff; */
  /* background-color: rgb(230, 245, 248); */
  background: linear-gradient(to bottom, rgba(192, 230, 245, 0.818) 2%, rgba(188, 228, 244, 0.616) 8%,
      rgb(211, 238, 248) 15%, rgb(221, 239, 245) 20%, rgb(225, 238, 242) 30%, white);
  padding: 0px;
  border-radius: 15px;
  box-shadow: 0 2px 18px rgba(0, 0, 0, 0.5);
  text-align: center;
  font-family: Arial, sans-serif;
}

.profile-card img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.profile-card h3 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.profile-card p {
  margin: 10px 0;
  font-size: 12px;
  color: #666;
}

.profile-card span {
  font-weight: bold;
  color: #ff6600;
}

.list-form {
  display: flex;
  align-items: center;
  width: 100%;
}

.form-button {
  margin-left: 10px;
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
}

.icon {
  color: rgb(1, 235, 252);
  font-size: 2rem;
  cursor: pointer;
}

.input {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer !important;
}

.item-card {
  /* width: 100%; */
  /* height: 100%; */
  background-color: #ffffff;

  /* background-color: rgb(230, 245, 248); */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  /* text-align: center; */
  font-family: Arial, sans-serif;
  margin: 5px 0;
}

.info {
  text-indent: 32px;
}

.profile img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.profile h3 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.top {
  display: flex;
  margin: 20px;
}

.profile-name {
  margin: auto 20px;
  text-align: center;
}

.profile p {
  margin: 10px 0;
  font-size: 16px;
  color: #666;
}

.container {
  margin-top: 50px;
  display: flex;
  /* background-color: rgb(230, 245, 248); */
  background: linear-gradient(to bottom, rgba(192, 230, 245, 0.818) 2%, rgba(188, 228, 244, 0.616) 8%,
      rgb(211, 238, 248) 15%, rgb(221, 239, 245) 20%, rgb(225, 238, 242) 30%, white);
  /* height: 100vh; */
  height: 100%;
  width: 100%;
}

.left {
  display: flex;
  flex-direction: column;
  flex: 2;
  /* border: 2px black solid; */
  margin: 0 0 0 100px;
  padding: 10px;
}

.right {
  display: flex;
  flex-direction: column;
  flex: 1;
  /* border: 2px black solid; */
  margin: 0 100px 0 0;
  padding: 10px;
}
</style>
