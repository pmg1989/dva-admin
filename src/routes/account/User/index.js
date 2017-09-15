import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import UserList from './List'
import UserSearch from './Search'
import UserModal from './ModalForm'
import { checkPower } from '../../../utils'
import { ADD, UPDATE, DELETE } from '../../../constants/options'

function User ({ location, curPowers, dispatch, accountUser, modal, loading }) {
  const addPower = checkPower(ADD, curPowers)
  const updatePower = checkPower(UPDATE, curPowers)
  const deletePower = checkPower(DELETE, curPowers)

  const { field, keyword } = location.query

  const searchProps = {
    field,
    keyword,
    addPower,
    onSearch (fieldsValue) {
      const { pathname } = location
      fieldsValue.keyword.length
        ? dispatch(routerRedux.push({
          pathname,
          query: {
            ...fieldsValue,
          },
        }))
        : dispatch(routerRedux.push({ pathname }))
    },
    onAdd () {
      dispatch({
        type: 'modal/showModal',
        payload: {
          type: 'create',
        },
      })
    },
  }

  const listProps = {
    accountUser,
    loading,
    updatePower,
    deletePower,
    onDeleteItem (id) {
      dispatch({ type: 'accountUser/delete', payload: { id } })
    },
    onEditItem (item) {
      dispatch({
        type: 'accountUser/showModal',
        payload: {
          type: 'update',
          curItem: item,
        },
      })
    },
    onStatusItem (item) {
      dispatch({
        type: 'accountUser/updateStatus',
        payload: {
          curItem: item,
        },
      })
    },
    onDeleteBatch (ids) {
      dispatch({
        type: 'accountUser/deleteBatch',
        payload: { ids },
      })
    },

  }

  const modalProps = {
    modal,
    loading,
    onOk (data) {
      dispatch({
        type: data.id
          ? 'accountUser/update'
          : 'accountUser/create',
        payload: {
          curItem: data,
        },
      })
    },
    onCancel () {
      dispatch({ type: 'modal/hideModal' })
    },
  }

  return (
    <div className="content-inner">
      <UserSearch {...searchProps} />
      <UserList {...listProps} />
      <UserModal {...modalProps} />
    </div>
  )
}

User.propTypes = {
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  accountUser: PropTypes.object.isRequired,
  curPowers: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  modal: PropTypes.object.isRequired,
}

function mapStateToProps ({ accountUser, modal, loading }) {
  return { accountUser, modal, loading: loading.models.accountUser }
}

export default connect(mapStateToProps)(User)
