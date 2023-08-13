// 和用户相关的请求  放这里

import request from '@/utils/request'

// 注册请求  按需导出
export function registerAPI (data) {
  return request({
    method: 'post',
    url: '/h5/user/register',
    data: data
  })
}

// 登录请求  按需导出
export const loginAPI = data => {
  return request.post('/h5/user/login', data)
}

// 获取用户信息
export const getUserInfoAPI = () => {
  return request.get('/h5/user/currentUser')
}
