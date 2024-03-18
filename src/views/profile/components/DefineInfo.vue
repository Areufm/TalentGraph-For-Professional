<template>
  <div class="block">
    <!-- <el-button plain @click="open1" class="block margin10"> 成功 </el-button> -->
    <table>
      <tr>
        <th>识别时间</th>
        <td>{{ user.recognitionTime }}</td>
      </tr>
      <tr>
        <th>认证结果</th>
        <td>
          <el-button type="success" round>{{
            user.certificationResult
          }}</el-button>
        </td>
      </tr>
      <tr>
        <th>企业名</th>
        <td>{{ user.company }}</td>
      </tr>
      <tr>
        <th>是否已经注册</th>
        <td>
          <el-button type="primary" round>{{ user.isSignIn }}</el-button>
        </td>
      </tr>
    </table>
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
        company: "职业猫有限公司",
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

.flex {
  display: flex;
  margin: 10px;
}

.block {
  display: block;
}

table {
  border-collapse: collapse;
  width: 580px;
  margin: 10px;
}

th,
td {
  border: 0.5px solid rgb(184, 174, 174);
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  width: 30%;
  padding-left: 15px;
}

tr {
  height: 55px;
}
</style>
