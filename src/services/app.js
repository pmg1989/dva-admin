import { request } from '../utils'

export async function getToken (params) {
  return request('/oauth/token', {
    method: 'post',
    data: {
      client_id: "7_3couvjpeukmc4wc88ww00s8c0cc4wcswc8404oow8ogwksgcck",
      client_secret: "4kztndqf54sgowkcs8kw404c0kc04c0gsgwog8gogwwc8kk8kc",
      grant_type: "client_credentials"
    }
  })
}

export async function login (params) {
  return request('/admin/check', {
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
