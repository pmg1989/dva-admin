import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Switch } from 'antd'
import QueueAnim from 'rc-queue-anim'
import { config } from 'utils'
import styles from './Layout.less'
import Menus from './Menu'

function Sider ({ siderFold, darkTheme, location, changeTheme, navOpenKeys, userPower, changeOpenKeys }) {
  const menusProps = {
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    userPower,
    changeOpenKeys,
  }
  return (
    <div>
      <QueueAnim delay={200} type="top">
        <div className={styles.logo} key="1">
          <img src={config.logoSrc} alt={config.logoSrc} />
          {siderFold ? '' : <span>{config.logoText}</span>}
        </div>
      </QueueAnim>
      <Menus {...menusProps} />
      <QueueAnim delay={600} type="bottom">
        { !siderFold ?
          <div className={styles.switchtheme} key="1">
            <span><Icon type="bulb" />切换主题</span>
            <Switch onChange={changeTheme} defaultChecked={darkTheme} checkedChildren="黑" unCheckedChildren="白" />
          </div> : ''
        }
      </QueueAnim>
    </div>
  )
}

Sider.propTypes = {
  menu: PropTypes.array,
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  location: PropTypes.object,
  changeTheme: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
  userPower: PropTypes.object,
}

export default Sider
