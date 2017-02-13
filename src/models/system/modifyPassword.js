import { parse } from 'qs'
import { update } from '../../services/system/modifyPassword'

export default {
  namespace: 'systemModifyPassword',
  state: {
    loading: false
  },

  subscriptions: {

  },

  effects: {
    *update ({ payload }, { select, call, put }) {
      yield put({ type: 'showLoading' })
      yield call(update, parse(payload))
      yield put({ type: 'hideLoading' })
    }
  },

  reducers: {
    showLoading (state) {
      return { ...state, loading: true }
    },
    hideLoading (state) {
      return { ...state, loading: false }
    }
  }

}
