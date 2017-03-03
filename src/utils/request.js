import axios from 'axios'
import { message } from 'antd'
import { stringify, parse } from 'qs'
import Cookie from './cookie'

//message 全局配置
message.config({
  top: 50
})

axios.defaults.baseURL = newband.app.admin.API_HOST
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
//axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('Authorization')

let config = {}

export default function request(url, options) {
  if(url !== '/oauth/token' && url !== '/admin/check') {
    url = url + '?access_token=' + Cookie.get('access_token')
  }
  switch (options.method.toLowerCase()) {
    case 'get':
      return get(url, options.data)
      break
    case 'post':
      return post(url, options.data)
      break
  case 'put':
    return put(url, options.data)
    break
    case 'delete':
      return deleted(url, options.data)
      break
    default:
      break
  }
}

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res
  }
}

function handelData(res) {
  const data = res.data
  if(data && data.msg && !data.success) {
    message.error(data.msg)
  }
  // else if(data && data.msg && data.success) {
  //   message.success(data.msg)
  // }
  // console.log({ ...data.data, success: data.message == "Success" });
  return { ...data.data, success: data.success || data.message == "Success" }
}

function handleError(error) {
  const data = error.response.data
  if(data.errors) {
    message.error(`${data.message}：${data.errors}`, 5)
  } else if(data.error) {
    message.error(`${data.error}：${data.error_description}`, 5)
  } else {
    message.error('未知错误！', 5)
  }
  return { success: false }
}

export function get(url, params) {
  return axios.get(url, { params: params })
  .then(checkStatus)
  .then(handelData)
  .catch(handleError)
}

export function post(url, data) {
  return axios.post(url, stringify(data))
  .then(checkStatus)
  .then(handelData)
  .catch(handleError)
}

export function put(url, data) {
  return axios.put(url,  stringify(data))
  .then(checkStatus)
  .then(handelData)
  .catch(handleError)
}

export function deleted(url, data) {
  return axios.delete(url, { data })
  .then(checkStatus)
  .then(handelData)
  .catch(handleError)
}
