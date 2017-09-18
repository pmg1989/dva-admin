import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { checkPower } from 'utils'
import { UPDATE } from 'constants/options'
import ModifyForm from './ModifyForm'

function ModifyPassword ({ dispatch, curPowers, loading }) {
  const updatePower = checkPower(UPDATE, curPowers)

  const modifyFormProps = {
    loading,
    updatePower,
    onOk (data) {
      dispatch({ type: 'systemModifyPassword/update', payload: data })
    },
  }

  return (
    <div>
      <ModifyForm {...modifyFormProps} />
    </div>
  )
}

ModifyPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
  curPowers: PropTypes.array.isRequired,
  loading: PropTypes.bool,
}

function mapStateToProps ({ loading }) {
  return { loading: loading.models.systemModifyPassword }
}

export default connect(mapStateToProps)(ModifyPassword)
