import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, Card, Progress } from 'antd'
import CountUp from 'react-countup'
import styles from './numberCard.less'

class NumberCard extends Component {
  static propTypes = {
    percent: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    countUp: PropTypes.object,
  }

  state = {
    percent: 0,
  }

  componentDidMount () {
    const { percent } = this.props
    this.countdown = setInterval(() => this.increase(percent), 25)
  }

  componentWillUnmount () {
    clearInterval(this.countdown)
  }

  increase (count) {
    let percent = this.state.percent
    if (percent < count) {
      percent += 1
      if (percent > 100) {
        percent = 100
      }
      this.setState({ percent })
    } else {
      clearInterval(this.countdown)
    }
  }

  render () {
    const { icon, color, title, number, countUp } = this.props
    const { percent } = this.state
    return (
      <Card className={styles.numberCard} bordered={false} bodyStyle={{ padding: 0 }}>
        <div className={styles.flexBox}>
          <Icon className={styles.iconWarp} style={{ backgroundColor: color }} type={icon} />
          <div className={styles.content}>
            <p className={styles.title}>{title || 'No Title'}</p>
            <Progress percent={percent} strokeWidth={3} />
            <p className={styles.number}>
              <CountUp
                start={0}
                end={number}
                duration={2.75}
                useEasing
                useGrouping
                separator=","
                {...countUp || {}}
              />
            </p>
          </div>
        </div>
      </Card>
    )
  }
}

export default NumberCard
