import { request } from 'utils'

export async function getToken () {
  const data = {
    client_id: newband.app.admin.CLIENT_ID,
    client_secret: newband.app.admin.CLIENT_SECRET,
    grant_type: newband.app.admin.GRANT_TYPE,
  }
  return request('/oauth/token', {
    method: 'post',
    data,
  })
}

export async function login (params) {
  return request('/admin/check', {
    method: 'post',
    data: params,
  })
}
