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
  <h1 style="position: absolute; top: 7%; left: 10%;">欢迎使用职业猫CareerCat用户端</h1>
  <img src="../../assets/login.png" alt="" style="width: 700px; position: absolute; top:20%; left: 10%">
  <form class="form">
    <p class="title">Login</p>
    <p class="message">登录职业猫CareerCat</p>

    <label>
      <input required="" placeholder="" type="text" class="input" />
      <span>用户名</span>
    </label>

    <label>
      <input required="" placeholder="" type="password" class="input" />
      <span>密码</span>
    </label>
    <button class="submit" @click="handleLogin">登录</button>
    <p class="signin">暂时没有账户 ? <a href="/register">去注册</a></p>
    <p class="signin">暂不注册 <a href="/">返回首页</a></p>
  </form>
</template>

<script setup>
import { ref, reactive } from "vue";
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

const LoginForm = reactive({
  username: "",
  password: "",
  password_confirm: "",
});

const loginRules = reactive({
  username: [{ required: true, trigger: "blur", validator: validateUsername }],
  password: [
    { required: true, trigger: "change", validator: validatePassword },
  ],
});

const isShow = ref(true);
const isShow_confirm = ref(true);
const passwordType = ref("password");
const redirect = ref(undefined);
const route = useRoute();
const router = useRouter();

const showPwd = () => {
  passwordType.value = passwordType.value === "password" ? "" : "password";
  isShow.value = !isShow.value;
};

const showPwd_confirm = () => {
  if (passwordConfirmType.value === "password") {
    passwordConfirmType.value = "";
  } else {
    passwordConfirmType.value = "password";
  }
  isShow_confirm.value = !isShow_confirm.value;
};

const handleLogin = () => {
  ElNotification({
    title: "登录成功！",
    message: "This is a success message",
    type: "success",
  });
  router.push("/");
};
</script>

<style scoped>
.form {
  display: flex;
  width: 50%;
  flex-direction: column;
  gap: 10px;
  max-width: 350px;
  background-color: #ffffff;
  padding: 30px;
  border: rgba(88, 87, 87, 0.822) solid 2px;
  border-radius: 20px;
  position: absolute;
  top: 50%;
  left: 70%;
  transform: translate(-50%, -50%);
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

.form label .input {
  width: 95%;
  padding: 10px 10px 20px 10px;
  outline: 0;
  border: 1px solid rgba(105, 105, 105, 0.397);
  border-radius: 10px;
}

.form label .input+span {
  position: absolute;
  left: 10px;
  top: 15px;
  color: grey;
  font-size: 0.9em;
  cursor: text;
  transition: 0.3s ease;
}

.form label .input:placeholder-shown+span {
  top: 15px;
  font-size: 0.9em;
}

.form label .input:focus+span,
.form label .input:valid+span {
  top: 30px;
  font-size: 0.7em;
  font-weight: 600;
}

.form label .input:valid+span {
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
