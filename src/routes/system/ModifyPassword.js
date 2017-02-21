import React, {PropTypes} from 'react'
import {connect} from 'dva'
import ModifyForm from '../../components/system/modifyPassword/ModifyForm'
import { checkPower, checkQueryPower } from '../../utils'
import { UPDATE } from '../../constants/options'

import { Link } from 'dva/router'

function ModifyPassword({ dispatch, curPowers, systemModifyPassword }) {
  const { loading } = systemModifyPassword

  const updatePower = checkPower(UPDATE, curPowers)

  const modifyFormProps = {
    loading,
    updatePower,
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
