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
      <Route path="/" component={require("./routes/App")}>
        <IndexRoute component={require("./routes/Dashboard")}/>
        <Route path="dashboard" component={require("./routes/Dashboard")}/>
        <Route path="account">
          <IndexRoute component={require("./routes/account/Admin")}/>
          <Route path="admin" component={require("./routes/account/Admin")}/>
          <Route path="user" component={require("./routes/account/User")}/>
          <Route path="role" component={require("./routes/account/Role")}/>
        </Route>
        <Route path="system">
          <IndexRoute component={require("./routes/system/ModifyPassword")}/>
          <Route path="modify-password" component={require("./routes/system/ModifyPassword")}></Route>
        </Route>
      </Route>
      <Route path="login" component={require("./routes/Login")} onEnter={redirectToDashboard}/>
      <Route path="demo" component={require("./routes/demo/Demo")}/>
      <Route path="*" component={require("./routes/Error")}/>
    </Router>
  )
}
