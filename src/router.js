import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import { isLogin } from 'utils'
import App from './routes/App'

function redirectToLogin (nextState, replace) {
  if (!isLogin()) {
    replace({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname,
        nextSearch: location.search,
      },
    })
  }
}

function redirectToDashboard (nextState, replace) {
  if (isLogin()) {
    replace('/dashboard')
  }
}

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      onEnter: redirectToLogin,
      getIndexRoute (nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/dashboard'))
          cb(null, { component: require('./routes/Dashboard') })
        }, 'dashboard')
      },
      childRoutes: [
        // dashboard
        {
          path: 'dashboard',
          name: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/dashboard'))
              cb(null, require('./routes/Dashboard'))
            }, 'dashboard')
          },
        },
        // account
        {
          path: 'account',
          name: 'account',
          childRoutes: [
            {
              path: 'admin',
              name: 'admin',
              getComponent (nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/account/admin'))
                  cb(null, require('./routes/account/Admin'))
                }, 'account-admin')
              },
            }, {
              path: 'user',
              name: 'user',
              getComponent (nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/account/user'))
                  cb(null, require('./routes/account/User'))
                }, 'account-user')
              },
            }, {
              path: 'role',
              name: 'role',
              getComponent (nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/account/role'))
                  cb(null, require('./routes/account/Role'))
                }, 'account-role')
              },
            },
          ],
        },
        // system
        {
          path: 'system',
          name: 'system',
          childRoutes: [
            {
              path: 'modify-password',
              name: 'modify-password',
              getComponent (nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/system/modifyPassword'))
                  cb(null, require('./routes/system/ModifyPassword'))
                }, 'modify-password')
              },
            },
          ],
        },
        // bbs
        {
          path: 'bbs',
          name: 'bbs',
          childRoutes: [
            {
              path: 'category',
              name: 'category',
              getComponent (nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/bbs/category'))
                  cb(null, require('./routes/bbs/Category'))
                }, 'category')
              },
            },
          ],
        },
        // ui
        {
          path: 'ui',
          name: 'ui',
          childRoutes: [
            {
              path: 'upload',
              name: 'upload',
              getComponent (nextState, cb) {
                require.ensure([], (require) => {
                  cb(null, require('./routes/ui/Upload'))
                }, 'upload')
              },
            }, {
              path: 'media-player',
              name: 'media-player',
              getComponent (nextState, cb) {
                require.ensure([], (require) => {
                  cb(null, require('./routes/ui/MediaPlayer'))
                }, 'media-player')
              },
            }, {
              path: 'drop-menu',
              name: 'drop-menu',
              getComponent (nextState, cb) {
                require.ensure([], (require) => {
                  cb(null, require('./routes/ui/DropMenu'))
                }, 'drop-menu')
              },
            },
            // , {
            //   path: 'lz-editor',
            //   name: 'lz-editor',
            //   getComponent(nextState, cb) {
            //     require.ensure([], require => {
            //       cb(null, require('./routes/ui/LzEditor'))
            //     }, 'lz-editor')
            //   }
            // }
          ],
        },
        // no-power
        {
          path: 'no-power',
          name: 'no-power',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/NoPower'))
            }, 'no-power')
          },
        },
      ],
    },
    // login
    {
      path: 'login',
      name: 'login',
      onEnter: redirectToDashboard,
      getComponent (nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/login'))
          cb(null, require('./routes/Login'))
        }, 'login')
      },
    },
    // *
    {
      path: '*',
      name: 'error',
      getComponent (nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/Error'))
        }, 'error')
      },
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
