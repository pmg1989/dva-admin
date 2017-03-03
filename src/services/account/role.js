import { request } from '../../utils'

export async function query (params) {
  return request('/dashboard-admin-role/list', {
    method: 'get',
    data: params
  })
}

export async function create (params) {
  return request('/dashboard-admin-role/edit', {
    method: 'post',
    data: params
  })
}

export async function update (params) {
  return request('/dashboard-admin-role/edit', {
    method: 'post',
    data: params
  })
}

export async function remove (params) {
  return request('/dashboard-admin-role/del', {
    method: 'post',
    data: params
  })
}
