import React, {PropTypes} from 'react'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import RoleList from '../../components/account/role/List'
import RoleSearch from '../../components/account/role/Search'
import RoleModal from '../../components/account/role/ModalForm'
import {checkPower} from '../../utils'
import {ADD, UPDATE, DELETE} from '../../constants/options'

function Role({location, curPowers, dispatch}) {

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
    updatePower,
    deletePower,
    location,
    onDeleteItem(id) {
      dispatch({type: 'accountRole/delete', payload: id})
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
    onOk (data) {
      dispatch({ type: !!data.id ? 'accountRole/update' : 'accountRole/create', payload: { curItem: data } })
    },
    onCancel () {
      dispatch({
        type: 'modal/hideModal'
      })
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

export default connect()(Role)
