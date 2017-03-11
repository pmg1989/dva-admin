import { routerRedux } from 'dva/router'
import Immutable, { List, Map } from 'immutable'
import { isLogin, userName, setLoginIn, setLoginOut, menu } from '../utils'
import { getToken, login, userInfo, logout } from '../services/app'
import Cookie from '../utils/cookie'

const initPower = Cookie.getJSON('user_power')

function getAllPathPowers(menuArray, curPowers) {
  return menuArray.reduce((dir, item) => {
    if(item.children) {
      dir[`/${item.key}`] = curPowers[item.id]
      item.children.reduce((cdir, cur) => {
        dir[`/${cdir}/${cur.key}`] = curPowers[cur.id]
        return cdir
      },item.key)
      getAllPathPowers(item.children, curPowers)
    } else {
      dir[`/${item.key}`] = curPowers[item.id]
    }
    return dir
  }, {})
}

export default {
  namespace : 'app',
  state : Immutable.fromJS({
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
  }),
  subscriptions : {
    setup({ dispatch, history }) {
      window.onresize = function() {
        dispatch({type: 'changeNavbar'})
      }

      if(!isLogin()) {
        dispatch(routerRedux.push({
          pathname: '/login',
          state: { nextPathname: location.pathname !== '/login' ? location.pathname : '/', nextSearch: location.search }
        }))
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

          if (data && data.success) {
            const allPathPowers = yield getAllPathPowers(menu, data.role_power)

            yield setLoginIn(payload.username, dataToken.access_token, data.role_power, allPathPowers)
            yield put({
              type: 'loginSuccess',
              payload: {
                user: {
                  name: payload.username
                },
                userPower: data.role_power
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
        const data = { success: true } //yield call(logout, parse(payload))
        if (data && data.success) {
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
      return state.set('loading', true)
    },
    hideLoading (state) {
      return state.set('loading', false)
    },
    loginSuccess(state, action) {
      const { user, userPower } = action.payload
      return state.set('login', true).set('userPower', userPower).setIn(['user', 'name'], user.name)
    },
    logoutSuccess(state) {
      // return {
      //   ...state,
      //   login: false,
      //   userPower: {},
      //   curPowers: []
      // }
      return state
    },
    switchSider(state) {
      // localStorage.setItem('antdAdminSiderFold', !state.siderFold)
      // return {
      //   ...state,
      //   siderFold: !state.siderFold
      // }
      return state
    },
    changeTheme(state) {
      // localStorage.setItem('antdAdminDarkTheme', !state.darkTheme)
      // return {
      //   ...state,
      //   darkTheme: !state.darkTheme
      // }
      return state
    },
    changeNavbar(state) {
      // return {
      //   ...state,
      //   isNavbar: document.body.clientWidth < 769
      // }
      return state
    },
    switchMenuPopver(state) {
      // return {
      //   ...state,
      //   menuPopoverVisible: !state.menuPopoverVisible
      // }
      return state
    },
    handleNavOpenKeys(state, action) {
      // return {
      //   ...state,
      //   ...action.payload
      // }
      return state
    },
    changeCurPowers(state, action) {
      const { curPowers } = action.payload
      return state.set('curPowers', List(curPowers))
    }
  }
}
