import React, {Component} from 'react'
import {connect} from 'dva'

class Demo extends Component {
  render() {
    return (
      <div>Demo</div>
    )
  }
}

export default connect()(Demo)
