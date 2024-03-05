<template>
  <div class="card">
    <div class="left"></div>
    <div class="right">
      <div class="rleft"></div>
      <div class="rright">
        <div class="rrtop"></div>
        <div class="rrbottom"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
</script>

<style scoped>
.card {
  display: flex;
}
.left {
  height: 300px;
  flex: 1;
  border: 2px rgba(161, 159, 159, 0.682) solid;
  border-radius: 10px;
  margin: 10px;
}
.right {
  height: 300px;
  flex: 2;
  border: 2px rgba(161, 159, 159, 0.682) solid;
  border-radius: 10px;
  margin: 10px;
  display: flex;
}
.rleft {
  height: 280px;
  flex: 2;
  border: 2px rgba(161, 159, 159, 0.682) solid;
  border-radius: 10px;
  margin: 10px;
}
.rright {
  height: 280px;
  flex: 1;
  border: 2px rgba(161, 159, 159, 0.682) solid;
  border-radius: 10px;
  margin: 10px;
}
.rrtop {
  height: 120px;
  border: 2px rgba(161, 159, 159, 0.682) solid;
  border-radius: 10px;
  margin: 10px;
}
.rrbottom {
  height: 120px;
  border: 2px rgba(161, 159, 159, 0.682) solid;
  border-radius: 10px;
  margin: 10px;
}
</style>
