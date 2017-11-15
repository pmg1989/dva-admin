import { message } from 'antd'
import { getCurPowers } from 'utils'
import { create, remove, update, query } from 'services/account/role'

export default {
  namespace: 'accountRole',
  state: {
    list: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/account/role') {
          const curPowers = getCurPowers(pathname)
          if (curPowers) {
            dispatch({ type: 'app/changeCurPowers', payload: { curPowers } })
            dispatch({ type: 'query' })
          }
        }
      })
    },
  },

  effects: {
    * query ({}, { call, put }) {
      const data = yield call(query)
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.list,
          },
        })
      }
    },
    * delete ({ payload }, { call, put }) {
      const data = yield call(remove, { id: payload.id })
      if (data && data.success) {
        yield put({ type: 'query' })
      }
    },
    * create ({ payload }, { call, put }) {
      const { curItem } = payload
      const params = { ...curItem, power: JSON.stringify(curItem.power) }
      const data = yield call(create, params)
      if (data && data.success) {
        yield put({ type: 'modal/hideModal' })
        yield put({ type: 'query' })
      }
    },
    * update ({ payload }, { call, put }) {
      const { curItem } = payload
      const params = { ...curItem, power: JSON.stringify(curItem.power) }
      const data = yield call(update, params)
      if (data && data.success) {
        yield put({ type: 'modal/hideModal' })
        yield put({ type: 'query' })
        message.success('角色修改成功, 注销登录后重新登录即可生效！')
      }
    },
  },

  reducers: {
    querySuccess (state, action) {
      return { ...state, ...action.payload }
    },
  },

}
