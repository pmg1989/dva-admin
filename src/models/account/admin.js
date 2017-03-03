import { parse } from 'qs'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
import Immutable, { List, Map } from 'immutable'
import { create, remove, update, query, get } from '../../services/account/admin'
import { query as queryRole } from '../../services/account/role'
import { getCurPowers } from '../../utils'

export default {
  namespace: 'accountAdmin',
  state: Immutable.fromJS({
    list: [],
    loading: false,
    pagination: {
      current: 1,
      pageSize: 10,
      total: null
    }
  }),

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
      yield put({ type: 'showLoading' })
      const pathQuery = yield select(({ routing }) => routing.locationBeforeTransitions.query)
      const data = yield call(query, pathQuery)
      if (data && data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: data.page,
            loading: false
          }
        })
      }
      // yield put({ type: 'hideLoading' })
    },
    *delete ({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const data = yield call(remove, { id: payload })
      yield put({ type: 'hideLoading' })
      if (data && data.success) {
        yield put({ type: 'query' })
      }
    },
    *create ({ payload }, { select, call, put }) {
      yield put({ type: 'modal/showLoading' })
      const data = yield call(create, payload)
      yield put({ type: 'modal/hideLoading' })
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
      yield put({ type: 'modal/showLoading' })
      const data = yield call(update, payload)
      yield put({ type: 'modal/hideLoading' })
      if (data && data.success) {
        yield put({ type: 'modal/hideModal' })
        yield put({ type: 'query' })
      }
    },
    *updateStatus ({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const data = yield call(update, { ...payload, status: !payload.status })
      yield put({ type: 'hideLoading' })
      if (data && data.success) {
        yield put({ type: 'query' })
      }
    },
    *showModal ({ payload }, { call, put }) {
      const { type, curItem } = payload
      let newData = {}

      yield put({ type: 'modal/showModal', payload: { loading: true, type: type } })

      if(!!curItem) {
        const dataGet = yield call(get, { id: curItem.id })
        if(dataGet && dataGet.success) {
          newData.curItem = dataGet.data
        }
      }

      const dataRole = yield call(queryRole)
      if(dataRole && dataRole.success) {
        newData.otherItem = dataRole.list
      }
      yield put({ type: 'modal/hideLoading', payload: newData })
    },
  },

  reducers: {
    querySuccess (state, action) {
      const { list, pagination, loading } = action.payload
      return state.set('list', List(list)).set('pagination', Map(pagination)).set('loading', false)
    },
    showLoading (state) {
      return state.set('loading', true)
    },
    hideLoading (state) {
      return state.set('loading', false)
    }
  }
}
