const qs = require('qs')
const Mock = require('mockjs')
import mockStorge from '../../src/utils/mockStorge'
import { getBody } from '../utils'

let dataKey = mockStorge('AccountRoleList', Mock.mock({
  'data|3': [
    {
      'id|+1': 1,
      'roleName|+1': ["管理员", "教师", "学生"],
      'userCount|+1': [5, 100, 5000]
    }
  ],
  page: {
    total: 3,
    current: 1
  }
}))

let dataKeyPL = mockStorge('AccountPowerList', Mock.mock({
  data: {
    1: {
      1: [0],
      2: [0],
      3: [0, 1, 2, 3, 4],
      4: [0, 1, 2, 3, 4],
      5: [0, 1, 2, 3, 4],
      6: [0],
      7: [0, 2]
    },
    2: {
      1: [0],
      2: [0],
      5: [0, 1, 2, 3, 4],
      6: [0],
      7: [1, 2]
    },
    3: {
      1: [0],
      2: [0],
      6: [0],
      7: [0, 2]
    }
  }
}))

let roleListData = global[dataKey]
let powerList = global[dataKeyPL]

const getPowerList = (id) => {
  const powerListData = powerList.data
  return powerListData[id] || powerListData[3]
}

module.exports = {

  'GET /api/role' (req, res) {
    const page = qs.parse(req.query)
    const pageSize = page.pageSize || 20
    const currentPage = page.page || 1

    let data
    let newPage

    let newData = roleListData.data.concat()

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
      data = roleListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      roleListData.page.current = currentPage * 1
      newPage = roleListData.page
    }
    res.json({success: true, data, page: {...newPage, pageSize: Number(pageSize)}})
  },

  'POST /api/role' (req, res) {
    const newData = getBody(req)

    newData.id = roleListData.data.length + 1
    roleListData.data.push(newData)

    roleListData.page.total = roleListData.data.length
    roleListData.page.current = 1

    global[dataKey] = roleListData

    res.json({success: true, data: roleListData.data, page: roleListData.page})
  },

  'DELETE /api/role' (req, res) {
    const deleteItem = getBody(req)

    roleListData.data = roleListData.data.filter(function (item) {
      return item.id !== deleteItem.id
    })

    roleListData.page.total = roleListData.data.length

    global[dataKey] = roleListData

    res.json({success: true, data: roleListData.data, page: roleListData.page})
  },

  'PUT /api/role' (req, res) {
    const editItem = getBody(req)

    roleListData.data = roleListData.data.map(function (item) {
      if (item.id === editItem.id) {
        return editItem
      }
      return item
    })

    global[dataKey] = roleListData
    res.json({success: true, data: roleListData.data, page: roleListData.page})
  },

  'GET /api/powerList' (req, res) {
    const query = qs.parse(req.query)
    const id = +query.id
    // const roleListData = global[dataKey].data
    // const currentItem = roleListData.find((item) => (item.id === id))
    const powerList = getPowerList(id)
    res.json({success: true, data: powerList})
  }

}
