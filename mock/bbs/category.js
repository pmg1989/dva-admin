const qs = require('qs')
const Mock = require('mockjs')
import mockStorge from '../../src/utils/mockStorge'
import { getBody } from '../utils'

let dataKey = mockStorge('BBSCategory', Mock.mock({
  'data|100': [
    {
      'cid|+1': 1,
      'name|+1': ["键盘", "吉他", "声乐", "贝斯", "爵士鼓", "其他"],
      memo: '@cparagraph'
    }
  ]
}))

let listData = global[dataKey]

module.exports = {

  'GET /api/category' (req, res) {
    res.json({ success: true, list: listData.data })
  },

  'PUT /api/category' (req, res) {
    const editItem = getBody(req)

    editItem.imgurl = Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', editItem.name.substr(0, 1))

    listData.data = listData.data.map(function (item) {
      if (item.cid === editItem.cid) {
        return editItem
      }
      return item
    })

    global[dataKey] = listData
    res.json({success: true, list: listData.data})
  },

  'DELETE /api/category' (req, res) {
    const deleteItem = getBody(req)
    listData.data = listData.data.filter(function (item) {
      if (item.cid === deleteItem.id) {
        return false
      }
      return true
    })


    global[dataKey] = listData

    res.json({success: true, list: listData.data})
  },

  'POST /api/category' (req, res) {
    const newData = getBody(req)
    newData.imgurl = Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', newData.name.substr(0, 1))

    newData.cid = listData.data.length + 1
    listData.data.unshift(newData)

    global[dataKey] = listData

    res.json({success: true, list: listData.data})
  },

}
