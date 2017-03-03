import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from '../../components/order/flow/List'
import Search from '../../components/order/flow/Search'
import { checkPower } from '../../utils'
import { ADD, DETAIL } from '../../constants/options'

function Flow({ location, curPowers, dispatch, orderFlow }) {

  const { list, pagination, loading } = orderFlow

  const { phone, start_date, end_date, os, type, status } = location.query

  const searchProps = {
    phone, start_date, end_date, os, type, status,
    onSearch(fieldsValue) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...fieldsValue
        }
      }))
    }
  }

  const listProps = {
    location,
    dataSource: list,
    loading,
    pagination: pagination,
    onPageChange(page) {
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
  }

  return (
    <div className='content-inner'>
      <Search {...searchProps} />
      <List {...listProps} />
    </div>
  )
}

Flow.propTypes = {
  orderFlow: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps({ orderFlow }) {
  return { orderFlow }
}

export default connect(mapStateToProps)(Flow)
