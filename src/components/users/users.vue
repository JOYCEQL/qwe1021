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
      <!-- 添加用户的对话框 -->
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
            @click="Addusers()"
          >确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑用户的对话框 -->
      <el-dialog
        title="编辑用户"
        :visible.sync="EditVisible"
      >
        <!-- 内部表单 -->
        <el-form :model="editForm">
          <!-- 用户名 -->
          <el-form-item
            label="用户名"
            :label-width="formLabelWidth"
          >
            <el-input
              disabled
              v-model="editForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- 邮箱 -->
          <el-form-item
            label="邮箱"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="editForm.email"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- 手机号 -->
          <el-form-item
            label="手机号"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="editForm.mobile"
              autocomplete="off"
            ></el-input>
          </el-form-item>

        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="EditVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="Edituser()"
          >确 定</el-button>
          <!-- 需要在这里把id传过去 -->
        </div>
      </el-dialog>

      <!-- 分配角色对话框 -->
      <el-dialog
        title="分配角色"
        :visible.sync="assignVisible"
      >
        <!-- 内部表单 -->
        <el-form>
          <!-- 用户名 -->
          <el-form-item
            label="当前用户 "
            :label-width="formLabelWidth"
          >
            <el-input
              disabled
              v-model="currentusername"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- 当前角色 -->
          <el-form-item
            label="当前的角色"
            :label-width="formLabelWidth"
          >
            {{currentrolename}}
          </el-form-item>

          <!-- 选择角色下拉菜单 -->
          <el-form-item
            label="分新配角色"
            :label-width="formLabelWidth"
          >
            <!-- 选择角色 -->
            <el-select
              v-model="currentroleid"
              placeholder="请选择角色"
            >
              <!-- 有一个默认的请选择 -->
              <el-option
                label="请选择"
                :value="1"
              ></el-option>
              <el-option
                v-for="item in roles"
                :key="item.rid"
                :label="item.roleName"
                :value="item.id"
              ></el-option>

            </el-select>
          </el-form-item>

        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="assignVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="Assignuser()"
          >确 定</el-button>
          <!-- 需要在这里把角色id传过去 -->
        </div>
      </el-dialog>
      <!-- 渲染在页面中的表格 -->
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
              @click="showedit(scope.row)"
            ></el-button>
            <!-- 展示编辑 -->
            <!-- scope.row代表某个用户数据 -->

            <el-button
              size=mini
              type="danger"
              plain
              @click="showdel(scope.row.id)"
              icon="el-icon-delete"
            ></el-button>
            <el-button
              size=mini
              type="success"
              plain
              @click="showAssignuser(scope.row)"
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
        :page-size="6"
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
      pagesize: 6,
      total: 0,
      // 里面的数据根据发送请求拿到，由每一列的prop绑定
      userList: [],
      // 添加用户对话框
      dialogTableVisible: false,
      dialogFormVisible: false,
      EditVisible: false,
      assignVisible: false,
      // 添加用户的表单数据
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 一个form表单不够
      editForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },

      currentrolename: '',
      currentusername: '',
      currentroleid: '',
      currentuserid: '',
      // 分配角色表单

      // 存放所有的角色
      roles: [],
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
          // console.log(res)

          // eslint-disable-next-line no-unused-vars
          const { data, meta: { msg, status } } = res.data
          if (status === 201) {
            this.$message.success(msg)
            this.getUserList()
          }
        })
        .catch(err => {
          console.error(err)
        })

      // 隐藏模态框
      this.dialogFormVisible = false
    },
    // 显示删除的框
    showdel (userid) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发送请求删除数据

        const res = await this.$http.delete(`users/${userid}`
        )
        console.log(res)

        if (res.data.meta.status === 200) {
          this.pagenum = 1
          this.getUserList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 展示编辑框
    showedit (user) {
      // 数据回填且禁用--点击时数据再获取数据

      // console.log(user)
      // 浅拷贝
      const newuser = { ...user }
      this.editForm = newuser
      this.EditVisible = true
    },
    // 编辑数据发送修改请求--相当于定义了一个局部变量id---即不用外面传--第406行
    async Edituser (id) {
      this.EditVisible = false
      id = this.editForm.id
      const res = await this.$http.put(`users/${id}`, this.editForm)
      if (res.data.meta.status === 200) {
        this.$message.success(res.data.meta.msg)
        this.getUserList()
      } else {
        this.$message.warning(res.data.meta.msg)
      }
    },
    // 显示分配角色对话框
    async  showAssignuser (users) {
      this.assignVisible = true
      // 浅拷贝
      this.currentusername = users.username
      this.currentuserid = users.id
      this.currentrolename = users.role_name

      // 获取所有的角色
      let allusers = await this.$http.get('roles')
      // 遍历这个数组进行渲染
      this.roles = allusers.data.data

      // 获取当前角色的id----注意：需要角色id---
      let res = await this.$http.get(`users/${this.currentuserid}`)
      // 拿到角色id

      this.currentroleid = res.data.data.rid
    },
    // 分配角色---点击确定按钮发送请求修改角色
    async  Assignuser () {
      const res = await this.$http.put(`users/${this.currentuserid}/role`, {
        rid: this.currentroleid
      })
      console.log(res)
      if (res.status === 200) {
        this.getUserList()
        this.$message.success(res.data.meta.msg)
        this.assignVisible = false
      }
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
