import { request } from '../../utils'

export async function query (params) {
  return request('/dashboard-order/list', {
    method: 'get',
    data: params
  })
}
