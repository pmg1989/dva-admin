import React, {PropTypes} from 'react'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import RoleList from './List'
import RoleSearch from './Search'
import RoleModal from './ModalForm'
import {checkPower} from '../../../utils'
import {ADD, UPDATE, DELETE} from '../../../constants/options'

function Role({location, curPowers, dispatch, accountRole, modal, loading}) {

  const addPower = checkPower(ADD, curPowers)
  const updatePower = checkPower(UPDATE, curPowers)
  const deletePower = checkPower(DELETE, curPowers)

  const {field, keyword} = location.query

  const searchProps = {
    field,
    keyword,
    addPower,
    onAdd() {
      dispatch({
        type: 'modal/showModal',
        payload: {
          type: 'create'
        }
      })
    }
  }

  const listProps = {
    accountRole,
    loading,
    updatePower,
    deletePower,
    location,
    onDeleteItem(id) {
      dispatch({type: 'accountRole/delete', payload: {id}})
    },
    onEditItem(item) {
      dispatch({
        type: 'modal/showModal',
        payload: {
          type: 'update',
          curItem: item
        }
      })
    }
  }

  const modalProps = {
    modal,
    loading,
    onOk(data) {
      dispatch({
        type: !!data.id
          ? 'accountRole/update'
          : 'accountRole/create',
        payload: {
          curItem: data
        }
      })
    },
    onCancel() {
      dispatch({type: 'modal/hideModal'})
    }
  }

  return (
    <div className='content-inner'>
      <RoleSearch {...searchProps}/>
      <RoleList {...listProps}/>
      <RoleModal {...modalProps}/>
    </div>
  )
}

Role.propTypes = {
  accountRole: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps({ accountRole, modal, loading }) {
  return { accountRole, modal, loading: loading.models.accountRole }
}

export default connect(mapStateToProps)(Role)
