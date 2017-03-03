
export default {
  namespace: 'modal',
  state: {
    loading: false,
    visible: false,
    type: 'create',
    curItem: {},
    otherItem: [] //其他对象
  },
  reducers: {
    showLoading (state) {
      return { ...state, loading: true }
    },
    hideLoading (state, action) {
      return { ...state, loading: false, ...action.payload }
    },
    showModal (state, action) {
      return { ...state, visible: true, ...action.payload }
    },
    hideModal (state) {
      return { ...state, visible: false, loading: false, curItem: {} }
    }
  }
}
