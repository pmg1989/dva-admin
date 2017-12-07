const qs = require('qs')
const Mock = require('mockjs')

const AdminList = Mock.mock({
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
      'roleName|1': function () {
        return ['管理员', '教师', '学生'][this.roleId - 1]
      },
      createTime: '@datetime',
      avatar () {
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

  'GET /api/adminItem': function (req, res) {
    const getItem = qs.parse(req.query)
    const adminItem = AdminList.data.find((item) => {
      return item.id === +getItem.id
    })
    res.json({ success: true, data: adminItem })
  },

  'GET /api/admin': function (req, res) {
    const page = qs.parse(req.query)
    const pageSize = page.pageSize || 10
    const currentPage = page.current || 1

    let data
    let newPage

    let newData = AdminList.data.concat()

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
      data = AdminList.data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      AdminList.page.current = currentPage * 1
      newPage = AdminList.page
    }
    res.json({ success: true, list: data, page: { ...newPage, pageSize: Number(pageSize) } })
  },

  'POST /api/admin': function (req, res) {
    const newData = req.body
    newData.createTime = Mock.mock('@now')
    newData.avatar = Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', newData.name.substr(0, 1))

    const roleListData = global.roleListData.data
    const roleList = roleListData.map((item) => {
      return item.name
    })
    newData.roleName = roleList[newData.roleId - 1]

    newData.id = AdminList.data.length + 1
    AdminList.data.unshift(newData)

    AdminList.page.total = AdminList.data.length
    AdminList.page.current = 1

    res.json({ success: true, data: AdminList.data, page: AdminList.page })
  },

  'DELETE /api/admin': function (req, res) {
    const deleteItem = req.body
    AdminList.data = AdminList.data.filter((item) => {
      return item.id !== deleteItem.id
    })

    AdminList.page.total = AdminList.data.length

    res.json({ success: true, msg: '删除成功！' })
  },

  'PUT /api/admin': function (req, res) {
    const editItem = req.body

    const roleListData = global.roleList.data
    const roleList = roleListData.map((item) => {
      return item.name
    })

    editItem.createTime = Mock.mock('@now')
    editItem.avatar = Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', editItem.name.substr(0, 1))
    editItem.roleName = roleList[editItem.roleId - 1]

    AdminList.data = AdminList.data.map((item) => {
      if (item.id === editItem.id) {
        return editItem
      }
      return item
    })

    res.json({ success: true, list: AdminList.data, page: AdminList.page })
  },

}
