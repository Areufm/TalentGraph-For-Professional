<template>
  <div class="card">
    <div class="left">
      <PersonCard />
    </div>
    <div class="right">
      <div class="rleft">推荐入口</div>
      <div class="rright">
        <div class="rrtop">能力评价入口</div>
        <div class="rrbottom">简历上传入口</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PersonCard from "@/components/PersonCard.vue";
</script>

<style scoped>
.card {
  display: flex;
  margin: 20px 100px;
}
.left {
  height: 300px;
  flex: 2;
  width: 400px;
  /* border: 2px rgba(161, 159, 159, 0.682) solid; */
  border-radius: 10px;
  margin: 10px;
  display: flex;
}
.right {
  height: 300px;
  flex: 3;
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
