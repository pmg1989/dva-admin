import './index.html'
import dva from 'dva'
import { browserHistory } from 'dva/router'

// 1. Initialize
const app = dva({
  history: browserHistory,
  onError(error) {
    console.error("app onError -- ", error)
  }
})

// 2. Model
app.model(require('./models/app'))
app.model(require('./models/modal'))

if(newband.app.admin.IS_DYNAMIC_LOAD) {
  // 3. Router for browserHistory dynamic load
  app.router(require('./router-dynamic'))
} else {
  app.model(require('./models/dashboard'))

  app.model(require('./models/account/admin'))
  app.model(require('./models/account/user'))
  app.model(require('./models/account/role'))

  app.model(require('./models/system/modifyPassword'))

  app.model(require('./models/order/list'))
  app.model(require('./models/order/flow'))

  // 3. Router for browserHistory
  app.router(require('./router'))
}

// 4. Start
app.start('#root')
