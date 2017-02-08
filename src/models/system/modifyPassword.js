import { parse } from 'qs'
import { update } from '../../services/system/modifyPassword'

export default {
  namespace: 'systemModifyPassword',
  state: {
  },

  subscriptions: {

  },

  effects: {
    *update ({ payload }, { select, call, put }) {
      const data = yield call(update, parse(payload))
    }
  },

  reducers: {
  }

}
