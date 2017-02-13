import React, {PropTypes} from 'react'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import RoleList from '../../components/account/role/List'
import RoleSearch from '../../components/account/role/Search'
import RoleModal from '../../components/account/role/Modal'

function Role({ location, dispatch, accountRole }) {
  const {
    list,
    pagination,
    currentItem,
    modalVisible,
    modalType,
    loading
  } = accountRole
  const {field, keyword} = location.query

  const roleModalProps = {
    item: modalType === 'create'
      ? {}
      : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk(data) {
      dispatch({type: `accountRole/${modalType}`, payload: data})
    },
    onCancel() {
      dispatch({type: 'accountRole/hideModal'})
    }
  }

  const roleListProps = {
    dataSource: list,
    loading,
    pagination: pagination,
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
      dispatch({type: 'accountRole/delete', payload: id})
    },
    onEditItem(item) {
      dispatch({
        type: 'accountRole/showModal',
        payload: {
          modalType: 'update',
          currentItem: item
        }
      })
    }
  }

  const roleSearchProps = {
    field,
    keyword,
    onSearch(fieldsValue) {
      !!fieldsValue.keyword.length
        ? dispatch(routerRedux.push({
          pathname: location.pathname,
          query: {
            field: fieldsValue.field,
            keyword: fieldsValue.keyword
          }
        }))
        : dispatch(routerRedux.push({pathname: location.pathname}))
    },
    onAdd() {
      dispatch({
        type: 'accountRole/showModal',
        payload: {
          modalType: 'create'
        }
      })
    }
  }

  const RoleModalGen = () => <RoleModal {...roleModalProps}/>

  return (
    <div className='content-inner'>
      <RoleSearch {...roleSearchProps}/>
      <RoleList {...roleListProps}/>
      <RoleModalGen/>
    </div>
  )
}

Role.propTypes = {
  accountRole: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps({ accountRole }) {
  return { accountRole }
}

export default connect(mapStateToProps)(Role)
