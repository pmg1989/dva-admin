import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, Checkbox } from 'antd'
import { DataTable } from 'components'
import { menu, equalSet } from 'utils'
import { powerName } from 'constants/options'
import styles from './UserPower.less'

const CheckboxGroup = Checkbox.Group

const getPowerText = (item) => {
  const optionsPowerName = item.power.map((cur) => {
    return { label: powerName[cur], value: cur }
  })

  return optionsPowerName
}

class UserPower extends Component {
  static propTypes = {
    powerList: PropTypes.object.isRequired,
  }

  state = {
    userPower: this.props.powerList,
  }

  onChangePower (checkedValues, item) {
    if (checkedValues.length) {
      this.state.userPower[item.id] = checkedValues
    } else {
      delete this.state.userPower[item.id]
    }
    this.setState({ userPower: this.state.userPower })
  }

  render () {
    const columns = [{
      title: '菜单选项',
      dataIndex: 'name',
      width: '20%',
      render: (text, record) => (record.icon ?
        <span>
          <Icon type={record.icon} /> {text}
        </span> :
        text),
    }, {
      title: '操作权限',
      width: '75%',
      className: styles['text-left'],
      render: (text, record) => (
        <CheckboxGroup options={getPowerText(record)} value={this.state.userPower[record.id]} onChange={checkedValues => this.onChangePower(checkedValues, record)} />
      ),
    }]

    const rowSelection = {
      onSelect: (record, selected) => {
        if (selected) {
          this.state.userPower[record.id] = record.power
        } else {
          delete this.state.userPower[record.id]
        }
        this.setState({ userPower: this.state.userPower })
      },
      onSelectAll: (selected, selectedRows) => {
        if (selected) {
          const userPowerAll = selectedRows.reduce((power, item) => {
            this.state.userPower[item.id] = item.power
            return this.state.userPower
          }, {})
          this.setState({ userPower: userPowerAll })
        } else {
          for (let key in this.state.userPower) {
            if (Object.prototype.hasOwnProperty.call(this.state.userPower, key)) {
              delete this.state.userPower[key]
            }
          }
          this.setState({ userPower: this.state.userPower })
        }
      },
      getCheckboxProps: record => ({
        // disabled: false,
        defaultChecked: equalSet(record.power, this.state.userPower[record.id]),
      }),
    }

    return (
      <DataTable
        animate={false}
        columns={columns}
        dataSource={menu}
        pagination={false}
        scroll={{ x: 1050 }}
        size="small"
        defaultExpandAllRows
        rowSelection={rowSelection}
        rowKey={record => record.id}
      />
    )
  }
}

export default UserPower
