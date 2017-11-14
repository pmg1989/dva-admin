import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Menu } from 'antd'
import { DataTable, DropMenu } from 'components'
import { UPDATE, DELETE } from 'constants/options'
import styles from './List.less'

const confirm = Modal.confirm

function List ({
  accountRole: {
    list,
  },
  loading,
  updatePower,
  deletePower,
  onDeleteItem,
  onEditItem,
}) {
  const handleDeleteItem = (record) => {
    confirm({
      title: '删除角色可能会对管理员账号造成无法弥补的影响，您确定要删除这个角色吗?',
      onOk () {
        onDeleteItem(record.id)
      },
    })
  }

  const handleMenuClick = (key, record) => {
    return {
      [UPDATE]: onEditItem,
      [DELETE]: handleDeleteItem,
    }[key](record)
  }

  const columns = [
    {
      title: '角色编号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '角色名称',
      dataIndex: 'name',
      key: 'roleName',
    }, {
      title: '操作',
      key: 'operation',
      // width: 100,
      render: (text, record) => (
        <DropMenu>
          <Menu onClick={({ key }) => handleMenuClick(key, record)}>
            {updatePower && <Menu.Item key={UPDATE}>编辑</Menu.Item>}
            {deletePower && <Menu.Item key={DELETE}>删除</Menu.Item>}
          </Menu>
        </DropMenu>
      ),
      // fixed: 'right'
    },
  ]

  return (
    <DataTable
      className={styles.table}
      columns={columns}
      dataSource={list}
      loading={loading.effects['accountRole/query']}
      pagination={false}
      rowKey={record => record.id}
    />
  )
}

List.propTypes = {
  accountRole: PropTypes.object.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  loading: PropTypes.object.isRequired,
  updatePower: PropTypes.bool.isRequired,
  deletePower: PropTypes.bool.isRequired,
}

export default List
