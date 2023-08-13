// 面经列表

// 导包
import request from '@/utils/request'

// 获取面经列表
export const getListApi = params => {
  return request.get('/admin/interview/query', { params })
}

// 添加面经数据
export const addArticleApi = data => {
  return request({
    url: '/admin/interview/create',
    method: 'post',
    data
  })
}

// 删除面经
export const delArticleApi = id => {
  return request({
    url: '/admin/interview/remove',
    method: 'DELETE',
    data: {
      id
    }
  })
}

// 获取单个面经详情
export const articleApi = id => {
  return request({
    url: '/admin/interview/show',
    params: { id }
  })
}
// 修改面经数据
export const changeArticleApi = data => {
  return request({
    url: '/admin/interview/update',
    method: 'put',
    data
  })
}
