import React from 'react'
import { connect } from 'dva'
import { Menu, Row, Col, Card, message, Modal } from 'antd'
import { DropMenu } from 'components'
import { DETAIL, UPDATE, DELETE } from 'constants/options'

const confirm = Modal.confirm

const handleClick = (key) => {
  message.success(`你点击了Key：${key}`)
}

const handleDeleteItem = (key) => {
  confirm({
    title: '您确定要删除这条记录吗?',
    onOk () {
      handleClick(key)
    },
  })
}

const handleMenuClick = ({ key }) => {
  return {
    [DETAIL]: handleClick,
    [UPDATE]: handleClick,
    [DELETE]: handleDeleteItem,
  }[key](key)
}

const DropMenuPage = () => (
  <div className="content-inner">
    <Row gutter={32}>
      <Col lg={8} md={12}>
        <Card title="基础菜单">
          <DropMenu>
            <Menu onClick={handleMenuClick}>
              <Menu.Item key={UPDATE}>编辑</Menu.Item>
              <Menu.Item key={DELETE}>删除</Menu.Item>
            </Menu>
          </DropMenu>
        </Card>
      </Col>
      <Col lg={8} md={12}>
        <Card title="边框式菜单">
          <DropMenu border>
            <Menu onClick={handleMenuClick}>
              <Menu.Item key={UPDATE}>编辑</Menu.Item>
              <Menu.Item key={DELETE}>删除</Menu.Item>
            </Menu>
          </DropMenu>
        </Card>
      </Col>
      <Col lg={8} md={12}>
        <Card title="点击式菜单">
          <DropMenu dropDownProps={{ trigger: ['click'] }}>
            <Menu onClick={handleMenuClick}>
              <Menu.Item key={DETAIL}>详情</Menu.Item>
              <Menu.Item key={UPDATE}>编辑</Menu.Item>
              <Menu.Item key={DELETE}>删除</Menu.Item>
            </Menu>
          </DropMenu>
        </Card>
      </Col>
    </Row>
  </div>
)

export default connect()(DropMenuPage)
