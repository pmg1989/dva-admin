const qs = require('qs')
const Mock = require('mockjs')

let userListData = Mock.mock({
  'data|100': [
    {
      'id|+1': 1,
      name: '@cname',
      mobile: /^1[34578]\d{9}$/,
      email: '@email',
      status: '@boolean',
      created_at: '@integer(1487000000000, 1487999999999)',
      image () {
        return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', this.name.substr(0, 1))
      },
    },
  ],
  page: {
    total: 100,
    current: 1,
  },
})

module.exports = {

  'GET /api/userItem': function (req, res) {
    const getItem = qs.parse(req.query)
    const userItem = userListData.data.find((item) => {
      return item.id === +getItem.id
    })
    res.json({ success: true, data: userItem })
  },

  'GET /api/user': function (req, res) {
    const page = qs.parse(req.query)
    const pageSize = page.pageSize || 10
    const currentPage = page.current || 1

    let data
    let newPage

    let newData = userListData.data.concat()

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
      data = userListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      userListData.page.current = currentPage * 1
      newPage = userListData.page
    }
    res.json({ success: true, list: data, page: { ...newPage, pageSize: Number(pageSize) } })
  },

  'POST /api/user': function (req, res) {
    const newData = req.body
    newData.created_at = Mock.mock('@integer(1487000000000, 1487999999999)')
    newData.image = Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', newData.name.substr(0, 1))

    newData.id = userListData.data.length + 1
    userListData.data.unshift(newData)

    userListData.page.total = userListData.data.length
    userListData.page.current = 1

    res.json({ success: true, data: userListData.data, page: userListData.page })
  },

  'DELETE /api/user': function (req, res) {
    const deleteItem = req.body

    userListData.data = userListData.data.filter((item) => {
      if (item.id === deleteItem.id) {
        return false
      }
      return true
    })

    userListData.page.total = userListData.data.length

    res.json({ success: true, data: userListData.data, page: userListData.page })
  },

  'DELETE /api/deleteBatch': function (req, res) {
    const { ids } = req.body

    userListData.data = userListData.data.filter((item) => {
      if (ids.find(cur => cur === item.id)) {
        return false
      }
      return true
    })

    userListData.page.total = userListData.data.length

    res.json({ success: true, data: userListData.data, page: userListData.page })
  },

  'PUT /api/user': function (req, res) {
    const editItem = req.body
    editItem.created_at = Mock.mock('@integer(1487000000000, 1487999999999)')
    editItem.image = Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', editItem.name.substr(0, 1))

    userListData.data = userListData.data.map((item) => {
      if (item.id === editItem.id) {
        return editItem
      }
      return item
    })

    res.json({ success: true, data: userListData.data, page: userListData.page })
  },

}
