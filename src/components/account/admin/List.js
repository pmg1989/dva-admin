import React, {PropTypes} from 'react'
import {Table, Popconfirm, Icon, Tooltip, Modal} from 'antd'
import classnames from 'classnames'
import styles from './List.less'
import TableBodyWrapper from '../../common/TableBodyWrapper'

const confirm = Modal.confirm

function List({
  accountAdmin: {
    list,
    pagination
  },
  loading,
  updatePower,
  deletePower,
  onPageChange,
  onDeleteItem,
  onEditItem,
  onStatusItem,
  location
}) {

  const handleDeleteItem = (record) => {
    confirm({
      title: '您确定要删除这条记录吗?',
      onOk() {
        onDeleteItem(record.id)
      }
    })
  }

  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 64,
      className: styles.avatar,
      render: (text) => <img width={24} src={text}/>
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
      // width: 100,
      render: (text, record) => (
        <p>
          {updatePower && <Tooltip placement="bottom" title='编辑'>
            <a onClick={() => onEditItem(record)} style={{
              marginRight: 10
            }}><Icon type="edit"/></a>
          </Tooltip>}
          {updatePower && <Tooltip placement="bottom" title={record.status
            ? '点击禁用'
            : '点击启用'}>
            {record.status
              ? <Popconfirm title={`确定要禁用${record.name}吗？`} onConfirm={() => onStatusItem(record)}>
                  <a style={{
                    marginRight: 10
                  }}>
                    <Icon type="unlock"/>
                  </a>
                </Popconfirm>
              : <a onClick={() => onStatusItem(record)} style={{
                marginRight: 10
              }}>
                <Icon type="lock" className="warning"/>
              </a>}
          </Tooltip>}
          {deletePower && <Tooltip placement="bottom" title='删除'>
            <a onClick={() => handleDeleteItem(record)}><Icon type="close-circle-o" className="danger"/></a>
          </Tooltip>}
        </p>
      ),
      // fixed: 'right'
    }
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: pagination.current
  }

  const getBodyWrapper = (body) => (<TableBodyWrapper {...getBodyWrapperProps} body={body}/>)

  return (
    <div>
      <Table
      className={classnames(styles.table, "table-motion")}
      bordered
      scroll={{ x: 1200 }}
      columns={columns}
      dataSource={list}
      loading={loading}
      onChange={onPageChange}
      pagination={{...pagination, showSizeChanger: true, showQuickJumper: true, showTotal: total => `共 ${total} 条`}}
      simple
      rowKey={record => record.id}
      getBodyWrapper={getBodyWrapper}/>
    </div>
  )
}

List.propTypes = {
  accountAdmin: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired
}

export default List
