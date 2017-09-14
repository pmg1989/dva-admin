import Cookie from 'js-cookie'

const set = (key, value, expire) => {
  Cookie.set(key, value, { path: '/', expires: 1 })
}

const remove = (key) => {
  Cookie.remove(key, { path: '/' })
}

const get = (key) => Cookie.get(key)

const getJSON = (key) => (Cookie.getJSON(key) || {})

export default { set, remove, get, getJSON }
