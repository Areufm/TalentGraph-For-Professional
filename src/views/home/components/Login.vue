<template>
  <form class="form">
    <h3 style="margin-top: auto">登录职业猫CareerCat</h3>

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
  </form>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { validUsername } from "@/utils/validate";
import { useAuthStore } from "@/stores/auth";

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
    message: "恭喜你成功登录",
    type: "success",
    offset: 50,
  });
  authStore.login();
  console.log(authStore.isLogin);
  router.push("/form");
};
</script>

<style scoped>
.form {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  /* background-color: #ffffff; */
  padding: 30px;
  border: 2px rgba(137, 191, 230, 0.822) solid;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  margin: 0 auto;
}

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
  background-color: transparent;
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
