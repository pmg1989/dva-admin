import Cookie from '../src/utils/cookie'

const Mock = require('mockjs')

const app = Mock.mock([
  {
    username: 'admin',
    password: 'admin',
    roleId: 1,
  },
  {
    username: 'teacher',
    password: '123456',
    roleId: 2,
  },
  {
    username: 'guest',
    password: 'guest',
    roleId: 3,
  },
])

global.AdminUsers = app

module.exports = {
  'POST /oauth/token': function (req, res) {
    const response = {
      success: true,
      access_token: 'i am a test access_token',
    }
    res.json(response)
  },

  'POST /admin/check': function (req, res) {
    const userItem = req.body
    const response = {
      success: false,
      msg: '',
    }
    const user = app.filter((item) => {
      return item.username === userItem.username
    })
    if (user.length) {
      if (user[0].password === userItem.password) {
        const power = global.powerList[user[0].roleId]

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

  'GET /api/userInfo': function (req, res) {
    const response = {
      success: Cookie.get('user_session') && Cookie.get('user_session') > new Date().getTime(),
      username: Cookie.get('user_name') || '',
      msg: '',
    }
    res.json(response)
  },

  'POST /api/logout': function (req, res) {
    res.json({
      success: true,
      msg: '注销成功',
    })
  },
}
