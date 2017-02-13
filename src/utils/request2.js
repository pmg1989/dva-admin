const Ajax = require('robe-ajax')

export default function request (url, options) {
  if (options.cross) {
    return Ajax.getJSON('http://query.yahooapis.com/v1/public/yql', {
      q: "select * from json where url='" + url + '?' + Ajax.param(options.data) + "'",
      format: 'json'
    })
  } else {
    return Ajax.ajax({
      url: url,
      method: options.method || 'get',
      data: options.data || {},
      processData: options.method === 'get',
      dataType: 'JSON'
    }).done((data) => {
      return data
    })
  }
}

//https://segmentfault.com/a/1190000003982703
// function toQueryString(obj) {
//     return obj ? Object.keys(obj).sort().map(function (key) {
//         var val = obj[key];
//         if (Array.isArray(val)) {
//             return val.sort().map(function (val2) {
//                 return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
//             }).join('&');
//         }
//
//         return encodeURIComponent(key) + '=' + encodeURIComponent(val);
//     }).join('&') : '';
// }
// fetch(url, {
//     method: 'post',
//     body: toQueryString({
//         'firstParam': 'yourValue',
//         'secondParam':'yourOtherValue'
//     })
// })

// import fetch from 'dva/fetch'
// import { apiUrl, authApiToken } from './config'
//
// function parseJSON(response) {
//   return response.json();
// }
//
// function checkStatus(response) {
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   }
//
//   const error = new Error(response.statusText);
//   error.response = response;
//   throw error;
// }
//
// const headers = {
//  'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
//  'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
// }
//
// export default function request(url, options) {
//   if(options.method.toLocaleLowerCase() === "post"){
//     return post(url, options)
//   }
//   return fetch(apiUrl + url, { ...options, header: headers })
//     .then(checkStatus)
//     .then(parseJSON)
//     .then((data) => ({ data }))
//     .catch((err) => ({ err }));
// }
//
// export function post(url, params) {
//   let body = new FormData()
//   body.append("wstoken", authApiToken)
//   body.append('moodlewsrestformat', 'json')
//   body.append('wsfunction', url)
//
//   for(let key in params.data){
//     body.append(key, params.data[key])
//   }
//
//   const options = { method: 'post', header: headers, body: body }
//
//   return fetch(apiUrl, options)
//     .then(checkStatus)
//     .then(parseJSON)
//     .then((data) => data)
//     .catch((err) => ({ err }));
// }
