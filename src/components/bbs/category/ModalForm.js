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
  modal: { loading, curItem, type, visible },
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
        cid: curItem.cid
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
      <Form horizontal>
        <FormItem label='分类名称' hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: curItem.name,
            rules: [
              {
                required: true,
                message: '分类名称不能为空'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='分类图片' hasFeedback {...formItemLayout}>
          {getFieldDecorator('imgurl', {
            initialValue: curItem.imgurl,
            rules: [
              {
                required: true,
                message: '分类图片不能为空'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='备忘录' hasFeedback {...formItemLayout}>
          {getFieldDecorator('memo', {
            initialValue: curItem.memo
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
