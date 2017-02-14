import { parse } from 'qs'
import { routerRedux } from 'dva/router'
import { isLogin, userName, setLoginIn, setLoginOut } from '../utils'
import { getToken, login, userInfo, logout } from '../services/app'

export default {
  namespace : 'app',
  state : {
    login: !!isLogin(),
    loading: false,
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
    setup({ dispatch }) {
      window.onresize = function() {
        dispatch({type: 'changeNavbar'})
      }
      // if(isLogin()){
      //   dispatch({type: 'queryUser'})
      // }
    }
  },
  effects : {
    *login({
        payload
      }, {call, put, select}) {
        yield put({ type: 'showLoading' })
        const dataToken = yield call(getToken)
        if(dataToken.success) {
          const params = { access_token: dataToken.access_token, mobile: payload.username, username: payload.username, password: payload.password }
          const data = yield call(login, params)
          if (data.success) {
            yield setLoginIn(payload.username)
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
          }
        }
        yield put({ type: 'hideLoading' })
    },
    *queryUser({
        payload
      }, {call, put}) {
        yield put({ type: 'showLoading' })
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
        }
        yield put({ type: 'hideLoading' })
    },
    *logout({
        payload
      }, {call, put}) {
        yield put({ type: 'showLoading' })
        const data = yield call(logout, parse(payload))
        if (data.success) {
          //yield setLoginOut()
          yield put({type: 'logoutSuccess'})
          yield put(routerRedux.push({
            pathname: '/login',
            state: { nextPathname: location.pathname, nextSearch: location.search }
          }))
        }
        yield put({ type: 'hideLoading' })
    },
  },
  reducers : {
    showLoading (state) {
      return { ...state, loading: true }
    },
    hideLoading (state) {
      return { ...state, loading: false }
    },
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
    switchSider(state) {
      localStorage.setItem('antdAdminSiderFold', !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold
      }
    },
    changeTheme(state) {
      localStorage.setItem('antdAdminDarkTheme', !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme
      }
    },
    changeNavbar(state) {
      return {
        ...state,
        isNavbar: document.body.clientWidth < 769
      }
    },
    switchMenuPopver(state) {
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
