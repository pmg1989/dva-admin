import React, {PropTypes} from 'react'
import {Modal, Menu} from 'antd'
import styles from './List.less'
import {DataTable, DropMenu} from '../../../components/'
import { UPDATE, STATUS, DELETE } from '../../../constants/options'

const confirm = Modal.confirm

function List ({
  accountUser: {
    list,
    pagination
  },
  loading,
  updatePower,
  deletePower,
  onDeleteItem,
  onEditItem,
  onStatusItem,
  location
}) {

  const handleDeleteItem = (record) => {
    confirm({
      title: '您确定要删除这条记录吗?',
      onOk () {
        onDeleteItem(record.id)
      }
    })
  }

  const handleMenuClick = (key, record) => {
    return {
      [UPDATE]: onEditItem,
      [STATUS]: onStatusItem,
      [DELETE]: handleDeleteItem,
    } [key](record)
  }

  const columns = [
    {
      title: '头像',
      dataIndex: 'image',
      key: 'image',
      width: 64,
      className: styles.avatar,
      render: (text) => <img width={24} src={text} />
    }, {
      title: '用户名',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile'
    }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
    }, {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (value) => new Date(+value).format("yyyy-MM-dd HH:mm:ss")
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <span>{status? '已启用': '已禁用'}</span>
    }, {
      title: '操作',
      key: 'operation',
      // width: 80,
      render: (text, record) => (
        <DropMenu>
          <Menu onClick={({key}) => handleMenuClick(key, record)}>
            {updatePower && <Menu.Item key={STATUS}>{record.status ? '禁用' : '启用'}</Menu.Item>}
            {updatePower && <Menu.Item key={UPDATE}>编辑</Menu.Item>}
            {deletePower && <Menu.Item key={DELETE}>删除</Menu.Item>}
          </Menu>
        </DropMenu>
      ),
      // fixed: 'right'
    }
  ]

  return (
    <DataTable
      className={styles.table}
      columns={columns}
      dataSource={list}
      loading={loading}
      pagination={pagination}
      rowKey={record => record.id}
    />
  )
}

List.propTypes = {
  accountUser: PropTypes.object.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired
}

export default List
