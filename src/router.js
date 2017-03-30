import React from 'react'
import { Router, Route, IndexRoute } from 'dva/router'
import { isLogin } from './utils'

export default function ({history, app}) {

  function redirectToLogin(nextState, replace) {
    if (!isLogin()) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname, nextSearch: location.search }
      })
    }
  }

  function redirectToDashboard(nextState, replace) {
    if (isLogin()) {
      replace('/dashboard')
    }
  }

  return  (
    <Router history={history}>
      <Route path="/" component={require("./routes/App")} onEnter={redirectToLogin}>
        <IndexRoute component={require("./routes/Dashboard")}/>
        <Route path="dashboard" component={require("./routes/Dashboard")}/>
        <Route path="account">
          <Route path="admin" component={require("./routes/account/Admin")}/>
          <Route path="user" component={require("./routes/account/User")}/>
          <Route path="role" component={require("./routes/account/Role")}/>
        </Route>
        <Route path="system">
          <Route path="modify-password" component={require("./routes/system/ModifyPassword")}></Route>
        </Route>
        <Route path="bbs">
          <Route path="category" component={require("./routes/bbs/Category")}></Route>
        </Route>
        <Route path="ui">
          <Route path="upload" component={require("./routes/ui/Upload")}></Route>
          <Route path="media-player" component={require("./routes/ui/MediaPlayer")}></Route>
          <Route path="drop-menu" component={require("./routes/ui/DropMenu")}></Route>
          <Route path="lz-editor" component={require("./routes/ui/LzEditor")}></Route>
        </Route>
        <Route path="no-power" component={require("./routes/NoPower")}/>
      </Route>
      <Route path="login" component={require("./routes/Login")} onEnter={redirectToDashboard}/>
      <Route path="demo" component={require("./routes/Demo")}/>
      <Route path="*" component={require("./routes/Error")}/>
    </Router>
  )
}
