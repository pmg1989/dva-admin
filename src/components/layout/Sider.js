import React from 'react'
import { Icon, Switch } from 'antd'
import styles from './main.less'
import { config } from '../../utils'
import Menus from './Menu'

function Sider ({ siderFold, darkTheme, location, changeTheme, navOpenKeys, userPower, changeOpenKeys }) {
  const menusProps = {
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    userPower,
    changeOpenKeys
  }
  return (
    <div>
      <div className={styles.logo}>
        <img src={config.logoSrc} />
        {siderFold ? '' : <span>{config.logoText}</span>}
      </div>
      <Menus {...menusProps} />
      {!siderFold ? <div className={styles.switchtheme}>
        <span><Icon type='bulb' />切换主题</span>
        <Switch onChange={changeTheme} defaultChecked={darkTheme} checkedChildren='黑' unCheckedChildren='白' />
      </div> : ''}
    </div>
  )
}

export default Sider
