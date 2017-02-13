const qs = require('qs')
const Mock = require('mockjs')
import mockStorge from '../../src/utils/mockStorge'
import { getBody } from '../utils'

let dataKey = 'AdminUsers'

let adminListData = global[dataKey]

module.exports = {

  'PUT /api/modifyPassword' (req, res) {
    const editItem = getBody(req)
    let flag = false

    adminListData = adminListData.map(function (item) {
      if (item.username === editItem.username) {
        flag = item.password !== editItem.oldPassword
        return flag ? item : editItem
      }
      return item
    })
    if(!flag){
      global[dataKey] = adminListData
      res.json({success: true, msg: '密码修改成功！'})
    } else {
      res.json({success: false, msg: '旧密码不正确'})
    }

  }

}
