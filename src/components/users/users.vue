<template>
  <div>
    <el-card class="box-card">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><a href="/">首页</a></el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索-->
      <el-row class="searchRow">
        <el-col>
          <el-input
            placeholder="请输入内容"
            v-model="query"
            class="inputSearch"
            clearable
            @clear="reGetUsers"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchUsers"
            ></el-button>
          </el-input>
          <!-- 添加用户按钮 -->
          <el-button
            type="primary"
            @click="dialogFormVisible = true"
          >添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 对话框 -->
      <el-dialog
        title="添加用户"
        :visible.sync="dialogFormVisible"
      >
        <!-- 内部表单 -->
        <el-form
          :model="form"
          :rules="Addformrules"
        >
          <!-- 用户名 -->
          <el-form-item
            label="用户名"
            :label-width="formLabelWidth"
            prop="username"
          >
            <el-input
              v-model="form.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item
            label="密码"
            :label-width="formLabelWidth"
            prop="password"
          >
            <el-input
              v-model="form.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- 邮箱 -->
          <el-form-item
            label="邮箱"
            :label-width="formLabelWidth"
            prop="email"
          >
            <el-input
              v-model="form.email"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- 手机号 -->
          <el-form-item
            label="手机号"
            :label-width="formLabelWidth"
            prop="mobile"
          >
            <el-input
              v-model="form.mobile"
              autocomplete="off"
            ></el-input>
          </el-form-item>

        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="Addusers"
          >确 定</el-button>
        </div>
      </el-dialog>
      <!-- 表格 -->
      <el-table
        :data="userList"
        stripe
        style="width: 100%"
        border
      >
        <el-table-column
          type="index"
          label="#"
          width="60"
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
        >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
        >
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="角色"
        >
        </el-table-column>
        <el-table-column
          prop="mg_state"
          label="状态"
        >
          <!-- slot-scope在在vue-3.0以后已经废除，注意：现在使用老版本 -显示与否由父组件说了算-->
          <!-- 输出表格一行中数据的mg_state -->
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              size=mini
              type="primary"
              plain
              icon="el-icon-edit"
            ></el-button>
            <el-button
              size=mini
              type="danger"
              plain
              icon="el-icon-delete"
            ></el-button>
            <el-button
              size=mini
              type="success"
              plain
              icon="el-icon-check"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="2"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

  </div>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 2,
      total: 0,
      // 里面的数据根据发送请求拿到，由每一列的prop绑定
      userList: [],
      // 添加用户对话框
      dialogTableVisible: false,
      dialogFormVisible: false,
      // 添加用户的表单数据
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      formLabelWidth: '100px',
      // 添加用户部分表单校验
      Addformrules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {

    // 请求后台数据的方法0--传三个参数
    // 这样还拿不到值，需要利用axios设置请求头--渲染数据方法
    async  getUserList () {
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)

      // 结果的结构赋值
      const { meta: { status, msg }, data: { users, total } } = res.data
      if (status === 200) {
        this.userList = users
        this.total = total
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    },
    // 分页方法
    handleSizeChange (val) {
      this.pagesize = val
      // 这时需要pagenum再为1，回到首页
      this.pagenum = 1
      this.getUserList()
    },
    handleCurrentChange (val) {
      // val是当前的页码--根据点击页码进行切换
      // 把this.pagenum赋值为val
      this.pagenum = val
      this.getUserList()
    },
    // 搜索用户
    searchUsers () {
      this.getUserList()
    },
    reGetUsers () {
      this.getUserList()
    },
    // 添加用户
    Addusers () {
      // 发送请求添加数据
      const AUTH_TOKEN1 = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN1
      this.$http.post('users', this.form)
        .then(res => {
          console.log(res)

          // eslint-disable-next-line no-unused-vars
          const { data, meta: { msg, status } } = res.data
          if (status === 201) {
            console.log(msg)
            this.getUserList()
          }
        })
        .catch(err => {
          console.error(err)
        })

      // 隐藏模态框
      this.dialogFormVisible = false
    }
  }

}
</script>

<style >
.box-card {
  height: 800px;
}
.searchRow {
  margin-top: 20px;
}
/* 注意:要以类名的方式才会选中 */
.inputSearch {
  width: 300px;
}
.el-table {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
