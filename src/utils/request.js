import axios from 'axios'
import { message } from 'antd'

//message 全局配置
message.config({
  top: 50
})

export default function request(url, options) {
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
  if(data && data.success && data.msg) {
    message.success(data.msg)
  } else if(data && !data.success && data.msg) {
    message.warning(data.msg)
  }
  return data
}

function handleError(error) {
  message.error(error)
  console.error(error)
}

export function get(url, params) {
  return axios.get(url, { params: params })
  .then(checkStatus)
  .then(handelData)
  .catch(handleError)
}

export function post(url, data) {
  return axios.post(url, data)
  .then(checkStatus)
  .then(handelData)
  .catch(handleError)
}

export function put(url, data) {
  return axios.put(url, data)
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
