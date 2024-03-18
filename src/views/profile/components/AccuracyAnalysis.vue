<template>
  <div class="block">
    <el-card class="box-card block">
      <h2 style="color: purple">准确性分析</h2>
      <h3 style="color: #678ea1">预测用户编号：</h3>
      <p>{{ user.id }}</p>
      <h3 style="color: #678ea1">结果判定：</h3>
      <p>置信度大于{{ user.zhiXin }}%,预测与真实情况相符</p>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "王五",
        role: "Admin",
        id: "T000323858224717",
        zhiXin: "60",
        recognitionTime: "2023年4月12日 17:17 PM",
        certificationResult: "高级会员",
        confidenceDegree: "92%",
        isSignIn: "已注册",
      },
    };
  },
};
</script>

<style scoped>
.margin10 {
  margin: 10px;
}
.box-card {
  width: 580px;
  margin: 10px;
}

.block {
  display: block;
}
</style>
