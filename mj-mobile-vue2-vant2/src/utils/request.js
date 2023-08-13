// 1.导入  axios
import axios from 'axios'
import router from '@/router' // 组件中的this.$router就是这里的router

// 2.配置
// 创建一个axios的副本  (创建一个新的实例)
const request = axios.create({
  baseURL: 'http://interview-api-t.itheima.net' // 配置基地址 根路径
  // baseURL: 'http://192.168.169.21:3005',
  // timeout: 5000 // 超时时间
})

// 后期,还可以给 request 配置拦截器等等
// 请求拦截器
// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    config.headers.Authorization =
      'Bearer ' + localStorage.getItem('mobile-token')

    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response && error.response.status === 401) {
      // 清除(过期的,假的)token
      localStorage.removeItem('mobile-token')
      // 跳转页面
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

// 3.导出
export default request
