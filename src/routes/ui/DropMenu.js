import React from 'react'
import {connect} from 'dva'
import { Menu, Icon } from 'antd'
import DropMenu from '../../components/common/DropMenu'
import { DETAIL, UPDATE, DELETE } from '../../constants/options'

const updatePower = true
const deletePower = true
const detailPower = false
const statusPower = false
const STATUS = 9

const click = (key) => {
  console.log(key);
}

const dropMenuProps = {
  updatePower,
  detailPower,
  deletePower,
  onMenuClick: ({ key }) => {
    return {
      [DETAIL]: click,
      [UPDATE]: click,
      [DELETE]: click,
      [STATUS]: click
    } [key] (key)
  }
}

const DropOptionPage = () => {
  return (
    <div>
      <DropMenu {...dropMenuProps}>
        {statusPower && <Menu.Item key={STATUS}>禁用</Menu.Item>}
      </DropMenu>{'  '}
      <DropMenu updatePower deletePower border dropDownProps={{placement: 'bottomLeft', trigger: ['click']}}/>{'  '}
      <DropMenu {...dropMenuProps}>
        <Menu.Item key={STATUS}>禁用</Menu.Item>
      </DropMenu>
    </div>
  )
}

export default connect()(DropOptionPage)
