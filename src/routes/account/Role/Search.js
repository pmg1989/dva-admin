import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Icon } from 'antd'

const Search = ({
  addPower,
  onAdd,
}) => {
  return (
    <Row gutter={24}>
      {addPower &&
      <Col lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button size="large" type="ghost" onClick={onAdd}><Icon type="plus-circle-o" />添加</Button>
      </Col>}
    </Row>
  )
}

Search.propTypes = {
  onAdd: PropTypes.func.isRequired,
  addPower: PropTypes.bool.isRequired,
}

export default Form.create()(Search)
