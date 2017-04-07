import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'
import QueueAnim from 'rc-queue-anim'
import { menu, getMenu, Cookie } from '../../../utils'
import Immutable from 'immutable'

const immutableMenu = Immutable.fromJS(menu)

function Menus ({ siderFold, darkTheme, location, isNavbar, handleClickNavMenu, navOpenKeys, userPower, changeOpenKeys }) {

  const topMenus = menu.map(item => item.key)

  const getMenus = (menuArray, siderFold, parentPath = '/') => {

    return menuArray.map(item => {
      const linkTo = parentPath +item.key
      if (item.children) {
        return (
          <Menu.SubMenu key={linkTo} title={<span>{item.icon ? <Icon type={item.icon} /> : ''}{siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}</span>}>
            {getMenus(item.children, siderFold, linkTo + '/')}
          </Menu.SubMenu>
        )
      } else {
        return (
          <Menu.Item key={linkTo}>
            <Link to={linkTo}>
              {item.icon ? <Icon type={item.icon} /> : ''}
              {siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
            </Link>
          </Menu.Item>
        )
      }
    })
  }

  const getMenusByPower = (menuArray) => {
    return menuArray.reduce((array, item) => {
      if(!userPower[item.id] || !item.power.find(cur => cur === 1)) {
        return array
      }
      const hasPower = !!userPower[item.id].find(cur => cur === 1) // cur == 1：菜单查看权限
      if(item.children) {
        if(hasPower) {
          item.children = getMenusByPower(item.children)
          array.push(item)
        }
      } else {
        hasPower && array.push(item)
      }
      return array
    },[])
  }

  const menuPower = getMenusByPower(immutableMenu.toJS())

  const menuItems = getMenus(menuPower, siderFold)

  const onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => !(navOpenKeys.indexOf(key) > -1))
    const latestCloseKey = navOpenKeys.find(key => !(openKeys.indexOf(key) > -1))

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey)
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey)
    }
    changeOpenKeys(nextOpenKeys)
  }

  const getAncestorKeys = (key) => {
    const map = {
      // navChildParent: ['navParent'],
      '/navigation/navigation2': ['/navigation']
    }
    return map[key] || []
  }

  //菜单栏收起时，不能操作openKeys
  let menuProps = !siderFold ? {
    onOpenChange: onOpenChange,
    openKeys: navOpenKeys
  } : {}

  return (
    <QueueAnim delay={400} type='left'>
      <Menu
        key='1'
        {...menuProps}
        mode={siderFold ? 'vertical' : 'inline'}
        theme={darkTheme ? 'dark' : 'light'}
        onClick={handleClickNavMenu}
        defaultSelectedKeys={[location.pathname !== "/" ? location.pathname : '/dashboard']}>
        {menuItems}
      </Menu>
    </QueueAnim>
  )
}

export default Menus
