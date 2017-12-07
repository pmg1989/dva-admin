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

  state = {
    prevPage: 1,
    currentPage: 1,
  }

  handlePageChange = (page) => {
    const { location, pagination, onPageChange } = this.props
    const { query } = location
    this.setState({
      prevPage: pagination.current,
      currentPage: page.current,
    })
    onPageChange({
      ...query,
      current: page.current,
      pageSize: page.pageSize,
    })
  }

  handleChangePrevPage = () => {
    this.setState({
      prevPage: this.state.currentPage,
    })
  }

  render () {
    const { dispatch, location, className, pagination, onPageChange, animate, ...props } = this.props
    const { prevPage, currentPage } = this.state
    const getBodyWrapperProps = {
      prevPage,
      currentPage,
      onChangePrevPage: this.handleChangePrevPage,
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
