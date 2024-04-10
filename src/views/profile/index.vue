<template>
  <HeaderBar />
  <el-form class="container" :model="formData" :rules="formRules" ref="formRef">
    <div class="left">
      <div class="profile">
        <div class="top">
          <img src="../../assets/xue.jpg" alt="Profile Picture" />

          <div class="profile-name">
            <div style="display: flex; margin: 10px">
              <el-form-item label="姓名:" prop="name">
                <el-input v-model="formData.name" />
              </el-form-item>
              <el-form-item label="年龄:" prop="age">
                <el-input v-model="formData.age" type="number" style="margin: 0 10px" />
              </el-form-item>

            </div>
            <div style="display: flex; margin: 10px">
              <el-form-item label="学校:" prop="school">
                <el-input v-model="formData.school" style="margin: 0 10px" />
              </el-form-item>
              <el-form-item label="电话:" prop="phone">
                <el-input v-model="formData.phone" type="tel" style="margin: 0 10px" />
              </el-form-item>
            </div>
            <div style="display: flex; margin: 10px">
              地区：
              <el-cascader placeholder="请选择地区" size="small" :options="regionData" v-model="selectedOptions" @change=""
                style="display: flex">
              </el-cascader>
            </div>
          </div>
        </div>
      </div>
      <div class="job">
        <h3>求职意向</h3>
      </div>
      <div class="education">
        <h3>教育经历</h3>
        <div v-for="(item, index) in form.list" :key="index" class="list-form">
          <div style="display: flex;flex-direction: column;">
            <el-form-item class="form-style" label="学校名称" :prop="'list.' + index + '.caseId'" :rules="[
    { required: true, message: '活动编号不能为空', trigger: 'blur' },
  ]">
              <el-input v-model="item.caseId" placeholder="请填写活动编号" style="width: 150px" />
            </el-form-item>
            <el-date-picker v-model="value1" type="monthrange" range-separator="To" start-placeholder="Start month"
              end-placeholder="End month" />
          </div>

          <el-form-item label-width="0" class="form-button">
            <el-button v-if="index + 1 == form.list.length" type="primary" @click="addItem(form.list.length)">
              +
            </el-button>
            <el-button v-if="index !== 0" type="danger" @click="deleteItem(item, index)">
              -
            </el-button>
          </el-form-item>
        </div>
      </div>
      <div class="advance">
        <h3>个人优势</h3>
      </div>
      <div class="project">
        <h3>项目经历</h3>
      </div>
      <div class="skill">
        <h3>技能点</h3>
      </div>
      <div class="experience">
        <h3>个人经历</h3>
      </div>
      <div class="language">
        <h3>语言</h3>
      </div>
      <div class="add">
        <h3>额外资料</h3>
      </div>
      <div class="cv" style="height: 550px">
        <h3>个人简历</h3>
        <Graph />
      </div>

    </div>
    <div class="right">
      <div class="upload">
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
      <div class="assess">
        <h4>评价推荐结果</h4>
        <el-rate v-model="assess" :texts="['oops', 'disappointed', 'normal', 'good', 'great']" show-text size="large" />
      </div>
      <div class="improve">
        <h4>简历待完善</h4>
        <h5>基本信息：</h5>
        <h5>基本信息：</h5>
      </div>
      <div class="security">
        <h4>个人隐私项</h4>
        <p>谁可以联系我</p>
        <p>屏蔽公司</p>
      </div>
      <div class="process">
        <h4>简历完成度</h4>
        <p>简历已完成： 80%</p>
      </div>
      <div class="radar" style="height: 400px">
        <h4>个人能力雷达图</h4>
        <Radar />
      </div>
      <el-button type="primary" @click="submitForm">保存</el-button>
    </div>
  </el-form>
</template>


<script setup>
const value1 = ref('')
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
  form.value.list.push({
    caseId: "",
    zaj: "",
  });
};
const deleteItem = (item, index) => {
  form.value.list.splice(index, 1);
};
import { reactive, ref } from 'vue';
import Radar from "@/components/Chart/Radar.vue";
import Graph from "@/components/Chart/Graph.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import { regionData } from "element-china-area-data";
const selectedOptions = ref(["11", "1101", "110101"]); // 初始化选中值

function findLabelByValue(data, value) {
  for (const item of data) {
    if (item.value === value) {
      return item.label;
    } else if (Array.isArray(item.children) && item.children.length > 0) {
      const foundLabel = findLabelByValue(item.children, value);
      if (foundLabel) {
        return foundLabel;
      }
    }
  }
  return "";
}

const lastSelectedRegionText = computed(() => {
  const lastOption = selectedOptions.value[selectedOptions.value.length - 1];
  return findLabelByValue(regionData, lastOption);
});

const assess = ref(null); //评价星星
const formData = reactive({
  name: '张三',
  location: '杭州',
  age: '19',
  school: 'HDU',
  phone: '1922394234',
  // ... 其他表单字段
  resume: null,
});

const formRules = {
  name: { required: true, message: '姓名不能为空', trigger: 'blur' },
  location: { required: true, message: '地点不能为空', trigger: 'blur' },
  age: { required: true, message: '年龄不能为空', trigger: 'blur' },
  school: { required: true, message: '学校不能为空', trigger: 'blur' },
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

.profile,
.job,
.education,
.advance,
.project,
.skill,
.experience,
.language,
.add,
.cv,
.upload,
.assess,
.improve,
.security,
.process,
.radar {
  /* width: 100%; */
  /* height: 100%; */
  background-color: #ffffff;
  /* background-color: rgb(230, 245, 248); */
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  /* text-align: center; */
  font-family: Arial, sans-serif;
  margin: 5px 0;
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
  background: linear-gradient(to bottom,
      rgba(192, 230, 245, 0.818),
      rgba(188, 228, 244, 0.616),
      rgb(211, 238, 248),
      rgb(221, 239, 245),
      rgb(225, 238, 242),
      white);
  /* height: 100vh; */
  height: 100%;
  width: 100%;
}

.left {
  display: flex;
  flex-direction: column;
  flex: 2;
  /* border: 2px black solid; */
  margin: 0 0 0 200px;
  padding: 10px;
}

.right {
  display: flex;
  flex-direction: column;
  flex: 1;
  /* border: 2px black solid; */
  margin: 0 50px 0 0;
  padding: 10px;
}
</style>
