<template>
  <div class="container">
    <div class="card">
      <div
        style="
          width: 40%;
          /* margin-right: 20px; */
          justify-content: center;
          align-items: center;
        "
      >
        <img
          :src="formImg"
          alt=""
          style="width: 100%; border-radius: 20px"
          @click="clickImg"
        />
      </div>
      <div class="form">
        <el-form :model="userInfo" label-width="auto" style="width: 100%">
          <div v-if="active === 0" style="width: 90%; margin: 0 auto">
            <el-upload
              class="upload-demo"
              drag
              action="api/upload"
              accept=".docx, .pdf"
              :before-upload="beforeUpload"
              @success="simulateSuccess"
              style="background-color: transparent"
            >
              <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
              <div class="el-upload__text">
                拖拽文件到此 或者 <em>点击上传文件</em>
              </div>
              <template #tip>
                <div class="el-upload__tip">pdf / docx 文件大小限制 2 MB</div>
              </template>
            </el-upload>
          </div>
          <div v-if="active === 1" style="width: 90%; margin: 0 auto">
            <el-form-item label="姓名" style="width: 300px">
              <el-input v-model="userInfo.name" clearable />
            </el-form-item>
            <el-form-item label="年龄" style="width: 300px">
              <el-input v-model="userInfo.age" type="number" />
            </el-form-item>
            <el-form-item label="电话号码" style="width: 300px">
              <el-input v-model="userInfo.phone" clearable />
            </el-form-item>
          </div>
          <div v-if="active === 2" style="width: 90%; margin: 0 auto">
            <el-form-item label="邮箱" style="width: 300px">
              <el-input v-model="userInfo.email" clearable />
            </el-form-item>
            <el-form-item label="地区" style="width: 300px">
              <el-cascader
                style="width: 300px"
                placeholder="请选择求职地区"
                size="default"
                :options="regionOptions"
                v-model="userInfo.area"
                @change="handleChange"
              >
              </el-cascader>
            </el-form-item>
            <el-form-item label="学历" style="width: 300px">
              <el-select
                v-model="userInfo.education"
                placeholder="请选择你的学历"
              >
                <el-option label="专科" value="专科" />
                <el-option label="本科" value="本科" />
                <el-option label="硕士" value="硕士" />
                <el-option label="博士" value="博士" />
              </el-select>
            </el-form-item>
          </div>
          <div
            v-if="active === 3"
            style="width: 100%; margin: 0 auto; max-height: 350px"
          >
            <el-form-item label="求职岗位" style="width: 300px">
              <SelectWork />
            </el-form-item>
            <el-form-item label="技能点" style="width: 300px">
              <el-input
                v-model="skillString"
                placeholder="请用英文逗号,分隔开"
                clearable
                @input="updateSkillArray"
              />
            </el-form-item>
            <el-form-item label="个人信息描述">
              <el-input
                v-model="userInfo.info"
                :autosize="{ minRows: 3, maxRows: 5 }"
                type="textarea"
                placeholder="请输入你的个人信息"
                clearable
              />
            </el-form-item>
          </div>
        </el-form>

        <div v-if="active !== 0" style="display: flex">
          <el-button @click="active--">上一步</el-button>
          <el-button v-if="active < 3" @click="active++">下一步</el-button>
          <el-button v-else @click="submit">提交</el-button>
        </div>
        <el-steps
          style="width: 80%; margin-top: 20px"
          :active="active"
          align-center
          :space="200"
        >
          <el-step title="Step 1" description="" />
          <el-step title="Step 2" description="" />
          <el-step title="Step 3" description="" />
        </el-steps>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import formImg from "@/assets/img/form.png";
import { ref, computed } from "vue";
import SelectWork from "@/components/SelectWork.vue";
import { UploadFilled } from "@element-plus/icons-vue";
import { regionData } from "element-china-area-data";
import type { CascaderOption } from "element-plus";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { getParseUserInfo } from "@/api/user";
import { BaseResponse, UserInfoResponse } from "@/types/mock";
import { User } from "@/types/user";
import type { UploadFile, UploadFiles } from "element-plus";

const regionOptions = regionData as CascaderOption[];

const authStore = useAuthStore();
const router = useRouter();

const clickImg = () => {
  if (authStore.isLogin) {
    authStore.logout();
  }
  router.push("/");
};

const handleChange = (value: string) => {
  console.log(value);
};

const userInfo = reactive<User>({
  id: 0,
  name: "",
  age: 1,
  phone: "",
  email: "",
  area: "",
  education: [
    {
      school_name: "",
      school_time: ["", ""],
      school_degree: "",
    },
  ],
  work: "",
  skill: [],
  info: "",
});

const active = ref(0);

const submit = () => {
  authStore.updateUserInfo(userInfo);
  console.log("Form data saved:", authStore.userInfo);
  ElNotification({
    title: "提交成功",
    message: "恭喜你提交成功！",
    type: "success",
    offset: 50,
  });
  authStore.login();
  router.push("/");
};

// 计算属性，将数组转为字符串以供展示
const skillString = computed({
  get() {
    return userInfo.skill.join(", ");
  },
  set(value) {
    userInfo.skill = value.split(",").map((skill) => skill.trim());
  },
});

// 更新 skill 数组
const updateSkillArray = (value: string) => {
  userInfo.skill = value?.split(",")?.map((skill) => skill.trim());
};

const uploadFile = async (response: any, file: File, fileList: File[]) => {
  const res: any = await getParseUserInfo();
  console.log("getParseUserInfo res--->", res);

  // 如果响应码表示上传成功
  if (res.code === 200) {
    // 将响应数据赋值给表单
    Object.assign(userInfo, res?.data as User);
    console.log("userInfo", userInfo);

    // 显示上传成功的提示信息
    ElNotification({
      title: "简历上传成功",
      message: "简历正在解析中...",
      type: "info",
      offset: 50,
    });

    // 设置一个3秒后执行的定时器
    setTimeout(() => {
      active.value = 1;
    }, 3000); // 3000毫秒即3秒
  } else {
    ElNotification({
      title: "上传失败！",
      message: "简历上传失败，请重新上传！",
      type: "error",
      offset: 50,
    });
  }
};

const simulateSuccess = (
  response: any,
  file: UploadFile,
  uploadFiles: UploadFiles
) => {
  uploadFile(null, file as unknown as File, uploadFiles as unknown as File[]);
};

const beforeUpload = (file: File) => {
  return true;
};
</script>

<style lang="scss" scoped>
.upload-demo :deep(.el-upload-dragger) {
  border-radius: 30px;
  background-color: transparent;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    to bottom,
    rgba(192, 230, 245, 0.818) 2%,
    rgba(188, 228, 244, 0.616) 8%,
    rgb(211, 238, 248) 15%,
    rgb(221, 239, 245) 20%,
    rgb(225, 238, 242) 30%,
    white
  );

  .card {
    width: 800px;
    height: 400px;
    padding: 30px;
    border-radius: 30px;
    box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff;
    align-items: center;
    justify-content: center;
    display: flex;

    .form {
      display: flex;
      flex-direction: column;
      width: 60%;
      padding: 10px;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  }
}
</style>
