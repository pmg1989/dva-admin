import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { createSelector } from 'reselect'
import UserList from '../../components/account/user/List'
import UserSearch from '../../components/account/user/Search'
import UserModal from '../../components/account/user/Modal'

function User ({ location, dispatch, accountUser, loading }) {
  const { list, pagination, currentItem, modalVisible, modalType } = accountUser
  const { field, keyword } = location.query
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
    onPageChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname: pathname,
        query: {
          ...query,
          page: page.current,
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
          currentItem: item
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

const mapStateToProps = createSelector(
  state => state.accountUser,
  state => state.loading.models.accountUser,
  (accountUser, loading) => {
    return {
      accountUser,
      loading
    }
  }
)

export default connect(mapStateToProps)(User)
