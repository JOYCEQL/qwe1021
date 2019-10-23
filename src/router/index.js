import Vue from 'vue'
import Router from 'vue-router'
// @自动找到src文件夹
// 导入登陆组件
import Login from '@/components/login/login.vue'
// 导入home组件
import Home from '../components/home/home.vue'
// 写完组件需要在这里配置路由
Vue.use(Router)

export default new Router({
  routes: [{
    name: 'login',
    path: '/login',
    component: Login
  },
  // { // 默认重定向到login
  //   path: '/',
  //   redirect: '/login'
  // },
  {
    name: 'home',
    path: '/',
    component: Home

  }
  ]
})
