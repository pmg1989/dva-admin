import Cookie from 'js-cookie'

export const set = (key, value, expire) => {
  Cookie.set(key, value, { path: '/', expires: 1 })
}

export const remove = (key) => {
  Cookie.remove(key, { path: '/' })
}

export const get = (key) => Cookie.get(key)

export const getJSON = (key) => (Cookie.getJSON(key) || {})

export default { set, remove, get, getJSON }
