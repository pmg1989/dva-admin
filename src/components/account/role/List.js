import React, { PropTypes } from 'react'
import { Table, Popconfirm, Icon, Tooltip  } from 'antd'

function List ({
  loading,
  dataSource,
  pagination,
  onPageChange,
  onDeleteItem,
  onEditItem
}) {
  const columns = [
    {
      title: '角色编号',
      dataIndex: 'id',
      key: 'id'
    }, {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName'
    }, {
      title: '用户数量',
      dataIndex: 'userCount',
      key: 'userCount'
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => (
        <p>
          <Tooltip placement="bottom" title='编辑'>
            <a onClick={() => onEditItem(record)} style={{
              marginRight: 10
            }}><Icon type="edit" /></a>
          </Tooltip>
          <Tooltip placement="bottom" title='删除'>
            <Popconfirm title='确定要删除吗？' onConfirm={() => onDeleteItem(record.id)}>
              <a><Icon type="close-circle-o" /></a>
            </Popconfirm>
          </Tooltip>
        </p>
      ),
      // fixed: 'right'
    }
  ]

  return (
    <div>
      <Table
        bordered
        scroll={{ x: 1000 }}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={onPageChange}
        pagination={{...pagination, showSizeChanger: true, showQuickJumper: true, showTotal: total => `共 ${total} 条`}}
        simple
        rowKey={record => record.id}
      />
    </div>
  )
}

List.propTypes = {
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  pagination: PropTypes.any
}

export default List
