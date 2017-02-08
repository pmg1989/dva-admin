import './index.html'
import dva from 'dva'
import { browserHistory } from 'dva/router'
import createLoading from 'dva-loading'
import { message } from 'antd'

// 1. Initialize
const app = dva({
  history: browserHistory,
  onError(error) {
    message.error(error.message)
  }
});

// 2. Plugins
app.use(createLoading())

// 3. Model

app.model(require('./models/app'))
app.model(require('./models/dashboard'))

app.model(require('./models/account/admin'))
app.model(require('./models/account/user'))
app.model(require('./models/account/role'))

app.model(require('./models/system/modifyPassword'))

// 4. Router
app.router(require('./router'))

// 5. Start
app.start('#root')
