import React, { PropTypes } from 'react'
import { Form, Input, InputNumber, Radio, Modal, Icon } from 'antd'
import { validPhone } from '../../../utils/utilsValid'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}

const ModalForm = ({
  modal: { curItem, type, visible },
  loading,
  form: {
    getFieldDecorator,
    validateFields,
    resetFields
  },
  onOk,
  onCancel
}) => {
  function handleOk () {
    validateFields((errors, values) => {
      if (errors) {
        return
      }
      const data = {
        ...values,
        id: curItem.id
      }
      onOk(data)
    })
  }

  const modalFormOpts = {
    title: type === 'create' ? <div><Icon type="plus-circle-o" /> 新建用户</div> : <div><Icon type="edit" /> 修改用户</div>,
    visible,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: loading,
    onOk: handleOk,
    onCancel,
    afterClose() {
      resetFields() //必须项，编辑后如未确认保存，关闭时必须重置数据
    }
  }

  return (
    <Modal {...modalFormOpts}>
      <Form>
        <FormItem label='用户名：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: curItem.name,
            rules: [
              {
                required: true,
                message: '用户名不能为空'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='手机号：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('mobile', {
            initialValue: curItem.mobile,
            rules: [
              {
                required: true,
                message: '手机号不能为空'
              },
              {
                validator: validPhone
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='邮箱：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('email', {
            initialValue: curItem.email,
            rules: [
              {
                required: true,
                message: '邮箱不能为空'
              },
              {
                type: 'email',
                message: '邮箱格式不正确'
              }
            ]
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

ModalForm.propTypes = {
  modal: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired
}

export default Form.create()(ModalForm)
