import { request } from '../../utils'

export async function query (params) {
  return request('/dashboard-wallet-history/list', {
    method: 'get',
    data: params
  })
}
