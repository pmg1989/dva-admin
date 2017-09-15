import axios from 'axios'
import { message } from 'antd'
import { stringify } from 'qs'
import Cookie from './cookie'

// message 全局配置
message.config({
  top: 50,
})

axios.defaults.baseURL = newband.app.admin.API_HOST
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
// axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('Authorization')

const fetch = (url, options) => {
  const { method = 'get', data } = options
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, { params: data })
    case 'delete':
      return axios.delete(url, { data })
    case 'head':
      return axios.head(url, data)
    case 'post':
      return axios.post(url, stringify(data))
    case 'put':
      return axios.put(url, stringify(data))
    case 'patch':
      return axios.patch(url, data)
    default:
      return axios(options)
  }
}

function checkStatus (res) {
  if (res.status >= 200 && res.status < 300) {
    return res
  }

  const error = new Error(res.statusText)
  error.response = res
  throw error
}

function handelData (res) {
  const data = res.data
  if (data && data.msg && !data.success) {
    message.error(data.msg)
  }
  // else if(data && data.msg && data.success) {
  //   message.success(data.msg)
  // }
  return { ...data.data, success: data.success || data.message === 'Success' }
}

function handleError (error) {
  const data = error.response.data
  if (data.errors) {
    message.error(`${data.message}：${data.errors}`, 5)
  } else if (data.error) {
    message.error(`${data.error}：${data.error_description}`, 5)
  } else {
    message.error('未知错误！', 5)
  }
  return { success: false }
}

export default function request (url, options) {
  if (url !== '/oauth/token' && url !== '/admin/check') {
    url = `${url}?access_token=${Cookie.get('access_token')}`
  }

  return fetch(url, options)
    .then(checkStatus)
    .then(handelData)
    .catch(handleError)
}

export function get (url, options) {
  return request(url, { ...options, method: 'get' })
}

export function post (url, options) {
  return request(url, { ...options, method: 'post' })
}

export function put (url, options) {
  return request(url, { ...options, method: 'put' })
}

export function deleted (url, options) {
  return request(url, { ...options, method: 'deleted' })
}
