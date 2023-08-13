// 存放和面经相关的请求
import request from '@/utils/request'

// 分页获取面经
export function articleAPI (params) {
  return request({
    method: 'get',
    url: '/h5/interview/query',
    params
  })
}

// 获取单个面经详情
export function detailAPI (id) {
  return request({
    method: 'get',
    url: '/h5/interview/show',
    params: {
      id
    }
  })
}

// 点赞、收藏、取消点赞、取消收藏
export const collectAndLikeAPI = data => {
  return request.post('/h5/interview/opt', data)
}

// 获取我的点赞 我的收藏
export const collectLikeListAPI = params => {
  return request.get('/h5/interview/opt/list', {
    params: params
  })
}
