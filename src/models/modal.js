import Immutable, { List, Map } from 'immutable'

export default {
  namespace: 'modal',
  state: Immutable.fromJS({
    loading: false,
    visible: false,
    type: 'create',
    curItem: {}
  }),
  reducers: {
    showLoading (state) {
      return state.set('loading', true)
    },
    hideLoading (state, action) {
      if(action.payload) {
        const { curItem } = action.payload
        return state.set('loading', false).set('curItem', Map(curItem))
      }
      return state.set('loading', false)
    },
    showModal (state, action) {
      const { type, curItem } = action.payload
      if(curItem) {
        return state.set('visible', true).set('type', type).set('curItem', Map(curItem))
      }
      return state.set('visible', true).set('type', type)
    },
    hideModal (state) {
      return state.set('visible', false).set('loading', false).set('curItem', Map({}))
    }
  }
}
