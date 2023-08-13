import router from '@/router'
import store from '@/store'
// 导入axios
import axios from 'axios'

// 创建axios实例,配置基地址,配置拦截器
const request = axios.create({
  baseURL: 'http://interview-api-t.itheima.net'
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // const token = localStorage.getItem('mj-pc-token')
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
    return response.data // 直接返回真正的响应结果:后续组件中使用的话就不用解构赋值了
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response && error.response.status === 401) {
      // localStorage.removeItem('mj-pc-token')
      store.commit('user/updateToken', '')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

// 导出axios实例
export default request
