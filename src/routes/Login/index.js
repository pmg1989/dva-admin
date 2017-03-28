import React, { Component, PropTypes } from 'react'
import { connect } from 'dva'
import Login from './Login'
import styles from './Login.less'
import { Spin } from 'antd'

function LoginApp ({ dispatch, loading = false }) {
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

function mapStateToProps({ loading }) {
  return { loading: loading.models.app }
}

export default connect(mapStateToProps)(LoginApp)
