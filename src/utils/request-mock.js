import axios from 'axios'
import { message } from 'antd'
import { stringify, parse } from 'qs'
import { baseURL } from './config'

//message 全局配置
message.config({
  top: 50
})

const isMock = newband.admin.isMock

if(!isMock){
  axios.defaults.baseURL = baseURL
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
}

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
  if(isMock) {
    if(data && data.msg && !data.success) {
      message.warning(data.msg)
    } else if(data && data.msg && data.success) {
      message.success(data.msg)
    }
    // console.log(data);
    return data
  }

  if(data && data.errors) {
    message.warning(data.errors)
  } else if(data && data.info) {
    message.success(data.info)
  }
  // console.log({ ...data, success: data.message == "Success" });
  return { ...data, success: data.message == "Success" }
}

function handleError(error) {
  message.error(error.response.data.errors, 5)
}

export function get(url, params) {
  return axios.get(url, { params: params })
  .then(checkStatus)
  .then(handelData)
  .catch(handleError)
}

export function post(url, data) {
  return axios.post(url, isMock ? parse(data) : stringify(data))
  .then(checkStatus)
  .then(handelData)
  .catch(handleError)
}

export function put(url, data) {
  return axios.put(url,  isMock ? parse(data) : stringify(data))
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
