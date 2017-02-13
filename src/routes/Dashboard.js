import React, {PropTypes} from 'react'
import {connect} from 'dva'
import styles from './dashboard.less'

function Dashboard ({dashboard, dispatch}) {
  return (
    null
  )
}

Dashboard.propTypes = {

}

export default connect(({ dashboard }) => ({ dashboard }))(Dashboard)
