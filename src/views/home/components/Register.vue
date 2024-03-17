<template>
  <form
    class="form"
    :ref="registerForm"
    :rules="registerRules"
    :model="registerForm"
    auto-complete="off"
    label-position="left"
  >
    <p class="title">Register</p>
    <p class="message">注册A15赛题账号.</p>

    <label>
      <input
        required=""
        placeholder=""
        type="text"
        class="input"
        :key="passwordType"
        :ref="username"
        v-model="registerForm.username"
        name="username"
        tabindex="1"
        autocomplete="off"
      />
      <span>用户名</span>
    </label>

    <!-- <label>
      <input required="" placeholder="" type="email" class="input" />
      <span>Email</span>
    </label> -->

    <label>
      <input
        required=""
        placeholder=""
        class="input"
        :key="passwordType"
        :ref="registerForm.password"
        v-model="registerForm.password"
        :type="passwordType"
        name="password"
        tabindex="2"
        auto-complete="off"
        @keyup.enter.native="handleRegister()"
      />
      <span>密码</span>
      <el-icon class="icon-right" @click="showPwd">
        <i-ep-view v-if="isShow" />
        <i-ep-hide v-else />
      </el-icon>
    </label>
    <label>
      <input
        required=""
        placeholder=""
        class="input"
        :key="passwordConfirmType"
        :ref="registerForm.password_confirm"
        v-model="registerForm.password_confirm"
        :type="passwordConfirmType"
        name="password_confirm"
        tabindex="3"
        auto-complete="off"
        @keyup.enter.native="handleRegister()"
      />
      <span>确认密码</span>
      <el-icon class="icon-right" @click="showPwd_confirm">
        <i-ep-view v-if="isShow_confirm" />
        <i-ep-hide v-else />
      </el-icon>
    </label>
    <button class="submit" :plain="true" @click="handleRegister">注册</button>
    <p class="signin">已经有一个账户 ? <a href="/login">去登陆</a></p>
    <p class="signin">暂不注册 <a href="/">返回首页</a></p>
  </form>
</template>

<script setup>
import { ref, reactive, watch, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { validUsername } from "@/utils/validate";

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
  if (registerForm.password !== registerForm.password_confirm) {
    callback(new Error("两次密码不相同！"));
  } else {
    callback();
  }
};

const registerForm = reactive({
  username: "",
  password: "",
  password_confirm: "",
});

const registerRules = reactive({
  username: [{ required: true, trigger: "blur", validator: validateUsername }],
  password: [
    { required: true, trigger: "change", validator: validatePassword },
  ],
  password_confirm: [
    { required: true, trigger: "blur", validator: validatePasswordConfirm },
  ],
});

const isShow = ref(true);
const isShow_confirm = ref(true);
const passwordType = ref("password");
const passwordConfirmType = ref("password");
const redirect = ref(undefined);
const route = useRoute();
const router = useRouter();

const showPwd = () => {
  passwordType.value = passwordType.value === "password" ? "" : "password";
  isShow.value = !isShow.value;
  // nextTick(() => {
  //   registerForm.password.focus();
  // });
};

const showPwd_confirm = () => {
  if (passwordConfirmType.value === "password") {
    passwordConfirmType.value = "";
  } else {
    passwordConfirmType.value = "password";
  }
  isShow_confirm.value = !isShow_confirm.value;
  // nextTick(() => {
  //   registerForm.password_confirm.value.focus();
  // });
};

const handleRegister = () => {
  ElNotification({
    title: "注册成功！",
    message: "This is a success message",
    type: "success",
  });
  router.push("/login");
};
</script>

<style scoped>
input[type="password"]::-ms-reveal {
  display: none;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 350px;
  background-color: #ffffff;
  padding: 30px;
  border: rgba(88, 87, 87, 0.822) solid 2px;
  border-radius: 20px;
  /* position: absolute; 
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
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
}

.title::before,
.title::after {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: royalblue;
}

.title::before {
  width: 18px;
  height: 18px;
  background-color: royalblue;
}

.title::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
}

.message,
.signin {
  color: rgba(88, 87, 87, 0.822);
  font-size: 14px;
}

.signin {
  text-align: center;
  margin: 5px;
}

.signin a {
  color: royalblue;
}

.signin a:hover {
  text-decoration: underline royalblue;
}

.flex {
  display: flex;
  width: 100%;
  gap: 6px;
}

.form label {
  position: relative;
}
.form label .icon-right {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.form label .input {
  width: 95%;
  padding: 10px 10px 20px 10px;
  outline: 0;
  border: 1px solid rgba(105, 105, 105, 0.397);
  border-radius: 10px;
}

.form label .input + span {
  position: absolute;
  left: 10px;
  top: 15px;
  color: grey;
  font-size: 0.9em;
  cursor: text;
  transition: 0.3s ease;
}

.form label .input:placeholder-shown + span {
  top: 15px;
  font-size: 0.9em;
}

.form label .input:focus + span,
.form label .input:valid + span {
  top: 30px;
  font-size: 0.7em;
  font-weight: 600;
}

.form label .input:valid + span {
  color: green;
}

.submit {
  border: none;
  outline: none;
  background-color: royalblue;
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  transform: 0.3s ease;
}

.submit:hover {
  background-color: rgb(56, 90, 194);
}

.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: #888888;
  cursor: pointer;
  user-select: none;
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
</style>
