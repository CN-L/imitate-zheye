import request from '@/assets/request'
export const apiGetList = (params?: any) => request({
  method: 'get',
  url: '/columns',
  params,
})
