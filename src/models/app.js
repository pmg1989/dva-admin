import { routerRedux } from 'dva/router'
import { Cookie, isLogin, userName, setLoginOut } from 'utils'

const initPower = Cookie.getJSON('user_power')

export default {
  namespace: 'app',
  state: {
    login: !!isLogin(),
    user: {
      name: userName || '',
    },
    menuPopoverVisible: false,
    siderFold: localStorage.getItem('antdAdminSiderFold') === 'true',
    darkTheme: localStorage.getItem('antdAdminDarkTheme') !== 'false',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(localStorage.getItem('navOpenKeys') || '[]'), // 侧边栏菜单打开的keys,
    userPower: initPower,
    curPowers: [],
  },
  subscriptions: {
    setup ({ dispatch }) {
      window.onresize = function () {
        dispatch({ type: 'changeNavbar' })
      }

      if (!isLogin()) {
        dispatch(routerRedux.push({
          pathname: '/login',
          state: { nextPathname: location.pathname !== '/login' ? location.pathname : '/', nextSearch: location.search },
        }))
      }
    },
  },
  effects: {
    * logout ({}, { put }) {
      const data = { success: true } // yield call(logout, parse(payload))
      if (data && data.success) {
        yield setLoginOut()
        yield put({ type: 'logoutSuccess' })
        yield put(routerRedux.push({
          pathname: '/login',
          state: { nextPathname: location.pathname, nextSearch: location.search },
        }))
      }
    },
  },
  reducers: {
    loginSuccess (state, action) {
      return { ...state, ...action.payload, login: true }
    },
    logoutSuccess (state) {
      return { ...state, login: false, userPower: {}, curPowers: [] }
    },
    switchSider (state) {
      localStorage.setItem('antdAdminSiderFold', !state.siderFold)
      return { ...state, siderFold: !state.siderFold }
    },
    changeTheme (state) {
      localStorage.setItem('antdAdminDarkTheme', !state.darkTheme)
      return { ...state, darkTheme: !state.darkTheme }
    },
    changeNavbar (state) {
      return { ...state, isNavbar: document.body.clientWidth < 769 }
    },
    switchMenuPopver (state) {
      return { ...state, menuPopoverVisible: !state.menuPopoverVisible }
    },
    handleNavOpenKeys (state, action) {
      return { ...state, ...action.payload }
    },
    changeCurPowers (state, action) {
      return { ...state, ...action.payload }
    },
  },
}
