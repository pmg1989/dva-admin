import React from 'react'
import { Icon } from 'antd'
import { connect } from 'dva'
import styles from './index.less'

const NoPower = () => (
  <div className="content-inner">
    <div className={styles.error}>
      <Icon type="frown-o" />
      <h1>对不起，此页面您无权进入！</h1>
    </div>
  </div>
)

export default connect()(NoPower)
