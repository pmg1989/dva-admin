import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { Menu, Icon, Row, Col, Card, message } from 'antd'
import DropMenu from '../../components/common/DropMenu'
import { DETAIL, UPDATE, DELETE, STATUS, ADD } from '../../constants/options'

const updatePower = true
const deletePower = true
const detailPower = true
const statusPower = true

const handleClick = (key) => {
  message.success(`你点击了Key：${key}`)
}

const dropMenuProps = {
  updatePower,
  detailPower,
  deletePower,
  onMenuClick: ({ key }) => {
    return {
      [DETAIL]: handleClick,
      [UPDATE]: handleClick,
      [DELETE]: handleClick,
      [STATUS]: handleClick,
      [ADD]:    handleClick
    } [key] (key)
  }
}

const DropMenuPage = () => (
  <div className="content-inner">
    <h2 style={{ margin: '16px 0' }}>带权限验证的DropMenu使用示例</h2>
    <Row gutter={32}>
      <Col lg={8} md={12}>
        <Card title="基础菜单">
          <DropMenu {...dropMenuProps} />
        </Card>
      </Col>
      <Col lg={8} md={12}>
        <Card title="边框式基础菜单">
          <DropMenu detailPower={false} updatePower deletePower border dropDownProps={{placement: 'bottomLeft'}}  onMenuClick={dropMenuProps.onMenuClick}/>
        </Card>
      </Col>
      <Col lg={8} md={12}>
        <Card title="拓展菜单功能">
          <DropMenu {...dropMenuProps}>
            {statusPower && <Menu.Item key={STATUS}>禁用</Menu.Item>}
          </DropMenu>
        </Card>
      </Col>
    </Row>
    <Row gutter={32}>
      <Col lg={8} md={12}>
        <Card title="拓展菜单覆盖基础菜单">
          <DropMenu detailPower deletePower onMenuClick={dropMenuProps.onMenuClick}>
            {statusPower && <Menu.Item key={STATUS}>禁用</Menu.Item>}
            {updatePower && <Menu.Item key={UPDATE}><Link to="/">转页编辑</Link></Menu.Item>}
          </DropMenu>
        </Card>
      </Col>
      <Col lg={8} md={12}>
        <Card title="完全自定义菜单">
          <DropMenu onMenuClick={dropMenuProps.onMenuClick}>
            <Menu.Item key={ADD}>新增</Menu.Item>
            <Menu.Item key={STATUS}>审核</Menu.Item>
          </DropMenu>
        </Card>
      </Col>
    </Row>
  </div>
)

export default connect()(DropMenuPage)
