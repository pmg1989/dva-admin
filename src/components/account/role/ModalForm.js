import React, { PropTypes } from 'react'
import { Form, Input, Modal, Icon } from 'antd'
import { connect } from 'dva'
import UserPower from './UserPower'
import styles from './Modal.less'

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
        id: curItem.id,
        power: curItem.power
      }
      dispatch({ type: !!data.id ? 'accountRole/update' : 'accountRole/create', payload: data })
    })
  }
  const modalFormOpts = {
    title: type === 'create' ? <div><Icon type="plus-circle-o" /> 新建角色</div> : <div><Icon type="edit" /> 修改角色</div>,
    visible,
    onOk: handleOk,
    onCancel() {
      dispatch({type: 'modal/hideModal'})
      resetFields() //非常重要，关闭后必须重置数据
    },
    wrapClassName: 'vertical-center-modal',
    className: styles.modalWidth,
    confirmLoading: loading
  }

  const UserPowerGen = () => <UserPower powerList={curItem.power}/>

  return (
    <Modal {...modalFormOpts}>
      <Form horizontal>
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

function mapStateToProps({ modal }) {
  if(!modal.curItem.power) {
    modal.curItem.power = {}
  }
  return { modal }
}

export default connect(mapStateToProps)(Form.create()(ModalForm))
