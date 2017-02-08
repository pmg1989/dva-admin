import { parse } from 'qs'
import { create, remove, update, query } from '../../services/account/admin'
import { query as queryRole } from '../../services/account/role'

export default {
  namespace: 'accountAdmin',
  state: {
    list: [],
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    pagination: {
      current: 1,
      pageSize: 20,
      total: null
    },
    roleList: []
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/account/admin' || location.pathname === '/account/' || location.pathname === '/account') {
          dispatch({
            type: 'query',
            payload: location.query
          })
        }
      })
    }
  },

  effects: {
    *query ({ payload }, { call, put }) {
      const data = yield call(query, parse(payload))
      if (data) {
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
    },
    *create ({ payload }, { call, put }) {
      yield put({ type: 'hideModal' })
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
    },
    *update ({ payload }, { select, call, put }) {
      yield put({ type: 'hideModal' })
      const id = yield select(({ accountAdmin }) => accountAdmin.currentItem.id)
      const newAdmin = { ...payload, id }
      const data = yield call(update, newAdmin)
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
    },
    *updateStatus ({ payload }, { select, call, put }) {
      const newAdmin = { ...payload, status: !payload.status }
      const data = yield call(update, newAdmin)
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
    },
    *showModal ({ payload }, { select, call, put }) {
      const roleList = yield select(({ accountAdmin }) => accountAdmin.roleList)
      if(!roleList.length) {
        yield put({ type: 'queryRole', payload })
      } else {
        yield put({ type: 'showModalSuccess', payload })
      }
    },
    *queryRole ({ payload }, { call, put }) {
      const data = yield call(queryRole)
      if (data && data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            roleList: data.data
          }
        })
        yield put({ type: 'showModalSuccess', payload })
      }
    }
  },

  reducers: {
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
