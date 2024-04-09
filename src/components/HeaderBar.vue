<template>
  <n-layout-header>
    <div class="header_left">
      <img
        src="../assets/workcat2.png"
        alt="logo"
        style="border-radius: 50%; height: 35px; width: 35px; margin: 0 10px"
      />
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
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="centerDialogVisible = false">Cancel</el-button>
              <el-button type="primary" @click="centerDialogVisible = false">
                Confirm
              </el-button>
            </div>
          </template>
        </el-dialog>
      </div>
      <a href="/" class="header_left_text">首页</a>
      <a href="/recommend" class="header_left_text">推荐岗位</a>
      <a href="/research" class="header_left_text">搜索岗位</a>
      <a href="/form" class="header_left_text">在线表单</a>
      <button @click="changeLogin">切换登录状态</button>
    </div>
    <div v-if="authStore.isLogin" class="header_right">
      <el-popover
        :width="300"
        popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 0px;"
      >
        <template #reference>
          <p style="color: white">简历</p>
        </template>
        <template #default>
          <div class="card-container">
            <button class="card-btn" @click="showPopup">
              <img src="../assets/resume-file4.png" alt="卡片图片1" />
              附件上传
            </button>
            <button class="card-btn" @click="toResume">
              <img src="../assets/resume-online4.png" alt="卡片图片2" />
              在线填写
            </button>
          </div>
        </template>
      </el-popover>

      <div id="overlay">
        <div class="popup">
          <p class="popup_title">
            新增附件简历
            <svg
              style="
                width: 20px;
                height: 20px;
                position: absolute;
                right: 20px;
                top: 15px;
              "
              @click="hidePopup"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
              data-v-ea893728=""
            >
              <path
                fill="currentColor"
                d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
              ></path>
            </svg>
          </p>

          <div
            style="
              display: flex;
              justify-content: space-around;
              align-items: center;
            "
          >
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
              src="../assets/upresume.png"
              alt=""
              style="width: 40%; height: 100%"
            />
          </div>
          <div class="popup_btn">
            <button class="cancelBtn" @click="hidePopup">上传简历附件</button>
            <button class="confirmBtn" @click="toResume">在线填写简历</button>
          </div>
        </div>
      </div>
      <a href="/profile" class="header_right_text">个人信息</a>
      <a href="/skill-evaluation" class="header_right_text">能力评估</a>
      <p class="header_right_text">Joker Xue</p>
      <el-popover
        :width="50"
        popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 10px;text-align: center"
      >
        <template #reference>
          <img
            src="../assets/xue.jpg"
            alt="头像"
            style="border-radius: 50%; height: 45px; width: 45px"
          />
        </template>
        <template #default>退出登录</template>
      </el-popover>
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
          padding: 10px;
        "
        @click="toLogin"
      >
        登录 / 注册
      </button>
    </div>
  </n-layout-header>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { regionData } from "element-china-area-data";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const router = useRouter();
const centerDialogVisible = ref(false);
const selectedOptions = ref(["11", "1101", "110101"]); // 初始化选中值

const changeLogin = () => {
  if (authStore.isLogin) {
    authStore.logout();
  } else {
    authStore.login();
  }
  console.log(authStore.isLogin);
  // 这里添加登录逻辑，登录成功后调用 authStore.login()
};

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

const toLogin = () => {
  router.push("/login");
};

const toResume = () => {
  router.push("/profile");
};

const showPopup = () => {
  var overlay = document.getElementById("overlay");
  overlay.style.display = "block";
};

const hidePopup = () => {
  var overlay = document.getElementById("overlay");
  overlay.style.display = "none";
};
</script>

<style scoped>
/* 遮罩层 */
#overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  font-size: 16px;
  /* IE9以下不支持rgba模式 */
  background-color: rgba(0, 0, 0, 0.5);
  /* 兼容IE8及以下 */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#7f000000, endColorstr=#7f000000);
  display: none;
  z-index: 1000;
}

/* 弹出框主体 */
.popup {
  background-color: #ffffff;
  width: 45%;
  height: 50%;
  border-radius: 25px;
  margin: 200px auto;
  text-align: center;
  position: relative;
  /* top: 20%; */
}

/* 弹出框的标题 */
.popup_title {
  height: 50px;
  line-height: 50px;
  border-bottom: solid 1px #cccccc;
  font-size: large;
  font-weight: bold;
}

/* 弹出框的内容 */
.popup_content {
  height: 50px;
  line-height: 50px;
  padding: 15px 20px;
}

/* 弹出框的按钮栏 */
.popup_btn {
  padding-bottom: 10px;
}

/* 弹出框的按钮 */
.popup_btn button {
  color: #778899;
  width: 40%;
  height: 40px;
  cursor: pointer;
  border: solid 1px #cccccc;
  border-radius: 15px;
  margin: 5px 10px;
  color: #ffffff;
  background-color: #337ab7;
}

.n-layout-header {
  /* background: rgba(0, 102, 255); */
  background: rgb(98, 145, 217);
  padding: 24px;
  /* height: 70px; */
  height: 50px;
  position: fixed;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
}

.header_left {
  margin-left: 80px;
  display: flex;
  align-items: center;
}

.header_right {
  display: flex;
  margin-left: auto;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 10px;
}

.card-container {
  justify-content: center;
  align-items: center;
}

.card-btn {
  width: 145px;
  /* 按钮宽度 */
  height: 160px;
  /* 按钮高度 */
  /* margin: 5px; */
  display: inline-block;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  /* 透明背景 */
  border: none;
  /* 无边框 */
  cursor: pointer;
  /* 鼠标悬停时显示手形光标 */
  outline: none;
  /* 无焦点轮廓 */
}

.card-btn img {
  /* width: 100%; */
  /* 图片填满按钮 */
  height: 80%;
  object-fit: cover;
  border-radius: 10px;
  /* 图片覆盖按钮，保持宽高比 */
  /* border-radius: 20px; */
}

.header_right_resume:hover .card-container {
  display: block;
  background: transparent;
  /* justify-content: center;
  align-items: center;
  width: 250px; */
}

.header_left_title {
  margin: 10px;
  color: white;
  font-size: 25px;
  font-weight: bold;
}

.header_left_text {
  margin: 10px;
  color: white;
  text-decoration: none;
  /* 取消链接下划线 */
}

.header_right_text,
.header_right_resume {
  margin: 0 15px;
  color: white;
  display: flex;
  /* padding: 10px; */
  /* width: 70px; */
  text-decoration: none;
}

.nav-city {
  float: left;
  position: relative;
  cursor: pointer;
  height: 49px;
  line-height: 49px;
  /* color: #00bebd; */
  color: rgb(0, 64, 255);

  display: flex;
  align-items: center;
  margin: 5px;
}

.nav-city .nav-city-selected {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 84px;
  vertical-align: middle;
  font-weight: bold;
}

.nav-city .icon-poi {
  display: inline-block;
  vertical-align: top;
  width: 18px;
  height: 18px;
  /* background: url(https://img.bosszhipin.com/static/file/2023/umua62pczi1679922532668.png) 0 -18px/18px auto no-repeat; */
  margin: 16px 3px 0 24px;
}

.nav-city .switchover-city {
  font-size: 12px;
  color: #fff;
  margin-left: 10px;
}

.nav-city .city-box {
  top: 49px;
}

.nav-city .city-box {
  font-size: 14px;
}
</style>
