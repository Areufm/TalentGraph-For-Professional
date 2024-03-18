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
    <button class="submit">登录</button>
    <p class="signin">暂时没有账户 ? <a href="/register">去注册</a></p>
  </form>
</template>

<script setup>
import { ref } from "vue";
</script>

<style scoped>
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
