import Vue from 'vue'
import Router from 'vue-router'
// @自动找到src文件夹
// 导入登陆组件
import Login from '@/components/login/login.vue'
// 导入home组件
import Home from '../components/home/home.vue'
// 导入users组件
import Users from '../components/users/users.vue'
// 写完组件需要在这里配置路由
Vue.use(Router)

export default new Router({
  routes: [{
    name: 'login',
    path: '/login',
    component: Login
  },

  {
    name: 'home',
    path: '/',
    component: Home,
    // 注意:users组件的路由需要在home的路由里面配置-父子关系
    children: [
      {
        // 这里的path不加/
        name: 'users',
        path: 'users',
        component: Users
      }
    ]

  }
  ]
})
