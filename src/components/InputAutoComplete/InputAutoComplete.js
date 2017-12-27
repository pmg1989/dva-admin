import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AutoComplete } from 'antd'

class InputAutoComplete extends Component {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    dataSource: PropTypes.array,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    disabled: false,
    placeholder: '请输入邮箱',
    dataSource: ['newband.com', '163.com', 'qq.com', 'sina.com'],
  }

  state = {
    value: '',
    dataSource: [],
  }

  componentWillReceiveProps (nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value
      let dataSource
      if (!value || value.indexOf('@') >= 0) {
        dataSource = []
      } else {
        dataSource = nextProps.dataSource.map(domain => `${value}@${domain}`)
      }
      this.setState({ value, dataSource })
    }
  }

  handleChange = (value) => {
    if (!('value' in this.props)) {
      this.setState({ value })
    }
    const onChange = this.props.onChange
    if (onChange) {
      onChange(value)
    }
  }

  render () {
    const { placeholder, disabled } = this.props
    const { value, dataSource } = this.state

    return (
      <AutoComplete
        backfill
        dataSource={dataSource}
        onChange={this.handleChange}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
      />
    )
  }
}

export default InputAutoComplete
