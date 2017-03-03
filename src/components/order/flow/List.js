import React, { PropTypes } from 'react'
import { Table, Popconfirm, Icon, Tooltip } from 'antd'
import styles from './List.less'
import TableBodyWrapper from '../../common/TableBodyWrapper'

function List ({
  location,
  loading,
  dataSource,
  pagination,
  onPageChange
}) {
  const columns = [
    {
      title: '订单号',
      dataIndex: 'order_id',
      key: 'order_id'
    }, {
      title: '订单类型',
      dataIndex: 'type',
      key: 'type',
      render: (text) => <span>{text == '1'
            ? '充值'
            : '消费'}</span>
    }, {
      title: '操作系统',
      dataIndex: 'os',
      key: 'os',
      render: (text) => <span>{text == '1'
            ? <span><Icon type="apple-o" style={{ color: 'rgb(160, 160, 160)' }}/> IOS</span>
            : <span><Icon type="android" style={{ color: 'rgb(171, 205, 5)' }}/> Android</span>}</span>
    }, {
      title: '金额',
      dataIndex: 'change',
      key: 'change'
    }, {
      title: '用户昵称',
      dataIndex: 'user_name',
      key: 'user_name'
    }, {
      title: '用户手机',
      dataIndex: 'user_phone',
      key: 'user_phone'
    }, {
      title: '当前设备金额',
      dataIndex: 'current_money',
      key: 'current_money'
    }, {
      title: '创建时间',
      dataIndex: 'ctime',
      key: 'ctime'
    }
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: pagination.current
  }

  const getBodyWrapper = (body) => (<TableBodyWrapper {...getBodyWrapperProps} body={body} />)

  return (
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
  )
}

List.propTypes = {
  onPageChange: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  pagination: PropTypes.any
}

export default List
