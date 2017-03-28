const qs = require('qs')
const Mock = require('mockjs')
import mockStorge from '../../src/utils/mockStorge'
import { getBody } from '../utils'

let dataKey = mockStorge('AccountAdminList', Mock.mock({
  'data|100': [
    {
      'id|+1': 1,
      name: '@cname',
      phone: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      address: '@province()',
      isMale: '@boolean',
      email: '@email',
      status: '@boolean',
      'roleId|1': [1, 2, 3],
      'roleName|1': function() {
        return ["管理员", "教师", "学生"][this.roleId - 1]
      },
      createTime: '@datetime',
      avatar: function () {
        return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', this.name.substr(0, 1))
      }
    }
  ],
  page: {
    total: 100,
    current: 1
  }
}))

let AdminListData = global[dataKey]

module.exports = {

  'GET /api/adminItem' (req, res) {
    const getItem = qs.parse(req.query)
    const adminItem = AdminListData.data.find(function (item) {
      return item.id == +getItem.id
    })
    res.json({success: true, data: adminItem})
  },

  'GET /api/admin' (req, res) {
    const page = qs.parse(req.query)
    const pageSize = page.pageSize || 10
    const currentPage = page.current || 1

    let data
    let newPage

    let newData = AdminListData.data.concat()

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
      data = AdminListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      AdminListData.page.current = currentPage * 1
      newPage = AdminListData.page
    }
    res.json({success: true, data, page: {...newPage, pageSize: Number(pageSize)}})
  },

  'POST /api/admin' (req, res) {
    const newData = getBody(req)
    newData.createTime = Mock.mock('@now')
    newData.avatar = Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', newData.name.substr(0, 1))

    const roleListData = global['AccountRoleList'].data
    const roleList = roleListData.map(item => {
      return item.name
    })
    newData.roleName = roleList[newData.roleId - 1]

    newData.id = AdminListData.data.length + 1
    AdminListData.data.unshift(newData)

    AdminListData.page.total = AdminListData.data.length
    AdminListData.page.current = 1

    global[dataKey] = AdminListData

    res.json({success: true, data: AdminListData.data, page: AdminListData.page})
  },

  'DELETE /api/admin' (req, res) {
    const deleteItem = getBody(req)
    AdminListData.data = AdminListData.data.filter(function (item) {
      if (item.id === deleteItem.id) {
        return false
      }
      return true
    })

    AdminListData.page.total = AdminListData.data.length

    global[dataKey] = AdminListData

    res.json({success: true, data: AdminListData.data, page: AdminListData.page})
  },

  'PUT /api/admin' (req, res) {
    const editItem = getBody(req)

    const roleListData = global['AccountRoleList'].data
    const roleList = roleListData.map(item => {
      return item.name
    })

    editItem.createTime = Mock.mock('@now')
    editItem.avatar = Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', editItem.name.substr(0, 1))
    editItem.roleName = roleList[editItem.roleId - 1]

    AdminListData.data = AdminListData.data.map(function (item) {
      if (item.id === editItem.id) {
        return editItem
      }
      return item
    })

    global[dataKey] = AdminListData
    res.json({success: true, data: AdminListData.data, page: AdminListData.page})
  }

}
