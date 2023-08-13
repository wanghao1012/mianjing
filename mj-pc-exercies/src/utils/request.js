// 这里配置axios
import store from '@/store'
import router from '@/router'
// 导包
import axios from 'axios'

// 创建实例,这里可以配置基地址 及其 配置拦截器
const request = axios.create({
  baseURL: 'http://interview-api-t.itheima.net' // 基地址
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 添加请求头
    // const token = localStorage.getItem('mj-pc-exercies-token')
    const token = store.state.user.token
    config.headers.Authorization = `Bearer ${token}`
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
    return response.data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // 当服务器返回响应了,并且是401错误  则将本地的token清除 并且跳转到登录页面
    if (error.response && error.response.status === 401) {
      // localStorage.removeItem('mj-pc-exercies-token')
      store.commit('user/updateToken', '')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

// 导出实例
export default request
