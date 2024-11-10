<template>
  <div class="layout-header">
    <div class="header_left">
      <img :src="logo" alt="logo" />
      <div class="header_left_title">职业猫</div>
      <div class="nav-city">
        <p
          class="nav-city-box"
          ka="header-switch-city"
          @click="centerDialogVisible = true"
        >
          <!-- <i class="icon-poi"></i> -->
          <svg
            class="icon-poi"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            data-v-ea893728=""
          >
            <path
              fill="currentColor"
              d="M800 416a288 288 0 1 0-576 0c0 118.144 94.528 272.128 288 456.576C705.472 688.128 800 534.144 800 416M512 960C277.312 746.688 160 565.312 160 416a352 352 0 0 1 704 0c0 149.312-117.312 330.688-352 544"
            ></path>
            <path
              fill="currentColor"
              d="M512 512a96 96 0 1 0 0-192 96 96 0 0 0 0 192m0 64a160 160 0 1 1 0-320 160 160 0 0 1 0 320"
            ></path>
          </svg>
          <span class="nav-city-selected">{{ lastSelectedRegionText }}</span>
          <span class="switchover-city">[切换城市]</span>
        </p>
        <el-dialog
          v-model="centerDialogVisible"
          title="请选择您的地区"
          width="500"
          style="
            border-radius: 15px;
            justify-content: center;
            align-items: center;
          "
        >
          <el-cascader
            placeholder="请选择地区"
            size="default"
            :options="regionData"
            v-model="selectedOptions"
            @change=""
            style="display: flex"
          >
          </el-cascader>
          <!-- <SelectArea /> -->
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取消</el-button>
              <el-button type="primary" @click="centerDialogVisible = false">
                确定
              </el-button>
            </div>
          </template>
        </el-dialog>
      </div>
      <a href="/" class="header_left_text">首页</a>
      <a href="/recommend" class="header_left_text">推荐岗位</a>
      <a href="/research" class="header_left_text">搜索岗位</a>
      <!-- <a href="/form" class="header_left_text">在线表单</a> -->
      <!-- <button @click="changeLogin">切换登录状态</button> -->
    </div>
    <div v-if="isLogin" class="header_right">
      <el-popover
        :width="300"
        popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 0px;"
      >
        <template #reference>
          <p st yle="color: white">简历</p>
        </template>
        <template #default>
          <div class="resume-upload">
            <button class="card-btn" @click="resumeDialog = true">
              <img :src="fileUpload" alt="卡片图片1" />
              附件上传
            </button>
            <button class="card-btn" @click="toResume">
              <img :src="fileOnline" alt="卡片图片2" />
              在线填写
            </button>
          </div>
        </template>
      </el-popover>

      <a href="/profile" class="header_right_text">个人信息</a>
      <p class="header_right_text">{{ authStore.userInfo.name }}</p>

      <el-popover
        :width="50"
        popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 10px;text-align: center"
      >
        <template #reference>
          <img
            :src="avatarImg"
            alt="头像"
            style="border-radius: 50%; height: 45px; width: 45px"
          />
        </template>
        <template #default>
          <button
            @click="logout"
            style="border: 0; outline: none; background-color: transparent"
          >
            退出登录
          </button>
        </template>
      </el-popover>

      <el-dialog
        v-model="resumeDialog"
        title="附件上传"
        width="800"
        align-center
      >
        <div class="resume_dialog">
          <div class="resume_dialog_content">
            <el-upload
              class="upload-demo"
              drag
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              multiple
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                拖拽文件到此 或 <em>点击上传文件</em>
              </div>
              <template #tip>
                <div class="el-upload__tip">
                  jpg/png files with a size less than 500kb
                </div>
              </template>
            </el-upload>
            <img
              src="../assets/resume-online2.png"
              alt="在线填写简历"
              style="width: 250px"
            />
          </div>
          <div class="resume_dialog_btn">
            <el-button type="primary" round>上传简历附件</el-button>
            <el-button type="primary" round @click="toResume"
              >在线填写简历</el-button
            >
          </div>
        </div>
      </el-dialog>
    </div>

    <div v-else class="header_right">
      <a href="/boss" class="header_right_text">我要招聘</a>
      <a href="/login" class="header_right_text">我要求职</a>
      <button
        style="
          border: rgb(255, 255, 255) solid 2px;
          border-radius: 50px;
          background-color: rgba(255, 255, 255, 0);
          color: white;
          padding: 5px 10px;
        "
        @click="toLogin"
      >
        登录 / 注册
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import logo from "@/assets/img/Header/logo.png";
import fileUpload from "@/assets/img/Header/file-upload.png";
import fileOnline from "@/assets/img/Header/file-online.png";
import avatarImg from "@/assets/img/xue.jpg";
import { ref, computed, onMounted, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { regionData } from "element-china-area-data";
import { useAuthStore } from "@/store/auth";
import { UploadFilled } from "@element-plus/icons-vue";
import SelectArea from "./SelectArea.vue";
import { storeToRefs } from "pinia";
import { storage } from "@/utils/storage";

const resumeDialog = ref(false);
const authStore = useAuthStore();
const { isLogin } = storeToRefs(authStore);
const router = useRouter();
const centerDialogVisible = ref(false);
const selectedOptions = ref(["11", "1101", "110101"]); // 初始化选中值

onBeforeMount(() => {
  // 初始化时从本地存储恢复登录状态
  const storedIsLoggedIn = storage.get("isLoggedIn");
  if (storedIsLoggedIn === "true") {
    authStore.isLogin = true;
  }
});

const changeLogin = () => {
  if (authStore.isLogin) {
    authStore.logout();
  } else {
    authStore.login();
  }
  console.log(authStore.isLogin);
  // 这里添加登录逻辑，登录成功后调用 authStore.login()
};

function findLabelByValue(data: any, value: any): string {
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

const toLogin = () => {
  router.push("/login");
};

const toResume = () => {
  router.push("/profile");
};

const logout = () => {
  authStore.logout();
  router.push("/");
};
</script>

<style lang="scss" scoped>
.resume_dialog {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;

  &_content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  &_btn {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}

.layout-header {
  background: rgb(98, 145, 217);
  width: 100%;
  min-width: 1350px;
  height: 60px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;

  .header_left {
    margin-left: 80px;
    display: flex;
    align-items: center;

    img {
      border-radius: 50%;
      height: 35px;
      width: 35px;
      margin: 0 10px;
    }

    &_title {
      margin: 10px;
      color: white;
      font-size: 25px;
      font-weight: bold;
    }

    &_text {
      margin: 10px;
      color: white;
      text-decoration: none;
    }

    .nav-city {
      float: left;
      position: relative;
      cursor: pointer;
      height: 49px;
      line-height: 49px;
      color: rgb(0, 64, 255);
      display: flex;
      align-items: center;
      margin: 5px;

      .nav-city-selected {
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 84px;
        vertical-align: middle;
        font-weight: bold;
      }

      .icon-poi {
        display: inline-block;
        vertical-align: top;
        width: 18px;
        height: 18px;
        /* background: url(https://img.bosszhipin.com/static/file/2023/umua62pczi1679922532668.png) 0 -18px/18px auto no-repeat; */
        margin: 16px 3px 0 24px;
      }

      .switchover-city {
        font-size: 12px;
        color: #fff;
        margin-left: 10px;
      }

      .city-box {
        top: 49px;
      }

      .city-box {
        font-size: 14px;
      }
    }
  }

  .header_right {
    display: flex;
    margin-left: auto;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 10px;

    &_text,
    &_resume {
      margin: 0 15px;
      color: white;
      display: flex;
      text-decoration: none;
    }
  }
}

.resume-upload {
  max-width: 300px;
  justify-content: center;
  align-items: center;

  .card-btn {
    width: 145px;
    height: 160px;
    display: inline-block;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;

    img {
      width: 120px;
      object-fit: cover;
      border-radius: 10px;
    }
  }
}
</style>
