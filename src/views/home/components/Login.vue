<template>
  <form class="form" @submit.prevent="handleLogin">
    <h3 style="margin-top: auto">登录职链智图CareerLink Graph</h3>

    <label>
      <input required type="text" v-model="LoginForm.username" class="input" />
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

    <button class="submit" @click="handleLogin">登录</button>
    <p class="signin">暂时没有账户 ? <a href="/register">去注册</a></p>
  </form>
</template>

<script lang="ts" setup>
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

const isShow = ref(false);
const passwordType = ref("password");
const redirect = ref(undefined);
const route = useRoute();
const router = useRouter();

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
        console.log("w登录成功！");

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

<style scoped lang="scss">
.form {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  padding: 30px;
  border: 2px rgba(137, 191, 230, 0.822) solid;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  margin: 0 auto;

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

.flex {
  display: flex;
  width: 100%;
  gap: 6px;
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
