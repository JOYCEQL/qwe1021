// 需要导入的模块
import axios from 'axios'
const MyHttpServer = {}
MyHttpServer.install = (Vue) => {
  // 4. 添加实例方法(没有全局挂载)
  axios.defaults.baseURL = 'http://api.xiaomadagege.cn:3355/api/private/v1/'
  Vue.prototype.$http = axios
}

// 导出这个对象
export default MyHttpServer
