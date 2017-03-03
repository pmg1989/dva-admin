import React, {PropTypes} from 'react'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import AdminList from '../../components/account/admin/List'
import AdminSearch from '../../components/account/admin/Search'
import AdminModal from '../../components/account/admin/ModalForm'
import { checkPower } from '../../utils'
import { ADD, UPDATE, DELETE } from '../../constants/options'

function Admin({location, curPowers, dispatch, accountAdmin}) {

  const { list, pagination, loading } = accountAdmin

  const {field, keyword} = location.query

  const addPower = checkPower(ADD, curPowers)
  const updatePower = checkPower(UPDATE, curPowers)
  const deletePower = checkPower(DELETE, curPowers)

  const adminListProps = {
    dataSource: list,
    loading,
    pagination: pagination,
    updatePower,
    deletePower,
    location,
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
    },
    onDeleteItem(id) {
      dispatch({type: 'accountAdmin/delete', payload: id})
    },
    onEditItem(item) {
      dispatch({
        type: 'accountAdmin/showModal',
        payload: {
          type: 'update',
          curItem: item
        }
      })
    },
    onStatusItem(item) {
      dispatch({
        type: 'accountAdmin/updateStatus',
        payload: item
      })
    }
  }

  const adminSearchProps = {
    field,
    keyword,
    addPower,
    onSearch(fieldsValue) {
      const { pathname } = location
      !!fieldsValue.keyword.length ?
      dispatch(routerRedux.push({
        pathname: pathname,
        query: {
          ...fieldsValue
        }
      })) : dispatch(routerRedux.push({
        pathname: pathname
      }))
    },
    onAdd() {
      dispatch({
        type: 'accountAdmin/showModal',
        payload: {
          type: 'create'
        }
      })
    }
  }

  const AdminModalGen = () => <AdminModal/>

  return (
    <div className='content-inner'>
      <AdminSearch {...adminSearchProps}/>
      <AdminList {...adminListProps}/>
      <AdminModalGen/>
    </div>
  )
}

Admin.propTypes = {
  accountAdmin: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps({ accountAdmin }) {
  return { accountAdmin }
}

export default connect(mapStateToProps)(Admin)
