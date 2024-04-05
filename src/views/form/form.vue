<template>
  <HeaderBar />
  <div class="container">
    <div class="form">
      <div v-if="active == 0" style="width: 100%">
        active = 0
        <el-form :model="form" label-width="auto" style="width: 100%">
          <el-form-item label="姓名">
            <el-input v-model="form.name" clearable />
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.age" clearable />
          </el-form-item>
          <el-form-item label="电话号码">
            <el-input v-model="form.phone" clearable />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email" clearable />
          </el-form-item>
          <el-form-item label="地区">
            <!-- <el-input v-model="form.area" /> -->
            <el-cascader
              placeholder="请选择地区"
              size="default"
              :options="regionData"
              v-model="selectedOptions"
              @change="handleChange"
            >
            </el-cascader>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="active == 1" style="width: 100%">
        active = 1
        <el-form-item label="学历">
          <el-select v-model="form.degree" placeholder="请选择你的学历">
            <el-option label="专科" value="专科" />
            <el-option label="本科" value="本科" />
            <el-option label="硕士" value="硕士" />
            <el-option label="博士" value="博士" />
          </el-select>
        </el-form-item>
        <el-form :model="form" label-width="auto" style="">
          <el-form-item label="教育经历">
            <el-input v-model="form.education" />
          </el-form-item>
          <el-form-item label="项目经历">
            <el-input v-model="form.projects" />
          </el-form-item>
        </el-form>
      </div>
      <div v-if="active == 2" style="width: 100%">
        active = 2
        <el-form :model="form" label-width="auto" style="">
          <el-form-item label="求职岗位">
            <el-select v-model="form.degree" placeholder="请选择你的求职岗位">
              <el-option label="专科" value="专科" />
              <el-option label="本科" value="本科" />
              <el-option label="硕士" value="硕士" />
              <el-option label="博士" value="博士" />
            </el-select>
          </el-form-item>
          <el-form-item label="技能点">
            <el-input v-model="form.skill" clearable />
          </el-form-item>
          <el-form-item label="个人信息描述">
            <el-input
              v-model="form.info"
              :autosize="{ minRows: 2, maxRows: 4 }"
              type="textarea"
              placeholder="请输入你的个人信息"
              clearable
            />
          </el-form-item>
        </el-form>
      </div>

      <el-button @click="active--">上一步</el-button>
      <el-button v-if="active < 2" @click="next">下一步</el-button>
      <el-button v-else @click="submit">提交</el-button>

      <el-steps
        class="mb-4"
        style="width: 80%; margin-top: 20px"
        :space="200"
        :active="active"
        simple
      >
        <el-step title="Step 1" :icon="Edit" />
        <el-step title="Step 2" :icon="UploadFilled" />
        <el-step title="Step 3" :icon="Picture" />
      </el-steps>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import HeaderBar from "@/components/HeaderBar.vue";
import { Edit, Picture, UploadFilled } from "@element-plus/icons-vue";
import { regionData } from "element-china-area-data";
import { h } from "vue";
// import { ElNotification } from 'element-plus'

const handleChange = (value) => {
  console.log(value);
};

const form = reactive({
  name: "猪开南",
  age: "19",
  email: "",
  phone: "",
  skill: "啥都会",
  education: "",
  projects: "",
  area: "",
  username: "",
  degree: "",
  info: "",
});
const active = ref(0);

const next = () => {
  if (active.value++ >= 2) {
    active.value = 0;
  }
};

const submit = () => {
  ElNotification({
    title: "Title",
    message: h("i", { style: "color: teal" }, "This is a reminder"),
  });
};
</script>

<style scoped>
.container {
  margin-top: 80px;
}

.form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70vw;
  height: 50vh;
  padding: 30px;
  border-radius: 30px;
  background: #e0e0e0aa;
  box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
</style>
<template>
  <common-dialog
    title="活动新增"
    :width="'800px'"
    :before-close="beforeClose"
    @dialog-close="dialogClose"
    @dialog-success="dialogSuccess"
  >
    <el-form ref="formRef" :rules="rules" :model="form" label-width="100px">
      <el-form-item label="活动名称:">
        <el-input
          v-model="form.hdmc"
          placeholder="请填写活动名称"
          style="width: 200px"
        />
      </el-form-item>
      <!-- 特殊表单 -->
      <div v-for="(item, index) in form.list" :key="index" class="list-form">
        <el-form-item
          class="form-style"
          label="活动编号"
          :prop="'list.' + index + '.caseId'"
          :rules="[
            { required: true, message: '活动编号不能为空', trigger: 'blur' },
          ]"
        >
          <el-input
            v-model="item.caseId"
            placeholder="请填写活动编号"
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="主活动编号" class="form-style">
          <el-input
            v-model="item.zaj"
            style="width: 200px"
            placeholder="请填写主活动编号"
          />
        </el-form-item>
        <el-form-item label-width="0" class="form-button">
          <el-button
            v-if="index + 1 == form.list.length"
            type="primary"
            @click="addItem(form.list.length)"
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
    </el-form>
  </common-dialog>
</template>
<script setup>
import {
  reactive,
  ref,
  defineProps,
  defineEmits,
  getCurrentInstance,
} from "vue";
//自己换成el-dailog 组件即可
import { ElMessage } from "element-plus";

const { proxy } = getCurrentInstance();
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  details: {
    type: Object,
    default: () => {},
  },
});
const formRef = ref(null);
const form = ref({
  hdmc: "",
  list: [
    {
      caseId: "",
      zaj: "",
    },
  ],
});
const rules = reactive({
  //定义验证规则，有两种方式：
  //1.使用ele原生的验证规则。
  timer: [
    {
      required: true,
      message: "请填写活动时间",
      trigger: "blur",
    },
  ],
  xfjfhjzsj: [
    {
      required: true,
      message: "请填写县分局复核截止时间",
      trigger: "blur",
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
</script>
<style lang="scss" scoped>
.list-form {
  display: flex;
  align-items: center;
  width: 100%;
}

.form-button {
  margin-left: 10px;
}

.form-style {
  .input-style {
    width: 230px;
  }

  .special-style {
    width: 200px;
  }
}
</style>
