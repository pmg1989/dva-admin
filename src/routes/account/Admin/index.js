import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { checkPower } from 'utils'
import { ADD, UPDATE, DELETE } from 'constants/options'
import AdminList from './List'
import AdminSearch from './Search'
import AdminModal from './ModalForm'

const namespace = 'accountAdmin'

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
      dispatch({
        type: `${namespace}/query`,
        payload: { current: 1, ...fieldsValue },
      })
    },
    onAdd () {
      dispatch({
        type: `${namespace}/showModal`,
        payload: { type: 'create' },
      })
    },
  }

  const listProps = {
    accountAdmin,
    loading,
    updatePower,
    deletePower,
    onPageChange (fieldsValue) {
      dispatch({
        type: `${namespace}/query`,
        payload: { ...fieldsValue },
      })
    },
    onDeleteItem (id) {
      dispatch({ type: 'accountAdmin/delete', payload: { id } })
    },
    onEditItem (item) {
      dispatch({
        type: `${namespace}/showModal`,
        payload: { type: 'update', curItem: item },
      })
    },
    onStatusItem (item) {
      dispatch({
        type: `${namespace}/updateStatus`,
        payload: { curItem: item },
      })
    },
  }

  const modalProps = {
    modal,
    loading,
    onOk (data) {
      dispatch({
        type: data.id
          ? `${namespace}/update`
          : `${namespace}/create`,
        payload: { curItem: data },
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
  loading: PropTypes.object.isRequired,
}

function mapStateToProps ({ accountAdmin, modal, loading }) {
  return { accountAdmin, modal, loading }
}

export default connect(mapStateToProps)(Admin)
