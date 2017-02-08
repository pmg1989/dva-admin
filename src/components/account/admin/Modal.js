import React, { PropTypes } from 'react'
import { Form, Input, InputNumber, Radio, Modal, Icon, Select } from 'antd'
import { validPhone } from '../../../utils/utilsValid'

// import InputEmailComplete from '../../common/InputEmailComplete'

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

const modal = ({
  visible,
  type,
  item = {},
  roleList,
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
    title: type === 'create' ? <div><Icon type="plus-circle-o" /> 新建管理员</div> : <div><Icon type="edit" /> 修改管理员</div>,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal'
  }

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label='用户名：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
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
            initialValue: item.isMale,
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
            initialValue: item.phone,
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
            initialValue: item.email,
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
            initialValue: item.roleId && item.roleId.toString(),
            rules: [
              {
                required: true,
                message: '角色不能为空'
              }
            ]
          })(<Select placeholder='--请选择角色--'>{roleList.map(item => <Option key={item.id} value={item.id.toString()}>{item.roleName}</Option>)}</Select>)}
        </FormItem>
        <FormItem label='地区：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('address', {
            initialValue: item.address,
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

modal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
}

export default Form.create()(modal)
