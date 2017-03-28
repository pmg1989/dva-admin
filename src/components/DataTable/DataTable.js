import React, {Component, PropTypes} from 'react'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import {Table} from 'antd'
import classnames from 'classnames'
import TableBodyWrapper from './TableBodyWrapper'

function DataTable({dispatch, location, className, pagination, ...props}) {

  const getBodyWrapperProps = {
    page: location.query.page,
    current: pagination.current
  }

  const getBodyWrapper = (body) => (<TableBodyWrapper {...getBodyWrapperProps} body={body}/>)

  const onPageChange = (page) => {
    const {query, pathname} = location
    dispatch(routerRedux.push({
      pathname: pathname,
      query: {
        ...query,
        page: page.current,
        pageSize: page.pageSize
      }
    }))
  }

  return (
    <Table
      className={classnames(className, "table-motion")}
      bordered
      scroll={{ x: 1200 }}
      onChange={onPageChange}
      pagination={{...pagination, showSizeChanger: true, showQuickJumper: true, showTotal: total => `共 ${total} 条`}}
      simple
      getBodyWrapper={getBodyWrapper}
      {...props}
    />
  )
}

function mapStateToProps({ routing }) {
  return { location: routing.locationBeforeTransitions }
}

export default connect(mapStateToProps)(DataTable)
