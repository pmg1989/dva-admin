import { parse } from 'qs'
import { routerRedux } from 'dva/router'
import { isLogin, userName, setLoginIn, setLoginOut, menu } from '../utils'
import { getToken, login, userInfo, logout } from '../services/app'
import Cookie from '../utils/cookie'

const initPower = Cookie.getJSON('user_power')

function getAllPathPowers(menuArray, curPowers) {
  return menuArray.reduce((dir, item) => {
    if(item.children) {
      dir[`/${item.key}`] = {
        curPowers: curPowers[item.id]
      }
      item.children.reduce((cdir, cur) => {
        dir[`/${cdir}/${cur.key}`] = {
          curPowers: curPowers[cur.id]
        }
        return cdir
      },item.key)
      getAllPathPowers(item.children, curPowers)
    } else {
      dir[`/${item.key}`] = {
        curPowers: curPowers[item.id]
      }
    }
    return dir
  }, {})
}

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
    navOpenKeys: JSON.parse(localStorage.getItem('navOpenKeys') || '[]'), //侧边栏菜单打开的keys,
    userPower: initPower,
    curPowers: []
  },
  subscriptions : {
    setup({ dispatch, history }) {
      window.onresize = function() {
        dispatch({type: 'changeNavbar'})
      }
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
            const allPathPowers = yield getAllPathPowers(menu, data.power)

            yield setLoginIn(payload.username, dataToken.access_token, data.power, allPathPowers)
            yield put({
              type: 'loginSuccess',
              payload: {
                user: {
                  name: payload.username
                },
                userPower: data.power
              }
            })

            const nextLocation = yield select(state => state.routing.locationBeforeTransitions)
            const nextPathname = nextLocation.state && nextLocation.state.nextPathname && nextLocation.state.nextPathname !== '/no-power' ? nextLocation.state.nextPathname : '/dashboard'
            yield put(routerRedux.push({
              pathname: nextPathname,
              search: nextLocation.state && nextLocation.state.nextSearch
            }))
          }
        }
        yield put({ type: 'hideLoading' })
    },
    *logout({
        payload
      }, {call, put}) {
        yield put({ type: 'showLoading' })
        const data = yield call(logout, parse(payload))
        if (data.success) {
          yield setLoginOut()
          yield put({type: 'logoutSuccess'})
          yield put(routerRedux.push({
            pathname: '/login',
            state: { nextPathname: location.pathname, nextSearch: location.search }
          }))
        }
        yield put({ type: 'hideLoading' })
    }
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
        login: false,
        userPower: {},
        curPowers: []
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
    },
    changeCurPowers(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  }
}
