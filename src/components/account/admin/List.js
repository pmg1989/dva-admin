import React, { PropTypes } from 'react'
import { Table, Popconfirm, Icon, Tooltip } from 'antd'
import styles from './List.less'
import { classnames } from '../../../utils'

function List ({
  loading,
  dataSource,
  pagination,
  onPageChange,
  onDeleteItem,
  onEditItem,
  onStatusItem
}) {
  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 64,
      className: styles.avatar,
      render: (text) => <img width={24} src={text} />
    }, {
      title: '用户名',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '性别',
      dataIndex: 'isMale',
      key: 'isMale',
      render: (text) => <span>{text
            ? '男'
            : '女'}</span>
    }, {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone'
    }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
    }, {
      title: '角色',
      dataIndex: 'roleName',
      key: 'roleName'
    }, {
      title: '地区',
      dataIndex: 'address',
      key: 'address'
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime'
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => (
        <p>
          <Tooltip placement="bottom" title='编辑'>
            <a onClick={() => onEditItem(record)} style={{
              marginRight: 10
            }}><Icon type="edit"/></a>
          </Tooltip>
          <Tooltip placement="bottom" title={record.status ? '点击禁用' : '点击启用'}>
            {record.status ?
            <Popconfirm title={`确定要禁用${record.name}吗？`} onConfirm={() => onStatusItem(record)}>
              <a style={{ marginRight: 10 }}>
                <Icon type="unlock"/>
              </a>
            </Popconfirm> :
            <a onClick={() => onStatusItem(record)} style={{ marginRight: 10 }}>
              <Icon type="lock" className={styles.warning}/>
            </a>}
          </Tooltip>
          <Tooltip placement="bottom" title='删除'>
            <Popconfirm title='确定要删除吗？' onConfirm={() => onDeleteItem(record.id)}>
              <a><Icon type="close-circle-o" className={styles.danger}/></a>
            </Popconfirm>
          </Tooltip>
        </p>
      ),
      fixed: 'right'
    }
  ]

  return (
    <div>
      <Table
        className={styles.table}
        bordered
        scroll={{ x: 1200 }}
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
