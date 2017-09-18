import { request } from 'utils'

export async function update (params) {
  return request('/api/modifyPassword', {
    method: 'put',
    data: params,
  })
}
