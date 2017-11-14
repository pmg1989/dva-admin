import { request } from 'utils'

export async function logout (params) {
  return request('/api/logout', {
    method: 'post',
    data: params,
  })
}

export async function userInfo (params) {
  return request('/api/userInfo', {
    method: 'get',
    data: params,
  })
}
