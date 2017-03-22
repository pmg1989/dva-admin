import React, { PropTypes } from 'react'
import { Menu, Dropdown, Icon, Button } from 'antd'
import { DETAIL, UPDATE, DELETE } from '../../constants/options'

const dic = {
  detailPower: {
    key: DETAIL,
    name: '详情'
  },
  updatePower: {
    key: UPDATE,
    name: '编辑'
  },
  deletePower: {
    key: DELETE,
    name: '删除'
  }
}

function DropMenu({ onMenuClick, detailPower, updatePower, deletePower, border, dropDownProps, children }) {
  const MenuList = (
    <Menu onClick={onMenuClick}>
      {children}
      {Object.keys(dic).map(key => {
        const item = dic[key]
        return {
          'detailPower': detailPower && <Menu.Item key={item.key}>{item.name}</Menu.Item>,
          'updatePower': updatePower && <Menu.Item key={item.key}>{item.name}</Menu.Item>,
          'deletePower': deletePower && <Menu.Item key={item.key}>{item.name}</Menu.Item>
        }[key]
      })}
    </Menu>
  )

  const dropProps = {
    overlay: MenuList,
    placement: 'bottomCenter',
    ...dropDownProps
  }

  return (
    <Dropdown {...dropProps}>
      <Button style={{ border: border ? '1px solid #e3e3e3' : 'none' }}>
        <Icon style={{ marginRight: 2 }} type="bars" />
        <Icon type="down" />
      </Button>
    </Dropdown>
  )
}

DropMenu.propTypes = {
  updatePower: PropTypes.bool,
  detailPower: PropTypes.bool,
  deletePower: PropTypes.bool,
  border: PropTypes.bool,
  dropDownProps: PropTypes.object,
  onMenuClick: PropTypes.func
}

DropMenu.defaultProps = {
  updatePower: false,
  detailPower: false,
  deletePower: false,
  dropDownProps: {}
}

export default DropMenu
