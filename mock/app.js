const Mock = require('mockjs')
import Cookie from '../src/utils/cookie'

const roleDic = {
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

const app = Mock.mock([
  {
    username: 'admin',
    password: 'admin',
    roleId: 1,
  },
  {
    username: 'teacher',
    password: '123456',
    roleId: 2
  },
  {
    username: 'guest',
    password: 'guest',
    roleId: 3
  }
])

module.exports = {
  'POST /oauth/token' (req, res) {
    const userItem = req.body
    const response = {
      success: true,
      access_token: 'i am a test access_token'
    }
    res.json(response)
  },

  'POST /admin/check' (req, res) {
    const userItem = req.body
    const response = {
      success: false,
      msg: ''
    }
    const user = app.filter(function (item) {
      return item.username === userItem.username
    })
    if (user.length) {
      if (user[0].password === userItem.password) {
        const power = roleDic[user[0].roleId]

        response.msg = '登录成功'
        response.success = true
        response.role_power = power
      } else {
        response.msg = '密码不正确'
      }
    } else {
      response.msg = '用户不存在'
    }
    res.json(response)
  },

  'GET /api/userInfo' (req, res) {
    const response = {
      success: Cookie.get('user_session') && Cookie.get('user_session') > new Date().getTime(),
      username: Cookie.get('user_name') || '',
      msg: ''
    }
    res.json(response)
  },

  'POST /api/logout' (req, res) {
    res.json({
      success: true,
      msg: '注销成功'
    })
  }
}
