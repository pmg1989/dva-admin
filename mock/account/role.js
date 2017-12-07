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
    19: [1, 2],
  },
  2: {
    1: [1],
    2: [1],
    3: [1],
    4: [1, 3, 4],
    5: [1, 2, 3, 4, 5],
    6: [1],
    7: [1, 4],
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
    19: [1, 2],
  },
}

let roleList = Mock.mock({
  'data|3': [
    {
      'id|+1': 1,
      'name|+1': ['管理员', '教师', '学生'],
      'power|+1': [dic[1], dic[2], dic[3]],
    },
  ],
  page: {
    total: 3,
    current: 1,
  },
})

global.powerList = dic
global.roleList = roleList

module.exports = {

  'GET /api/role': function (req, res) {
    const page = qs.parse(req.query)
    const pageSize = page.pageSize || 10
    const currentPage = page.page || 1

    let data
    let newPage

    let newData = roleList.data.concat()

    if (page.field) {
      const d = newData.filter((item) => {
        return item[page.field].indexOf(decodeURI(page.keyword)) > -1
      })

      data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize)

      newPage = {
        current: currentPage * 1,
        total: d.length,
      }
    } else {
      data = roleList.data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      roleList.page.current = currentPage * 1
      newPage = roleList.page
    }
    res.json({ success: true, list: data, page: { ...newPage, pageSize: Number(pageSize) } })
  },

  'POST /api/role': function (req, res) {
    const curItem = req.body

    if (curItem.id) {
      roleList.data = roleList.data.map((item) => {
        if (item.id === curItem.id) {
          return { ...curItem, power: JSON.parse(curItem.power) }
        }
        return item
      })
    } else {
      curItem.id = roleList.data.length + 1
      roleList.data.push({ ...curItem, power: JSON.parse(curItem.power) })

      roleList.page.total = roleList.data.length
      roleList.page.current = 1
    }

    global.powerList = { ...global.powerList, [curItem.id]: JSON.parse(curItem.power) }
    res.json({ success: true, data: roleList.data, page: roleList.page })
  },

  'DELETE /api/role': function (req, res) {
    const deleteItem = req.body

    roleList.data = roleList.data.filter((item) => {
      return item.id !== deleteItem.id
    })

    roleList.page.total = roleList.data.length

    delete global.powerList[deleteItem.id]

    res.json({ success: true, data: roleList.data, page: roleList.page })
  },

}
