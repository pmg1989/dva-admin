import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from '../../components/order/orderList/List'
import Search from '../../components/order/orderList/Search'
import { checkPower } from '../../utils'
import { ADD, DETAIL } from '../../constants/options'

function OrderList({ location, curPowers, dispatch, orderList }) {

  const { list, pagination, loading } = orderList

  const { phone, start_date, end_date, os, pay_type, status } = location.query

  const searchProps = {
    phone, start_date, end_date, os, pay_type, status,
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

OrderList.propTypes = {
  orderList: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps({ orderList }) {
  return { orderList }
}

export default connect(mapStateToProps)(OrderList)
