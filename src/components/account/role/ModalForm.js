import React, { PropTypes } from 'react'
import { Form, Input, Modal, Icon } from 'antd'
import UserPower from './UserPower'
import styles from './ModalForm.less'

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

  if(!curItem.power) {
    curItem.power = {}
  }

  function handleOk () {
    validateFields((errors, values) => {
      if (errors) {
        return
      }
      const data = {
        ...values,
        id: curItem.id,
        power: curItem.power
      }
      onOk(data)
    })
  }
  const modalFormOpts = {
    title: type === 'create' ? <div><Icon type="plus-circle-o" /> 新建角色</div> : <div><Icon type="edit" /> 修改角色</div>,
    visible,
    wrapClassName: 'vertical-center-modal',
    className: styles.modalWidth,
    confirmLoading: loading,
    onOk: handleOk,
    onCancel,
    afterClose() {
      resetFields() //必须项，编辑后如未确认保存，关闭时必须重置数据
    }
  }

  const UserPowerGen = () => <UserPower powerList={curItem.power}/>

  return (
    <Modal {...modalFormOpts}>
      <Form>
        <FormItem label='角色名称：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: curItem.name,
            rules: [
              {
                required: true,
                message: '角色名称不能为空'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem>
          <UserPowerGen/>
        </FormItem>
      </Form>
    </Modal>
  )
}

ModalForm.propTypes = {
  modal: PropTypes.object,
  form: PropTypes.object
}

export default Form.create()(ModalForm)
