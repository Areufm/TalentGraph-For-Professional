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
              <el-input v-model="skillString" placeholder="请用英文逗号,分隔开" clearable @input="updateSkillArray" />
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
import { ref, reactive, h, computed } from "vue";
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
// import { ElNotification } from "element-plus";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const router = useRouter();

const clickImg = () => {
  if (authStore.isLogin) {
    authStore.logout();
  }
  router.push("/");
};

const handleChange = (value) => {
  console.log(value);
};

const form = reactive(authStore.userInfo);

const active = ref(0);

const submit = () => {
  authStore.setUserInfo(form);
  console.log("Form data saved:", authStore.userInfo);
  ElNotification({
    title: "提交成功",
    message: h("i", { style: "color: teal" }, "恭喜你提交成功！"),
    offset: 50,
  });
  router.push("/");
};

// 计算属性，将数组转为字符串以供展示
const skillString = computed({
  get() {
    return form.skill.join(', ');
  },
  set(value) {
    form.skill = value.split(',').map(skill => skill.trim());
  }
});

// 更新 skill 数组
const updateSkillArray = (value) => {
  form.skill = value.split(',').map(skill => skill.trim());
};

const value = ref([]);

const props = {
  expandTrigger: "hover" as const,
};


const uploadFile = (response, file, fileList) => {
  // 假设这是一个模拟成功的响应对象
  const mockResponse = {
    code: 200,
    message: "上传成功",
    data: {
      name: "John Doe",
      age: "30",
      phone: "123-456-7890",
      email: "johndoe@example.com",
      area: "",
      education: [
        {
          school_name: "杭州大学",
          school_time: ["", ""],
          school_degree: "",
        },
      ],
      work: "",
      skill: [],
      info: "尊敬的各位老师、同学们，大家好！我是来自XX大学XX学院XX专业的XXX，非常荣幸有机会在此向大家作一个详细的自我介绍。首先，关于我的基本情况。我出生于美丽的XX省XX市，自小在父母的悉心教诲和良好家庭氛围的影响下，养成了积极向上、勤奋刻苦的生活态度。高中时期，我凭借优异的成绩考入了心仪的XX大学，开始了我的大学生涯。现就读于XX专业，年级排名前X%，对所学专业怀有深厚的兴趣和热情。在学术方面，我始终秉持严谨治学的精神，积极参与各类专业课程的学习与实践。我对XX领域的理论知识进行了深入研究，尤其对XX专题有独到的理解和探索。此外，我还通过阅读专业文献、参加学术讲座和研讨会，不断拓宽视野，紧跟学科前沿动态。至今，我在导师的指导下参与了一项校级科研项目——“XXX”，负责XX部分的工作，项目成果已发表于《XX期刊》。这些学术经历不仅提升了我的专业知识水平，也锻炼了我的独立思考和团队协作能力。在实践能力方面，我深知理论与实践相结合的重要性。在校期间，我积极参与各类实践活动以提升自己的综合素质。曾担任XX社团的副社长，组织策划了多次大型活动，如“XX文化节”、“XX论坛”，在活动筹备过程中，我提升了组织协调、沟通交流以及危机应对的能力。同时，我利用寒暑假时间进行了与专业相关的实习，曾在XX公司担任XX岗位实习生，负责XX工作。实习期间，我将所学知识应用于实际工作中，深化了对专业知识的理解，也积累了宝贵的社会工作经验。对于个人兴趣爱好，我热衷于XX（比如阅读、摄影、运动等）。阅读让我在快节奏的学习生活中保持内心的宁静，从各类书籍中汲取知识、启迪思维；摄影则帮助我捕捉生活中的美好瞬间，培养了我观察事物的独特视角；而定期的体育锻炼，如跑步、篮球等，既强健了体魄，也磨炼了意志，使我更好地应对学习和生活的挑战。展望未来，我深感责任重大、使命光荣。我计划在完成本科学业后继续深造，攻读XX方向的研究生学位，进一步提升专业素养，致力于在XX领域做出自己的贡献。同时，我也期待在未来的学术研究和职业发展中，能够与志同道合的伙伴们携手共进，共同推动行业进步，服务社会。最后，我想说，我是一个热爱生活、积极进取的人，始终坚信“学无止境，行者无疆”。在接下来的大学生活中，我将继续努力学习，全面提升自己，以期在未来的人生道路上，实现自我价值，为社会的发展贡献自己的一份力量。谢谢大家！以上就是我的自我介绍，如果有任何问题或想要进一步了解我，非常欢迎各位老师和同学随时与我交流。再次感谢大家的倾听！",
    },
  };

  // 如果响应码表示上传成功
  if (mockResponse.code === 200) {
    // 将响应数据赋值给表单
    const responseData = mockResponse.data;
    form.name = responseData.name;
    form.age = responseData.age;
    form.phone = responseData.phone;
    form.email = responseData.email;
    form.area = responseData.area;
    form.education = responseData.education;
    form.work = responseData.work;
    form.skill = responseData.skill;
    form.info = responseData.info;

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
