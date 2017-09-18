import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { checkPower } from 'utils'
import { ADD, UPDATE, DELETE } from 'constants/options'
import AdminList from './List'
import AdminSearch from './Search'
import AdminModal from './ModalForm'

function Admin ({ location, dispatch, curPowers, accountAdmin, modal, loading }) {
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
        type: 'accountAdmin/showModal',
        payload: {
          type: 'create',
        },
      })
    },
  }

  const listProps = {
    accountAdmin,
    loading,
    updatePower,
    deletePower,
    onDeleteItem (id) {
      dispatch({ type: 'accountAdmin/delete', payload: { id } })
    },
    onEditItem (item) {
      dispatch({
        type: 'accountAdmin/showModal',
        payload: {
          type: 'update',
          curItem: item,
        },
      })
    },
    onStatusItem (item) {
      dispatch({
        type: 'accountAdmin/updateStatus',
        payload: {
          curItem: item,
        },
      })
    },
  }

  const modalProps = {
    modal,
    loading,
    onOk (data) {
      dispatch({
        type: data.id
          ? 'accountAdmin/update'
          : 'accountAdmin/create',
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
      <AdminSearch {...searchProps} />
      <AdminList {...listProps} />
      <AdminModal {...modalProps} />
    </div>
  )
}

Admin.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  curPowers: PropTypes.array,
  accountAdmin: PropTypes.object,
  modal: PropTypes.object,
  loading: PropTypes.bool,
}

function mapStateToProps ({ accountAdmin, modal, loading }) {
  return { accountAdmin, modal, loading: loading.models.accountAdmin }
}

export default connect(mapStateToProps)(Admin)
