import { routerRedux } from 'dva/router'
import { getCurPowers } from 'utils'
import { update } from 'services/system/modifyPassword'

export default {
  namespace: 'systemModifyPassword',
  state: {
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/system/modify-password') {
          const curPowers = getCurPowers(pathname)
          if (curPowers) {
            dispatch({ type: 'app/changeCurPowers', payload: { curPowers } })
          } else {
            dispatch(routerRedux.push({ pathname: '/no-power' }))
          }
        }
      })
    },
  },

  effects: {
    * update ({ payload }, { call }) {
      yield call(update, payload)
    },
  },

  reducers: {
  },
}
