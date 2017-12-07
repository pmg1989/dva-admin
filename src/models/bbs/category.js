import { getCurPowers, renderQuery } from 'utils'
import { create, remove, update, query } from 'services/bbs/category'

const page = {
  current: 1,
  pageSize: 10,
}

export default {
  namespace: 'bbsCategory',
  state: {
    isPostBack: true, // 判断是否是首次加载页面，作为前端分页判断标识符
    searchQuery: {},
    list: [],
    pagination: {
      ...page,
      total: null,
    },
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/bbs/category') {
          const curPowers = getCurPowers(pathname)
          if (curPowers) {
            dispatch({ type: 'app/changeCurPowers', payload: { curPowers } })
            dispatch({ type: 'query', payload: {} })
          }
        }
      })
    },
  },

  effects: {
    * query ({ payload }, { select, call, put }) {
      const { isPostBack, searchQuery } = yield select(({ bbsCategory }) => bbsCategory)
      const querys = renderQuery(searchQuery, payload)

      if (isPostBack) {
        const data = yield call(query)
        if (data.success) {
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.list,
              pagination: {
                current: payload.current ? +payload.current : page.current,
                pageSize: payload.pageSize ? +payload.pageSize : page.pageSize,
                total: data.length,
              },
              isPostBack: false,
              searchQuery: querys,
            },
          })
        }
      } else {
        yield put({
          type: 'querySuccess',
          payload: {
            pagination: {
              current: payload.current ? +payload.current : page.current,
              pageSize: payload.pageSize ? +payload.pageSize : page.pageSize,
            },
            searchQuery: querys,
          },
        })
      }
    },
    * delete ({ payload }, { call, put }) {
      const data = yield call(remove, { id: payload.id })
      if (data && data.success) {
        yield put({ type: 'deleteSuccess', payload: { id: payload.id } })
      }
    },
    * create ({ payload }, { call, put }) {
      const data = yield call(create, payload.curItem)
      if (data && data.success) {
        yield put({ type: 'modal/hideModal' })
        yield put({ type: 'querySuccess', payload: { isPostBack: true } })
        yield put({ type: 'query' })
      }
    },
    * update ({ payload }, { call, put }) {
      const data = yield call(update, payload.curItem)
      if (data && data.success) {
        yield put({ type: 'modal/hideModal' })
        yield put({ type: 'updateSuccess', payload: { curItem: payload.curItem } })
      }
    },
  },

  reducers: {
    querySuccess (state, action) {
      return { ...state, ...action.payload }
    },
    updateSuccess (state, action) {
      const { curItem } = action.payload
      return { ...state, list: state.list.map(item => (item.cid === curItem.cid ? curItem : item)) }
    },
    deleteSuccess (state, action) {
      const { id } = action.payload
      return { ...state, list: state.list.filter(item => item.cid !== id) }
    },
  },

}
