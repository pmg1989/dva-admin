// import "babel-polyfill" // 如果需要支持ie 9+，请解注此行即可。
import dva from 'dva'
import { browserHistory } from 'dva/router'
import createLoading from 'dva-loading'

// 1. Initialize
const app = dva({
  history: browserHistory,
  onError (error) {
    console.error('app onError -- ', error)
  },
})

// 2. Plugins
app.use(createLoading({ effects: true }))

// 3. Model
app.model(require('./models/app'))
app.model(require('./models/modal'))

// 4. Router for browserHistory dynamic load
app.router(require('./router'))

// 5. Start
app.start('#root')
