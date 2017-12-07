import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Menu, Icon, Tag } from 'antd'
import { DataTable, DropMenu } from 'components'
import { UPDATE, STATUS, DELETE } from 'constants/options'
import styles from './List.less'

const confirm = Modal.confirm
let selectedKeys = []

function List ({
  accountUser: {
    list,
    pagination,
  },
  loading,
  updatePower,
  deletePower,
  onPageChange,
  onDeleteItem,
  onEditItem,
  onStatusItem,
  onDeleteBatch,
}) {
  const handleDeleteItem = (record) => {
    confirm({
      title: '您确定要删除这条记录吗?',
      onOk () {
        onDeleteItem(record.id)
      },
    })
  }

  const handleMenuClick = (key, record) => {
    console.log(key)
    return {
      [UPDATE]: onEditItem,
      [STATUS]: onStatusItem,
      [DELETE]: handleDeleteItem,
    }[key](record)
  }

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      selectedKeys = selectedRowKeys
    },
    selections: [{
      key: 'deleteAll',
      text: <Tag color="#f50"><Icon type="delete" /> 批量删除</Tag>,
      onSelect: () => {
        if (selectedKeys.length) {
          confirm({
            title: '您确定要批量删除这些记录吗?',
            onOk () {
              onDeleteBatch(selectedKeys)
            },
          })
        } else {
          Modal.warning({
            title: '警告',
            content: '请至少选中一条记录！',
          })
        }
      },
    }],
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '头像',
      dataIndex: 'image',
      key: 'image',
      width: 64,
      className: styles.avatar,
      render: text => <img width={24} src={text} alt={text} />,
    }, {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      render: value => new Date(+value).format('yyyy-MM-dd HH:mm:ss'),
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: status => <span>{status ? '已启用' : '已禁用'}</span>,
    }, {
      title: '操作',
      key: 'operation',
      // width: 80,
      render: (text, record) => (
        <DropMenu>
          <Menu onClick={({ key }) => handleMenuClick(key, record)}>
            {updatePower && <Menu.Item key={STATUS}>{record.status ? '禁用' : '启用'}</Menu.Item>}
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
      loading={loading.effects['accountUser/query']}
      pagination={pagination}
      onPageChange={onPageChange}
      rowSelection={rowSelection}
      rowKey={record => record.id}
    />
  )
}

List.propTypes = {
  accountUser: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,
  updatePower: PropTypes.bool.isRequired,
  deletePower: PropTypes.bool.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onStatusItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onDeleteBatch: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
}

export default List
