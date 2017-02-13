import { parse } from 'qs'
import { message } from 'antd'
import { create, remove, update, query, get } from '../../services/account/admin'
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
    roleList: [],
    loading: false
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
      yield put({ type: 'showLoading' })
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
        message.success("管理员删除成功！")
      }
      yield put({ type: 'hideLoading' })
    },
    *create ({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
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
        message.success("管理员新增成功！")
      }
      yield put({ type: 'hideLoading' })
    },
    *update ({ payload }, { select, call, put }) {
      yield put({ type: 'showLoading' })
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
        message.success("管理员修改成功！")
      }
      yield put({ type: 'hideLoading' })
    },
    *updateStatus ({ payload }, { select, call, put }) {
      yield put({ type: 'showLoading' })
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
        message.success(`此管理员已${status ? '禁用' : '启用'}！`)
      }
      yield put({ type: 'hideLoading' })
    },
    *showModal ({ payload }, { select, call, put }) {

      const { modalType, id } = payload

      let newData = { modalVisible: true, modalType, loading: false }

      yield put({ type: 'showLoading' })

      if(!!id) {
        const dataGet = yield call(get, { id })
        if(dataGet) {
          newData.currentItem = dataGet.data
        }
      }

      const dataRole = yield call(queryRole)
      if(dataRole) {
        newData.roleList = dataRole.data
      }

      yield put({ type: 'querySuccess', payload: newData })
    },
  },

  reducers: {
    querySuccess (state, action) {
      return { ...state, ...action.payload }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    showLoading (state) {
      return { ...state, loading: true }
    },
    hideLoading (state) {
      return { ...state, loading: false }
    }
  }

}
