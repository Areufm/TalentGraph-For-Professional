<template>
  <div class="login">
    <div class="left">
      <h1 style="color: royalblue">欢迎使用职业猫CareerCat用户端</h1>
      <img :src="loginImg" alt="" style="" />
    </div>
    <div class="right">
      <form class="form" @submit.prevent="handleLogin">
        <p class="title">Login</p>
        <p class="message">登录职业猫CareerCat</p>

        <label>
          <input
            required
            type="text"
            v-model="LoginForm.username"
            class="input"
          />
          <span>用户名</span>
        </label>

        <label>
          <input
            required
            :type="passwordType"
            v-model="LoginForm.password"
            class="input"
          />
          <span>密码</span>
          <el-icon class="icon-right" @click="togglePassword">
            <i-ep-view v-if="isShow" />
            <i-ep-hide v-else />
          </el-icon>
        </label>

        <div
          style="
            width: 100%;
            height: 90px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          "
        >
          <button class="submit" type="submit">登录</button>
          <p class="signin">暂时没有账户? <a href="/register">去注册</a></p>
          <p class="signin">暂不注册 <a href="/">返回首页</a></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import loginImg from "@/assets/img/login.png";
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { validUsername } from "@/utils/validate";
import { useAuthStore } from "@/store/auth";
import { getUserInfoByToken, login } from "@/api/user";
import { storage } from "@/utils/storage";
const authStore = useAuthStore();

const validateUsername = (rule: any, value: string, callback: Function) => {
  if (!validUsername(value)) {
    callback(new Error("请输入正确的用户名"));
  } else {
    callback();
  }
};

const validatePassword = (rule: any, value: string, callback: Function) => {
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
const isShow = ref(false);

// 切换密码显示/隐藏
const togglePassword = () => {
  isShow.value = !isShow.value;
  passwordType.value = isShow.value ? "text" : "password";
};

const getUserInfoData = async (accessToken: string) => {
  const res = await getUserInfoByToken(accessToken);
  const { data } = res;
  authStore.setUserInfo(data);
};

// 处理登录
const handleLogin = () => {
  console.log("LoginForm:", LoginForm.value);
  login(LoginForm.value)
    .then((res) => {
      const { data } = res; //data是后端返回的数据
      const { accessToken, refreshToken, id } = data;
      if (id == 1) {
        storage.set("accessToken", accessToken);
        storage.set("refreshToken", refreshToken);
        getUserInfoData(accessToken);
        router.push("/");
        authStore.login();
        ElNotification({
          title: "登录成功！",
          message: "恭喜你成功登录",
          type: "success",
          offset: 50,
        });
      } else if (id == 2) {
        storage.set("accessToken", accessToken);
        storage.set("refreshToken", refreshToken);
        router.push("/form");
        ElNotification({
          title: "登录成功！",
          message: "请上传简历以继续使用",
          type: "success",
          offset: 50,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("登陆失败");
    });
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: transparent;

    h1 {
      position: absolute;
      top: 20px;
      margin-bottom: 20px;
    }

    img {
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  }

  .right {
    flex: 2;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    width: 400px;
    height: 450px;
    min-width: 400px;
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
        width: 100%;
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
      width: 100%;
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
