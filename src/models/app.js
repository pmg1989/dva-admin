import { parse } from 'qs'
import { routerRedux } from 'dva/router'
import { isLogin, userName } from '../utils'
import { login, userInfo, logout } from '../services/app'

export default {
  namespace : 'app',
  state : {
    login: false,//!!isLogin(),
    user: {
      name: userName || ''
    },
    menuPopoverVisible: false,
    siderFold: localStorage.getItem('antdAdminSiderFold') === 'true',
    darkTheme: localStorage.getItem('antdAdminDarkTheme') !== 'false',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(localStorage.getItem('navOpenKeys') || '[]') //侧边栏菜单打开的keys
  },
  subscriptions : {
    setup({ dispatch, history }) {
      const { pathname, search } = location
      if(!isLogin()){
        //在未登录状态下访问管理页面，可拦截首次订阅数据的请求
        pathname !== '/login' && dispatch(routerRedux.replace({
          pathname: '/login',
          state: { nextPathname: pathname, nextSearch: search }
        }))
      } else {
        dispatch({type: 'queryUser'})
        window.onresize = function() {
          dispatch({type: 'changeNavbar'})
        }
      }
    }
  },
  effects : {
    *login({
        payload
      }, {call, put, select}) {
        const data = yield call(login, parse(payload))
        if (data.success) {
          yield put({
            type: 'loginSuccess',
            payload: {
              user: {
                name: payload.username
              }
            }
          })
          const nextLocation = yield select(state => state.routing.locationBeforeTransitions)
          yield put(routerRedux.push({
            pathname: nextLocation.state && nextLocation.state.nextPathname ? nextLocation.state.nextPathname : '/dashboard',
            search: nextLocation.state && nextLocation.state.nextSearch
          }))
        } else {
          yield put({type: 'loginFail'})
        }
    },
    *queryUser({
        payload
      }, {call, put}) {
        const data = yield call(userInfo, parse(payload))
        if (data.success) {
          yield put({
            type: 'loginSuccess',
            payload: {
              user: {
                name: data.username
              }
            }
          })
        } else {
          yield put({type: 'loginFail'})
        }
    },
    *logout({
        payload
      }, {call, put}) {
        const data = yield call(logout, parse(payload))
        if (data.success) {
          yield put({type: 'logoutSuccess'})
          yield put(routerRedux.push({
            pathname: '/login',
            state: { nextPathname: location.pathname, nextSearch: location.search }
          }))
        }
    },
    *switchSider({
        payload
      }, {put}) {
        yield put({type: 'handleSwitchSider'})
    },
    *changeTheme({
        payload
      }, {put}) {
        yield put({type: 'handleChangeTheme'})
    },
    *changeNavbar({
        payload
      }, {put}) {
        if (document.body.clientWidth < 769) {
          yield put({type: 'showNavbar'})
        } else {
          yield put({type: 'hideNavbar'})
        }
    },
    *switchMenuPopver({
        payload
      }, {put}) {
        yield put({type: 'handleSwitchMenuPopver'})
      }
  },
  reducers : {
    loginSuccess(state, action) {
      return {
        ...state,
        ...action.payload,
        login: true
      }
    },
    logoutSuccess(state) {
      return {
        ...state,
        login: false
      }
    },
    loginFail(state) {
      return {
        ...state,
        login: false
      }
    },
    handleSwitchSider(state) {
      localStorage.setItem('antdAdminSiderFold', !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold
      }
    },
    handleChangeTheme(state) {
      localStorage.setItem('antdAdminDarkTheme', !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme
      }
    },
    showNavbar(state) {
      return {
        ...state,
        isNavbar: true
      }
    },
    hideNavbar(state) {
      return {
        ...state,
        isNavbar: false
      }
    },
    handleSwitchMenuPopver(state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible
      }
    },
    handleNavOpenKeys(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  }
}
