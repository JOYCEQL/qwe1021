<template>
  <!-- 这里的el-container就是根元素 -->
  <el-container class="container">
    <el-header>
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple clearfix">
            <img
              src="../../assets/image/heima_logo.png"
              alt=""
            >
          </div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple-light">
            <h2>黑马后台管理系统</h2>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <template>

              <el-button
                type="danger"
                @click="handleexit"
              >退出</el-button>
            </template>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 左侧部分 -->
      <!-- 开启路由 -->
      <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo"
          :unique-opened="true"
          :router="true"
        >
          <el-submenu index="1">
            <!-- 1 -->
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </template>
            <!-- 2 -->
            <!-- 这里的index值则是路由的path值 -->
            <el-menu-item index="users">
              <i class="el-icon-menu"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <!-- 1 -->
            <template slot="title">
              <i class="el-icon-s-cooperation"></i>
              <span>权限管理</span>
            </template>
            <!-- 2 -->
            <el-menu-item index="2-1">
              <i class="el-icon-s-grid"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-s-order"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <!-- 1 -->
            <template slot="title">
              <i class="el-icon-s-claim"></i>
              <span>商品管理</span>
            </template>
            <!-- 2 -->
            <el-menu-item index="3-1">
              <i class="el-icon-s-unfold"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-s-promotion"></i>
              <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-s-fold"></i>
              <span>商品分类</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <!-- 1 -->
            <template slot="title">
              <i class="el-icon-s-operation"></i>
              <span>订单管理</span>
            </template>
            <!-- 2 -->
            <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <!-- 1 -->
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span>数据统计</span>
            </template>
            <!-- 2 -->
            <el-menu-item index="5-1">
              <i class="el-icon-s-platform"></i>
              <span>数据报表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧部分 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // 判断有无token值
  beforeCreate () {
    const token = localStorage.getItem('token')
    // 没有则回到登录页
    if (!token) {
      this.$router.push({ name: 'login' })
    }
  },
  methods: {
    handleexit () {
      // 弹框---你确定要退出吗
      this.$confirm('您确定要退出吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // 清空token值
        // 提示消息
        // 去登录页
        localStorage.clear()
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        // this.$message.success('退出成功')
        this.$router.push({ name: 'login' })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style >
.container {
  height: 100%;
}
.el-menu {
  background-color: #333744;
  height: 100%;
}

element.style {
  padding-left: 40px;
}
.el-submenu .el-menu-item {
  height: 50px;
  line-height: 50px;
  padding: 0 45px;
  min-width: 200px;
}
.el-menu-item {
  color: #fff;
}
.el-submenu__title {
  color: #fff;
}
.el-submenu__title:hover {
  background-color: #292c36;
}
element.style {
  padding-left: 40px;
}
.el-submenu .el-menu-item {
  height: 50px;
  line-height: 50px;
  padding: 0 45px;
  min-width: 200px;
}

.el-menu-item:focus,
.el-menu-item:hover {
  background-color: #292c36;
}
h2 {
  text-align: center;
  line-height: 60px;
  margin: 0;
}

img {
  float: left;
  display: block;
  margin-left: 50px;
}

.el-header {
  padding: 0;
  background-color: #409EFF;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  height: 100%;
  overflow: hidden;
}

.el-main {
  background-color: #67C23A;
  color: #333;
}
</style>
