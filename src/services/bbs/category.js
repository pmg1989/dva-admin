import { request } from 'utils'

export async function query (params) {
  return request('/api/category', {
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request('/api/category', {
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request('/api/category', {
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request('/api/category', {
    method: 'put',
    data: params,
  })
}
