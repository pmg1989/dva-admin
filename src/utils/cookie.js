import Cookie from 'js-cookie'

const set = (key, value, expires = 1) => {
  Cookie.set(key, value, { path: '/', expires })
}

const remove = (key) => {
  Cookie.remove(key, { path: '/' })
}

const get = key => Cookie.get(key)

const getJSON = key => (Cookie.getJSON(key) || {})

export default { set, remove, get, getJSON }
