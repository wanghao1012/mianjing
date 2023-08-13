// 导入
import request from '@/utils/request'

// 登录请求
export const loginApi = data => {
  return request.post('/auth/login', data)
}

// 管理员相关信息
export const getUserApi = () => {
  return request({
    url: '/auth/currentUser',
    methods: 'get'
  })
}

// 图表数据
export const echartsListApi = () => {
  return request.get('/analysis/DailyVisitTrend')
}
