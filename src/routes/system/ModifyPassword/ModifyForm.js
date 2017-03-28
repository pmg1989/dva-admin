import React, { PropTypes, Component } from 'react'
import { Form, Input, Button } from 'antd'
import Cookie from 'js-cookie'
import styles from './ModifyForm.less'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}

const tailFormItemLayout = {
    wrapperCol: {
      span: 14,
      offset: 6,
    }
}

class ModifyForm extends Component {

  static propTypes = {
    loading: PropTypes.bool,
    onOk: PropTypes.func.isRequired
  }

  state = { passwordDirty: false }

  handleSubmit (e) {
    e.preventDefault()

    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        values.username = Cookie.get('user_name')
        this.props.onOk(values)
      }
    })
  }

  checkConfirm(rule, value, callback) {
    if (value && this.state.passwordDirty) {
      this.props.form.validateFields(['confirm'], { force: true })
    }
    callback();
  }

  handlePasswordBlur(e) {
    const value = e.target.value;
    this.setState({ passwordDirty: this.state.passwordDirty || !!value })
  }

  checkPassword(rule, value, callback) {
    if (value && value !== this.props.form.getFieldValue('password')) {
      callback('两个新密码输入不一致');
    } else {
      callback();
    }
  }

  render() {

    const {
      loading,
      form: {
        getFieldDecorator
      },
      updatePower
    } = this.props

    return (
      <Form className={styles.modifyForm} onSubmit={::this.handleSubmit}>
        <FormItem label='旧密码：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('oldPassword', {
            rules: [
              {
                required: true,
                message: '请输入旧密码'
              }
            ]
          })(<Input placeholder="请输入旧密码" type="password" />)}
        </FormItem>
        <FormItem label='新密码：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入新密码'
              }, {
                validator: ::this.checkConfirm,
              }
            ]
          })(<Input placeholder="请输入新密码" type="password" onBlur={::this.handlePasswordBlur} />)}
        </FormItem>
        <FormItem label='新密码确认：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: '请输入新密码确认'
              }, {
                validator: ::this.checkPassword,
              }
            ]
          })(<Input placeholder="请输入新密码确认" type="password" />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" size="large" className={styles.button} loading={loading} disabled={!updatePower}>确认修改</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(ModifyForm)
