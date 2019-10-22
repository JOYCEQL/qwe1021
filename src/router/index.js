import Vue from 'vue'
import Router from 'vue-router'
// @自动找到src文件夹
import Login from '@/components/login/login.vue'
// 写完组件需要在这里配置路由
Vue.use(Router)

export default new Router({
  routes: [{
    name: 'login',
    path: '/login',
    component: Login
  }]
})
