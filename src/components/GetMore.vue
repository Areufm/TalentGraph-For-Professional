<template>
  <button>查看更多</button>
</template>

<script setup></script>

<style scoped lang="scss">
button {
  width: 200px;
  padding: 1.2em 3em;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 600px;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #008bf8;
    /* background-color: #23c483; */
    box-shadow: 0px 15px 20px rgba(78, 95, 203, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }

  &:active {
    transform: translateY(-1px);
  }
}
</style>
