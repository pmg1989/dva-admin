import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table } from 'antd'
import classnames from 'classnames'
import TableBodyWrapper from './TableBodyWrapper'

class DataTable extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
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

  static defaultProps = {
    animate: true,
  }

  handlePageChange = (page) => {
    const { query } = this.props.location
    this.props.onPageChange({
      ...query,
      current: page.current,
      pageSize: page.pageSize,
    })
  }

  render () {
    const { dispatch, location, className, pagination, onPageChange, animate, ...props } = this.props
    const getBodyWrapperProps = {
      page: location.query.current || 1,
      current: pagination.current || 1,
    }

    const getBodyWrapper = body => (<TableBodyWrapper {...getBodyWrapperProps} body={body} />)

    let tableProps = {
      simple: true,
      bordered: true,
      scroll: { x: 1200 },
      onChange: this.handlePageChange,
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
}

function mapStateToProps ({ routing }) {
  return { location: routing.locationBeforeTransitions }
}

export default connect(mapStateToProps)(DataTable)
