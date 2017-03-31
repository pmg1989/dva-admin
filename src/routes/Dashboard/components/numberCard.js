import React from 'react'
import { Icon, Card } from 'antd'
import CountUp from 'react-countup'
import styles from './numberCard.less'

function NumberCard (props) {
  const { icon, color, title, number } = props
  return (
    <Card className={styles.numberCard} bordered={false} bodyStyle={{padding: 0}}>
      <div className={styles.flexBox}>
        <Icon className={styles.iconWarp} style={{ backgroundColor : color }} type={icon} />
        <div className={styles.content}>
          <p className={styles.title}>{title || 'No Title'}</p>
          <p className={styles.number}>
            <CountUp
              start={0}
              end={number}
              duration={2.75}
              useEasing
              useGrouping
              separator=','
              {...props.countUp || {}}
            />
          </p>
        </div>
      </div>
    </Card>
  )
}

export default NumberCard
