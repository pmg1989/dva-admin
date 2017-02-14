import React, { PropTypes } from 'react'
import { Form, Input, Modal, Icon } from 'antd'
import UserPower from './UserPower'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}

const modal = ({
  visible,
  type,
  item = {},
  currentPowerLst,
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  }
}) => {
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key
      }
      onOk(data)
    })
  }
  const modalOpts = {
    title: type === 'create' ? <div><Icon type="plus-circle-o" /> 新建角色</div> : <div><Icon type="edit" /> 修改角色</div>,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
    width: 1050
  }

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label='角色名称：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('roleName', {
            initialValue: item.roleName,
            rules: [
              {
                required: true,
                message: '角色名称不能为空'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='用户数量：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('userCount', {
            initialValue: item.userCount || 0,
            rules: [
              {
                required: true,
                message: '角色名称不能为空'
              }
            ]
          })(<Input disabled/>)}
        </FormItem>
        <FormItem >
          <UserPower powerList={currentPowerLst}/>
        </FormItem>

      </Form>
    </Modal>
  )
}

modal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
}

export default Form.create()(modal)
