// 封装列表页的数据

import request from '@/utils/request'

// 发送请求 分页获取面经列表数据
export const ArticleListApi = params => {
  return request.get('/admin/interview/query', { params })
}

// 添加面经
export const addArticleApi = data => {
  return request.post('/admin/interview/create', data)
}

// 删除面经
export const removeArticleApi = id => {
  return request({
    method: 'delete',
    url: '/admin/interview/remove',
    data: {
      id
    }
  })
}

// 获取单个面经数据
export const articleApi = id => {
  return request.get('/admin/interview/show', { params: { id } })
}

// 修改数据
export const updateArticleApi = data => {
  return request({
    method: 'put',
    url: '/admin/interview/update',
    data
  })
}
