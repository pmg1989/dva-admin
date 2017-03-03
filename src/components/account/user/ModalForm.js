import React, { PropTypes } from 'react'
import { Form, Input, InputNumber, Radio, Modal, Icon } from 'antd'
import { connect } from 'dva'
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
  dispatch,
  modal: { loading, curItem, type, visible },
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
      dispatch({ type: !!data.id ? 'accountUser/update' : 'accountUser/create', payload: data })
    })
  }

  const modalFormOpts = {
    title: type === 'create' ? <div><Icon type="plus-circle-o" /> 新建用户</div> : <div><Icon type="edit" /> 修改用户</div>,
    visible,
    onOk: handleOk,
    onCancel() {
      dispatch({type: 'modal/hideModal'})
      resetFields() //非常重要，关闭后必须重置数据
    },
    wrapClassName: 'vertical-center-modal',
    confirmLoading: loading
  }

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
  modal: PropTypes.object,
  form: PropTypes.object
}

function mapStateToProps({ modal }) {
  return { modal }
}

export default connect(mapStateToProps)(Form.create()(ModalForm))
