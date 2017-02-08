import { request } from '../utils'

export async function login (params) {
  return request('/api/login', {
  //return request('mod_serviceauthorize_signin', {
    method: 'post',
    data: params
  })
}

export async function logout (params) {
  return request('/api/logout', {
    method: 'post',
    data: params
  })
}

export async function userInfo (params) {
  return request('/api/userInfo', {
    method: 'get',
    data: params
  })
}
