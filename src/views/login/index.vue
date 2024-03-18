<template>
  <div class="login-container">
    <el-form
      :ref="showLogin ? 'loginForm' : 'registerForm'"
      :model="showLogin ? loginForm : registerForm"
      :rules="showLogin ? loginRules : registerRules"
      class="login-form"
      auto-complete="off"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">欢迎使用职业猫企业端</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          :key="passwordType"
          ref="username"
          :value="showLogin ? loginForm.username : registerForm.username"
          @input="
            showLogin
              ? (loginForm.username = $event)
              : (registerForm.username = $event)
          "
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          :value="showLogin ? loginForm.password : registerForm.password"
          @input="
            showLogin
              ? (loginForm.password = $event)
              : (registerForm.password = $event)
          "
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="off"
          @keyup.enter.native="showLogin ? handleLogin() : handleRegister()"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-form-item prop="password_confirm" v-if="!showLogin">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordConfirmType"
          ref="password_confirm"
          :value="registerForm.password_confirm"
          @input="registerForm.password_confirm = $event"
          :type="passwordConfirmType"
          placeholder="确认密码"
          name="password_confirm"
          tabindex="3"
          auto-complete="off"
          @keyup.enter.native="handleRegister()"
        />
        <span class="show-pwd" @click="showPwd_confirm">
          <svg-icon
            :icon-class="
              passwordConfirmType === 'password' ? 'eye' : 'eye-open'
            "
          />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="showLogin ? handleLogin() : handleRegister()"
      >
        {{ showLogin ? "登录" : "注册" }}
      </el-button>
      <a style="color: white" @click="showLogin = !showLogin">
        {{ showLogin ? "没有账号，去注册" : "已有账号，去登陆" }}
      </a>

      <!-- <div class="tips">
        <span style="margin-right: 20px">username: admin</span>
        <span> password: any</span>
      </div> -->
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";

export default {
  name: "Login",
  data() {
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
    const validatePasswordConfirm = (rule, value, callback) => {
      if (this.registerForm.password != this.registerForm.password_confirm) {
        callback(new Error("两次密码不相同！"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },
      registerForm: {
        username: "",
        password: "",
        password_confirm: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "change", validator: validatePassword },
        ],
      },
      registerRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "change", validator: validatePassword },
        ],
        password_confirm: [
          {
            required: true,
            trigger: "blur",
            validator: validatePasswordConfirm,
          },
        ],
      },
      loading: false,
      passwordType: "password",
      passwordConfirmType: "password",
      redirect: undefined,
      showLogin: true,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    showPwd_confirm() {
      if (this.passwordConfirmType === "password") {
        this.passwordConfirmType = "";
      } else {
        this.passwordConfirmType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password_confirm.focus();
      });
    },
    // changeForm() {
    //   this.showLogin = !this.showLogin;

    //   if (!this.showLogin) {
    //     this.loginForm.username = "";
    //     this.loginForm.password = "";
    //   } else {
    //     this.registerForm.username = "";
    //     this.registerForm.password = "";
    //     this.registerForm.password_confirm = "";
    //   }
    // },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleRegister() {
      this.$notify({
        title: "注册成功",
        message: "恭喜你账号注册成功！",
        type: "success",
      });
      this.showLogin = !this.showLogin;
    },
    // handleRegister() {
    //   this.$refs.registerForm.validate((valid) => {
    //     if (valid) {
    //       this.loading = true;
    //       this.$store
    //         .dispatch("user/register", this.registerForm)
    //         .then(() => {
    //           this.$router.push({ path: "/" });
    //           this.$notify({
    //             title: "注册成功",
    //             message: "恭喜你账号注册成功！",
    //             type: "success",
    //           });
    //           showLogin = true;
    //           this.loading = false;
    //         })
    //         .catch(() => {
    //           this.loading = false;
    //         });
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

input[type="password"]::-ms-reveal {
  display: none;
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      // -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  // background-image: url('../../../src/assets/bg.jpg');
  background-size: 100%;

  display: flex;
  align-items: center;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
