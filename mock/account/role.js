const qs = require('qs')
const Mock = require('mockjs')

const dic = {
  1: {
    1: [1, 2],
    2: [1],
    3: [1, 2, 3, 4, 5],
    4: [1, 2, 3, 4, 5],
    5: [1, 2, 3, 4, 5],
    6: [1],
    7: [1, 2, 4],
    8: [1],
    9: [1, 2, 3, 4, 5],
    10: [1],
    11: [1, 2],
    12: [1],
    13: [1, 2],
    14: [1, 2],
    15: [1],
    16: [1, 2],
    17: [1, 2],
    18: [1, 2],
    19: [1, 2]
  },
  2: {
    1: [1],
    2: [1],
    3: [1],
    4: [1, 3, 4],
    5: [1, 2, 3, 4, 5],
    6: [1],
    7: [1, 4]
  },
  3: {
    1: [1, 2],
    2: [1],
    3: [1, 2],
    4: [1, 2],
    5: [1, 2],
    6: [1],
    7: [1, 2, 4],
    8: [1],
    9: [1, 2, 3, 4, 5],
    10: [1],
    11: [1, 2],
    12: [1, 2],
    13: [1, 2],
    14: [1, 2],
    15: [1],
    16: [1, 2],
    17: [1, 2],
    18: [1, 2],
    19: [1, 2]
  }
}

let dataKey = Mock.mock({
  'data|3': [
    {
      'id|+1': 1,
      'name|+1': ["管理员", "教师", "学生"],
      'power|+1':[dic[1], dic[2], dic[3]]
    }
  ],
  page: {
    total: 3,
    current: 1
  }
})

global.roleListData = dataKey
global.powerList = dic

module.exports = {

  'GET /api/role' (req, res) {
    const page = qs.parse(req.query)
    const pageSize = page.pageSize || 10
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
    res.json({success: true, list: data, page: {...newPage, pageSize: Number(pageSize)}})
  },

  'POST /api/role' (req, res) {
    const curItem = req.body

    if(curItem.id) {
      roleListData.data = roleListData.data.map(function (item) {
        if (item.id === curItem.id) {
          return {...curItem, power: JSON.parse(curItem.power)}
        }
        return item
      })
    } else {
      curItem.id = roleListData.data.length + 1
      roleListData.data.push({...curItem, power: JSON.parse(curItem.power)})

      roleListData.page.total = roleListData.data.length
      roleListData.page.current = 1
    }
    res.json({success: true, data: roleListData.data, page: roleListData.page})
  },

  'DELETE /api/role' (req, res) {
    const deleteItem = req.body

    roleListData.data = roleListData.data.filter(function (item) {
      return item.id !== deleteItem.id
    })

    roleListData.page.total = roleListData.data.length

    res.json({success: true, data: roleListData.data, page: roleListData.page})
  },

}
