import { message } from 'antd'
import { routerRedux } from 'dva/router'
import { create, remove, update, query, get } from '../../services/bbs/category'
import { getCurPowers } from '../../utils'

const page = {
  current: 1,
  pageSize: 10
}

export default {
  namespace: 'bbsCategory',
  state: {
    isPostBack: true, //判断是否是首次加载页面，作为前端分页判断标识符
    list: [],
    pagination: {
      ...page,
      total: null
    }
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        const pathname = location.pathname
        if (pathname === '/bbs/category') {
          const curPowers = getCurPowers(pathname)
          if(curPowers) {
            dispatch({ type: 'app/changeCurPowers', payload: { curPowers } })
            dispatch({ type: 'query' })
          } else {
            dispatch(routerRedux.push({ pathname: '/no-power' }))
          }
        }
      })
    }
  },

  effects: {
    *query ({ payload }, { select, call, put }) {
      const isPostBack = yield select(({ bbsCategory }) => bbsCategory.isPostBack)
      const pathQuery = yield select(({ routing }) => routing.locationBeforeTransitions.query)

      if(isPostBack){
        const data = yield call(query)
        if (data.success) {
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.list,
              pagination: {
                current: pathQuery.current ? +pathQuery.current : page.current,
                pageSize: pathQuery.pageSize ? +pathQuery.pageSize : page.pageSize,
                total: data.list.length
              },
              isPostBack: false
            }
          })
        }
      } else {
        yield put({
          type: 'querySuccess',
          payload: {
            pagination: {
              current: pathQuery.current ? +pathQuery.current : page.current,
              pageSize: pathQuery.pageSize ? +pathQuery.pageSize : page.pageSize
            }
          }
        })
      }
    },
    *delete ({ payload }, { call, put }) {
      const data = yield call(remove, { id: payload.id })
      if (data && data.success) {
        yield put({ type: 'deleteSuccess', payload: { id: payload.id } })
      }
    },
    *create ({ payload }, { select, call, put }) {
      const data = yield call(create, payload.curItem)
      if (data && data.success) {
        yield put({ type: 'modal/hideModal' })
        yield put({ type: 'querySuccess', payload: { isPostBack: true } })
        yield put({ type: 'query' })
      }
    },
    *update ({ payload }, { call, put }) {
      const data = yield call(update, payload.curItem)
      if (data && data.success) {
        yield put({ type: 'modal/hideModal' })
        yield put({ type: 'updateSuccess', payload: { curItem: payload.curItem } })
      }
    }
  },

  reducers: {
    querySuccess (state, action) {
      return { ...state, ...action.payload }
    },
    updateSuccess (state, action) {
      const { curItem } = action.payload
      return { ...state, list: state.list.map(item => item.cid === curItem.cid ? curItem: item) }
    },
    deleteSuccess (state, action) {
      const { id } = action.payload
      return { ...state, list: state.list.filter(item => item.cid !== id) }
    }
  }

}
