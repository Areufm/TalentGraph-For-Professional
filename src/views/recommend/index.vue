<template>
  <div>
    <!-- 搜索栏 -->
    <!-- <el-card id="search">
      <el-row>

        <el-col :span="20">
          <el-input v-model="searchModel.username" placeholder="用户名" clearable />
          <el-input v-model="searchModel.phone" placeholder="电话" clearable />
          <el-button type="primary" icon="el-icon-search" @click="getUserList">查询</el-button>
        </el-col>

        <el-col :span="4" align="right">
          <el-button type="primary" icon="el-icon-plus" circle @click="openEditUI(null)" />
        </el-col>
      </el-row>
    </el-card> -->

    <!-- 结果列表 -->
    <el-card>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column label="#" width="80">
          <template slot-scope="scope">
            {{
        (searchModel.pageNo - 1) * searchModel.pageSize + scope.$index + 1
      }}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="id" label="用户ID" width="180" /> -->
        <el-table-column prop="username" label="用户名" width="130" />
        <el-table-column prop="degree" label="学历" width="130" />
        <el-table-column prop="phone" label="电话" width="150" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="area" label="求职地区" />
        <el-table-column prop="skill" label="技能点" />

      </el-table>
    </el-card>

    <!-- 分页 -->
    <el-pagination :current-page="searchModel.pageNo" :page-sizes="[5, 10, 20, 50]" :page-size="searchModel.pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />

    <!-- 用户信息编辑对话框 -->
    <el-dialog :visible.sync="dialogFormVisible" :title="title" @close="clearForm">
      <el-form ref="userFormRef" :rules="rules" :model="userForm">
        <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
          <el-input v-model="userForm.username" autocomplete="off" />
        </el-form-item>
        <!-- <el-form-item v-if="userForm.id == null || userForm.id === undefined" label="用户密码" prop="password"
          :label-width="formLabelWidth">
          <el-input v-model="userForm.password" type="password" autocomplete="off" />
        </el-form-item> -->
        <el-form-item label="学历" prop="degree" :label-width="formLabelWidth">
          <el-input v-model="userForm.degree" autocomplete="off" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="userForm.phone" autocomplete="off" />
        </el-form-item>
        <!-- <el-form-item label="用户状态" :label-width="formLabelWidth">
          <el-switch v-model="userForm.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
        <el-form-item label="用户角色" :label-width="formLabelWidth">
          <el-select v-model="userForm.roleIdList" multiple placeholder="请选择角色">
            <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id" />
          </el-select>
        </el-form-item> -->
        <el-form-item label="电子邮件" prop="email" :label-width="formLabelWidth">
          <el-input v-model="userForm.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="求职地区" prop="area" :label-width="formLabelWidth">
          <el-input v-model="userForm.area" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import userApi from "@/api/userManage";
import roleApi from "@/api/roleManage";
export default {
  data() {
    return {
      tableData: [{
        username: "孟先生",
        degree: "专科",
        phone: "13106423939",
        email: "1528682773@qq.com",
        area: "浙江省杭州市余杭区",
        skill: "HTML5, HTML, CSS, uniapp"
      }, {
        username: "雷朗诚",
        degree: "专科",
        phone: "15308122951",
        email: "2736627458@qq.com",
        area: "浙江省杭州市滨江区",
        skill: "ui, H5, web, element, vue, nodeJS, Angular"
      }, {
        username: "魏女士",
        degree: "硕士",
        phone: "15600877454",
        email: "1276214349@qq.com",
        area: "浙江省杭州市余杭区",
        skill: "Visio, TypeScript, Angular"
      },
      {
        username: "陈育",
        degree: "本科",
        phone: "13701957229",
        email: "779236698@qq.com",
        area: "浙江省杭州市滨江区",
        skill: "前端, JQuery, HTML, uni-app, CSS, Javascript, vue"
      },
      {
        username: "舒先生",
        degree: "博士",
        phone: "13508621097",
        email: "768693658@qq.com",
        area: "浙江省杭州市滨江区",
        skill: "proe, Spring, SpringMVC, JQuery, C, Angular, vue, word, Excel, AutoCAD, MyBatis, ajax, bootstrap, React, Office, JS"
      },
      {
        username: "任女士",
        degree: "本科",
        phone: "15205590255",
        email: "2409555013@qq.com",
        area: "浙江省杭州市滨江区",
        skill: "前端, ECharts, HTML, CSS, Javascript, Angular, JS"
      },
      {
        username: "袁君茜",
        degree: "本科",
        phone: "15008416316",
        email: "1144654256@qq.com",
        area: "浙江省杭州市西湖区",
        skill: "Python, PHP, 小程序, JQuery, CSS, element, HTML5, Java, JS"
      },
      {
        username: "马思",
        degree: "专科",
        phone: "13304234929",
        email: "1325795816@qq.com",
        area: "浙江省杭州市滨江区",
        skill: "web, IDEA, app, 小程序, HTML, C++, CSS, Android, Javascript, w3c, uniapp, vue, nodeJS, IOS"
      },
      {
        username: "柏瑗",
        degree: "本科",
        phone: "15900432720",
        email: "1206881089@qq.com",
        area: "浙江省杭州市余杭区",
        skill: "HTML, CSS, Javascript, uniapp, 英语, JS"
      },
      {
        username: "危翠",
        degree: "硕士",
        phone: "15704080686",
        email: "23232@qq.com",
        area: "浙江省杭州市余杭区",
        skill: "JQuery, HTML, CSS, Javascript, HTML5, uniapp, vue, bootstrap, React, Angular, JS"
      }

      ],
      roleList: [],
      formLabelWidth: "130px",
      userForm: {
        roleIdList: [],
      },
      dialogFormVisible: false,
      title: "",
      total: 0,
      searchModel: {
        pageNo: 1,
        pageSize: 10,
      },
      userList: [],
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: ["blur", "change"],
          },
        ],
        phone: [
          { required: true, message: "请输入电话", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "长度为 11 个字符",
            trigger: ["blur", "change"],
          },
        ],
        email: [
          { required: true, message: "请输入电子邮件", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的电子邮件",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  created() {
    this.getUserList();
    this.getAllRoleList();
  },
  methods: {
    getAllRoleList() {
      roleApi.getAllRoleList().then((response) => {
        this.roleList = response.data;
        console.log(this.roleList);
      });
    },
    deleteUser(user) {
      this.$confirm("确认删除该用户吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          userApi.deleteUserByID(user.id).then((response) => {
            this.$message({
              message: `${user.username}删除成功!`,
              type: "success",
            });
            this.getUserList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    saveUser() {
      this.$refs.userFormRef.validate((valid) => {
        if (valid) {
          userApi.saveUser(this.userForm).then((response) => {
            this.$message({
              message: "保存成功",
              type: "success",
            });
            this.dialogFormVisible = false;
            this.getUserList();
          });
        }
      });
    },
    clearForm() {
      this.userForm = {
        roleIdList: [],
      };
      this.$refs.userFormRef.clearValidate();
    },
    openEditUI(id) {
      if (id == null) {
        this.title = "新增用户";
      } else {
        this.title = "修改用户";
        userApi.getUserByID(id).then((response) => {
          this.userForm = response.data;
        });
      }
      this.dialogFormVisible = true;
    },
    handleSizeChange(pageSize) {
      this.searchModel.pageSize = pageSize;
      this.getUserList();
    },
    handleCurrentChange(pageNo) {
      this.searchModel.pageNo = pageNo;
      this.getUserList();
    },
    getUserList() {
      userApi.getUserList(this.searchModel).then((response) => {
        this.userList = response.data.rows;
        this.total = response.data.total;
      });
    },
  },
};
</script>

<style>
#search .el-input {
  width: 250px;
  margin-right: 10px;
}

.el-dialog .el-input {
  width: 80%;
}
</style>
