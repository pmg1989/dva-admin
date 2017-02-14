import { parse } from 'qs'
import { message } from 'antd'
import { create, remove, update, query, queryPowerList } from '../../services/account/role'

export default {
  namespace: 'accountRole',
  state: {
    list: [],
    loading: false,
    currentItem: {},
    currentPowerLst: {},
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
        if (location.pathname === '/account/role') {
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
      if (data.success) {
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
        message.success("角色删除成功！")
      }
      yield put({ type: 'hideLoading' })
    },
    *create ({ payload }, { call, put }) {
      yield put({ type: 'hideModal' })
      yield put({ type: 'hideLoading' })
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
        message.success("角色新增成功！")
      }
      yield put({ type: 'hideLoading' })
    },
    *update ({ payload }, { select, call, put }) {
      yield put({ type: 'hideModal' })
      yield put({ type: 'showLoading' })
      const id = yield select(({ accountRole }) => accountRole.currentItem.id)
      const newRole = { ...payload, id }
      const data = yield call(update, newRole)
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
        message.success("角色修改成功！")
      }
      yield put({ type: 'hideLoading' })
    },
    *showModal ({ payload }, { call, put }) {
      const { modalType, currentItem } = payload
      let newData = { modalType, currentPowerLst: {} }

      if(!!currentItem) {
        yield put({ type: 'showLoading' })

        const data = yield call(queryPowerList, { id: currentItem.id })
        if(data.success) {
          newData.currentPowerLst = data.data
        }
        newData.currentItem = currentItem
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
