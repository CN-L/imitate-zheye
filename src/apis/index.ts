import request from '@/assets/request'
export const apiGetList = (params?: any) => request({
  method: 'get',
  url: '/columns',
  params,
})
export const apiGetColumn = (id: string) => request({
  method: 'get',
  url: `/columns/${id}`,
})
export const apiFetchPost = (id: number) => request({
  method: 'get',
  url: `/columns/${id}/posts`,
})
export const apiRegister = (data: any) => request({
  method: 'post',
  url: '/users',
  data
})
