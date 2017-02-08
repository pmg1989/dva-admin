import React, { Component } from 'react'
import { AutoComplete } from 'antd'

class InputEmailComplete extends Component {

  state = { dataSource: [] }

  handleChange(value) {
    let dataSource
    if (!value || value.indexOf('@') >= 0) {
      dataSource = []
    } else {
      dataSource = ['newband.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`)
    }
    this.setState({ dataSource })
  }

  render() {
    const { dataSource } = this.state
    return (
      <AutoComplete
        dataSource={dataSource}
        onChange={::this.handleChange}
        placeholder="input here"
      />
    )
  }
}

export default InputEmailComplete
