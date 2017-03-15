import mockStorge from '../src/utils/mockStorge'
import { getBody } from './utils'
import Cookie from '../src/utils/cookie'

let dataKey = mockStorge('AdminUsers', [
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
    const userItem = getBody(req)
    const response = {
      success: true,
      access_token: 'i am a test access_token'
    }
    res.json(response)
  },

  'POST /admin/check' (req, res) {
    const userItem = getBody(req)
    const response = {
      success: false,
      msg: ''
    }
    const d = global[dataKey].filter(function (item) {
      return item.username === userItem.username
    })
    if (d.length) {
      if (d[0].password === userItem.password) {
        // const now = new Date()
        // now.setDate(now.getDate() + 1)
        // Cookie.set('user_session', now.getTime())
        // Cookie.set('user_name', userItem.username)
        // Cookie.set('user_power', power)
        const power = global['AccountPowerList'].data[d[0].roleId]

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
    // Cookie.remove('user_session')
    // Cookie.remove('user_name')
    // Cookie.remove('user_power')
    // Cookie.remove('access_token')
    // Cookie.remove('cur_menu_id')
    res.json({
      success: true,
      msg: '注销成功'
    })
  }
}
