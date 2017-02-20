import fetch from 'dva/fetch'
import { message } from 'antd'
import { stringify, parse } from 'qs'

//message 全局配置
message.config({
  top: 50
})

axios.defaults.baseURL = newband.app.admin.API_HOST
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res.json()
  }
}

function handelData(res) {
  if(res && res.errors) {
    message.warning(res.errors)
  } else if(res && res.info) {
    message.success(res.info)
  }
  // console.log({ ...res.data, success: res.message == "Success" });
  return { ...res.data, success: res.message == "Success" }
}

function handleError(error) {
  console.error(error.stack)
  message.error("ajax errors: " + error.message, 5)
}

const headers = {
 'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  switch (options.method.toLowerCase()) {
    case 'post':
      return post(baseURL + url, options.data)
      break
    default:
      return fetch(baseURL + url, { ...options, header: headers })
             .then(checkStatus)
             .then(handelData)
             .catch(handleError)

  }
  return post(baseURL + url, options.data)
}

export function post(url, data) {
    let body = new FormData()
    for(let key in data){
      body.append(key, data[key])
    }
  return fetch(url, {body: body, header: headers, method: 'post' })
         .then(checkStatus)
         .then(handelData)
         .catch(handleError)
}
