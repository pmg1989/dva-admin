import config from './config'
import menu from './menu'
import request from './request-mock'
import classnames from 'classnames'
import {color} from './theme'
import Cookie from 'js-cookie'

if(newband.admin.isMock){
  require('./mock.js')
}

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, function () {
    return arguments[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function (format) {
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds()
  }
  if (/(y+)/.test(format)) { format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1
        ? o[k]
        : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}

function equalSet(a, b) {
    const as = new Set(a)
    const bs = new Set(b)
    if (as.size !== bs.size) return false
    for (var a of as) if (!bs.has(a)) return false
    return true
}

const isLogin = () => {
  return Cookie.get('user_session') && Cookie.get('user_session') > new Date().getTime()
}

const userName = Cookie.get('user_name')

const setLoginIn = (userName) => {
  const now = new Date()
  now.setDate(now.getDate() + 1)
  Cookie.set('user_session', now.getTime(), { path: '/' })
  Cookie.set('user_name', userName, { path: '/' })
}

const setLoginOut = () => {
  Cookie.remove('user_session', { path: '/' })
  Cookie.remove('user_name', { path: '/' })
}

module.exports = {
  config,
  menu,
  request,
  color,
  classnames,
  equalSet,
  isLogin,
  userName,
  setLoginIn,
  setLoginOut
}
