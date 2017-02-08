
export function validPhone(rule, value, callback) {
  if(!!value && !(/^1(3|4|5|7|8)\d{9}$/.test(value))){
    callback("手机号码格式不正确")
  } else {
    callback()
  }
}
