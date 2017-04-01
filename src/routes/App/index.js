import React, { Component, PropTypes } from 'react'
import { Spin } from 'antd'
import { connect } from 'dva'
import classnames from 'classnames'
import Login from '../Login'
import { Header, Bread, Footer, Sider, TabMenu, styles } from './layout'
import './skin.less'
import { getCurPowers } from '../../utils'

// App.propTypes = {
//   children: PropTypes.element,
//   location: PropTypes.object,
//   dispatch: PropTypes.func,
//   app: PropTypes.object
// }

class App extends Component {
  constructor(props) {
    super(props)
    const tabs = JSON.parse(localStorage.getItem('tabMenus')) || {
      key: '1',
      title: '管理平台',
      curPowers: props.app.curPowers
    }
    this.state = {
      activeKey: tabs.key,
      tabMenus: [{
        ...tabs,
        content: props.children
      }]
    }
  }

  render() {
    const { children, location, dispatch, app, loading } = this.props
    const { login, user, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys, userPower, curPowers } = app
    const { tabMenus, activeKey } = this.state

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
      changeTitle: (item) => {
        setTimeout(() => {
          const curTabs = {...item, curPowers}
          localStorage.setItem('tabMenus', JSON.stringify(curTabs))
          this.setState((prev, props) => {
            const tabMenus = prev.tabMenus
            if(tabMenus.find(cur => cur.key === curTabs.key)) {
              return { activeKey: curTabs.key }
            } else {
              prev.tabMenus.push({...curTabs, content: props.children})
              return { tabMenus: prev.tabMenus, activeKey: curTabs.key }
            }
          })
        }, 100)
      }
    }

    const TabMenuGen = () => <TabMenu list={tabMenus} activeKey={activeKey}></TabMenu>

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
                  <TabMenuGen />
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
