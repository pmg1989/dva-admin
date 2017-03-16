import { routerRedux } from 'dva/router'
import { update } from '../../services/system/modifyPassword'
import { getCurPowers } from '../../utils'

export default {
  namespace: 'systemModifyPassword',
  state: {
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        const pathname = location.pathname
        if (pathname === '/system/modify-password') {
          const curPowers = getCurPowers(pathname)
          if(curPowers) {
            dispatch({ type: 'app/changeCurPowers', payload: { curPowers } })
          } else {
            dispatch(routerRedux.push({ pathname: '/no-power' }))
          }
        }
      })
    }
  },

  effects: {
    *update ({ payload }, { select, call, put }) {
      yield call(update, payload)
    }
  },

  reducers: {
  }

}
