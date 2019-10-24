/* eslint-disable handle-callback-err */
<template>
  <div class="form-warp">
    <el-form
      label-position="top"
      label-width="80px"
      :model="formdata"
      class="form-login"
      :rules="Loginformrules"
      ref="formdata"
    >
      <!-- 标题 -->
      <h2 class="login-center">用户登录</h2>
      <el-form-item
        label="用户名"
        prop="username"
      >
        <el-input
          v-model="formdata.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          type="password"
          v-model="formdata.password"
          placeholder="请输入密码"
          autocomplete="off"
         @keyup.native.enter="handleLogin"></el-input>
      </el-form-item>
      <el-button
        type="primary"
        class="login-btn"
        @click="handleLogin"
     >登录</el-button>
      <el-button
        type="danger"
        @click="resetForm('formdata')"
        plain
      >重置</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        username: '',
        password: ''
      },
      Loginformrules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // 密码校验
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }]
      }
    }
  },

  methods: {
    handleLogin () {
      console.log(111)

      this.$http
        .post('login', this.formdata)
        .then(res => {
          console.log(res)
          // 解构赋值---注意其使用的方式
          // eslint-disable-next-line no-unused-vars
          const { data, meta: { msg, status } } = res.data
          if (status === 200) {
            // 保存token值，--token值有无判断有没有登陆
            localStorage.setItem('token', data.token)
            // 提示信息
            this.$message.success(msg)
            // 成功则进行页面的跳转----
            // 去home页--主页--注意路由设置-------跳转页面
            this.$router.push({ name: 'home' })
          } else {
            this.$message.error(msg)
          }
        })

        // eslint-disable-next-line handle-callback-err
        .catch(err => {
          console.error('失败了')
        })
    },
    // 重置
    resetForm (formdata) {
      this.$refs[formdata].resetFields()
    }
  }
}
</script>

<style >
.login-center {
  text-align: center;
}
.form-warp {
  height: 100%;
  background-color: #2b4b6b;
  /* 使用flex布局 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-login {
  padding: 30px;
  width: 400px;
  background-color: #fff;
  border-radius: 10px;
}
/* 登陆按钮样式 */
.login-btn {
  margin-left: 140px;
  transform: translateX(-50%);
}
</style>
