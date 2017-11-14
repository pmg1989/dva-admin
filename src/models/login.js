import { routerRedux } from 'dva/router'
import { getToken, login } from 'services/login'

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

        if (data && data.success) {
          yield put({
            type: 'app/login',
            payload: {
              user: {
                name: payload.username,
              },
              accessToken: dataToken.access_token,
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
