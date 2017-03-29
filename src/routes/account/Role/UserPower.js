import React, { PropTypes, Component } from 'react'
import { Icon, Checkbox } from 'antd'
import { menu, equalSet } from '../../../utils'
import {DataTable} from '../../../components/'
import { MENU, CONTENT, DETAIL, ADD, UPDATE, DELETE, CHECK, UPLOAD } from '../../../constants/options'
import styles from './UserPower.less'

const CheckboxGroup = Checkbox.Group

const getPowerText = (item) => {
  const powerName = {
    [MENU]: "查看菜单",
    [CONTENT]: "查看页面",
    [DETAIL]: "详情",
    [ADD]: "新增",
    [UPDATE]: "修改",
    [DELETE]: "删除",
    [CHECK]: "审核",
    [UPLOAD]: "上传"
  }
  const optionsPowerName = item.power.map((cur) => {
    return { label: powerName[cur], value: cur }
  })

  return optionsPowerName
}

class UserPower extends Component {

  static propTypes = {
    powerList: PropTypes.object.isRequired
  }

  state = {
    userPower: this.props.powerList
  }

  onChangePower(checkedValues, item){
    if(!!checkedValues.length) {
      this.state.userPower[item.id] = checkedValues
    } else {
      delete this.state.userPower[item.id]
    }
    this.setState({ userPower: this.state.userPower })
  }

  render() {
    const columns = [{
      title: '菜单选项',
      dataIndex: 'name',
      width: '30%',
      render: (text, record) => record.icon ?
             <span>
               <Icon type={record.icon} /> {text}
             </span> :
             text
    }, {
      title: '操作权限',
      width: '60%',
      className: styles["text-left"],
      render: (text, record) => (
        <CheckboxGroup options={getPowerText(record)} value={this.state.userPower[record.id]} onChange={(checkedValues) => this.onChangePower(checkedValues, record)}/>
      )
    }]

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
      },
      onSelect: (record, selected, selectedRows) => {
        if(selected) {
          this.state.userPower[record.id] = record.power
        } else {
          delete this.state.userPower[record.id]
        }
        this.setState({ userPower: this.state.userPower })
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        if(selected) {
          const userPowerAll = selectedRows.reduce((power, item) => {
            this.state.userPower[item.id] = item.power
            return this.state.userPower
          }, {})
          this.setState({ userPower: userPowerAll })
        } else {
          for(let key in this.state.userPower) {
            delete this.state.userPower[key]
          }
          this.setState({ userPower: this.state.userPower })
        }
      },
      getCheckboxProps: record => ({
        // disabled: false,
        defaultChecked: equalSet(record.power, this.state.userPower[record.id])
      })
    }

    return (
        <DataTable
          animate={false}
          columns={columns}
          dataSource={menu}
          pagination={false}
          scroll={{ x: 1000 }}
          size="small"
          defaultExpandAllRows
          rowSelection={rowSelection}
          rowKey={record => record.id}
        />
    )
  }
}

export default UserPower
