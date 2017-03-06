import React, { Component, PropTypes } from 'react'
import { connect } from 'dva'
import Login from '../components/Login'
import styles from '../components/layout/main.less'
import { Spin } from 'antd'
import '../components/layout/common.less'

function LoginApp ({ dispatch, loading }) {
  const loginProps = {
    loading,
    onOk (data) {
      dispatch({type: 'app/login', payload: data})
    }
  }
  return (
    <div className={styles.spin}><Spin tip='加载用户信息...' spinning={loading} size='large'><Login {...loginProps} /></Spin></div>
  )
}

LoginApp.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.bool
}

function mapStateToProps({ app }) {
  return { loading: app.get('loading') }
}

export default connect(mapStateToProps)(LoginApp)
