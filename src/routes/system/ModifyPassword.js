import React, {PropTypes} from 'react'
import {connect} from 'dva'
import { createSelector } from 'reselect'
import ModifyForm from '../../components/system/ModifyPassword/ModifyForm'

function ModifyPassword({ dispatch, systemModifyPassword, loading=false }) {

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

const mapStateToProps = createSelector(
  state => state.systemModifyPassword,
  state => state.loading.models.systemModifyPassword,
  (systemModifyPassword, loading) => {
    return {
      systemModifyPassword,
      loading
    }
  }
)

export default connect(mapStateToProps)(ModifyPassword)
