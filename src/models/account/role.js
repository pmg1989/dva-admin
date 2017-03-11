import { message } from 'antd'
import { routerRedux } from 'dva/router'
import { create, remove, update, query, queryPowerList } from '../../services/account/role'
import { getCurPowers } from '../../utils'

export default {
  namespace: 'accountRole',
  state: {
    list: [],
    loading: false
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        const pathname = location.pathname
        if (pathname === '/account/role') {
          const curPowers = getCurPowers(pathname)
          if(curPowers) {
            dispatch({ type: 'app/changeCurPowers', payload: { curPowers } })
            dispatch({ type: 'query' })
          } else {
            dispatch(routerRedux.push({ pathname: '/no-power' }))
          }
        }
      })
    }
  },

  effects: {
    *query ({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const data = yield call(query)
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.list
          }
        })
      }
      yield put({ type: 'hideLoading' })
    },
    *delete ({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const data = yield call(remove, { id: payload.id })
      yield put({ type: 'hideLoading' })
      if (data && data.success) {
        yield put({ type: 'query' })
      }
    },
    *create ({ payload }, { call, put }) {
      yield put({ type: 'modal/showLoading' })
      const { curItem } = payload
      const params = { ...curItem, power: JSON.stringify(curItem.power) }
      const data = yield call(create, params)
      yield put({ type: 'modal/hideLoading' })
      if (data && data.success) {
        yield put({ type: 'modal/hideModal' })
        yield put({ type: 'query' })
      }
    },
    *update ({ payload }, { call, put }) {
      yield put({ type: 'modal/showLoading' })
      const { curItem } = payload
      const params = { ...curItem, power: JSON.stringify(curItem.power) }
      const data = yield call(update, params)
      yield put({ type: 'modal/hideLoading' })
      if (data && data.success) {
        yield put({ type: 'modal/hideModal' })
        yield put({ type: 'query' })
        message.success("角色修改成功, 注销登录后重新登录即可生效！")
      }
    }
  },

  reducers: {
    showLoading (state) {
      return { ...state, loading: true }
    },
    hideLoading (state) {
      return { ...state, loading: false }
    },
    querySuccess (state, action) {
      return { ...state, ...action.payload }
    }
  }

}
