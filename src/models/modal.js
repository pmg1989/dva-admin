
export default {
  namespace: 'modal',
  state: {
    visible: false,
    type: 'create',
    curItem: {},
  },
  reducers: {
    showModal (state, action) {
      return { ...state, visible: true, ...action.payload }
    },
    hideModal (state) {
      return { ...state, visible: false, curItem: {} }
    },
    setItem (state, action) {
      const { curItem } = action.payload
      return { ...state, curItem }
    },
  },
}
