<!-- <template>
  <div class="login">
    <div class="left">
      <button style="margin: 5px auto" @click="isLogin = !isLogin">
        我要招聘
      </button>
      <button style="margin: 5px auto" @click="isLogin = !isLogin">
        我要求职
      </button>
    </div>
    <div class="right">
      <div v-if="isLogin">
        <Login />
      </div>
      <div v-else>
        <Register />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";

const isLogin = ref(true);
</script>

<style scoped>
.login {
  /* width: 80%; */
  /* max-width: 500px; */
  width: 700px;
  display: flex;
  border: 2px black solid;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.left {
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 5px;
  border: 2px black solid;
}
.right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5px;
  border: 2px black solid;
  flex: 2;
}
</style> -->
<template>
  <h1 style="position: absolute; top: 7%; left: 10%; color: royalblue">
    欢迎使用职业猫CareerCat用户端
  </h1>
  <div class="login">
    <div class="left">
      <img src="../../assets/login.png" alt="" style="" />
    </div>
    <div class="right">
      <!-- <form class="form">
        <p class="title">Login</p>
        <p class="message">登录职业猫CareerCat</p>

        <label>
          <input required="" placeholder="" type="text" class="input" />
          <span>用户名</span>
        </label>

        <label>
          <input required="" placeholder="" :type="passwordType" class="input" />
          <span>密码</span>
          <el-icon class="icon-right" @click="showPwd">
            <i-ep-view v-if="isShow" />
            <i-ep-hide v-else />
          </el-icon>
        </label>
        <button class="submit" @click="handleLogin">登录</button>
        <p class="signin">暂时没有账户 ? <a href="/register">去注册</a></p>
        <p class="signin">暂不注册 <a href="/">返回首页</a></p>
      </form> -->
      <el-form
        :model="LoginForm"
        :rules="loginRules"
        ref="loginFormRef"
        label-width="80px"
        class="form"
      >
        <p class="title">Login</p>
        <p class="message">登录职业猫CareerCat</p>

        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="LoginForm.username"
            placeholder="请输入用户名"
            class="input"
          />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            :type="passwordType"
            v-model="LoginForm.password"
            placeholder="请输入密码"
            class="input"
            show-password
          />
        </el-form-item>

        <el-button type="primary" class="submit" @click="handleLogin">
          登录
        </el-button>

        <p class="signin">暂时没有账户? <a href="/register">去注册</a></p>
        <p class="signin">暂不注册 <a href="/">返回首页</a></p>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { validUsername } from "@/utils/validate";
import { useAuthStore } from "@/store/auth";
import { login } from "@/api/user";
import { storage } from "@/utils/storage";

const authStore = useAuthStore();

const validateUsername = (rule, value, callback) => {
  if (!validUsername(value)) {
    callback(new Error("请输入正确的用户名"));
  } else {
    callback();
  }
};

const validatePassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error("密码不能少于6位"));
  } else {
    callback();
  }
};

const LoginForm = ref({
  username: "",
  password: "",
});

const loginRules = reactive({
  username: [{ required: true, trigger: "blur", validator: validateUsername }],
  password: [
    { required: true, trigger: "change", validator: validatePassword },
  ],
});

const passwordType = ref("password");
const redirect = ref(undefined);
const route = useRoute();
const router = useRouter();

const handleLogin = () => {
  console.log("Loginform:", LoginForm.value);
  login(LoginForm.value)
    .then((res) => {
      const { data } = res; //data是后端返回的数据
      storage.set("accessToken", data.accessToken); //accessToken是后端返回的token
      storage.set("refreshToken", data.refreshToken);
      console.log(data);
      authStore.login();
      router.push("/form");
      ElNotification({
        title: "登录成功！",
        message: "恭喜你成功登录",
        type: "success",
        offset: 50,
      });
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("登陆失败");
    });
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 20%;
  left: 10%;
  align-items: center;

  .left {
    width: 50%;
    background: transparent;

    img {
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  }

  .right {
    width: 50%;
  }

  .form {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 10px;
    max-width: 350px;
    background-color: #ffffff;
    padding: 30px;
    border: rgba(88, 87, 87, 0.822) solid 2px;
    border-radius: 20px;

    label {
      position: relative;

      .icon-right {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
      }

      .input {
        width: 95%;
        padding: 10px 10px 20px 10px;
        outline: 0;
        border: 1px solid rgba(105, 105, 105, 0.397);
        border-radius: 10px;

        & + span {
          position: absolute;
          left: 10px;
          top: 15px;
          color: grey;
          font-size: 0.9em;
          cursor: text;
          transition: 0.3s ease;
        }

        &:placeholder-shown + span {
          top: 15px;
          font-size: 0.9em;
        }

        &:focus + span,
        &:valid + span {
          top: 30px;
          font-size: 0.7em;
          font-weight: 600;
        }

        &:valid + span {
          color: green;
        }
      }
    }

    .submit {
      border: none;
      outline: none;
      background-color: royalblue;
      padding: 10px;
      border-radius: 10px;
      color: #fff;
      font-size: 16px;
      transition: 0.3s ease;

      &:hover {
        background-color: rgb(56, 90, 194);
      }
    }
  }

  .title {
    font-size: 28px;
    color: royalblue;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;

    &::before,
    &::after {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      border-radius: 50%;
      left: 0px;
      background-color: royalblue;
    }

    &::before {
      width: 18px;
      height: 18px;
    }

    &::after {
      width: 18px;
      height: 18px;
      animation: pulse 1s linear infinite;
    }
  }

  .message,
  .signin {
    color: rgba(88, 87, 87, 0.822) !important;
    font-size: 14px !important;

    &.signin {
      text-align: center !important;

      a {
        color: royalblue !important;

        &:hover {
          text-decoration: underline royalblue !important;
        }
      }
    }
  }

  .flex {
    display: flex !important;
    width: 100% !important;
    gap: 6px !important;
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }

    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }
}
</style>
