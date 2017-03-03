import React, { PropTypes } from 'react'
import { Table, Popconfirm, Icon, Tooltip, Modal } from 'antd'
import TableBodyWrapper from '../../common/TableBodyWrapper'
import styles from './List.less'

const confirm = Modal.confirm

function List ({
  loading,
  dataSource,
  pagination,
  location,
  updatePower,
  deletePower,
  onPageChange,
  onDeleteItem,
  onEditItem
}) {

  const handleDeleteItem = (record) => {
    confirm({
      title: '删除角色可能会对管理员账号造成无法弥补的影响，您确定要删除这个角色吗?',
      onOk () {
        onDeleteItem(record.id)
      }
    })
  }

  const columns = [
    {
      title: '角色编号',
      dataIndex: 'id',
      key: 'id'
    }, {
      title: '角色名称',
      dataIndex: 'name',
      key: 'roleName'
    }, {
      title: '操作',
      key: 'operation',
      // width: 100,
      render: (text, record) => (
        <p>
          {updatePower &&
          <Tooltip placement="bottom" title='编辑'>
            <a onClick={() => onEditItem(record)} style={{
              marginRight: 10
            }}><Icon type="edit" /></a>
          </Tooltip>}
          {deletePower &&
          <Tooltip placement="bottom" title='删除'>
            <Popconfirm title='确定要删除吗？' onConfirm={() => handleDeleteItem(record)}>
              <a><Icon type="close-circle-o" /></a>
            </Popconfirm>
          </Tooltip>}
        </p>
      ),
      // fixed: 'right'
    }
  ]

  const getBodyWrapperProps = {
    page: 1,
    current: 1
  }

  const getBodyWrapper = (body) => (<TableBodyWrapper {...getBodyWrapperProps} body={body} />)

  return (
    <Table
      className={styles.table}
      bordered
      scroll={{ x: 1000 }}
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      onChange={onPageChange}
      pagination={false}
      simple
      rowKey={record => record.id}
      getBodyWrapper={getBodyWrapper}
    />
  )
}

List.propTypes = {
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any
}

export default List
