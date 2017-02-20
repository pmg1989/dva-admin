import React, { PropTypes } from 'react'
import { Table, Popconfirm, Icon, Tooltip, Button  } from 'antd'
import styles from './List.less'
import TableBodyWrapper from '../../common/TableBodyWrapper'

function List ({
  loading,
  dataSource,
  pagination,
  updatePower,
  deletePower,
  onPageChange,
  onDeleteItem,
  onEditItem,
  onStatusItem,
  location
}) {

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
      title: '操作',
      key: 'operation',
      // width: 80,
      render: (text, record) => (
        <p>
          {updatePower &&
          <Tooltip placement="bottom" title='编辑'>
            <a onClick={() => onEditItem(record)} style={{
              marginRight: 10
            }}><Icon type="edit" /></a>
          </Tooltip>}
          {updatePower &&
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
          </Tooltip>}
          {deletePower &&
          <Tooltip placement="bottom" title='删除'>
            <Popconfirm title='确定要删除吗？' onConfirm={() => onDeleteItem(record.id)}>
              <a><Icon type="close-circle-o" className={styles.danger}/></a>
            </Popconfirm>
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

  const getBodyWrapper = (body) => (<TableBodyWrapper {...getBodyWrapperProps} body={body} />)

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
        getBodyWrapper={getBodyWrapper}
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
