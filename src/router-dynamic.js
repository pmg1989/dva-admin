import React from 'react'
import {Router, Route, IndexRoute} from 'dva/router'
import App from './routes/app'
import {isLogin} from './utils'

function redirectToLogin(nextState, replace) {
  if (!isLogin()) {
    replace({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname,
        nextSearch: location.search
      }
    })
  }
}

function redirectToDashboard(nextState, replace) {
  if (isLogin()) {
    replace('/dashboard')
  }
}

const cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model)
    cached[model.namespace] = 1
  }
}

export default function({history, app}) {
  const routes = [
    {
      path: '/',
      component: App,
      onEnter: redirectToLogin,
      getIndexRoute(nextState, cb) {
        require.ensure([], require => {
          cb(null, {component: require('./routes/dashboard')})
        })
      },
      childRoutes: [
        {
          path: 'dashboard',
          name: 'dashboard',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/dashboard'))
              cb(null, require('./routes/dashboard'))
            })
          }
        }, {
          path: 'account',
          name: 'account',
          childRoutes: [
            {
              path: 'admin',
              name: 'admin',
              getComponent(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/account/admin'))
                  cb(null, require('./routes/account/Admin'))
                })
              }
            }, {
              path: 'user',
              name: 'user',
              getComponent(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/account/user'))
                  cb(null, require('./routes/account/User'))
                })
              }
            }, {
              path: 'role',
              name: 'role',
              getComponent(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/account/role'))
                  cb(null, require('./routes/account/Role'))
                })
              }
            }
          ]
        }, {
          path: 'system',
          name: 'system',
          childRoutes: [
            {
              path: 'modify-password',
              name: 'modify-password',
              getComponent(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/system/modifyPassword'))
                  cb(null, require('./routes/system/ModifyPassword'))
                })
              }
            }
          ]
        }, {
          path: 'no-power',
          name: 'no-power',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/NoPower'))
            })
          }
        }
      ]
    }, {
      path: 'login',
      name: 'login',
      onEnter: redirectToDashboard,
      getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./routes/Login'))
        })
      }
    }, {
      path: 'demo',
      name: 'demo',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./routes/demo/Demo'))
        })
      }
    }, {
      path: '*',
      name: 'error',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./routes/Error'))
        })
      }
    }
  ]

  return <Router history={history} routes={routes}/>
}
