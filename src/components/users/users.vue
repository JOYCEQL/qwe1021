<template>
  <div>
    <el-card class="box-card">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><a href="/">首页</a></el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索输入框-->
      <el-row class="searchRow">
        <el-col>
          <el-input
            placeholder="请输入内容"
            v-model="query"
            class="inputSearch"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
          <!-- 添加用户按钮 -->
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
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
      userList: []
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

      console.log(res)
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
