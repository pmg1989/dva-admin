import { request } from '../utils'

export async function getToken (params) {
  return request('/oauth/token', {
    method: 'post',
    data: {
      client_id: '1_g8jkp9mm6mg4c4goo0gokc0o084004k8s4o0oks0gcs0w0cw4',
      client_secret: 'sga0vq93bnkw4w0880kwgo0cc0ok4ok8ogogwkg4wosk00w0w',
      grant_type: 'client_credentials'
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
