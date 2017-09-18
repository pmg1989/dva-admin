const Mock = require('mockjs')

let listData = Mock.mock({
  'data|30': [
    {
      'cid|+1': 1,
      'name|+1': ['键盘', '吉他', '声乐', '贝斯', '爵士鼓', '其他'],
      memo: '@cparagraph',
      avatar () {
        return Mock.Random.image('40x40', Mock.Random.color(), '#757575', 'png', this.name.substr(0, 1))
      },
    },
  ],
})

module.exports = {

  'GET /api/category': function (req, res) {
    res.json({ success: true, list: listData.data })
  },

  'PUT /api/category': function (req, res) {
    const editItem = req.body

    editItem.avatar = Mock.Random.image('40x40', Mock.Random.color(), '#757575', 'png', editItem.name.substr(0, 1))

    listData.data = listData.data.map((item) => {
      if (item.cid === editItem.cid) {
        return editItem
      }
      return item
    })

    res.json({ success: true, list: listData.data })
  },

  'DELETE /api/category': function (req, res) {
    const deleteItem = req.body
    listData.data = listData.data.filter((item) => {
      if (item.cid === deleteItem.id) {
        return false
      }
      return true
    })

    res.json({ success: true, list: listData.data })
  },

  'POST /api/category': function (req, res) {
    const newData = req.body
    newData.avatar = Mock.Random.image('40x40', Mock.Random.color(), '#757575', 'png', newData.name.substr(0, 1))

    newData.cid = listData.data.length + 1
    listData.data.unshift(newData)

    res.json({ success: true, list: listData.data })
  },

}
