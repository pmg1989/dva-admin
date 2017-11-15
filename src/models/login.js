import { routerRedux } from 'dva/router'
import { setLoginIn, menu } from 'utils'
import { getToken, login } from 'services/login'

function getAllPathPowers (menuArray, curPowers) {
  return menuArray.reduce((dir, item) => {
    dir[`/${item.key}`] = curPowers[item.id]
    if (item.children) {
      item.children.reduce((cdir, cur) => {
        dir[`/${cdir}/${cur.key}`] = curPowers[cur.id]
        return cdir
      }, item.key)
      getAllPathPowers(item.children, curPowers)
    }
    return dir
  }, {})
}

export default {
  namespace: 'login',
  state: {
  },
  effects: {
    * submit ({
      payload,
    }, { call, put, select }) {
      const dataToken = yield call(getToken)
      if (dataToken.success) {
        const params = { access_token: dataToken.access_token, mobile: payload.username, username: payload.username, password: payload.password }
        const data = yield call(login, params)

        const allPathPowers = getAllPathPowers(menu, data.role_power)
        setLoginIn(payload.username, dataToken.access_token, data.role_power, allPathPowers)

        if (data && data.success) {
          yield put({
            type: 'app/loginSuccess',
            payload: {
              user: {
                name: payload.username,
              },
              userPower: data.role_power,
            },
          })

          const nextLocation = yield select(state => state.routing.locationBeforeTransitions)
          const nextPathname = nextLocation.state && nextLocation.state.nextPathname && nextLocation.state.nextPathname !== '/no-power' ? nextLocation.state.nextPathname : '/dashboard'
          yield put(routerRedux.push({
            pathname: nextPathname,
            search: nextLocation.state && nextLocation.state.nextSearch,
          }))
        }
      }
    },
  },
  reducers: {
  },
}
