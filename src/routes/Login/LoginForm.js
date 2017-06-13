import React from 'react'
import PropTypes from 'prop-types'
import { Button, Row, Form, Input } from 'antd'
import QueueAnim from 'rc-queue-anim'
import { config } from '../../utils'
import styles from './LoginForm.less'

const FormItem = Form.Item

const Login = ({
  loading,
  onOk,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll
  }
}) => {
  function handleOk (e) {
    e.preventDefault()
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      onOk(values)
    })
  }

  return (
    <div className={styles.form}>
      <QueueAnim delay={200} type='top'>
        <div className={styles.logo} key='1'>
          <img src={config.logoSrc} />
          <span>{config.logoText}</span>
        </div>
      </QueueAnim>
      <form onSubmit={handleOk}>
        <QueueAnim delay={200} type='top'>
          <FormItem hasFeedback key='1'>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '请填写用户名'
                }
              ]
            })(<Input size='large' placeholder='用户名' />)}
          </FormItem>
          <FormItem hasFeedback key='2'>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请填写密码'
                }
              ]
            })(<Input size='large' type='password' placeholder='密码' />)}
          </FormItem>
          <FormItem key='3'>
            <Button type='primary' htmlType='submit' size='large' loading={loading}>
              登录
            </Button>
          </FormItem>
        </QueueAnim>
      </form>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  loginButtonLoading: PropTypes.bool,
  onOk: PropTypes.func
}

export default Form.create()(Login)
