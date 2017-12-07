import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table } from 'antd'
import classnames from 'classnames'
import TableBodyWrapper from './TableBodyWrapper'

function DataTable ({ dispatch, location, className, pagination, onPageChange, animate, ...props }) {
  const getBodyWrapperProps = {
    page: location.query.current || 1,
    current: pagination.current || 1,
  }

  const getBodyWrapper = body => (<TableBodyWrapper {...getBodyWrapperProps} body={body} />)

  const handlePageChange = (page) => {
    const { query } = location
    onPageChange({
      ...query,
      current: page.current,
      pageSize: page.pageSize,
    })
  }

  let tableProps = {
    simple: true,
    bordered: true,
    scroll: { x: 1200 },
    onChange: handlePageChange,
    pagination: !!pagination && { ...pagination, showSizeChanger: true, showQuickJumper: true, showTotal: total => `共 ${total} 条` },
    ...props,
  }
  if (animate) {
    tableProps.getBodyWrapper = getBodyWrapper
    tableProps.className = classnames(className, 'table-motion')
  }

  return (
    <Table {...tableProps} />
  )
}

DataTable.propTypes = {
  dispatch: PropTypes.func,
  location: PropTypes.object,
  animate: PropTypes.bool,
  rowKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  pagination: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  className: PropTypes.string,
  onPageChange: PropTypes.func,
}

DataTable.defaultProps = {
  animate: true,
}

function mapStateToProps ({ routing }) {
  return { location: routing.locationBeforeTransitions }
}

export default connect(mapStateToProps)(DataTable)
