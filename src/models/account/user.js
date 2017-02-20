import { parse } from 'qs'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
import { create, remove, update, query, get } from '../../services/account/user'
import { getCurPowers } from '../../utils'

export default {
  namespace: 'accountUser',
  state: {
    list: [],
    loading: false,
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    pagination: {
      current: 1,
      pageSize: 20,
      total: null
    }
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        const pathname = location.pathname
        if (pathname === '/account/user') {
          const curPowers = getCurPowers(pathname)
          if(curPowers) {
            dispatch({ type: 'app/changeCurPowers', payload: { curPowers } })
            dispatch({ type: 'query', payload: location.query })
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
      const data = yield call(query, parse(payload))
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.list,
            pagination: data.page
          }
        })
      }
      yield put({ type: 'hideLoading' })
    },
    *delete ({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const data = yield call(remove, { id: payload })
      if (data && data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              total: data.page.total,
              current: data.page.current
            }
          }
        })
      }
      yield put({ type: 'hideLoading' })
    },
    *create ({ payload }, { call, put }) {
      yield put({ type: 'hideModal' })
      yield put({ type: 'showLoading' })
      const data = yield call(create, payload)
      if (data && data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              total: data.page.total,
              current: data.page.current
            }
          }
        })
      }
      yield put({ type: 'hideLoading' })
    },
    *update ({ payload }, { select, call, put }) {
      yield put({ type: 'hideModal' })
      yield put({ type: 'showLoading' })
      const id = yield select(({ accountUser }) => accountUser.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(update, newUser)
      if (data && data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              total: data.page.total,
              current: data.page.current
            }
          }
        })
      }
      yield put({ type: 'hideLoading' })
    },
    *updateStatus ({ payload }, { select, call, put }) {
      yield put({ type: 'showLoading' })
      const { status } = payload
      const newUser = { ...payload, status: !status }
      const data = yield call(update, newUser)
      if (data && data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              total: data.page.total,
              current: data.page.current
            }
          }
        })
      }
      yield put({ type: 'hideLoading' })
    },
    *showModal ({ payload }, { select, call, put }) {
      const { modalType, id } = payload
      let newData = { modalType }

      if(!!id) {
        yield put({ type: 'showLoading' })

        const dataGet = yield call(get, { id })
        if(dataGet) {
          newData.currentItem = dataGet.data
        }
        newData.loading = false
      }

      yield put({ type: 'showModalSuccess', payload: newData })
    },
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
    },
    showModalSuccess (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    }
  }

}
