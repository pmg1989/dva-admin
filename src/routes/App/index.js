import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import QueueAnim from 'rc-queue-anim'
import classnames from 'classnames'
import { Header, Bread, Footer, Sider, styles } from './layout'
import './skin.less'

function App ({ children, location, dispatch, app }) {
  const { user, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys, userPower, curPowers } = app

  const headerProps = {
    user,
    siderFold,
    location,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    userPower,
    switchMenuPopover () {
      dispatch({ type: 'app/switchMenuPopver' })
    },
    logout () {
      dispatch({ type: 'app/logout' })
    },
    switchSider () {
      dispatch({ type: 'app/switchSider' })
    },
    changeOpenKeys (openKeys) {
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  }

  const siderProps = {
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    userPower,
    changeTheme () {
      dispatch({ type: 'app/changeTheme' })
    },
    changeOpenKeys (openKeys) {
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  }

  return (
    <div className={classnames(styles.layout, { [styles.fold]: isNavbar ? false : siderFold }, { [styles.withnavbar]: isNavbar })}>
      {!isNavbar ? <aside className={classnames(styles.sider, { [styles.light]: !darkTheme })}>
        <Sider {...siderProps} />
      </aside> : ''}
      <div className={styles.main}>
        <Header {...headerProps} />
        <Bread location={location} />
        <div className={styles.container}>
          <div className={styles.content}>
            <QueueAnim delay={[450, 0]} type={['right', 'left']} appear={false}>
              { children && React.cloneElement(children, { curPowers, key: location.pathname })}
            </QueueAnim>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
}

export default connect(({ app }) => ({ app }))(App)
