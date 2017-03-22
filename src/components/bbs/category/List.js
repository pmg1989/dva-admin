import React, {PropTypes} from 'react'
import {Table, Popconfirm, Icon, Tooltip, Modal, Menu} from 'antd'
import classnames from 'classnames'
import styles from './List.less'
import TableBodyWrapper from '../../common/TableBodyWrapper'
import DropMenu from '../../common/DropMenu'
import { UPDATE, DELETE } from '../../../constants/options'

const confirm = Modal.confirm

function List({
  bbsCategory: {
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
        onDeleteItem(record.cid)
      }
    })
  }

  const handleMenuClick = (key, record) => {
    return {
      [UPDATE]: onEditItem,
      [DELETE]: handleDeleteItem,
    } [key](record)
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
      title: '分类描述',
      dataIndex: 'memo',
      key: 'memo'
    }, {
      title: '操作',
      key: 'operation',
      // width: 100,
      render: (text, record) => (
        <DropMenu>
          <Menu onClick={({key}) => handleMenuClick(key, record)}>
            {updatePower && <Menu.Item key={UPDATE}>编辑</Menu.Item>}
            {deletePower && <Menu.Item key={DELETE}>删除</Menu.Item>}
          </Menu>
        </DropMenu>
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
    className: classnames(styles.table, "table-motion"),
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
