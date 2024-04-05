<template>
  <HeaderBar />
  <div class="container">
    <div class="card">
      <div
        style="
          width: 50%;
          /* margin-right: 20px; */
          justify-content: center;
          align-items: center;
        "
      >
        <img src="../../assets/login.png" alt="" style="width: 100%" />
      </div>
      <div class="form">
        <div v-if="active == 0" style="width: 100%">
          <el-form
            :model="form"
            label-width="auto"
            style="width: 70%; margin: 0 auto"
          >
            <el-form-item label="姓名">
              <el-input v-model="form.name" clearable />
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-model="form.age" clearable />
            </el-form-item>
            <el-form-item label="电话号码">
              <el-input v-model="form.phone" clearable />
            </el-form-item>
          </el-form>
        </div>
        <div v-if="active == 1" style="width: 100%">
          <el-form
            :model="form"
            label-width="auto"
            style="width: 70%; margin: 0 auto"
          >
            <el-form-item label="邮箱">
              <el-input v-model="form.email" clearable />
            </el-form-item>
            <el-form-item label="地区">
              <!-- <el-input v-model="form.area" /> -->
              <el-cascader
                placeholder="请选择求职地区"
                size="default"
                :options="regionData"
                v-model="selectedOptions"
                @change="handleChange"
              >
              </el-cascader>
            </el-form-item>
            <el-form-item label="学历">
              <el-select v-model="form.degree" placeholder="请选择你的学历">
                <el-option label="专科" value="专科" />
                <el-option label="本科" value="本科" />
                <el-option label="硕士" value="硕士" />
                <el-option label="博士" value="博士" />
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="教育经历">
              <el-input v-model="form.education" />
            </el-form-item>
            <el-form-item label="项目经历">
              <el-input v-model="form.projects" />
            </el-form-item> -->
          </el-form>
        </div>
        <div v-if="active == 2" style="width: 100%; max-height: 300px">
          <el-form
            :model="form"
            label-width="auto"
            style="width: 70%; margin: 0 auto"
          >
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

        <div style="display: flex">
          <el-button @click="active-- ? active >= 0 : (active = 0)"
            >上一步</el-button
          >
          <el-button v-if="active < 2" @click="active++">下一步</el-button>
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

<script setup>
import { ref, reactive } from "vue";
import HeaderBar from "@/components/HeaderBar.vue";
import { Edit, Picture, UploadFilled, Upload } from "@element-plus/icons-vue";
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

const submit = () => {
  ElNotification({
    title: "提交成功",
    message: h("i", { style: "color: teal" }, "恭喜你提交成功！"),
    offset: 50,
  });
  active.value = 0;
};
</script>

<style scoped>
.container {
  /* margin-top: 50px; */
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
}

.card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60vw;
  height: 50vh;
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
  width: 50%;
  padding: 10px;
  align-items: center;
  justify-content: center;
  max-height: 500px;
}
</style>
