import axios from 'axios'
import { message } from 'antd'
import { stringify } from 'qs'

// message 全局配置
message.config({
  top: 50,
})

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
      return axios.post(url, data)
    case 'put':
      return axios.put(url, data)
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
    message.warning(data.msg)
  } else if (data && data.msg && data.success) {
    message.success(data.msg)
  }
  return data
}

function handleError (error) {
  message.error(error.response.data.errors, 5)
}

export default function request (url, options) {
  if (options.cross) {
    const params = {
      q: `select * from json where url='${url}?${stringify(options.data)}'`,
      format: 'json',
    }
    url = `http://query.yahooapis.com/v1/public/yql?${stringify(params)}`
    options = 'get'
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
