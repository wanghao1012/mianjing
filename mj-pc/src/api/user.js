// 放和用户有关的axios请求

// 导入
import request from '@/utils/request'

// 登录请求
export const loginApi = data => {
  return request.post('/auth/login', data)
}

// 获取管理员相关的信息
export const getUserApi = () => {
  return request.get('/auth/currentUser')
}

// 获取统计数据 (折线图数据)
export const getLineApi = () => {
  return request.get('/analysis/DailyVisitTrend')
}
