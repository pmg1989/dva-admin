const qs = require('qs')
const Mock = require('mockjs')
import mockStorge from '../../src/utils/mockStorge'
import { getBody } from '../utils'

let dataKey = mockStorge('AccountUserList', Mock.mock({
  'data|100': [
    {
      'id|+1': 1,
      name: '@cname',
      nickName: '@last',
      phone: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      address: '@county(true)',
      isMale: '@boolean',
      email: '@email',
      status: '@boolean',
      createTime: '@datetime',
      avatar: function () {
        return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', this.nickName.substr(0, 1))
      }
    }
  ],
  page: {
    total: 100,
    current: 1
  }
}))

let userListData = global[dataKey]

module.exports = {

  'GET /api/user' (req, res) {
    const page = qs.parse(req.query)
    const pageSize = page.pageSize || 20
    const currentPage = page.page || 1

    let data
    let newPage

    let newData = userListData.data.concat()

    if (page.field) {
      const d = newData.filter(function (item) {
        return item[page.field].indexOf(decodeURI(page.keyword)) > -1
      })

      data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize)

      newPage = {
        current: currentPage * 1,
        total: d.length
      }
    } else {
      data = userListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      userListData.page.current = currentPage * 1
      newPage = userListData.page
    }
    res.json({success: true, data, page: {...newPage, pageSize: Number(pageSize)}})
  },

  'POST /api/user' (req, res) {
    const newData = getBody(req.body)
    newData.createTime = Mock.mock('@now')
    newData.avatar = Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', newData.nickName.substr(0, 1))

    newData.id = userListData.data.length + 1
    userListData.data.unshift(newData)

    userListData.page.total = userListData.data.length
    userListData.page.current = 1

    global[dataKey] = userListData

    res.json({success: true, data: userListData.data, page: userListData.page})
  },

  'DELETE /api/user' (req, res) {
    const deleteItem = getBody(req.body)

    userListData.data = userListData.data.filter(function (item) {
      if (item.id === deleteItem.id) {
        return false
      }
      return true
    })

    userListData.page.total = userListData.data.length

    global[dataKey] = userListData

    res.json({success: true, data: userListData.data, page: userListData.page})
  },

  'PUT /api/user' (req, res) {
    const editItem = getBody(req.body)

    editItem.createTime = Mock.mock('@now')
    editItem.avatar = Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', editItem.nickName.substr(0, 1))

    userListData.data = userListData.data.map(function (item) {
      if (item.id === editItem.id) {
        return editItem
      }
      return item
    })

    global[dataKey] = userListData
    res.json({success: true, data: userListData.data, page: userListData.page})
  }

}
