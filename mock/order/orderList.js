const qs = require('qs')
const Mock = require('mockjs')
import mockStorge from '../../src/utils/mockStorge'
import { getBody } from '../utils'

let dataKey = mockStorge('OrderList', Mock.mock({
  'data|100': [
    {
      'id|+1': 1,
      'order_id|+1': 10000000000,
      'type|1': [1, 2],
      status: '@boolean',
      'os|1': [1, 2],
      'change|10-999':10,
      user_name: '@cname',
      user_phone: /^1[34578]\d{9}$/,
      'current_money|100-9999':10,
      ctime: '@datetime'
    }
  ],
  page: {
    total: 100,
    current: 1
  }
}))

let OrderListData = global[dataKey]

module.exports = {

  'GET /dashboard-wallet-history/list' (req, res) {
    const query = qs.parse(req.query)
    const pageSize = query.pageSize || 10
    const currentPage = query.page || 1

    let data
    let newPage

    let newData = OrderListData.data.concat()

    if (query.field) {
      const d = newData.filter(function (item) {
        return item[query.field].indexOf(decodeURI(query.keyword)) > -1
      })

      data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize)

      newPage = {
        current: currentPage * 1,
        total: d.length
      }
    } else {
      data = OrderListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      OrderListData.page.current = currentPage * 1
      newPage = OrderListData.page
    }
    res.json({success: true, list: data, page: {...newPage, pageSize: Number(pageSize)}})
  }

}
