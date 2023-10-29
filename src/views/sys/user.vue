<template>
  <div>
    <!-- 搜索栏 -->
    <el-card id="search">
      <el-row>
        <el-col :span="20">
          <el-input v-model="searchModel.username" placeholder="用户名" clearable />
          <el-input v-model="searchModel.phone" placeholder="电话" clearable />
          <el-button type="primary" icon="el-icon-search" @click="getUserList">查询</el-button>
        </el-col>
        <el-col :span="4" align="right">
          <el-button type="primary" icon="el-icon-plus" circle @click="openEditUI" />
        </el-col>
      </el-row>
    </el-card>

    <!-- 结果列表 -->
    <el-card>
      <el-table
        :data="userList"
        stripe
        style="width: 100%"
      >
        <el-table-column
          label="#"
          width="80"
        >
          <template slot-scope="scope">
            {{ (searchModel.pageNo - 1) * searchModel.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="用户ID"
          width="180"
        />
        <el-table-column
          prop="username"
          label="用户名"
          width="180"
        />
        <el-table-column
          prop="phone"
          label="电话"
          width="180"
        />
        <el-table-column
          prop="email"
          label="邮箱"
        />
        <el-table-column
          label="操作"
          width="180"
        />
      </el-table>
    </el-card>

    <!-- 分页 -->
    <el-pagination
      :current-page="searchModel.pageNo"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="searchModel.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!-- 用户信息编辑对话框 -->
    <el-dialog :visible.sync="dialogFormVisible" :title="title" @close="clearForm">
      <el-form :rules="rules" :model="userForm">
        <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
          <el-input v-model="userForm.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="userForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="userForm.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户状态" :label-width="formLabelWidth">
          <el-switch
            v-model="userForm.status"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="电子邮件" prop="email" :label-width="formLabelWidth">
          <el-input v-model="userForm.email" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import userApi from '@/api/userManage'
export default {
  data() {
    return {
      formLabelWidth: '130px',
      userForm: {},
      dialogFormVisible: false,
      title: '',
      total: 0,
      searchModel: {
        pageNo: 1,
        pageSize: 10
      },
      userList: [],
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: ['blur', 'change'] }
        ],
        phone: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { min: 11, max: 11, message: '长度为 11 个字符', trigger: ['blur', 'change'] }
        ],
        email: [
          { required: true, message: '请输入电子邮件', trigger: 'blur' },
          { type: 'email', message: '请输入正确的电子邮件', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    clearForm() {
      this.userForm = {}
    },
    openEditUI() {
      this.title = '新增用户'
      this.dialogFormVisible = true
    },
    handleSizeChange(pageSize) {
      this.searchModel.pageSize = pageSize
      this.getUserList()
    },
    handleCurrentChange(pageNo) {
      this.searchModel.pageNo = pageNo
      this.getUserList()
    },
    getUserList() {
      userApi.getUserList(this.searchModel).then(response => {
        this.userList = response.data.rows
        this.total = response.data.total
      })
    }
  }
}
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
