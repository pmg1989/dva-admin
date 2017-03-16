import { message } from 'antd'
import { routerRedux } from 'dva/router'
import { create, remove, update, query, get } from '../../services/account/admin'
import { query as queryRole } from '../../services/account/role'
import { getCurPowers } from '../../utils'

export default {
  namespace: 'accountAdmin',
  state: {
    list: [],
    pagination: {
      current: 1,
      pageSize: 10,
      total: null
    }
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        const pathname = location.pathname
        if (pathname === '/account/admin') {
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
    *query ({ payload }, { select, call, put }) {
      const pathQuery = yield select(({ routing }) => routing.locationBeforeTransitions.query)
      const data = yield call(query, pathQuery)
      if (data && data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: data.page
          }
        })
      }
    },
    *delete ({ payload }, { call, put }) {
      const data = yield call(remove, { id: payload.id })
      if (data && data.success) {
        yield put({ type: 'query' })
      }
    },
    *create ({ payload }, { select, call, put }) {
      const data = yield call(create, payload.curItem)
      if (data && data.success) {
        yield put({ type: 'modal/hideModal' })
        const pathQuery = yield select(({ routing }) => routing.locationBeforeTransitions.query)
        const { page } = pathQuery
        yield put(routerRedux.push({
          pathname: location.pathname,
          query: !!page ? { ...pathQuery, page: 1 } : pathQuery
        }))
      }
    },
    *update ({ payload }, { call, put }) {
      const data = yield call(update, payload.curItem)
      if (data && data.success) {
        yield put({ type: 'modal/hideModal' })
        yield put({ type: 'query' })
      }
    },
    *updateStatus ({ payload }, { call, put }) {
      const { curItem } = payload
      const data = yield call(update, { ...curItem, status: !curItem.status })
      if (data && data.success) {
        yield put({ type: 'query' })
      }
    },
    *showModal ({ payload }, { call, put }) {
      const { type, curItem } = payload
      let newData = { curItem: {} }

      yield put({ type: 'modal/showModal', payload: { type: type } })

      if(!!curItem) {
        const dataGet = yield call(get, { id: curItem.id })
        if(dataGet && dataGet.success) {
          newData.curItem = dataGet.data
        }
      }

      const dataRole = yield call(queryRole)
      if(dataRole && dataRole.success) {
        newData.curItem.roleList = dataRole.list
      }
      yield put({ type: 'modal/setItem', payload: newData })
    },
  },

  reducers: {
    querySuccess (state, action) {
      return { ...state, ...action.payload }
    }
  }
}
