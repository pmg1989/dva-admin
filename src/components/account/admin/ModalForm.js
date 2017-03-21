import React, { PropTypes } from 'react'
import { Form, Input, InputNumber, Radio, Modal, Icon, Select } from 'antd'
import { validPhone } from '../../../utils/utilsValid'

const FormItem = Form.Item

const Option = Select.Option

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

  if(!curItem.roleList) {
    curItem.roleList = []
  }

  const handleOk = () => {
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
    title: type === 'create' ? <div><Icon type="plus-circle-o" /> 新建管理员</div> : <div><Icon type="edit" /> 修改管理员</div>,
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
        <FormItem label='性别' hasFeedback {...formItemLayout}>
          {getFieldDecorator('isMale', {
            initialValue: curItem.isMale,
            rules: [
              {
                required: true,
                type: 'boolean',
                message: '请选择性别'
              }
            ]
          })(
            <Radio.Group>
              <Radio value>男</Radio>
              <Radio value={false}>女</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label='手机号：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('phone', {
            initialValue: curItem.phone,
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
          })(<Input type='email'/>)}
          {/*(<InputEmailComplete/>)}*/}
        </FormItem>
        <FormItem label='角色：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('roleId', {
            initialValue: curItem.roleId && curItem.roleId.toString(),
            rules: [
              {
                required: true,
                message: '角色不能为空'
              }
            ]
          })(<Select placeholder='--请选择角色--'>{curItem.roleList.map(item => <Option key={item.id} value={item.id.toString()}>{item.name}</Option>)}</Select>)}
        </FormItem>
        <FormItem label='地区：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('address', {
            initialValue: curItem.address,
            rules: [
              {
                required: true,
                message: '地区不能为空'
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
