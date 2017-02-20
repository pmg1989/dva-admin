import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import UserList from '../../components/account/user/List'
import UserSearch from '../../components/account/user/Search'
import UserModal from '../../components/account/user/Modal'
import { checkPower } from '../../utils'
import { ADD, UPDATE, DELETE } from '../../constants/options'

function User ({ location, curPowers, dispatch, accountUser }) {
  const { list, pagination, currentItem, modalVisible, modalType, loading } = accountUser
  const { field, keyword } = location.query

  const addPower = checkPower(ADD, curPowers)
  const updatePower = checkPower(UPDATE, curPowers)
  const deletePower = checkPower(DELETE, curPowers)

  const userModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk (data) {
      dispatch({
        type: `accountUser/${modalType}`,
        payload: data
      })
    },
    onCancel () {
      dispatch({
        type: 'accountUser/hideModal'
      })
    }
  }

  const userListProps = {
    dataSource: list,
    loading,
    pagination: pagination,
    location,
    updatePower,
    deletePower,
    onPageChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname: pathname,
        query: {
          ...query,
          current: page.current,
          pageSize: page.pageSize
        }
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'accountUser/delete',
        payload: id
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'accountUser/showModal',
        payload: {
          modalType: 'update',
          id: item.id
        }
      })
    },
    onStatusItem(item) {
      dispatch({
        type: 'accountUser/updateStatus',
        payload: item
      })
    }
  }

  const userSearchProps = {
    field,
    keyword,
    addPower,
    onSearch (fieldsValue) {
      !!fieldsValue.keyword.length ?
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword
        }
      })) :
      dispatch(routerRedux.push({
        pathname:  location.pathname
      }))
    },
    onAdd () {
      dispatch({
        type: 'accountUser/showModal',
        payload: {
          modalType: 'create'
        }
      })
    }
  }

  const UserModalGen = () =>
    <UserModal {...userModalProps} />

  return (
    <div className='content-inner'>
      <UserSearch {...userSearchProps} />
      <UserList {...userListProps} />
      <UserModalGen />
    </div>
  )
}

User.propTypes = {
  accountUser: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps({ accountUser }) {
  return { accountUser }
}

export default connect(mapStateToProps)(User)
