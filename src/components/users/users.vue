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
        :data="tableData"
        stripe
        style="width: 100%"
        border
      >
        <el-table-column
          type=index
          label="#"
          width="60"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="邮箱"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="电话"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="角色"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="状态"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
        >
        </el-table-column>
      </el-table>
      <!-- 分页 -->
    </el-card>

  </div>
</template>

<script>
export default {
  name: 'vueName',
  data () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 5,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  created () {
    this.getUserlist()
  },
  methods: {
    // 请求后台数据的方法0--传三个参数
    // 这样还拿不到值，需要利用axios设置请求头
    async  getUserlist () {
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)

      console.log(res)
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
</style>
