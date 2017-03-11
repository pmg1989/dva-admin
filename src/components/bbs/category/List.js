import React, {PropTypes} from 'react'
import {Table, Popconfirm, Icon, Tooltip, Modal} from 'antd'
import styles from './List.less'
import TableBodyWrapper from '../../common/TableBodyWrapper'

const confirm = Modal.confirm

function List({
  bbsCategory: {
    loading,
    list,
    pagination
  },
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
        onDeleteItem(record.cid)
      }
    })
  }

  const columns = [
    {
      title: '分类编号',
      dataIndex: 'cid',
      key: 'cid'
    }, {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '分类图片',
      dataIndex: 'imgurl',
      key: 'imgurl',
      width: 64,
      className: styles.avatar,
      render: (text) => <img width={24} src={text}/>
    }, {
      title: '备忘录',
      dataIndex: 'memo',
      key: 'memo'
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

  let total = pagination.total

  const getFilterList = () => {
    const { field, keyword, current, pageSize } = location.query
    const currentPage = current || pagination.current
    const sizePage = pageSize || pagination.pageSize

    if(field) {
      const filterTotalList = list.filter(item => item[field].indexOf(decodeURI(keyword)) > -1)
      total = filterTotalList.length
      const filterList = filterTotalList.slice((currentPage - 1) * (sizePage), currentPage * sizePage)
      return filterList
    }
    return list
  }

  const tableProps = {
    dataSource: getFilterList(),
    bordered: true,
    simple: true,
    columns,
    loading,
    className: styles.table,
    scroll: { x: 1200 },
    onChange: onPageChange,
    pagination: {
      ...pagination,
      total: total,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`
    },
    rowKey: (record) => record.cid,
    getBodyWrapper
  }

  return (
    <div>
      <Table  {...tableProps}/>
    </div>
  )
}

List.propTypes = {
  bbsCategory: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired
}

export default List
