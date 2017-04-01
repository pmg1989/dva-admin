import React, { Component, PropTypes } from 'react'
import { Spin } from 'antd'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import classnames from 'classnames'
import Login from '../Login'
import { Header, Bread, Footer, Sider, TabMenu, styles } from './layout'
import './skin.less'
import { getCurPowers } from '../../utils'

class App extends Component {

  state = {
    newTab: {}
  }

  static propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    app: PropTypes.object.isRequired
  }

  render() {
    const { children, location, dispatch, app, loading } = this.props
    const { login, user, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys, userPower, curPowers } = app
    const { newTab } = this.state

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
      userPower,
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
      userPower,
      changeTheme () {
        dispatch({type: 'app/changeTheme'})
      },
      changeOpenKeys(openKeys) {
        localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
        dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
      },
      changeTitle: (tabMenus) => {
        localStorage.setItem('tabMenus', JSON.stringify(tabMenus))
        this.setState({ newTab: tabMenus })
      }
    }

    const TabMenuProps = {
      newTab: { curPowers, ...newTab },
      changeTabMenu(pathname) {
        dispatch(routerRedux.push({ pathname }))
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
                  <TabMenu {...TabMenuProps}>{children}</TabMenu>
                </div>
              </div>
              <Footer />
            </div>
          </div>
          : <div className={styles.spin}><Spin tip='加载用户信息...' spinning={loading} size='large'><Login {...loginProps} /></Spin></div>}</div>
    )
  }
}

function mapStateToProps({ app, loading }) {
  return { app, loading: loading.models.app }
}

export default connect(mapStateToProps)(App)
