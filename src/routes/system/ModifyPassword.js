import React, {PropTypes} from 'react'
import {connect} from 'dva'
import ModifyForm from '../../components/system/ModifyPassword/ModifyForm'

function ModifyPassword({ dispatch, systemModifyPassword }) {
  const { loading } = systemModifyPassword
  const modifyFormProps = {
    loading,
    onOk(data) {
      dispatch({ type: `systemModifyPassword/update`, payload: data })
    }
  }

  return (
    <div>
      <ModifyForm {...modifyFormProps}></ModifyForm>
    </div>
  )
}

ModifyPassword.propTypes = {
  systemModifyPwd: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps({ systemModifyPassword }) {
  return { systemModifyPassword }
}

export default connect(mapStateToProps)(ModifyPassword)
