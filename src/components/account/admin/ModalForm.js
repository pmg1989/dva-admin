import React, { PropTypes } from 'react'
import { Form, Input, InputNumber, Radio, Modal, Icon, Select } from 'antd'
import { connect } from 'dva'
import Immutable from 'immutable'
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

const ModalForm = ({
  dispatch,
  modal,
  form: {
    getFieldDecorator,
    validateFields,
    resetFields
  }
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
      dispatch({ type: !!data.id ? 'accountAdmin/update' : 'accountAdmin/create', payload: data })
    })
  }

  const { loading, curItem, otherItem, type, visible } = modal.toJS()

  const modalFormOpts = {
    title: type === 'create' ? <div><Icon type="plus-circle-o" /> 新建管理员</div> : <div><Icon type="edit" /> 修改管理员</div>,
    visible,
    onOk: handleOk,
    onCancel() {
      dispatch({type: 'modal/hideModal'})
      resetFields() //非常重要，关闭后必须重置数据
    },
    wrapClassName: 'vertical-center-modal',
    confirmLoading: loading
  }
  console.log(modal.toJS());
  return (
    <Modal {...modalFormOpts}>
      <Form horizontal>
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
          })(<Select placeholder='--请选择角色--'>{otherItem.map(item => <Option key={item.id} value={item.id.toString()}>{item.name}</Option>)}</Select>)}
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
  modal: PropTypes.instanceOf(Immutable.Map).isRequired,
  form: PropTypes.object
}

function mapStateToProps({ modal }) {
  return { modal }
}

export default connect(mapStateToProps)(Form.create()(ModalForm))
