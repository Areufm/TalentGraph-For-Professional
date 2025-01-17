<template>
  <div class="register">
    <div class="left">
      <h1 style="color: royalblue">欢迎注册职业猫CareerCat用户端</h1>
      <img :src="loginImg" alt="" style="" />
    </div>
    <div class="right">
      <form class="form" @submit.prevent="handleRegister">
        <p class="title">Register</p>
        <p class="message">注册职业猫CareerCat</p>

        <label>
          <input
            required
            type="text"
            v-model="RegisterForm.username"
            class="input"
          />
          <span>用户名</span>
        </label>

        <label>
          <input
            required
            :type="passwordType"
            v-model="RegisterForm.password"
            class="input"
          />
          <span>密码</span>
          <el-icon class="icon-right" @click="togglePassword">
            <i-ep-view v-if="isShow" />
            <i-ep-hide v-else />
          </el-icon>
        </label>

        <label>
          <input
            required
            :type="passwordTypeConfirm"
            v-model="RegisterForm.password_confirm"
            class="input"
          />
          <span>确认密码</span>
          <el-icon class="icon-right" @click="togglePasswordConfirm">
            <i-ep-view v-if="isShowConfirm" />
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
          <button class="submit" type="submit">注册</button>
          <p class="signin">已有账户? <a href="/login">去登录</a></p>
          <p class="signin">暂不登录 <a href="/">返回首页</a></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import loginImg from "@/assets/img/login.png";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const RegisterForm = ref({
  username: "",
  password: "",
  password_confirm: "",
});

const passwordType = ref("password"); // 密码输入框类型
const passwordTypeConfirm = ref("password"); // 确认密码输入框类型
const isShow = ref(false); // 是否显示密码
const isShowConfirm = ref(false); // 是否显示确认密码

// 切换密码显示/隐藏
const togglePassword = () => {
  isShow.value = !isShow.value;
  passwordType.value = isShow.value ? "text" : "password";
};

// 切换确认密码显示/隐藏
const togglePasswordConfirm = () => {
  isShowConfirm.value = !isShowConfirm.value;
  passwordTypeConfirm.value = isShowConfirm.value ? "text" : "password";
};

// 处理注册
const handleRegister = () => {
  ElNotification({
    title: "注册成功！",
    message: "恭喜你成功注册",
    type: "success",
    offset: 50,
  });
  router.push("/login");
};
</script>

<style lang="scss" scoped>
.register {
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
