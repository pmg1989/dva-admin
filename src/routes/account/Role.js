import React, {PropTypes} from 'react'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import RoleList from '../../components/account/role/List'
import RoleSearch from '../../components/account/role/Search'
import RoleModal from '../../components/account/role/ModalForm'
import { checkPower } from '../../utils'
import { ADD, UPDATE, DELETE } from '../../constants/options'

function Role({ location, curPowers, dispatch, accountRole }) {

  const { list, loading } = accountRole

  const {field, keyword} = location.query

  const addPower = checkPower(ADD, curPowers)
  const updatePower = checkPower(UPDATE, curPowers)
  const deletePower = checkPower(DELETE, curPowers)

  const roleListProps = {
    dataSource: list,
    loading,
    location,
    updatePower,
    deletePower,
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

  const roleSearchProps = {
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

  const RoleModalGen = () => <RoleModal/>

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
