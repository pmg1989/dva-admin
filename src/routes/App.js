import React, { Component, PropTypes } from 'react'
import { Spin } from 'antd'
import { connect } from 'dva'
import { createSelector } from 'reselect'
import Login from '../components/Login'
import Header from '../components/layout/Header'
import Bread from '../components/layout/Bread'
import Footer from '../components/layout/Footer'
import Sider from '../components/layout/Sider'
import styles from '../components/layout/main.less'
import { classnames } from '../utils'
import '../components/layout/common.less'


function App ({ children, location, dispatch, app, loading }) {
  const {login, user, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys} = app
  const loginProps = {
    loading,
    onOk (data) {
      dispatch({type: 'app/login', payload: data})
    }
  }

  const headerProps = {
    user,
    siderFold,
    location,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover () {
      dispatch({type: 'app/switchMenuPopver'})
    },
    logout () {
      dispatch({type: 'app/logout'})
    },
    switchSider () {
      dispatch({type: 'app/switchSider'})
    },
    changeOpenKeys(openKeys) {
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    }
  }

  const siderProps = {
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeTheme () {
      dispatch({type: 'app/changeTheme'})
    },
    changeOpenKeys(openKeys) {
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    }
  }

  return (
    <div>{login
        ? <div className={classnames(styles.layout, {[styles.fold]: isNavbar ? false : siderFold}, {[styles.withnavbar]: isNavbar})}>
          {!isNavbar ? <aside className={classnames(styles.sider, {[styles.light]: !darkTheme})}>
            <Sider {...siderProps} />
          </aside> : ''}
          <div className={styles.main}>
            <Header {...headerProps} />
            <Bread location={location} />
            <div className={styles.container}>
              <div className={styles.content}>
                {children}
              </div>
            </div>
            <Footer />
          </div>
        </div>
        : <div className={styles.spin}><Spin tip='加载用户信息...' spinning={loading} size='large'><Login {...loginProps} /></Spin></div>}</div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
  login: PropTypes.bool,
  user: PropTypes.object,
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool
}

const mapStateToProps = createSelector(
  state => state.app,
  state => state.loading.models.app,
  (app, loading) => {
    return {
      app,
      loading
    }
  }
)

export default connect(mapStateToProps)(App)
