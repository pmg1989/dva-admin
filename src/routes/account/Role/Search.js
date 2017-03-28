import React, { PropTypes } from 'react'
import { Form, Button, Row, Col, Icon } from 'antd'
import SearchGroup from '../../../components/Search'

const Search = ({
  field,
  keyword,
  addPower,
  onSearch,
  onAdd,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  }
}) => {
  const searchGroupProps = {
    field,
    keyword,
    size: 'large',
    select: true,
    selectOptions: [{ value: 'roleName', name: '角色名称' }],
    selectProps: {
      defaultValue: field || 'roleName'
    },
    onSearch: (value) => {
      onSearch(value)
    }
  }

  return (
    <Row gutter={24}>
      {addPower &&
      <Col lg={24} md={24} sm={24} xs={24} style={{marginBottom: 16, textAlign: 'right'}}>
        <Button size='large' type='ghost' onClick={onAdd}><Icon type="plus-circle-o" />添加</Button>
      </Col>}
    </Row>
  )
}

Search.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  onAdd: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string
}

export default Form.create()(Search)
