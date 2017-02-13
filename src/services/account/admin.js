import { request } from '../../utils'

export async function query (params) {
  return request('/api/admin', {
    method: 'get',
    data: params
  })
}

export async function get (params) {
  return request('/api/adminItem', {
    method: 'get',
    data: params
  })
}

export async function create (params) {
  return request('/api/admin', {
    method: 'post',
    data: params
  })
}

export async function remove (params) {
  return request('/api/admin', {
    method: 'delete',
    data: params
  })
}

export async function update (params) {
  return request('/api/admin', {
    method: 'put',
    data: params
  })
}
