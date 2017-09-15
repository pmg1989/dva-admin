import React from 'react'
import { Icon, Badge } from 'antd'
import { Link } from 'dva/router'
import styles from './BadgeBox.less'

function BadgeBox () {
  return (
    <div className={styles.badgeBox}>
      <Link to="/" className={styles.badge}>
        <Badge count={5} style={{ backgroundColor: '#108ee9' }}>
          <Icon type="message" className={styles.size} />
        </Badge>
      </Link>
      <Link to="/" className={styles.badge}>
        <Badge count={10} style={{ backgroundColor: '#87d068' }}>
          <Icon type="mail" className={styles.size} />
        </Badge>
      </Link>
      <Link to="/" className={styles.badge}>
        <Badge count={100} overflowCount={99}>
          <Icon type="notification" className={styles.size} />
        </Badge>
      </Link>
    </div>
  )
}

export default BadgeBox
